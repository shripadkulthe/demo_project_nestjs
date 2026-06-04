export class UserUpdatedEvent {
  constructor(
    public readonly userId: string,
    public readonly name: string,
  ) {}
}