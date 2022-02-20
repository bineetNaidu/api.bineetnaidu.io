import { Resolver, Query, Mutation, Args, Context } from '@nestjs/graphql';
import { UserService } from './user.service';
import { User } from './models/user.model';
import { RegisterInput } from './dto/register.input';
import { UpdateUserInput } from './dto/update-user.input';
import { LoginInput } from './dto/login.input';
import { AuthResponseDto } from './dto/auth.response';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/shared/guards/auth.guard';
import { MyCtx } from 'src/shared/types';

@Resolver(User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

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
