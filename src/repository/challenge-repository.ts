import { HttpService, Injectable } from '@nestjs/common';
import { ChallangeDto } from '../model/DTO/challange/challange.dto';
import { challlengeDbUrl } from '../utils/constants';

@Injectable()
export class ChallengeRepository {

  constructor(private readonly httpService: HttpService) {
  }

  getAllChallanges(): Promise<ChallangeDto[]> {
    // TODO: fixme
    this.httpService.get<ChallangeDto[]>(challlengeDbUrl + '.json')
      .toPromise()
      .then(({ data }) => {
        return Object.values(data);
      });
    return Promise.resolve([]);
  }
  //
  // cerateNewChallange(challangeDto: ChallangeDto): Promise<ChallangeDto> {
  //
  // }


}



