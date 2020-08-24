import { Body, Controller, DefaultValuePipe, Get, Param, ParseBoolPipe, Patch, Query, UseGuards } from '@nestjs/common';
import { UserService } from '../../service/user/user.service';
import { UserDto } from '../../model/DTO/user/user.dto';
import { UserPatchDto } from '../../model/DTO/user/user-patch.dto';
import { JwtAuthGuard } from '../../jwt/jwt-auth.guard';

@Controller('users')
export class UserController {

  constructor(private userService: UserService) {
  }

  @UseGuards(JwtAuthGuard)
  @Get('')
  public getAllUser(@Query('showDeleted', new DefaultValuePipe(false), ParseBoolPipe)
                      showDeleted: boolean): Promise<UserDto[]> {
    return this.userService.getAllUser(showDeleted);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':uuid')
  public getUserById(@Param('uuid') uuid: string): Promise<UserDto> {
    return this.userService.getUserById(uuid);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':uuid')
  public updateUserById(@Param('uuid') uuid: string, @Body() userPatchDto: UserPatchDto): Promise<UserDto> {
    return this.userService.updateUserById(uuid, userPatchDto);
  }


}