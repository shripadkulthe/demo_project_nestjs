import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { UserDeletedEvent } from '../user-deleted.event';

@EventsHandler(UserDeletedEvent)
export class UserDeletedHandler
  implements IEventHandler<UserDeletedEvent>
{
  handle(event: UserDeletedEvent) {
    console.log('USER DELETED EVENT');
    console.log(event);
  }
}