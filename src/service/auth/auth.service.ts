import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from '../../model/DTO/user/login.dto';
import { Response } from 'express';
import { UserDto } from '../../model/DTO/user/user.dto';
import { UserCreateDto } from '../../model/DTO/user/user-create.dto';
import { UserRepository } from '../../repository/user-repository';

@Injectable()
export class AuthService {

  constructor(
    private readonly jwtService: JwtService,
    private readonly userRepository: UserRepository,
  ) {

  }

  public login(loginDTO: LoginDto, response: Response): Promise<UserDto> {
    return this.userRepository.login(loginDTO).then((userDto: UserDto) => {
      response.set('Authorization', `Bearer ${this.jwtService.sign({ username: userDto.email, sub: userDto.id })}`);
      return userDto;
    });
  }

  public register(userDto: UserCreateDto): Promise<UserDto> {
    return this.userRepository.register(userDto);
  }

  getTokenPayloadFromHeader(request: Request): Payload {
    return this.jwtService.decode(request.headers.get('authorization').split(' ')[1]) as Payload;
  }

}
