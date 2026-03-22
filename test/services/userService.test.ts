import { describe, it, expect, vi, beforeEach } from "vitest";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { query, collection, where, getDocs } from "firebase/firestore";
import { login, getUserById } from "../../src/services/userService";
import { db } from "../../src/config/firebaseConfig";
import { createUserFixture } from "../fixtures/user.fixture";

// Mock Firebase Auth
vi.mock("firebase/auth", async (importOriginal) => {
  const actual = await importOriginal<typeof import("firebase/auth")>();
  return {
    ...actual,
    getAuth: vi.fn(),
    signInWithEmailAndPassword: vi.fn(),
  };
});

// Mock Firebase Firestore
vi.mock("firebase/firestore", async (importOriginal) => {
  const actual = await importOriginal<typeof import("firebase/firestore")>();
  return {
    ...actual,
    query: vi.fn(),
    collection: vi.fn(),
    where: vi.fn(),
    getDocs: vi.fn(),
  };
});

describe("userService", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("login", () => {
    it("should call signInWithEmailAndPassword with correct arguments", async () => {
      const email = "test@example.com";
      const password = "password123";
      const mockAuth = { name: "mockAuth" };
      const mockUserCredential = { user: { uid: "123" } };

      vi.mocked(getAuth).mockReturnValue(mockAuth as any);
      vi.mocked(signInWithEmailAndPassword).mockResolvedValue(mockUserCredential as any);

      const result = await login(email, password);

      expect(getAuth).toHaveBeenCalled();
      expect(signInWithEmailAndPassword).toHaveBeenCalledWith(mockAuth, email, password);
      expect(result).toBe(mockUserCredential);
    });
  });

  describe("getUserById", () => {
    it("should query Firestore and return user data", async () => {
      const id = "user123";
      const mockUserData = createUserFixture({ id });
      const mockSnapshot = {
        docs: [
          {
            data: vi.fn().mockReturnValue(mockUserData),
          },
        ],
      };

      vi.mocked(getDocs).mockResolvedValue(mockSnapshot as any);

      const result = await getUserById(id);

      expect(collection).toHaveBeenCalledWith(db, "users");
      expect(where).toHaveBeenCalledWith("id", "==", id);
      expect(query).toHaveBeenCalled();
      expect(getDocs).toHaveBeenCalled();
      expect(result).toEqual(mockUserData);
    });
  });
});
