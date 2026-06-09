import { Context, SlashCommand } from 'necord';
import { Injectable } from '@nestjs/common';
import { ChatInputCommandInteraction, EmbedBuilder } from 'discord.js';

@Injectable()
export class AvatarCommand {
  @SlashCommand({
    name: 'avatar',
    description: 'Display your avatar',
  })
  public async avatar(
    @Context() [interaction]: [ChatInputCommandInteraction],
  ) {
    const embed = new EmbedBuilder()
      .setTitle(`${interaction.user.username}'s Avatar`)
      .setImage(interaction.user.displayAvatarURL({ size: 1024 }));

    return interaction.reply({
      embeds: [embed],
    });
  }
}