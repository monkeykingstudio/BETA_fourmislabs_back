import mongoose from 'mongoose';

import { User } from './user.schema';

mongoose.Promise = global.Promise;
export const db = {
  mongoose: mongoose,
  user: User,
  ROLES: ['user', 'admin', 'moderator'],
};
