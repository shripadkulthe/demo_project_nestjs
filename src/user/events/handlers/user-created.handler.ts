import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { UserCreatedEvent } from '../user-created.event';

@EventsHandler(UserCreatedEvent)
export class UserCreatedHandler
  implements IEventHandler<UserCreatedEvent>
{
  handle(event: UserCreatedEvent) {
    console.log('User Created Event Triggered');
    console.log(`User ID: ${event.userId}`);
    console.log(`Name: ${event.name}`);
    console.log(`Email: ${event.email}`);
  }
}