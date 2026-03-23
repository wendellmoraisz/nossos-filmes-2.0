import { vi } from "vitest";

export const auth = {
  currentUser: null,
  onAuthStateChanged: vi.fn(),
  signOut: vi.fn(),
  signInWithEmailAndPassword: vi.fn(),
};

export const db = {
  _type: "firestore_db",
};

export const app = {
  name: "[DEFAULT]",
  options: {},
};
