import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetAllUsersQuery } from '../get-all-users.query';
import { UserService } from '../../user.service';

@QueryHandler(GetAllUsersQuery)
export class GetAllUsersHandler
  implements IQueryHandler<GetAllUsersQuery>
{
  constructor(
    private readonly userService: UserService,
  ) {}

  async execute() {
    return this.userService.getAllUsers();
  }
}