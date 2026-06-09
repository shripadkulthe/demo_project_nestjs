import { Context, SlashCommand } from 'necord';
import { Injectable } from '@nestjs/common';
import { ChatInputCommandInteraction, EmbedBuilder } from 'discord.js';

@Injectable()
export class UserInfoCommand {

  @SlashCommand({
    name: 'userinfo',
    description: 'Get information about yourself',
  })
  public async userInfo(
    @Context() [interaction]: [ChatInputCommandInteraction],
  ): Promise<void> {
    const user = await interaction.user.fetch(); // Ensures all fields are populated

    const embed = new EmbedBuilder()
      .setTitle('User Information')
      .setThumbnail(user.displayAvatarURL({ size: 256 }))
      .setColor(0x5865f2)
      .addFields(
        { name: 'Username', value: user.username, inline: true },
        { name: 'User ID', value: user.id, inline: true },
        { name: 'Account Created', value: user.createdAt.toDateString(), inline: false },
      )
      .setTimestamp();

    await interaction.reply({
      embeds: [embed],
      ephemeral: true,
    });
  }
}