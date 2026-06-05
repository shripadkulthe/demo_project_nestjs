import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';
import { NotFoundException } from '@nestjs/common';
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
    const user = await this.userService.deleteUser( 
      command.id,
    );

    if (!user) {
      throw new NotFoundException(
        `User with ID ${command.id} not found`,
      );
    }

    this.eventBus.publish(
      new UserDeletedEvent(command.id),
    );

    return {
      message: 'User deleted successfully',
    };
  }
}