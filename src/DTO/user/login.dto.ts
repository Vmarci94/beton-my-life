import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';

export class LoginDto {

  @ApiProperty()
  public email: string;

  @ApiProperty()
  @Exclude()
  public password: string;
}
