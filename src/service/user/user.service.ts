import { Injectable } from '@nestjs/common';
import { UserRepository } from '../../repository/user-repository';
import { UserCreateDto } from '../../model/DTO/user/user-create.dto';
import { LoginDto } from '../../model/DTO/user/login.dto';
import { UserDto } from '../../model/DTO/user/user.dto';
import { UserPatchDto } from '../../model/DTO/user/user-patch.dto';
import { JwtService } from '@nestjs/jwt';
import DataSnapshot = firebase.database.DataSnapshot;
import { Response } from 'express';

@Injectable()
export class UserService {

  constructor(private readonly userRepository: UserRepository, private readonly jwtService: JwtService) {
  }

  public login(loginDTO: LoginDto, response: Response): Promise<UserDto> {
    return this.userRepository.login(loginDTO).then((userDto: UserDto) => {
      response.set("Authorization", `Bearer ${this.jwtService.sign({username: userDto.email, sub: userDto.id})}`);
      return userDto;
    })
  }

  public register(userDto: UserCreateDto): Promise<UserDto> {
    return this.userRepository.register(userDto);
  }


  getAllUser(showDeleted: boolean): Promise<UserDto[]> {
    return this.userRepository.getAllUser(showDeleted);
  }

  getUserById(uuid: string): Promise<UserDto> {
    return this.userRepository.getUserById(uuid)
      .then((dataSnapshot: DataSnapshot) => {
        return dataSnapshot.val();
      })
      .catch(e => e);
  }

  async updateUserById(uuid: string, userPatchDto: UserPatchDto): Promise<UserDto> {
    return this.userRepository.updateUserById(uuid, userPatchDto);
  }

}
