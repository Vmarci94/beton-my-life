import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { Token } from '../../model/DTO/token';
import { Payload } from '../../model/payload';

@Injectable()
export class AuthService {

  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {
  }



  async createJwtToken(payload: Payload): Promise<Token> {
    return { access_token: this.jwtService.sign(payload) } as Token;
  }


}
