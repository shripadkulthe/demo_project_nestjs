import { Context, SlashCommand } from 'necord';
import { Injectable } from '@nestjs/common';
import { ChatInputCommandInteraction, EmbedBuilder } from 'discord.js';
import { DiscordService } from '../discord.service';

@Injectable()
export class ServerInfoCommand {
  constructor(private readonly discordService: DiscordService) {}

  @SlashCommand({
    name: 'serverinfo',
    description: 'Get information about the server',
  })
  public async serverInfo(
    @Context() [interaction]: [ChatInputCommandInteraction],
  ) {
    const guild = interaction.guild;

    if (!guild) {
      return interaction.reply('Server information not available.');
    }

    const info = this.discordService.getServerInfo(guild);

    const embed = new EmbedBuilder()
      .setTitle('Server Information')
      .addFields(
        { name: 'Server Name', value: info.name },
        { name: 'Members', value: info.memberCount.toString() },
        {
          name: 'Created',
          value: info.createdAt.toDateString(),
        },
      );

    return interaction.reply({
      embeds: [embed],
    });
  }
}