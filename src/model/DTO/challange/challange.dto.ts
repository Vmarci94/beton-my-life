import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsString } from 'class-validator';
import * as chance from 'chance';

export class ChallangeDto {

  @IsString()
  @ApiProperty({ type: String, example: 'gjkYnkUGSzS2SKzAJTsJGzkdgIC3' })
  id: string;

  @IsBoolean()
  @ApiProperty({ type: Boolean, example: true })
  isDeleted: boolean;

  @IsString()
  @ApiProperty({ type: String, example: 'gjkYnkUGSzS2SKzAJTsJGzkdgIC3' })
  author: string;

  @IsString()
  @ApiProperty({ type: String, example: 'orem Ipsum is simply dummy text of the printing and typesetting' })
  title: string;

  @IsString()
  @ApiProperty({ type: String, example: 'orem Ipsum is simply dummy text of the printing and typesetting' })
  description: string;

  @IsBoolean()
  @ApiProperty({ type: Boolean, example: true })
  isActive: boolean;

  @IsBoolean()
  @ApiProperty({ type: Date, example: Date.now() })
  endDate: Date;


  @IsBoolean()
  @ApiProperty({ type: Boolean, example: true })
  outcome: boolean;

  @IsString()
  @ApiProperty({ type: String})
  proofUrl: string;

}
