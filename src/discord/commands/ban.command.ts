import { Injectable } from '@nestjs/common';
import { Context, Options, SlashCommand } from 'necord';
import type { SlashCommandContext } from 'necord';
import { EmbedBuilder, PermissionFlagsBits } from 'discord.js';
import type { GuildMember } from 'discord.js';
import { DiscordService } from '../discord.service';
import { BanDto } from '../dto/ban.dto';

@Injectable()
export class BanCommand {
  constructor(
    private readonly discordService: DiscordService,
  ) {}

  @SlashCommand({
    name: 'ban',
    description: 'Ban a member from the server',
    defaultMemberPermissions: PermissionFlagsBits.BanMembers,
  })
  public async ban(
    @Context() [interaction]: SlashCommandContext,
    @Options() { user, reason }: BanDto,
  ) {
    try {
      const member = (await interaction.guild?.members.fetch(
        user.id,
      )) as GuildMember;

      await this.discordService.banMember(
        member,
        reason,
      );

      const embed = new EmbedBuilder()
        .setTitle('Member Banned')
        .setColor(0xff0000)
        .addFields(
          {
            name: 'User',
            value: user.tag,
          },
          {
            name: 'Reason',
            value: reason ?? 'No reason provided',
          },
        )
        .setTimestamp();

      await interaction.reply({
        embeds: [embed],
      });
    } catch {
      await interaction.reply({
        content: 'Failed to ban member.',
        ephemeral: true,
      });
    }
  }
}