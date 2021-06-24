import { Module } from '@nestjs/common';
import { CTrialModule } from './ctrial/ctrial.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { CtrmsModule } from './ctrms/ctrms.module';
import { LFormsModule } from './lforms/lforms.module';

@Module({
  imports: [CTrialModule, AuthModule, CtrmsModule, LFormsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
