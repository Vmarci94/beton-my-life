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
import { AuthService } from './service/auth/auth.service';


@Module({
  imports: [
    HttpModule,
    PassportModule,
    JwtModule.register({
        secret: jwtConstants.secret,
        signOptions: { expiresIn: '60s' }
      },
    )],
  controllers: [AppController, UserController, AuthController],
  providers: [AppService, UserService, UserRepository, EnvironmentService, AuthService],
})
export class AppModule {

  constructor(private environmentService: EnvironmentService) {
    firebase.initializeApp(firebaseConfig);
  }

}
