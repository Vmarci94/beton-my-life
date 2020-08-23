import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from '../../service/user/user.service';
import { LoginDto } from '../../DTO/user/login.dto';
import { UserCreateDto } from '../../DTO/user/user-create.dto';
import { UserDto } from '../../DTO/user/user.dto';

@Controller('auth')
export class AuthController {

  constructor(private userService: UserService) {
  }

  @Post('login')
  public login(@Body() loginDTO: LoginDto): Promise<UserCreateDto> {
    return this.userService.login(loginDTO);
  }

  @Post('register')
  public register(@Body() userDto: UserCreateDto): Promise<UserDto> {
    return this.userService.register(userDto);
  }


}
