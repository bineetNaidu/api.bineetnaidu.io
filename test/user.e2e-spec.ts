import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { hash } from 'argon2';
import * as mongoose from 'mongoose';
import { connection, Connection } from 'mongoose';
import * as request from 'supertest';
import { AppModule } from '../src/app/app.module';
import { DatabaseService } from '../src/database/database.service';
import { AdminUserPrivileges } from '../src/shared/constants';
import { UserPrivilege } from '../src/shared/types';
import {
  ADD_USER_PRIVILEGE_MUTATION,
  DELETE_ME_MUTATION,
  GET_ALL_USERS_QUERY,
  GET_USER_BY_ID_QUERY,
  ME_QUERY,
  MUTATION_LOGIN,
  MUTATION_REGISTER,
  REMOVE_USER_PRIVILEGE_MUTATION,
  UPDATE_ME_MUTATION,
} from './executionQueries.util';

describe('UserModule (e2e)', () => {
  let dbConnection: Connection;
  let app: INestApplication;
  const testUser = {
    email: 'test@user.com',
    password: 'test',
    firstName: 'test',
    lastName: 'test',
  };

  async function createAdminUser(
    app: INestApplication,
    dbConnection: Connection,
  ): Promise<string> {
    const hashPass = await hash('admin', {
      hashLength: 14,
    });
    await dbConnection.collection('users').insertOne({
      email: 'admin@useradmin.com',
      password: hashPass,
      firstName: 'admin',
      lastName: 'admin',
      privileges: AdminUserPrivileges,
      avatar: 'https://avatars.dicebear.com/api/human/admin.svg',
    });
    const { body, status } = await request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: MUTATION_LOGIN,
        variables: {
          data: {
            email: 'admin@useradmin.com',
            password: 'admin',
          },
        },
      });
    expect(status).toBe(200);
    expect(body.data.login.user._id).toBeDefined();
    return body.data.login.accessToken;
  }

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    dbConnection = moduleFixture
      .get<DatabaseService>(DatabaseService)
      .getDbHandle();
    await app.init();
    await dbConnection.collection('users').deleteMany({});
  });

  afterEach(async () => {
    await dbConnection.close();
    await mongoose.connection.close();
    await connection.close();
    await app.close();
  });

  it('should register a new user', async () => {
    const { body, status } = await request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: MUTATION_REGISTER,
        variables: {
          data: testUser,
        },
      });
    expect(status).toBe(200);
    expect(body.data.register.user).toBeDefined();
    expect(body.data.register.user._id).toBeDefined();
    expect(body.data.register.user.email).toBe(testUser.email);
    expect(body.data.register.user.firstName).toBe(testUser.firstName);
    expect(body.data.register.user.lastName).toBe(testUser.lastName);
    expect(body.data.register.accessToken).toBeDefined();
    expect(body.data.register.errors).toEqual(null);
  });

  it('should not register a new user with an existing email', async () => {
    const { body, status } = await request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: MUTATION_REGISTER,
        variables: {
          data: testUser,
        },
      });
    expect(status).toBe(200);
    expect(body.data.register.user).toBeDefined();
    expect(body.data.register.errors).toEqual(null);

    const { body: body2, status: status2 } = await request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: MUTATION_REGISTER,
        variables: {
          data: testUser,
        },
      });
    expect(status2).toBe(200);
    expect(body2.data.register.user).toBeNull();
    expect(body2.data.register.errors).toEqual([
      {
        field: 'email',
        message: 'User with this email already exists',
      },
    ]);
  });

  it('should not register a new user with an invalid email', async () => {
    const { body, status } = await request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: MUTATION_REGISTER,
        variables: {
          data: {
            ...testUser,
            email: 'invalidEmail',
          },
        },
      });
    expect(status).toBe(200);
    expect(body.data).toBeNull();
    expect(body.errors).toBeDefined();
    expect(body.errors[0].extensions.response.message).toEqual([
      {
        field: 'email',
        message: 'please enter a valid email',
      },
    ]);
  });

  it('should not register a new user with an empty email and password', async () => {
    const { body, status } = await request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: MUTATION_REGISTER,
        variables: {
          data: {
            ...testUser,
            email: '',
            password: '',
          },
        },
      });
    expect(status).toBe(200);
    expect(body.data).toBeNull();
    expect(body.errors).toBeDefined();
    expect(body.errors[0].extensions.response.message).toEqual([
      {
        field: 'email',
        message: 'email should not be empty',
      },
      {
        field: 'password',
        message: 'password should not be empty',
      },
    ]);
  });

  it('should successfully login a user', async () => {
    const { body, status } = await request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: MUTATION_REGISTER,
        variables: {
          data: testUser,
        },
      });
    expect(status).toBe(200);
    expect(body.data.register.user).toBeDefined();
    expect(body.data.register.user._id).toBeDefined();

    const { body: body2, status: status2 } = await request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: MUTATION_LOGIN,
        variables: {
          data: {
            email: testUser.email,
            password: testUser.password,
          },
        },
      });
    expect(status2).toBe(200);
    expect(body2.data.login.user).toBeDefined();
    expect(body2.data.login.user._id).toBeDefined();
    expect(body2.data.login.user.email).toBe(testUser.email);
    expect(body2.data.login.user.firstName).toBe(testUser.firstName);
    expect(body2.data.login.user.lastName).toBe(testUser.lastName);
    expect(body2.data.login.accessToken).toBeDefined();
    expect(body2.data.login.errors).toEqual(null);
  });

  it('should not login a user with an invalid email', async () => {
    const { body, status } = await request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: MUTATION_LOGIN,
        variables: {
          data: {
            email: 'invalidEmail',
            password: testUser.password,
          },
        },
      });
    expect(status).toBe(200);
    expect(body.data).toBeNull();
    expect(body.errors).toBeDefined();
    expect(body.errors[0].extensions.response.message).toEqual([
      {
        field: 'email',
        message: 'please enter a valid email',
      },
    ]);
  });

  it('should not login a user with an email that does not exist', async () => {
    const { body, status } = await request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: MUTATION_LOGIN,
        variables: {
          data: {
            email: 'nonexisting@gmail.com',
            password: testUser.password,
          },
        },
      });
    expect(status).toBe(200);
    expect(body.data.login.user).toBeNull();
    expect(body.data.login.accessToken).toBeNull();
    expect(body.data.login.errors).toEqual([
      {
        field: 'email',
        message: 'User with this email does not exist',
      },
    ]);
  });

  it('should not login a user with an invalid password', async () => {
    const { body, status } = await request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: MUTATION_REGISTER,
        variables: {
          data: testUser,
        },
      });
    expect(status).toBe(200);
    expect(body.data.register.user).toBeDefined();

    const { body: loginBody, status: loginStatus } = await request(
      app.getHttpServer(),
    )
      .post('/graphql')
      .send({
        query: MUTATION_LOGIN,
        variables: {
          data: {
            email: testUser.email,
            password: 'invalidPassword',
          },
        },
      });
    expect(loginStatus).toBe(200);
    expect(loginBody.data.login.user).toBeNull();
    expect(loginBody.data.login.accessToken).toBeNull();
    expect(loginBody.data.login.errors).toEqual([
      {
        field: 'password',
        message: 'Password is invalid',
      },
    ]);
  });

  it('should return the authenticated user on me query', async () => {
    const { body, status } = await request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: MUTATION_REGISTER,
        variables: {
          data: testUser,
        },
      });
    expect(status).toBe(200);
    expect(body.data.register.user).toBeDefined();

    const { body: meBody, status: meStatus } = await request(
      app.getHttpServer(),
    )
      .post('/graphql')
      .send({
        query: ME_QUERY,
      })
      .set('x-access-token', body.data.register.accessToken);
    expect(meStatus).toBe(200);
    expect(meBody.data.me).toBeDefined();
    expect(meBody.data.me.email).toBe(testUser.email);
    expect(meBody.data.me.firstName).toBe(testUser.firstName);
    expect(meBody.data.me.lastName).toBe(testUser.lastName);
    expect(meBody.data.me._id).toBeDefined();
  });

  it('should return null on unauthenticated request on me query', async () => {
    const { body, status } = await request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: ME_QUERY,
      });
    expect(status).toBe(200);
    expect(body.data.me).toBeNull();
  });

  it('should successfully update the authenticated user', async () => {
    const { body, status } = await request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: MUTATION_REGISTER,
        variables: {
          data: testUser,
        },
      });
    expect(status).toBe(200);
    expect(body.data.register.user).toBeDefined();

    const { body: updateBody, status: updateStatus } = await request(
      app.getHttpServer(),
    )
      .post('/graphql')
      .send({
        query: UPDATE_ME_MUTATION,
        variables: {
          data: {
            firstName: 'newFirstName',
            lastName: 'newLastName',
          },
        },
      })
      .set('x-access-token', body.data.register.accessToken);

    expect(updateStatus).toBe(200);
    expect(updateBody.data.updateMe).toBeDefined();
    expect(updateBody.data.updateMe.firstName).toBe('newFirstName');
    expect(updateBody.data.updateMe.lastName).toBe('newLastName');
    expect(updateBody.data.updateMe.email).toBe(testUser.email);
  });

  it('should not update the authenticated user with invalid data', async () => {
    const { body, status } = await request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: MUTATION_REGISTER,
        variables: {
          data: testUser,
        },
      });
    expect(status).toBe(200);
    expect(body.data.register.user).toBeDefined();

    const { body: updateBody, status: updateStatus } = await request(
      app.getHttpServer(),
    )
      .post('/graphql')
      .send({
        query: UPDATE_ME_MUTATION,
        variables: {
          data: {
            email: 'invalidEmail',
          },
        },
      })
      .set('x-access-token', body.data.register.accessToken);

    expect(updateStatus).toBe(200);
    expect(updateBody.data.updateMe).toBeNull();
    expect(updateBody.errors).toBeDefined();
    expect(updateBody.errors[0].extensions.response.message).toEqual([
      {
        field: 'email',
        message: 'please enter a valid email',
      },
    ]);
  });

  it('should not update the authenticated user with an email that already exists', async () => {
    const { body: registerbody, status: registerStatus } = await request(
      app.getHttpServer(),
    )
      .post('/graphql')
      .send({
        query: MUTATION_REGISTER,
        variables: {
          data: testUser,
        },
      });
    expect(registerStatus).toBe(200);
    expect(registerbody.data.register.user).toBeDefined();

    const { body: register2body, status: register2Status } = await request(
      app.getHttpServer(),
    )
      .post('/graphql')
      .send({
        query: MUTATION_REGISTER,
        variables: {
          data: {
            ...testUser,
            email: 'test2@gmail.com',
          },
        },
      });
    expect(register2Status).toBe(200);
    expect(register2body.data.register.user).toBeDefined();

    const { body: updateBody, status: updateStatus } = await request(
      app.getHttpServer(),
    )
      .post('/graphql')
      .send({
        query: UPDATE_ME_MUTATION,
        variables: {
          data: {
            email: 'test2@gmail.com',
          },
        },
      })
      .set('x-access-token', registerbody.data.register.accessToken);

    expect(updateStatus).toBe(200);
    expect(updateBody.data.updateMe).toBeNull();
    expect(updateBody.errors).toBeDefined();
    expect(updateBody.errors[0].extensions.response.message).toEqual([
      {
        field: 'email',
        message: 'Cannot update email to an email that already exists',
      },
    ]);
  });

  it('should not update authenticated user on unauthenticated request', async () => {
    const { body, status } = await request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: UPDATE_ME_MUTATION,
        variables: {
          data: {
            firstName: 'newFirstName',
            lastName: 'newLastName',
          },
        },
      });
    expect(status).toBe(200);
    expect(body.data.updateMe).toBeNull();
    expect(body.errors).toBeDefined();
    expect(body.errors[0].extensions.response.message).toEqual(
      'No token was provided',
    );
    expect(body.errors[0].extensions.response.statusCode).toEqual(401);
    expect(body.errors[0].extensions.code).toEqual('UNAUTHENTICATED');
  });

  it('should successfully deleted the authenticated user on authenticated request', async () => {
    const { body, status } = await request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: MUTATION_REGISTER,
        variables: {
          data: testUser,
        },
      });
    expect(status).toBe(200);
    expect(body.data.register.user).toBeDefined();

    const { body: deleteBody, status: deleteStatus } = await request(
      app.getHttpServer(),
    )
      .post('/graphql')
      .send({
        query: DELETE_ME_MUTATION,
      })
      .set('x-access-token', body.data.register.accessToken);

    expect(deleteStatus).toBe(200);
    expect(deleteBody.data.deleteMe).toBe(true);
  });

  it('should not delete the authenticated user on unauthenticated request', async () => {
    const { body, status } = await request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: DELETE_ME_MUTATION,
      });
    expect(status).toBe(200);
    expect(body.data).toBeNull();
    expect(body.errors).toBeDefined();
    expect(body.errors[0].extensions.response.message).toEqual(
      'No token was provided',
    );
    expect(body.errors[0].extensions.response.statusCode).toEqual(401);
    expect(body.errors[0].extensions.code).toEqual('UNAUTHENTICATED');
  });

  it('should add privilege to a user', async () => {
    const adminAccessToken = await createAdminUser(app, dbConnection);

    const { body: testUserBody, status: testUserStatus } = await request(
      app.getHttpServer(),
    )
      .post('/graphql')
      .send({
        query: MUTATION_REGISTER,
        variables: {
          data: testUser,
        },
      });
    expect(testUserStatus).toBe(200);
    expect(testUserBody.data.register.user).toBeDefined();

    const { body: addPrivilegeBody, status: addPrivilegeStatus } =
      await request(app.getHttpServer())
        .post('/graphql')
        .send({
          query: ADD_USER_PRIVILEGE_MUTATION,
          variables: {
            _id: testUserBody.data.register.user._id,
            data: {
              privilege: UserPrivilege.USERS_READ,
            },
          },
        })
        .set('x-access-token', adminAccessToken);

    expect(addPrivilegeStatus).toBe(200);
    expect(addPrivilegeBody.data.addUserPrivilegesToUser).toBeTruthy();
    expect(addPrivilegeBody.data.addUserPrivilegesToUser.privileges).toContain(
      UserPrivilege.USERS_READ,
    );
  });

  it('should remove privileges from a user', async () => {
    const adminAccessToken = await createAdminUser(app, dbConnection);

    const { body: testUserBody, status: testUserStatus } = await request(
      app.getHttpServer(),
    )
      .post('/graphql')
      .send({
        query: MUTATION_REGISTER,
        variables: {
          data: testUser,
        },
      });
    expect(testUserStatus).toBe(200);
    expect(testUserBody.data.register.user).toBeDefined();

    const { body: removePrivilegeBody, status: removePrivilegeStatus } =
      await request(app.getHttpServer())
        .post('/graphql')
        .send({
          query: REMOVE_USER_PRIVILEGE_MUTATION,
          variables: {
            _id: testUserBody.data.register.user._id,
            data: {
              privilege: 'LINKS_READ',
            },
          },
        })
        .set('x-access-token', adminAccessToken);

    expect(removePrivilegeStatus).toBe(200);
    expect(removePrivilegeBody.data.removeUserPrivilegesFromUser).toBeTruthy();
    expect(
      removePrivilegeBody.data.removeUserPrivilegesFromUser.privileges,
    ).not.toContain(UserPrivilege.USERS_READ);
  });

  it('should not add or remove privileges if there is unauthenticated request', async () => {
    const { body, status } = await request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: ADD_USER_PRIVILEGE_MUTATION,
        variables: {
          _id: '5e8f8f8f8f8f8f8f8f8f8f8',
          data: {
            privilege: UserPrivilege.USERS_READ,
          },
        },
      });
    expect(status).toBe(200);
    expect(body.data.addUserPrivilegesToUser).toBeNull();
    expect(body.errors).toBeDefined();
    expect(body.errors[0].extensions.response.message).toEqual(
      'No token was provided',
    );
    expect(body.errors[0].extensions.response.statusCode).toEqual(401);
    expect(body.errors[0].extensions.code).toEqual('UNAUTHENTICATED');

    const { body: removePrivilegeBody, status: removePrivilegeStatus } =
      await request(app.getHttpServer())
        .post('/graphql')
        .send({
          query: REMOVE_USER_PRIVILEGE_MUTATION,
          variables: {
            _id: '5e8f8f8f8f8f8f8f8f8f8f8',
            data: {
              privilege: 'LINKS_READ',
            },
          },
        });
    expect(removePrivilegeStatus).toBe(200);
    expect(removePrivilegeBody.data.removeUserPrivilegesFromUser).toBeNull();
    expect(body.errors).toBeDefined();
    expect(body.errors[0].extensions.response.message).toEqual(
      'No token was provided',
    );
    expect(body.errors[0].extensions.response.statusCode).toEqual(401);
    expect(body.errors[0].extensions.code).toEqual('UNAUTHENTICATED');
  });

  it('should not add or remove privileges if the authenticated user dont have the privilege', async () => {
    const { body: testUserBody, status: testUserStatus } = await request(
      app.getHttpServer(),
    )
      .post('/graphql')
      .send({
        query: MUTATION_REGISTER,
        variables: {
          data: testUser,
        },
      });
    expect(testUserStatus).toBe(200);
    expect(testUserBody.data.register.user).toBeDefined();

    const { body: removePrivilegeBody, status: removePrivilegeStatus } =
      await request(app.getHttpServer())
        .post('/graphql')
        .send({
          query: REMOVE_USER_PRIVILEGE_MUTATION,
          variables: {
            _id: testUserBody.data.register.user._id,
            data: {
              privilege: 'LINKS_READ',
            },
          },
        })
        .set('x-access-token', testUserBody.data.register.accessToken);
    expect(removePrivilegeStatus).toBe(200);
    expect(removePrivilegeBody.data.removeUserPrivilegesFromUser).toBeNull();
    expect(removePrivilegeBody.errors).toBeDefined();
    expect(removePrivilegeBody.errors[0].extensions.response.message).toEqual(
      'Forbidden resource',
    );
    expect(
      removePrivilegeBody.errors[0].extensions.response.statusCode,
    ).toEqual(403);
    expect(removePrivilegeBody.errors[0].extensions.code).toEqual('FORBIDDEN');

    const { body: addPrivilegeBody, status: addPrivilegeStatus } =
      await request(app.getHttpServer())
        .post('/graphql')
        .send({
          query: ADD_USER_PRIVILEGE_MUTATION,
          variables: {
            _id: testUserBody.data.register.user._id,
            data: {
              privilege: UserPrivilege.USERS_READ,
            },
          },
        })
        .set('x-access-token', testUserBody.data.register.accessToken);
    expect(addPrivilegeStatus).toBe(200);
    expect(addPrivilegeBody.data.addUserPrivilegesToUser).toBeNull();
    expect(addPrivilegeBody.errors).toBeDefined();
    expect(addPrivilegeBody.errors[0].extensions.response.message).toEqual(
      'Forbidden resource',
    );
    expect(addPrivilegeBody.errors[0].extensions.response.statusCode).toEqual(
      403,
    );
    expect(addPrivilegeBody.errors[0].extensions.code).toEqual('FORBIDDEN');
  });

  it('should not get user/users if it is a unauthenticated request', async () => {
    const { body, status } = await request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: GET_USER_BY_ID_QUERY,
        variables: {
          _id: '5e8f8f8f8f8f8f8f8f8f8f8',
        },
      });
    expect(status).toBe(200);
    expect(body.data.getUserById).toBeNull();
    expect(body.errors).toBeDefined();
    expect(body.errors[0].extensions.response.message).toEqual(
      'No token was provided',
    );
    expect(body.errors[0].extensions.response.statusCode).toEqual(401);

    const { body: getUsersBody, status: getUsersStatus } = await request(
      app.getHttpServer(),
    )
      .post('/graphql')
      .send({
        query: GET_ALL_USERS_QUERY,
      });
    expect(getUsersStatus).toBe(200);
    expect(getUsersBody.data).toBeNull();
    expect(getUsersBody.errors).toBeDefined();
    expect(getUsersBody.errors[0].extensions.response.message).toEqual(
      'No token was provided',
    );
    expect(getUsersBody.errors[0].extensions.response.statusCode).toEqual(401);
  });

  it('should not get user/users if auth user dont have the privilege', async () => {
    const { body: testUserBody, status: testUserStatus } = await request(
      app.getHttpServer(),
    )
      .post('/graphql')
      .send({
        query: MUTATION_REGISTER,
        variables: {
          data: testUser,
        },
      });
    expect(testUserStatus).toBe(200);
    expect(testUserBody.data.register.user).toBeDefined();

    const { body: getUsersBody, status: getUsersStatus } = await request(
      app.getHttpServer(),
    )
      .post('/graphql')
      .send({
        query: GET_ALL_USERS_QUERY,
      })
      .set('x-access-token', testUserBody.data.register.accessToken);
    expect(getUsersStatus).toBe(200);
    expect(getUsersBody.data).toBeNull();
    expect(getUsersBody.errors).toBeDefined();
    expect(getUsersBody.errors[0].extensions.response.message).toEqual(
      'Forbidden resource',
    );
    expect(getUsersBody.errors[0].extensions.response.statusCode).toEqual(403);

    const { body: getUserBody, status: getUserStatus } = await request(
      app.getHttpServer(),
    )
      .post('/graphql')
      .send({
        query: GET_USER_BY_ID_QUERY,
        variables: {
          _id: testUserBody.data.register.user._id,
        },
      })
      .set('x-access-token', testUserBody.data.register.accessToken);
    expect(getUserStatus).toBe(200);
    expect(getUserBody.data.getUserById).toBeNull();
    expect(getUserBody.errors).toBeDefined();
    expect(getUserBody.errors[0].extensions.response.message).toEqual(
      'Forbidden resource',
    );
    expect(getUserBody.errors[0].extensions.response.statusCode).toEqual(403);
  });
  it('should get all users if auth user have the privilege', async () => {
    const adminAccessToken = await createAdminUser(app, dbConnection);
    const { body, status } = await request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: MUTATION_REGISTER,
        variables: {
          data: testUser,
        },
      });
    expect(status).toBe(200);
    expect(body.data.register.user).toBeDefined();
    expect(body.data.register.user._id).toBeDefined();

    const { body: getUsersBody, status: getUsersStatus } = await request(
      app.getHttpServer(),
    )
      .post('/graphql')
      .send({
        query: GET_ALL_USERS_QUERY,
      })
      .set('x-access-token', adminAccessToken);
    expect(getUsersStatus).toBe(200);
    expect(getUsersBody.data.getAllUsers).toBeInstanceOf(Array);
    expect(getUsersBody.data.getAllUsers.length).toBe(2);
  });

  it('should get a user by ID if auth user have the privilege', async () => {
    const adminAccessToken = await createAdminUser(app, dbConnection);
    const { body, status } = await request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: MUTATION_REGISTER,
        variables: {
          data: testUser,
        },
      });
    expect(status).toBe(200);
    expect(body.data.register.user).toBeDefined();
    expect(body.data.register.user._id).toBeDefined();

    const { body: getUserByIdBody, status: getUserByIdStatus } = await request(
      app.getHttpServer(),
    )
      .post('/graphql')
      .send({
        query: GET_USER_BY_ID_QUERY,
        variables: {
          _id: body.data.register.user._id,
        },
      })
      .set('x-access-token', adminAccessToken);
    expect(getUserByIdStatus).toBe(200);
    expect(getUserByIdBody.data.getUserById).toBeDefined();
    expect(getUserByIdBody.data.getUserById._id).toEqual(
      body.data.register.user._id,
    );
  });
});
