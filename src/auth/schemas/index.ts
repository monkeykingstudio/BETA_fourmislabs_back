/* eslint-disable prettier/prettier */
import mongoose from 'mongoose';
import { User } from './user.schema'
import { Role } from './role.schema'

mongoose.Promise = global.Promise;
export const db = {
  mongoose: mongoose,
  user: User,
  role: Role,
  ROLES: ["user", "admin", "moderator"]
};
