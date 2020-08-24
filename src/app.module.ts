import { HttpModule, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserController } from './controller/user/user.controller';
import { UserService } from './service/user/user.service';
import { AuthController } from './controller/auth/auth.controller';
import { UserRepository } from './repository/user-repository';
import * as firebase from 'firebase/app';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { firebaseConfig, jwtConstants } from './utils/constants';
import { JwtStrategy } from './jwt/jwt-strategy';
import { AuthService } from './service/auth/auth.service';
import { ChallengeController } from './controller/challenge/challengeController';
import { ChallengeService } from './service/challenge/challenge.service';
import { ChallengeRepository } from './repository/challenge-repository';


@Module({
  imports: [
    HttpModule,
    PassportModule,
    JwtModule.register({
        secret: jwtConstants.secret,
        signOptions: { expiresIn: '300s' }, //300s = 5min
      },
    )],
  controllers: [AppController, UserController, AuthController, ChallengeController],
  providers: [AppService, UserService, UserRepository, JwtStrategy, AuthService, ChallengeService, ChallengeRepository],
})
export class AppModule {

  constructor() {
    firebase.initializeApp(firebaseConfig);
  }

}
