/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable prettier/prettier */
import { Injectable, CanActivate, ExecutionContext, ConsoleLogger } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Role } from '../auth/interfaces/role.interface';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    @InjectModel('Role') private RoleModel: Model<Role>,
  ) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
      const userRoles: string[] = [];
      let accessRoleId = '';
      let isAuthorized = false;
      const accessRole = this.reflector.get<string[]>('roles', context.getHandler());

      if (!accessRole) {
        return true;
      }
      const request = context.switchToHttp().getRequest();
      const user = request.user;

      for (let i = 0; i < user.roles.length; i++) {
        const role: string = user.roles[i]
        userRoles.push(role);
      }

      try {
        const role = await this.RoleModel.findOne({ 'name': accessRole });
        accessRoleId = role._id.valueOf();
      }
      catch(err) {
        throw err;
      }

      if (userRoles.includes(accessRoleId)) {
        isAuthorized = true;
      }
      else {
        isAuthorized = false;
      }
      return isAuthorized && user;
  }
}
