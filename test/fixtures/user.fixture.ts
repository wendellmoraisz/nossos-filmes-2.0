import User from "../../src/@types/User";

export function createUserFixture(overrides?: Partial<User>): User {
  return {
    id: "user123",
    name: "John Doe",
    ...overrides,
  } as User;
}
