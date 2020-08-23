import { HttpModule, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserController } from './controller/user/user.controller';
import { UserService } from './service/user/user.service';
import { AuthController } from './controller/auth/auth.controller';
import { UserRepository } from './repository/user-repository';
import { EnvironmentService } from './service/environment/environment.service';
import * as firebase from 'firebase/app';


@Module({
  imports: [HttpModule],
  controllers: [AppController, UserController, AuthController],
  providers: [AppService, UserService, UserRepository, EnvironmentService],
})
export class AppModule {

  constructor(private environmentService: EnvironmentService) {
    firebase.initializeApp(environmentService.getFirebaseConfig());
  }

}
