import {
  CommandHandler,
  ICommandHandler,
  EventBus,
} from '@nestjs/cqrs';

import { DeleteUserCommand } from '../delete-user.command';
import { UserService } from '../../user.service';
import { UserDeletedEvent } from '../../events/user-deleted.event';

@CommandHandler(DeleteUserCommand)
export class DeleteUserHandler
  implements ICommandHandler<DeleteUserCommand>
{
  constructor(
    private readonly userService: UserService,
    private readonly eventBus: EventBus,
  ) {}

  async execute(command: DeleteUserCommand) {
    await this.userService.deleteUser(command.id);

    this.eventBus.publish(
      new UserDeletedEvent(command.id),
    );

    return {
      message: 'User deleted successfully',
    };
  }
}