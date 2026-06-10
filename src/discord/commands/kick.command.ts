import { Injectable } from '@nestjs/common';
import { Context, Options, SlashCommand } from 'necord';
import type { SlashCommandContext } from 'necord';
import { EmbedBuilder, GuildMember, PermissionFlagsBits } from 'discord.js';
import { DiscordService } from '../discord.service';
import { KickDto } from '../dto/kick.dto';

@Injectable()
export class KickCommand {
  constructor(
    private readonly discordService: DiscordService,
  ) {}

  @SlashCommand({
    name: 'kick',
    description: 'Kick a member from the server',
    defaultMemberPermissions:
      PermissionFlagsBits.KickMembers,
  })
  public async kick(
    @Context() [interaction]: SlashCommandContext,
    @Options() { user, reason }: KickDto,
  ) {
    const member = (await interaction.guild?.members.fetch(
      user.id,
    )) as GuildMember;

    await this.discordService.kickMember(member, reason);

    const embed = new EmbedBuilder()
      .setTitle('Member Kicked')
      .setColor(0xff0000)
      .addFields(
        { name: 'User', value: user.tag },
        {
          name: 'Reason',
          value: reason ?? 'No reason provided',
        },
      )
      .setTimestamp();

    await interaction.reply({
      embeds: [embed],
    });
  }
}