import {
  Body,
  Controller,
  DefaultValuePipe,
  Delete,
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
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@UseGuards(JwtAuthGuard)
@Controller('users')
@ApiTags('users')
export class UserController {

  constructor(
    private readonly userService: UserService,
  ) {
  }

  @Get()
  @ApiResponse({ type: [UserDto] })
  public getAllUser(
    @Query('showDeleted', new DefaultValuePipe(false), ParseBoolPipe) showDeleted: boolean,
  ): Promise<UserDto[]> {
    return this.userService.getAllUser(showDeleted);
  }

  @Get(':uuid')
  @ApiResponse({ type: [UserDto] })
  public getUserById(@Param('uuid') uuid: string): Promise<UserDto> {
    return this.userService.getUserById(uuid);
  }

  @Patch(':uuid')
  @ApiResponse({ type: [UserDto] })
  public updateUserById(@Param('uuid') uuid: string, @Body() userPatchDto: UserPatchDto): Promise<UserDto> {
    return this.userService.updateUserById(uuid, userPatchDto);
  }

  @Delete(':uuid')
  @ApiResponse({ type: [UserDto] })
  public deleteUserById(@Param('uuid') uuid: string): Promise<UserDto> {
    return this.userService.deleteUserById(uuid);
  }


}
