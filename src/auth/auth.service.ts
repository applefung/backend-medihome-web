import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { TokenRecord } from '@src/entities';
import { PatientUsersService } from '@src/patient-users/patient-users.service';
import type { AccessTokenPayload, Role, Token } from '@src/types/auth.d';
import { TokenType } from '@src/utils/auth';
import { getResponseByErrorCode } from '@src/utils/error';
import { randomBytes } from 'crypto';
import dayjs from 'dayjs';
import { JwtPayload } from 'jsonwebtoken';
import { MoreThanOrEqual, Repository } from 'typeorm';

interface LoginParams {
  email: string;
  password: string;
  role: Role;
}

const ACCESS_TOKEN_EXPIRES_IN = dayjs().add(5, 'm').diff(); // Milliseconds of 5 mins
const REFRESH_TOKEN_EXPIRES_IN = dayjs().add(24, 'h').diff(); // Milliseconds of 24 hours
const RESET_PASSWORD_TOKEN_EXPIRES_IN = dayjs().add(1, 'h').diff(); // Milliseconds of 1 hours

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(TokenRecord)
    private tokenRecordRepository: Repository<TokenRecord>,
    private patientUserService: PatientUsersService,
    private jwtService: JwtService,
  ) {}

  async login({ email, password, role }: LoginParams) {
    let memberResult;
    if (role === 'patient') {
      memberResult = await this.patientUserService.getPatientUserOrFail({
        email,
        password,
      });
    }

    const { token: accessToken, expireAt: accessTokenExpireAt } =
      this.signAccessToken({
        id: memberResult.id,
        role: 'patient',
      });

    const { token: refreshToken, expireAt: refreshTokenExpireAt } =
      await this.signToken(memberResult.id, 'REFRESH');

    return {
      accessToken,
      accessTokenExpireAt,
      refreshToken,
      refreshTokenExpireAt,
    };
  }

  signAccessToken(payload: AccessTokenPayload) {
    return {
      token: this.jwtService.sign(payload, {
        expiresIn: `${ACCESS_TOKEN_EXPIRES_IN}ms`,
      }),
      expireAt: dayjs().add(ACCESS_TOKEN_EXPIRES_IN).toISOString(),
    };
  }

  async signToken(id: string, type: TokenRecord['type']) {
    const tokenRecord = this.tokenRecordRepository.create({
      type,
      id,
      token: randomBytes(16).toString('hex'),
      expireAt: dayjs()
        .add(
          type === 'REFRESH'
            ? REFRESH_TOKEN_EXPIRES_IN
            : RESET_PASSWORD_TOKEN_EXPIRES_IN,
        )
        .toDate(),
    });

    await this.tokenRecordRepository.save(tokenRecord);

    return {
      token: tokenRecord.token,
      expireAt: tokenRecord.expireAt.toISOString(),
    };
  }

  async logout({ refreshToken }: Record<'refreshToken', string>) {
    const tokenRecord = await this.tokenRecordRepository.findOne({
      token: refreshToken,
      type: 'REFRESH',
    });
    if (!tokenRecord) {
      throw new UnauthorizedException(
        getResponseByErrorCode('TOKEN_NOT_FOUND'),
      );
    }
    await this.tokenRecordRepository.softDelete({ token: refreshToken });
  }

  async resetPassword({
    token,
    password,
  }: Record<'token' | 'password', string>) {
    const tokenRecord = await this.getTokenOrFail({
      token,
      type: 'RESET_PASSWORD',
    });
    await this.patientUserService.updatePassword(tokenRecord.id, password);
  }

  async getTokenOrFail({
    token,
    type,
  }: Record<'token', string> & Record<'type', Token>) {
    const tokenRecord = await this.tokenRecordRepository.findOne({
      token,
      type,
      expireAt: MoreThanOrEqual(new Date()),
    });

    if (!tokenRecord) {
      throw new UnauthorizedException(
        getResponseByErrorCode('TOKEN_NOT_FOUND'),
      );
    }

    if (tokenRecord.expireAt < new Date()) {
      throw new UnauthorizedException(getResponseByErrorCode('TOKEN_EXPIRED'));
    }

    return tokenRecord;
  }

  async refreshAccessToken({
    accessToken: currentAccessToken,
    refreshToken,
  }: Record<'accessToken' | 'refreshToken', string>) {
    const { id, role } = this.jwtService.decode(
      currentAccessToken,
    ) as AccessTokenPayload & JwtPayload;

    await this.getTokenOrFail({
      token: refreshToken,
      type: 'REFRESH',
    });

    const { token: accessToken, expireAt: accessTokenExpireAt } =
      this.signAccessToken({ id, role });

    return { accessToken, accessTokenExpireAt };
  }
}
