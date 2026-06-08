import { Injectable } from '@nestjs/common';
import { Context, SlashCommand } from 'necord';
import { ChatInputCommandInteraction } from 'discord.js';

@Injectable()
export class PingCommand {
  @SlashCommand({
    name: 'ping',
    description: 'Replies with Pong!',
  })
  public async onPing(
    @Context() [interaction]: [ChatInputCommandInteraction],
  ) {
    await interaction.reply('🏓 Pong!');
  }
}