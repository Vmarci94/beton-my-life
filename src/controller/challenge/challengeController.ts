import { Body, Controller, Delete, Get, Param, Patch } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { ChallangeDto } from '../../model/DTO/challange/challange.dto';
import { ChallengeService } from '../../service/challenge/challenge.service';
import { UserDto } from '../../model/DTO/user/user.dto';
import { UserPatchDto } from '../../model/DTO/user/user-patch.dto';

@Controller('challenges')
@ApiTags('challenges')
export class ChallengeController {

  constructor(private readonly service: ChallengeService) {
  }

  @Get()
  @ApiResponse({ type: [ChallangeDto] })
  getAllChallanges(): Promise<ChallangeDto[]> {
    return this.service.getAllChallanges();
  }

  create(@Body() challangeDto: ChallangeDto ): Promise<ChallangeDto> {
    return this.service.create(challangeDto);
  }

  @Delete(':uuid')
  @ApiResponse({ type: [UserDto] })
  public delete(@Param('uuid') uuid: string): Promise<UserDto> {
    return this.service.delete(uuid);
  }

  @Patch(':uuid')
  @ApiResponse({ type: [UserDto] })
  public update(@Param('uuid') uuid: string, @Body() challangeDto: ChallangeDto): Promise<UserDto> {
    return this.service.update(uuid, challangeDto);
  }

}
