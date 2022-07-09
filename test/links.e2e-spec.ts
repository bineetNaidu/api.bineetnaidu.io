import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { hash } from 'argon2';
import * as mongoose from 'mongoose';
import { connection, Connection } from 'mongoose';
import * as request from 'supertest';
import { AppModule } from '../src/app/app.module';
import { DatabaseService } from '../src/database/database.service';
import { AdminUserPrivileges } from '../src/shared/constants';
import {
  CREATE_LINK,
  DELETE_LINK,
  GET_LINKS,
  MUTATION_LOGIN,
  MUTATION_REGISTER,
  UPDATE_LINK,
} from './executionQueries.util';

describe('LinksModule (e2e)', () => {
  let dbConnection: Connection;
  let app: INestApplication;
  const testUser = {
    email: 'test@links.com',
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
      email: 'admin@linksadmin.com',
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
            email: 'admin@linksadmin.com',
            password: 'admin',
          },
        },
      });
    expect(status).toBe(200);
    expect(body.data.login.user._id).toBeDefined();
    return body.data.login.accessToken;
  }

  const testLink = {
    label: 'test',
    url: 'https://test.com',
    icon: 'https://test.com/icon.png',
  };

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
    await dbConnection.collection('links').deleteMany({});
  });

  afterEach(async () => {
    await dbConnection.close();
    await mongoose.connection.close();
    await connection.close();
    await app.close();
  });

  it('should create a link if user has privileges', async () => {
    const adminAccessToken = await createAdminUser(app, dbConnection);
    const { body, status } = await request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: CREATE_LINK,
        variables: {
          data: {
            label: 'test',
            url: 'https://test.com',
            icon: 'https://test.com/icon.png',
          },
        },
      })
      .set('x-access-token', adminAccessToken);
    expect(status).toBe(200);
    expect(body.data.createLink._id).toBeDefined();
    expect(body.data.createLink.label).toBe('test');
    expect(body.data.createLink.url).toBe('https://test.com');
    expect(body.data.createLink.icon).toBe('https://test.com/icon.png');
  });

  it('should not create a link if user is not logged in', async () => {
    const { body, status } = await request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: CREATE_LINK,
        variables: {
          data: testLink,
        },
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

  it.todo(
    'should not create a link if the user has passed invalid/malformed data',
  );

  it('should not create a link if user has no privileges', async () => {
    const { body: registerbody, status: registerstatus } = await request(
      app.getHttpServer(),
    )
      .post('/graphql')
      .send({
        query: MUTATION_REGISTER,
        variables: {
          data: testUser,
        },
      });
    expect(registerstatus).toBe(200);
    expect(registerbody.data.register.user._id).toBeDefined();

    const { body: createLinkBody, status: createLinkStatus } = await request(
      app.getHttpServer(),
    )
      .post('/graphql')
      .send({
        query: CREATE_LINK,
        variables: {
          data: testLink,
        },
      })
      .set('x-access-token', registerbody.data.register.accessToken);
    expect(createLinkStatus).toBe(200);
    expect(createLinkBody.data).toBeNull();
    expect(createLinkBody.errors).toBeDefined();
    expect(createLinkBody.errors[0].extensions.response.message).toEqual(
      'Forbidden resource',
    );
    expect(createLinkBody.errors[0].extensions.response.statusCode).toEqual(
      403,
    );
    expect(createLinkBody.errors[0].extensions.code).toEqual('FORBIDDEN');
  });

  it('should update a link if user has privileges', async () => {
    const adminAccessToken = await createAdminUser(app, dbConnection);
    const { body, status } = await request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: CREATE_LINK,
        variables: {
          data: testLink,
        },
      })
      .set('x-access-token', adminAccessToken);
    expect(status).toBe(200);
    expect(body.data.createLink._id).toBeDefined();

    const { body: updateLinkBody, status: updateLinkStatus } = await request(
      app.getHttpServer(),
    )
      .post('/graphql')
      .send({
        query: UPDATE_LINK,
        variables: {
          _id: body.data.createLink._id,
          data: {
            label: 'test2',
          },
        },
      })
      .set('x-access-token', adminAccessToken);

    expect(updateLinkStatus).toBe(200);
    expect(updateLinkBody.data.updateLink.label).toBe('test2');
  });

  it('should not update a link if user is not logged in', async () => {
    const { body: updateLinkBody, status: updateLinkStatus } = await request(
      app.getHttpServer(),
    )
      .post('/graphql')
      .send({
        query: UPDATE_LINK,
        variables: {
          _id: '5e8f8f8f8f8f8f8f8f8f8f8f',
          data: {
            label: 'This wont update',
          },
        },
      });
    expect(updateLinkStatus).toBe(200);
    expect(updateLinkBody.data.updateLink).toBeNull();
    expect(updateLinkBody.errors).toBeDefined();
    expect(updateLinkBody.errors[0].extensions.response.message).toEqual(
      'No token was provided',
    );
    expect(updateLinkBody.errors[0].extensions.response.statusCode).toEqual(
      401,
    );
    expect(updateLinkBody.errors[0].extensions.code).toEqual('UNAUTHENTICATED');
  });

  it('should not update a link if user has no privileges', async () => {
    const { body: registerbody, status: registerstatus } = await request(
      app.getHttpServer(),
    )
      .post('/graphql')
      .send({
        query: MUTATION_REGISTER,
        variables: {
          data: testUser,
        },
      });
    expect(registerstatus).toBe(200);
    expect(registerbody.data.register.user._id).toBeDefined();

    const { body: updateLinkBody, status: updateLinkStatus } = await request(
      app.getHttpServer(),
    )
      .post('/graphql')
      .send({
        query: UPDATE_LINK,
        variables: {
          _id: '5e8f8f8f8f8f8f8f8f8f8f8f',
          data: {
            label: 'This wont update',
          },
        },
      })
      .set('x-access-token', registerbody.data.register.accessToken);

    expect(updateLinkStatus).toBe(200);
    expect(updateLinkBody.data.updateLink).toBeNull();
    expect(updateLinkBody.errors).toBeDefined();
    expect(updateLinkBody.errors[0].extensions.response.message).toEqual(
      'Forbidden resource',
    );
    expect(updateLinkBody.errors[0].extensions.response.statusCode).toEqual(
      403,
    );
    expect(updateLinkBody.errors[0].extensions.code).toEqual('FORBIDDEN');
  });

  it('should not update a link if the ID provided is invalid/not-found', async () => {
    const adminAccessToken = await createAdminUser(app, dbConnection);
    const { body } = await request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: UPDATE_LINK,
        variables: {
          _id: '5e8f8f8f8f8f8f8f8f8f8f8f',
          data: {
            label: 'This wont update',
          },
        },
      })
      .set('x-access-token', adminAccessToken);
    expect(body.data.updateLink).toBeNull();
  });

  it('should delete a link if user has privileges', async () => {
    const adminAccessToken = await createAdminUser(app, dbConnection);
    const { body, status } = await request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: CREATE_LINK,
        variables: {
          data: testLink,
        },
      })
      .set('x-access-token', adminAccessToken);
    expect(status).toBe(200);
    expect(body.data.createLink._id).toBeDefined();

    const { body: deleteLinkBody, status: deleteLinkStatus } = await request(
      app.getHttpServer(),
    )
      .post('/graphql')
      .send({
        query: DELETE_LINK,
        variables: {
          _id: body.data.createLink._id,
        },
      })
      .set('x-access-token', adminAccessToken);
    expect(deleteLinkStatus).toBe(200);
    expect(deleteLinkBody.data.deleteLink).toBeTruthy();
  });

  it('should not delete a link if user is not logged in', async () => {
    const { body } = await request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: DELETE_LINK,
        variables: {
          _id: '5e8f8f8f8f8f8f8f8f8f8f8f',
        },
      });
    expect(body.data).toBeNull();
    expect(body.errors).toBeDefined();
    expect(body.errors[0].extensions.response.message).toEqual(
      'No token was provided',
    );
    expect(body.errors[0].extensions.response.statusCode).toEqual(401);
    expect(body.errors[0].extensions.code).toEqual('UNAUTHENTICATED');
  });

  it('should not delete a link if user has no privileges', async () => {
    const { body: registerbody, status: registerstatus } = await request(
      app.getHttpServer(),
    )
      .post('/graphql')
      .send({
        query: MUTATION_REGISTER,
        variables: {
          data: testUser,
        },
      });
    expect(registerstatus).toBe(200);
    expect(registerbody.data.register.user._id).toBeDefined();

    const { body: deleteLinkBody, status: deleteLinkStatus } = await request(
      app.getHttpServer(),
    )
      .post('/graphql')
      .send({
        query: DELETE_LINK,
        variables: {
          _id: '5e8f8f8f8f8f8f8f8f8f8f8f',
        },
      })
      .set('x-access-token', registerbody.data.register.accessToken);
    expect(deleteLinkStatus).toBe(200);
    expect(deleteLinkBody.data).toBeNull();
    expect(deleteLinkBody.errors).toBeDefined();
    expect(deleteLinkBody.errors[0].extensions.response.message).toEqual(
      'Forbidden resource',
    );
    expect(deleteLinkBody.errors[0].extensions.response.statusCode).toEqual(
      403,
    );
    expect(deleteLinkBody.errors[0].extensions.code).toEqual('FORBIDDEN');
  });

  it('should not delete a link if the ID provided is invalid/not-found', async () => {
    const adminAccessToken = await createAdminUser(app, dbConnection);
    const { body } = await request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: DELETE_LINK,
        variables: {
          _id: '5e8f8f8f8f8f8f8f8f8f8f8f',
        },
      })
      .set('x-access-token', adminAccessToken);

    expect(body.data.deleteLink).toBeFalsy();
  });

  it('should get all links', async () => {
    const accessToken = await createAdminUser(app, dbConnection);

    await request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: CREATE_LINK,
        variables: {
          data: testLink,
        },
      })
      .set('x-access-token', accessToken)
      .expect(200);

    const { body } = await request(app.getHttpServer()).post('/graphql').send({
      query: GET_LINKS,
    });

    expect(body.data.links).toBeDefined();
    expect(body.data.links.length).toBe(1);
  });
});
