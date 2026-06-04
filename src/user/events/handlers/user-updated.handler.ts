import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { UserUpdatedEvent } from '../user-updated.event';

@EventsHandler(UserUpdatedEvent)
export class UserUpdatedHandler
  implements IEventHandler<UserUpdatedEvent>
{
  handle(event: UserUpdatedEvent) {
    console.log('USER UPDATED EVENT');
    console.log(event);
  }
}