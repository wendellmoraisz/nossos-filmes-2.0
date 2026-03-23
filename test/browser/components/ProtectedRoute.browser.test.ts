import { describe, it, expect, vi } from "vitest";
import ProtectedRoute from "@/components/ProtectedRoute";
import useAuth from "@/hooks/useAuth";
import { Navigate, Outlet } from "react-router-dom";

const mockFirebase = vi.hoisted(() => ({
  auth: {
    currentUser: null,
    onAuthStateChanged: vi.fn(),
    signOut: vi.fn(),
    signInWithEmailAndPassword: vi.fn(),
  },
  db: { _type: "firestore_db" },
  app: { name: "[DEFAULT]", options: {} },
}));

vi.mock("@/config/firebaseConfig", () => mockFirebase);

vi.mock("@/hooks/useAuth");

vi.mock("react-router-dom", async (importOriginal) => {
  const actual = await importOriginal<typeof import("react-router-dom")>();
  return {
    ...actual,
    Navigate: vi.fn(({ to }) => ({ type: "Navigate", props: { to } })),
    Outlet: vi.fn(() => ({ type: "Outlet" })),
  };
});

describe("ProtectedRoute", () => {
  it("should render Outlet when user is authenticated", () => {
    vi.mocked(useAuth).mockReturnValue({ user: { id: "1" } } as any);

    const result = ProtectedRoute({ localUser: undefined }) as any;

    expect(result.type).toBe(Outlet);
  });

  it("should render Navigate to /login when user is not authenticated", () => {
    vi.mocked(useAuth).mockReturnValue({ user: null } as any);

    const result = ProtectedRoute({ localUser: undefined }) as any;

    expect(result.type).toBe(Navigate);
    expect(result.props.to).toBe("/login");
  });

  it("should render Outlet when localUser is provided even if user is null", () => {
    vi.mocked(useAuth).mockReturnValue({ user: null } as any);

    const result = ProtectedRoute({ localUser: { id: "1" } }) as any;

    expect(result.type).toBe(Outlet);
  });
});
