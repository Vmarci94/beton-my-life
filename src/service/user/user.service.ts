import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserRepository } from '../../repository/user-repository';
import { UserCreateDto } from '../../DTO/user/user-create.dto';
import { LoginDto } from '../../DTO/user/login.dto';
import { UserDto } from '../../DTO/user/user.dto';
import { UserPatchDto } from '../../DTO/user/user-patch.dto';
import DataSnapshot = firebase.database.DataSnapshot;

@Injectable()
export class UserService {

  constructor(private userRepository: UserRepository) {
  }

  public login(loginDTO: LoginDto): Promise<UserCreateDto> {
    return this.userRepository.login(loginDTO);
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
    const user: UserCreateDto = (await this.userRepository.getUserById(uuid)).val();
    if (user.password === userPatchDto.password) {
      try {
        await this.userRepository.updateUserPasswordById(uuid, userPatchDto.newPassword);
        // @ts-ignore
        return this.userRepository.updateUserById(uuid, userPatchDto);
      } catch (e) {
        throw new HttpException({
          status: HttpStatus.FORBIDDEN,
          error: 'error',
        }, 403);
      }
    } else {
      throw new HttpException({
        status: HttpStatus.FORBIDDEN,
        error: 'wrong password!',
      }, 403);
    }
  }
}
