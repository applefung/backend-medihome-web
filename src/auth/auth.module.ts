import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TokenRecord } from '@src/entities';
import { PatientUsersModule } from '@src/patient-users/patient-users.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([TokenRecord]),
    PatientUsersModule,
    {
      ...JwtModule.registerAsync({
        useFactory: (configService: ConfigService) => ({
          secret: configService.get('SECRET'),
        }),
        inject: [ConfigService],
      }),
      global: true,
    },
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
