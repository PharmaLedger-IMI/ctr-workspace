import { Module } from '@nestjs/common';
import { LFormsController } from './lforms.controller';
import { LFormsService } from './lforms.service';

@Module({
  imports: [],
  controllers: [LFormsController],
  providers: [LFormsService],
})
export class LFormsModule { }
