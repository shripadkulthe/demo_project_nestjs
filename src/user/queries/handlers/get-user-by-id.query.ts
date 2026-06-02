import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetUserByIdQuery } from '../get-user-by-id.query';
import { UserService } from '../../user.service';

@QueryHandler(GetUserByIdQuery)
export class GetUserByIdHandler
  implements IQueryHandler<GetUserByIdQuery>
{
  constructor(
    private readonly userService: UserService,
  ) {}

  async execute(query: GetUserByIdQuery) {
    return this.userService.getUser(query.id);
  }
}