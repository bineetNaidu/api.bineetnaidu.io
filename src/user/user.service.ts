import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { hash, verify } from 'argon2';
import { Model } from 'mongoose';
import { USER_MODEL_NAME } from '../shared/constants';
import { MyCtx, UserPrivilege } from '../shared/types';
import { AuthResponseDto } from './dto/auth.response';
import { LoginInput } from './dto/login.input';
import { RegisterInput } from './dto/register.input';
import { UpdateUserInput } from './dto/update-user.input';
import { User, UserDocument } from './models/user.model';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(USER_MODEL_NAME) private userModel: Model<UserDocument>,
    private jwtService: JwtService,
  ) {}

  private async hashPassword(password: string): Promise<string> {
    return hash(password, {
      hashLength: 14,
    });
  }

  private async comparePasswords(
    providedPassword: string,
    storedPassword: string,
  ): Promise<boolean> {
    return verify(storedPassword, providedPassword);
  }

  async getAllUsers(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async getUserById(id: string): Promise<User | null> {
    return this.userModel.findById(id).exec();
  }

  async addUserPrivilegesToUser(
    _id: string,
    privileges: UserPrivilege[],
  ): Promise<User | null> {
    const user = await this.userModel.findById(_id);
    if (!user) return null;

    user.privileges = [...user.privileges, ...privileges];
    await user.save();

    return user;
  }

  async removeUserPrivilegesFromUser(
    _id: string,
    removePrivilege: UserPrivilege,
  ): Promise<User | null> {
    const user = await this.userModel.findById(_id);
    if (!user) return null;

    user.privileges = user.privileges.filter(
      (privilege) => privilege !== removePrivilege,
    );
    await user.save();

    return user;
  }

  async register(data: RegisterInput): Promise<AuthResponseDto> {
    const existingUser = await this.userModel.findOne({
      email: data.email,
    });

    if (existingUser) {
      return {
        errors: [
          {
            field: 'email',
            message: 'User with this email already exists',
          },
        ],
      };
    }

    const hashedPassword = await this.hashPassword(data.password);

    const newUser = await this.userModel.create({
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      password: hashedPassword,
      avatar:
        data.avatar ??
        `https://avatars.dicebear.com/api/human/${data.firstName}-${data.lastName}.svg`,
    });

    await newUser.save();

    const payload = {
      userId: newUser.id,
      privileges: newUser.privileges,
    };

    const accessToken = this.jwtService.sign(payload);

    return {
      user: newUser,
      accessToken,
    };
  }

  async login(data: LoginInput): Promise<AuthResponseDto> {
    const user = await this.userModel.findOne({
      email: data.email,
    });

    if (!user) {
      return {
        errors: [
          {
            field: 'email',
            message: 'User with this email does not exist',
          },
        ],
      };
    }

    const isPasswordValid = await this.comparePasswords(
      data.password,
      user.password,
    );

    if (!isPasswordValid) {
      return {
        errors: [
          {
            field: 'password',
            message: 'Password is invalid',
          },
        ],
      };
    }

    const payload = {
      userId: user.id,
      privileges: user.privileges,
    };
    const accessToken = this.jwtService.sign(payload);

    return {
      user,
      accessToken,
    };
  }

  async me(ctx: MyCtx): Promise<User | null> {
    return ctx.req.user;
  }

  async updateMe(
    { req: { user } }: MyCtx,
    data: UpdateUserInput,
  ): Promise<User | null> {
    if (!user) return null;

    const updatedUser = await this.userModel.findByIdAndUpdate(
      user._id,
      {
        $set: data,
      },
      { new: true },
    );

    return updatedUser;
  }

  async deleteMe({ req: { user } }: MyCtx): Promise<boolean> {
    if (!user) return false;

    await this.userModel.findByIdAndDelete(user._id);

    return true;
  }
}
