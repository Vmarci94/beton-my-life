import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { UserService } from '../../service/user/user.service';
import { LoginDto } from '../../model/DTO/user/login.dto';
import { UserCreateDto } from '../../model/DTO/user/user-create.dto';
import { UserDto } from '../../model/DTO/user/user.dto';
import { Response } from 'express';

@Controller('auth')
export class AuthController {

  constructor(private userService: UserService) {
  }

  @Post('login')
  public async login(@Res() response: Response, @Body() loginDTO: LoginDto) {
    const userDto: UserDto = await this.userService.login(loginDTO, response);
    response.status(HttpStatus.OK).json(userDto);
  }

  @Post('register')
  public register(@Body() userDto: UserCreateDto): Promise<UserDto> {
    return this.userService.register(userDto);
  }


}
