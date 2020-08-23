import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import { LoginDto } from '../DTO/user/login.dto';
import { UserCreateDto } from '../DTO/user/user-create.dto';
import { UserDto } from '../DTO/user/user.dto';
import { EnvironmentService } from '../service/environment/environment.service';
import { User } from 'firebase';
import UserCredential = firebase.auth.UserCredential;
import DataSnapshot = firebase.database.DataSnapshot;


@Injectable()
export class UserRepository {


  constructor(private environmentService: EnvironmentService) {
  }

  public async login(loginDTO: LoginDto): Promise<UserCreateDto> {
    try {
      const userCredential: UserCredential = await firebase.auth().signInWithEmailAndPassword(loginDTO.email, loginDTO.password);
      const dataSnapshot: Promise<DataSnapshot> = firebase.database().ref('users/' + userCredential.user.uid).once('value');
      return dataSnapshot.then((snapshot: DataSnapshot) => {
        return snapshot.val();
      });
    } catch (e) {
      console.error(e);
      throw new HttpException({
        status: HttpStatus.FORBIDDEN,
        error: e.message ? e.message : 'error',
      }, 403);
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

  updateUserById(uuid: string, userCreateDto: UserCreateDto): Promise<UserDto> {
    return firebase.database().ref('users/' + uuid).update(userCreateDto);
  }

  updateUserPasswordById(uuid: string, newPassword: string): Promise<void> {
    const currentUser: User = firebase.auth().currentUser;
    return currentUser.updatePassword(newPassword);
  }

}
