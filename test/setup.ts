import { vi } from "vitest";

vi.mock("@/config/firebaseConfig", () =>
  import("./fixtures/firebaseConfig.fixture")
);
