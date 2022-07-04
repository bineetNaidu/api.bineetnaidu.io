import { UseGuards } from '@nestjs/common';
import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { HasPermissionGuard } from '../privilege/has-permission.guard';
import { RequirePrevilages } from '../privilege/privilege.decorator';
import { AuthGuard } from '../shared/guards/auth.guard';
import { MyCtx, UserPrivilege } from '../shared/types';
import { AddUserPrivilegeInput } from './dto/addUserPrivilege.input';
import { AuthResponseDto } from './dto/auth.response';
import { LoginInput } from './dto/login.input';
import { RegisterInput } from './dto/register.input';
import { RemoveUserPrivilegeInput } from './dto/removeUserPrivilege.input';
import { UpdateUserInput } from './dto/update-user.input';
import { User } from './models/user.model';
import { UserService } from './user.service';

@Resolver(User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => [User], { description: 'Get all users' })
  @UseGuards(AuthGuard)
  @RequirePrevilages(UserPrivilege.USERS_READ)
  @UseGuards(HasPermissionGuard)
  async getAllUsers(): Promise<User[]> {
    return this.userService.getAllUsers();
  }

  @Query(() => User, { nullable: true, description: 'Get user by id' })
  @UseGuards(AuthGuard)
  @RequirePrevilages(UserPrivilege.USERS_READ)
  @UseGuards(HasPermissionGuard)
  async getUserById(@Args('_id') id: string): Promise<User | null> {
    return this.userService.getUserById(id);
  }

  @Mutation(() => User, { nullable: true, description: 'Add user privileges' })
  @UseGuards(AuthGuard)
  @RequirePrevilages(UserPrivilege.USERS_WRITE)
  @UseGuards(HasPermissionGuard)
  async addUserPrivilegesToUser(
    @Args('_id') _id: string,
    @Args('data') { privileges }: AddUserPrivilegeInput,
  ): Promise<User | null> {
    return this.userService.addUserPrivilegesToUser(_id, privileges);
  }

  @Mutation(() => User, {
    nullable: true,
    description: 'Remove user privileges',
  })
  @UseGuards(AuthGuard)
  @RequirePrevilages(UserPrivilege.USERS_WRITE)
  @UseGuards(HasPermissionGuard)
  async removeUserPrivilegesFromUser(
    @Args('_id') _id: string,
    @Args('data') { privilege }: RemoveUserPrivilegeInput,
  ): Promise<User | null> {
    return this.userService.removeUserPrivilegesFromUser(_id, privilege);
  }

  @Mutation(() => AuthResponseDto, { description: 'Register a new user' })
  register(@Args('data') data: RegisterInput): Promise<AuthResponseDto> {
    return this.userService.register(data);
  }

  @Mutation(() => AuthResponseDto, {
    description: 'Logins the user with credentials',
  })
  login(@Args('data') data: LoginInput): Promise<AuthResponseDto> {
    return this.userService.login(data);
  }

  @UseGuards(AuthGuard)
  @Query(() => User, {
    nullable: true,
    description: 'Returns the authenticated user',
  })
  me(@Context() ctx: MyCtx): Promise<User | null> {
    return this.userService.me(ctx);
  }

  @UseGuards(AuthGuard)
  @Mutation(() => User, {
    nullable: true,
    description: 'Updates the authenticated user',
  })
  updateMe(
    @Context() ctx: MyCtx,
    @Args('data') data: UpdateUserInput,
  ): Promise<User | null> {
    return this.userService.updateMe(ctx, data);
  }

  @UseGuards(AuthGuard)
  @Mutation(() => Boolean, {
    description: 'Deletes the authenticated user',
  })
  deleteMe(@Context() ctx: MyCtx) {
    return this.userService.deleteMe(ctx);
  }
}
