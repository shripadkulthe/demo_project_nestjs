import { CommandHandler, ICommandHandler,EventBus } from '@nestjs/cqrs';
import { CreateUserCommand } from '../create-user.command';
import { UserService } from '../../user.service';
import { UserCreatedEvent } from '../../events/user-created.event';


@CommandHandler(CreateUserCommand)
export class CreateUserHandler
  implements ICommandHandler<CreateUserCommand>
{
  constructor(
    private readonly userService: UserService,
    private readonly eventBus: EventBus,
  ) {}

  async execute(command: CreateUserCommand) {
    const user = await this.userService.addUser(command.user);

    this.eventBus.publish(
      new UserCreatedEvent(
        user.id,
        user.name,
        user.email,
      ),
    );
    return user;
  }
}