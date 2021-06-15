import { Module } from '@nestjs/common';
import { MatchController } from './match.controller';
import { MatchService } from './match.service';

@Module({
  imports: [],
  controllers: [MatchController],
  providers: [MatchService],
})
export class CtrmsModule { }
