import { StringOption, UserOption } from 'necord';
import { User } from 'discord.js';

export class BanDto {
  @UserOption({
    name: 'user',
    description: 'User to ban',
    required: true,
  })
  user!: User;

  @StringOption({
    name: 'reason',
    description: 'Reason for ban',
    required: false,
  })
  reason?: string;
}