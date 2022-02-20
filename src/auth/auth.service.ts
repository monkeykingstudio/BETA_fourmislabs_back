/* eslint-disable prettier/prettier */
import { ConflictException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { ObjectId } from 'mongodb';
import { Model } from 'mongoose';

import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { Role } from './interfaces/role.interface';
import { User } from './interfaces/user.interface';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel('User') private userModel: Model<User>,
    @InjectModel('Role') private roleModel: Model<Role>,
    private jwtService: JwtService,
  ) {
    this.roleModel.estimatedDocumentCount((err, count) => {
      if (!err && count === 0) {
        new this.roleModel({
          name: 'user',
        }).save((err) => {
          if (err) {
            console.log('error', err);
          }
          console.log("added 'user' to roles collection");
        });
        new this.roleModel({
          name: 'moderator',
        }).save((err) => {
          if (err) {
            console.log('error', err);
          }
          console.log("added 'moderator' to roles collection");
        });
        new this.roleModel({
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

    const user = new this.userModel({
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
    const payload = { username: user.username, sub: user._id };
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }

  // Validate User by comparing req pass and database password with bcrypt
  async validateUser(username: string, pass: string): Promise<User> {
    const user = await this.userModel.findOne({ username });

    if (!user) {
      return null;
    }

    const valid = await bcrypt.compare(pass, user.password);

    if (valid) {
      return user;
    }

    return null;
  }

  async setDefaultRole(user: User): Promise<any>{
    this.roleModel.findOne({ name: "user" },
    (err, role: Role) => {
      if (err) {
        console.log(err.message);
        return;
      }
      user.roles = role._id;
      user.save(err => {
        if (err) {
          console.log(err.message);
          return;
        }
      });
    });
  }
}
