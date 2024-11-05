/* eslint-disable prettier/prettier */
import { IsNumberString } from 'class-validator';
export class CreateUserDto {
  email: string;
  name: string;
  password: string;
}

export class GeUserByUserIdParamDTO {
  @IsNumberString()
  userId: number | string;
}
