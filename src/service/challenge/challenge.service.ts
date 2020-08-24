import { Injectable } from '@nestjs/common';
import { ChallangeDto } from '../../model/DTO/challange/challange.dto';
import { ChallengeRepository } from '../../repository/challenge-repository';

@Injectable()
export class ChallengeService {

  constructor(private readonly challengeRepository: ChallengeRepository) {

  }

  getAllChallanges(): Promise<ChallangeDto[]> {
    return this.challengeRepository.getAllChallanges();
  }
}
