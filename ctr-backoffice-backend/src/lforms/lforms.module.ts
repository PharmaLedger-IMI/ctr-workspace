import { Module } from '@nestjs/common';
import { LFormsController } from './lforms.controller';

@Module({
  imports: [],
  controllers: [LFormsController],
  providers: [],
})
export class LFormsModule { }
