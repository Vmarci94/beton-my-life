import { UserCreateDto } from './user-create.dto';
import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class UserPatchDto extends PartialType(UserCreateDto){

  @ApiProperty()
  @IsNotEmpty()
  newPassword: string;

}
