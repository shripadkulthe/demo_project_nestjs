import { Injectable } from '@nestjs/common';

export interface DatabaseOptions {
  type: string;
  host: string;
  port: number;
  username: string;
  password: string;
  database: string;
}

@Injectable()
export class DatabaseService {
  private options: DatabaseOptions;
  private refreshTokens = new Map<number, string>();
  private resetPasswordTokens = new Map<
    string,
    {
      userId: number;
      expires: Date;
    }
  >();

  private emailVerificationTokens = new Map<
    string,
    {
      userId: number;
      expires: Date;
    }
  >();

  constructor(options: DatabaseOptions) {
    this.options = options;
  }

  getConnectionInfo() {
    return {
      message: `Connected to ${this.options.type} database`,
      host: this.options.host,
      port: this.options.port,
      database: this.options.database,
      user: this.options.username,
    };
  }
  saveRefreshToken(userId: number, token: string) {
    this.refreshTokens.set(userId, token);
  }

  getRefreshToken(userId: number) {
    return this.refreshTokens.get(userId);
  }

  removeRefreshToken(userId: number) {
    this.refreshTokens.delete(userId);
  }
  saveResetPasswordToken(userId: number, token: string, expires: Date) {
    this.resetPasswordTokens.set(token, {
      userId,
      expires,
    });
  }

  getResetPasswordToken(token: string) {
    return this.resetPasswordTokens.get(token);
  }

  removeResetPasswordToken(token: string) {
    this.resetPasswordTokens.delete(token);
  }

  saveEmailVerificationToken(userId: number, token: string, expires: Date) {
    this.emailVerificationTokens.set(token, {
      userId,
      expires,
    });
  }

  getEmailVerificationToken(token: string) {
    return this.emailVerificationTokens.get(token);
  }

  removeEmailVerificationToken(token: string) {
    this.emailVerificationTokens.delete(token);
  }
}
