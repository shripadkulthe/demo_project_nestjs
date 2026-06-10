import { Injectable } from '@nestjs/common';
import { GuildMember } from 'discord.js';

@Injectable()
export class DiscordService {
  async kickMember(member: GuildMember, reason?: string) {
    await member.kick(reason ?? 'No reason provided');
  }

  async banMember(member: GuildMember, reason?: string) {
    await member.ban({
      reason: reason ?? 'No reason provided',
    });
  }
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