import { StringOption, UserOption } from 'necord';
import { User } from 'discord.js';

export class KickDto {
  @UserOption({
    name: 'user',
    description: 'User to kick',
    required: true,
  })
  user!: User;

  @StringOption({
    name: 'reason',
    description: 'Reason for kick',
    required: false,
  })
  reason?: string;
}