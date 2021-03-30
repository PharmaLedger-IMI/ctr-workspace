import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppResourceController } from './appresource.controller';
import { LocaleController } from './locale.controller';
import { AppUserService } from './appuser.service';

@Module({
  imports: [TypeOrmModule.forRoot()],
  controllers: [AppResourceController,LocaleController],
  providers: [AppUserService],
  exports: [AppUserService],
})
export class CTrialModule {}