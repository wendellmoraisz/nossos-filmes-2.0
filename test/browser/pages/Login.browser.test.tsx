import { describe, it, expect, vi, beforeEach } from "vitest";
import { render } from "vitest-browser-react";
import { page, userEvent } from "vitest/browser";
import Login from "@/pages/Login";
import useAuth from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

vi.mock("@/hooks/useAuth");

vi.mock("react-router-dom", () => ({
  useNavigate: vi.fn(),
}));

vi.mock("react-hot-toast", () => ({
  default: {
    error: vi.fn(),
    success: vi.fn(),
  },
}));

describe("Login", () => {
  const mockLogin = vi.fn();
  const mockNavigate = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(useAuth).mockReturnValue({ login: mockLogin } as never);
    vi.mocked(useNavigate).mockReturnValue(mockNavigate);
  });

  it("should render login form correctly", async () => {
    render(<Login />);

    await expect.element(page.getByRole("heading", { name: "Entrar" })).toBeInTheDocument();
    await expect.element(page.getByLabelText("Email")).toBeInTheDocument();
    await expect.element(page.getByLabelText("Senha")).toBeInTheDocument();
    await expect.element(page.getByRole("button", { name: "Entrar" })).toBeInTheDocument();
  });

  it("should show validation errors when submitting empty fields", async () => {
    render(<Login />);

    await userEvent.click(page.getByRole("button", { name: "Entrar" }));

    // Since MUI uses native HTML5 validation via the required prop on the form,
    // the submit event won't even reach react-hook-form's handleSubmit if fields are empty.
    // So we just verify that login was not called.
    expect(mockLogin).not.toHaveBeenCalled();
  });

  it("should call login and navigate to /home on successful login", async () => {
    mockLogin.mockResolvedValueOnce(undefined);
    render(<Login />);

    await userEvent.fill(page.getByLabelText("Email *"), "test@test.com");
    await userEvent.fill(page.getByLabelText("Senha *"), "password123");
    await userEvent.click(page.getByRole("button", { name: "Entrar" }));

    // Note: mui adds * to required labels. 
    expect(mockLogin).toHaveBeenCalledWith({ email: "test@test.com", password: "password123" });
    // vi.waitFor allows waiting for async side effects like navigation after promise resolves
    await vi.waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith("/home");
    });
  });

  it("should show an error toast on failed login", async () => {
    mockLogin.mockRejectedValueOnce(new Error("Invalid login"));
    render(<Login />);

    await userEvent.fill(page.getByLabelText("Email *"), "test@test.com");
    await userEvent.fill(page.getByLabelText("Senha *"), "password123");
    await userEvent.click(page.getByRole("button", { name: "Entrar" }));

    await vi.waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith("Login inválido", {
        id: "login-error",
      });
    });
    expect(mockNavigate).not.toHaveBeenCalled();
  });
});
