import { describe, it, expect, vi } from "vitest";
import { useContext } from "react";
import useAuth from "@/hooks/useAuth";
import { AuthContext } from "@/context/AuthProvider";

vi.mock("react", async (importOriginal) => {
  const actual = await importOriginal<typeof import("react")>();
  return {
    ...actual,
    useContext: vi.fn(),
  };
});

describe("useAuth", () => {
  it("should return the context value", () => {
    const mockContextValue = {
      user: { uid: "123", email: "test@example.com" },
      logout: vi.fn(),
      login: vi.fn(),
    };

    vi.mocked(useContext).mockReturnValue(mockContextValue);

    const result = useAuth();

    expect(useContext).toHaveBeenCalledWith(AuthContext);
    expect(result).toEqual(mockContextValue);
  });
});
