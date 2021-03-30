import { Module } from '@nestjs/common';
import { CTrialModule } from './ctrial/ctrial.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [CTrialModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
