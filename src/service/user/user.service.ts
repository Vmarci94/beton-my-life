import { Injectable } from '@nestjs/common';
import { UserRepository } from '../../repository/user-repository';
import { UserDto } from '../../model/DTO/user/user.dto';
import { UserPatchDto } from '../../model/DTO/user/user-patch.dto';
import DataSnapshot = firebase.database.DataSnapshot;

@Injectable()
export class UserService {

  constructor(private readonly userRepository: UserRepository) {
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
