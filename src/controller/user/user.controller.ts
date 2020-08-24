import {
  Body,
  Controller,
  DefaultValuePipe,
  Get,
  Param,
  ParseBoolPipe,
  Patch,
  Query,
  UseGuards,
} from '@nestjs/common';
import { UserService } from '../../service/user/user.service';
import { UserDto } from '../../model/DTO/user/user.dto';
import { UserPatchDto } from '../../model/DTO/user/user-patch.dto';
import { JwtAuthGuard } from '../../jwt/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('users')
export class UserController {

  constructor(
    private readonly userService: UserService,
  ) {
  }

  @Get('')
  public getAllUser(
    @Query('showDeleted', new DefaultValuePipe(false), ParseBoolPipe) showDeleted: boolean,
  ): Promise<UserDto[]> {
    return this.userService.getAllUser(showDeleted);
  }

  @Get(':uuid')
  public getUserById(@Param('uuid') uuid: string): Promise<UserDto> {
    return this.userService.getUserById(uuid);
  }

  @Patch(':uuid')
  public updateUserById(@Param('uuid') uuid: string, @Body() userPatchDto: UserPatchDto): Promise<UserDto> {
    return this.userService.updateUserById(uuid, userPatchDto);
  }


}
