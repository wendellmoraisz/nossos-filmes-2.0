import User from "@/@types/User";

export function createUserFixture(overrides?: Partial<User>): User {
  return {
    id: "user123",
    name: "John Doe",
    ...overrides,
  } as User;
}
