import { Controller, Get } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { ChallangeDto } from '../../model/DTO/challange/challange.dto';
import { ChallengeService } from '../../service/challenge/challenge.service';

@Controller('challenges')
@ApiTags('challenges')
export class ChallengeController {

  constructor(private readonly challengeService: ChallengeService) {
  }

  @Get()
  @ApiResponse({ type: [ChallangeDto] })
  getAllChallanges(): Promise<ChallangeDto[]> {
    return this.challengeService.getAllChallanges();
  }

}
