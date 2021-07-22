import { Test, TestingModule } from '@nestjs/testing';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { CTrialModule } from '../ctrial/ctrial.module';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller';
import { LocalStrategy } from './local.strategy';
import { JwtStrategy } from './jwt.strategy';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        CTrialModule,
        PassportModule,
        JwtModule.register({
           secret: 'a-secret-that-should-be-moved-to-a-config-in-db',
           signOptions: { expiresIn: '120s' },
        })
      ],
      controllers: [AuthController],
      providers: [AuthService, LocalStrategy, JwtStrategy],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('tbd', () => {
    expect(service).toBeDefined();
  });
});
