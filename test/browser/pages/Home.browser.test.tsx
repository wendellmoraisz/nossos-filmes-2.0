import { describe, it, expect, vi, beforeEach } from "vitest";
import { render } from "vitest-browser-react";
import { page, userEvent } from "vitest/browser";
import Home from "@/pages/home/Home";
import useAuth from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { MemoryRouter } from "react-router-dom";

vi.mock("@/hooks/useAuth");

vi.mock("react-router-dom", async (importOriginal) => {
  const actual = await importOriginal<typeof import("react-router-dom")>();
  return {
    ...actual,
    useNavigate: vi.fn(),
  };
});

describe("Home", () => {
  const mockLogout = vi.fn();
  const mockNavigate = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(useAuth).mockReturnValue({
      user: {
        id: "1",
        name: "Test User",
        email: "test@test.com",
        pair: { id: "2", name: "Partner", email: "partner@test.com" }
      },
      logout: mockLogout,
    } as any);
    vi.mocked(useNavigate).mockReturnValue(mockNavigate);
  });

  it("should greet the user by name", async () => {
    render(<MemoryRouter><Home /></MemoryRouter>);
    await expect.element(page.getByText("Olá, Test User!")).toBeInTheDocument();
  });

  it("should render all navigation links correctly with the pair's name", async () => {
    render(<MemoryRouter><Home /></MemoryRouter>);

    await expect.element(page.getByRole("link", { name: "Filmes para mim" })).toHaveAttribute("href", "/filmes-para-mim");
    await expect.element(page.getByRole("link", { name: "Minha lista" })).toHaveAttribute("href", "/minha-lista");
    await expect.element(page.getByRole("link", { name: "Nossos filmes" })).toHaveAttribute("href", "/nossos-filmes");
    await expect.element(page.getByRole("link", { name: "Filmes para Partner" })).toHaveAttribute("href", "/indicacoes");
    await expect.element(page.getByRole("link", { name: "Filmes de Partner" })).toHaveAttribute("href", "/filmes-de");
  });

  it("should call logout and navigate to /login when clicking 'Sair'", async () => {
    render(<MemoryRouter><Home /></MemoryRouter>);

    await userEvent.click(page.getByRole("button", { name: "Sair" }));

    expect(mockLogout).toHaveBeenCalled();
    expect(mockNavigate).toHaveBeenCalledWith("/login");
  });
});
