import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { RoleDto } from 'src/auth/dto/role.dto';
import { RoleDocument } from 'src/auth/schemas/role.schema';

@Injectable()
export class SeederService {
  constructor(@InjectModel('Role') private roleModel: Model<RoleDocument>) {}

  async seed() {
    const count = await this.roleModel.estimatedDocumentCount().exec();
    console.log('object count', count);
    if (count === 0) {
      const roles: Array<RoleDto> = [
        {
          name: 'user',
        },
        {
          name: 'moderator',
        },
        {
          name: 'admin',
        },
      ];
      await this.roleModel.insertMany(roles);
      console.log('3 roles created');
    }
  }
}
