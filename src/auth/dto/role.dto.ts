import { IsString, MaxLength } from 'class-validator';

export class RoleDto {
  @IsString()
  @MaxLength(25)
  name: string;
}
