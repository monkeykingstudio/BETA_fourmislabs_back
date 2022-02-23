/* eslint-disable prettier/prettier */
import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

import { Role } from './interfaces/role.interface';
import { User } from './interfaces/user.interface';

@Injectable()
export class AuthService {
  userRoles: string[] = [];

  constructor(
    @InjectModel('User') private UserModel: Model<User>,
    @InjectModel('Role') private RoleModel: Model<Role>,
    private jwtService: JwtService,
  ) {
    // Initialize mongoDb Roles collection
    this.RoleModel.estimatedDocumentCount((err, count) => {
      if (!err && count === 0) {
        new this.RoleModel({
          name: 'user',
        }).save((err) => {
          if (err) {
            console.log('error', err);
          }
          console.log("added 'user' to roles collection");
        });
        new this.RoleModel({
          name: 'moderator',
        }).save((err) => {
          if (err) {
            console.log('error', err);
          }
          console.log("added 'moderator' to roles collection");
        });
        new this.RoleModel({
          name: 'admin',
        }).save((err) => {
          if (err) {
            console.log('error', err);
          }
          console.log("added 'admin' to roles collection");
        });
      }
    });
  }

  async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    const { username, password, email } = authCredentialsDto;
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new this.UserModel({
      username,
      email,
      password: hashedPassword,
    });

    try {
      user.save((err, user) => {
        if (err) {
          console.log(err.message);
        }
        this.setDefaultRole(user);
      });
    } catch (error) {
      if (error.code === 11000) {
        throw new ConflictException('User already exists');
      }
      throw error;
    }
  }

  async signIn(user: User) {
    const userRoles: string[] = [];
    const payload = {
        username: user.username,
        sub: user._id,
        roles: user.roles
    };
    try {
        const data: User = await this.UserModel.findOne({
            username: user.username
        })
        .populate("roles", "name")
        .exec();
        for (let i = 0; i < data.roles.length; i++) {
            const role: string = data.roles[i]['name']
            userRoles.push("ROLE_" + role.toUpperCase());
        }

        console.log('user roles: ', userRoles);
    } catch (error) {
        if (error.code === 404) {
            throw new NotFoundException('User Not found');
        }
        throw error;
    }
    return {
        accessToken: this.jwtService.sign(payload),
        userId: user._id,
        email: user.email,
        username: user.username,
        roles: userRoles
    };
  }

  // Validate User by comparing req pass and database password with bcrypt
  async validateUser(username: string, pass: string): Promise<User> {
    const user = await this.UserModel.findOne({ username });

    if (!user) {
      return null;
    }

    const valid = await bcrypt.compare(pass, user.password);

    if (valid) {
      return user;
    }

    return null;
  }

  // Set default role 'user._id' from Roles collection
  setDefaultRole(user: User): any{
    this.RoleModel.findOne({ name: "user" },
    (err, role: Role) => {
      if (!user) {
        return;
      }
      user.roles = role._id;
        user.save((err, user) => {
          if (err) {
            console.log(err.message);
            return;
          }
          return user;
        });
    });
  }
}
