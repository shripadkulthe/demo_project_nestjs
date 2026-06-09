import { Injectable } from '@nestjs/common';

@Injectable()
export class DiscordService {
  getUserInfo(user: any) {
    return {
      username: user.username,
      id: user.id,
      createdAt: user.createdAt,
    };
  }

  getServerInfo(guild: any) {
    return {
      name: guild.name,
      memberCount: guild.memberCount,
      createdAt: guild.createdAt,
    };
  }

  getAvatar(user: any) {
    return user.displayAvatarURL();
  }
}