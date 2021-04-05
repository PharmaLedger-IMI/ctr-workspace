import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppResourceController } from './appresource.controller';
import { AppUserService } from './appuser.service';
import { ClinicalSiteController } from './clinicalsite.controller';
import { LocaleController } from './locale.controller';

@Module({
  imports: [TypeOrmModule.forRoot()],
  controllers: [AppResourceController,ClinicalSiteController,LocaleController],
  providers: [AppUserService],
  exports: [AppUserService],
})
export class CTrialModule {}
