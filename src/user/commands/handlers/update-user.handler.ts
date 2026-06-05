import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';
import {NotFoundException } from '@nestjs/common';
import { UpdateUserCommand } from '../update-user.command';
import { UserService } from '../../user.service';
import { UserUpdatedEvent } from '../../events/user-updated.event';

@CommandHandler(UpdateUserCommand)
export class UpdateUserHandler
  implements ICommandHandler<UpdateUserCommand>
{
  constructor(
    private readonly userService: UserService,
    private readonly eventBus: EventBus,
  ) {}

  async execute(command: UpdateUserCommand) {
    const user = await this.userService.updateUser(
      command.id,
      command.user,
    );

    if (!user) {
      throw new NotFoundException(
        `User with ID ${command.id} not found`,
      );
    }

    this.eventBus.publish(
      new UserUpdatedEvent(
        user.id,
        user.name,
      ),
    );

    return user;
  }
}