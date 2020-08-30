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

  create(challangeDto: ChallangeDto) {
    return Promise.resolve(undefined);
  }

  delete(uuid: string) {
    return Promise.resolve(undefined);
  }

  update(uuid: string, userPatchDto: any) {
    return Promise.resolve(undefined);
  }
}
