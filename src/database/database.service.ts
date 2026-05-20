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
}
