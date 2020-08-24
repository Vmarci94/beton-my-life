import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import { LoginDto } from '../model/DTO/user/login.dto';
import { UserCreateDto } from '../model/DTO/user/user-create.dto';
import { UserDto } from '../model/DTO/user/user.dto';
import { UserPatchDto } from '../model/DTO/user/user-patch.dto';
import UserCredential = firebase.auth.UserCredential;
import DataSnapshot = firebase.database.DataSnapshot;


@Injectable()
export class UserRepository {

  public async login(loginDTO: LoginDto): Promise<UserDto> {
    try {
      const userCredential: UserCredential = await firebase.auth().signInWithEmailAndPassword(loginDTO.email, loginDTO.password);
      return this.getUserById(userCredential.user.uid).then((snapshot: DataSnapshot) => {
        if (snapshot.exists()) {
          const userDto: UserDto = snapshot.val();
          if(!userDto.isDeleted){
            return userDto;
          }
        }
        throw new HttpException({
          error: 'User does not exist or has been deleted.',
        }, HttpStatus.FORBIDDEN);
      });
    } catch (e) {
      console.error(e);
      throw new HttpException({
        error: e.message ? e.message : 'error',
      }, HttpStatus.FORBIDDEN);
    }
  }

  public async register(userCreateDto: UserCreateDto): Promise<UserDto> {
    return firebase.auth().createUserWithEmailAndPassword(userCreateDto.email, userCreateDto.password)
      .then((userCredential: UserCredential) => {
        if (userCredential.user?.uid) {
          const newUser: UserDto = { ...{ id: userCredential.user.uid, isDeleted: false }, ...userCreateDto };
          firebase.database().ref('users/' + userCredential.user.uid).set(newUser);
          return newUser;
        }
        return undefined;
      })
      .catch(e => e);
  }

  getAllUser(showDeleted: boolean): Promise<UserDto[]> {
    return firebase.database().ref('users').once('value')
      .then((dataSnapshot: DataSnapshot) => {
        return Object.values(dataSnapshot.val())
          .filter((value: UserDto) => value.isDeleted === showDeleted || showDeleted)
          .map(value => value as UserDto);
      })
      .catch(e => e);
  }

  getUserById(uuid: string): Promise<DataSnapshot> {
    return firebase.database().ref('users/' + uuid).once('value');
  }

  async updateUserById(uuid: string, userPatchDto: UserPatchDto): Promise<UserDto> {
    await firebase.auth().signOut();
    const snapshot: DataSnapshot = await this.getUserById(uuid);
    try {
      const user = snapshot.val();
      const userCredential: UserCredential = await firebase.auth().signInWithEmailAndPassword(user.email, user.password);
      await userCredential.user.updateEmail(userPatchDto.email);
      await userCredential.user.updatePassword(userPatchDto.newPassword);
      const { newPassword, ...userCreateDto } = userPatchDto;
      userCreateDto.password = newPassword;
      await snapshot.ref.update(userCreateDto);
    } catch (e) {
      throw new HttpException({
        error: e.message,
      }, HttpStatus.FORBIDDEN);
    }
    return this.getUserById(uuid).then((snapshot: DataSnapshot) => {
      const { password, ...userDto } = snapshot.val();
      return userDto as UserDto;
    });
  }

}
