import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppResourceController } from './appresource.controller';
import { AppUserService } from './appuser.service';
import { ClinicalSiteController } from './clinicalsite.controller';
import { LocaleController } from './locale.controller';
import { SponsorController } from './sponsor.controller';

@Module({
  imports: [TypeOrmModule.forRoot()],
  controllers: [AppResourceController,ClinicalSiteController,LocaleController,SponsorController],
  providers: [AppUserService],
  exports: [AppUserService],
})
export class CTrialModule {}
