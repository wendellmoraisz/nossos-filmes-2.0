import { describe, it, expect, vi } from "vitest";
import FilterWatchedButton from "@/components/FilterWatchedButton";

vi.mock("@mui/icons-material/VisibilityOff", () => ({
  __esModule: true,
  default: () => "VisibilityOffIcon",
}));
vi.mock("@mui/icons-material/Visibility", () => ({
  __esModule: true,
  default: () => "VisibilityIcon",
}));

describe("FilterWatchedButton", () => {
  it("should render correctly when active", () => {
    const onClick = vi.fn();
    const result = FilterWatchedButton({ isActive: true, onClick }) as any;

    expect(result.props.$active).toBe(true);
    expect(result.props.children[1].props.children).toBe("Todos os filmes");

    result.props.onClick();
    expect(onClick).toHaveBeenCalled();
  });

  it("should render correctly when inactive", () => {
    const result = FilterWatchedButton({
      isActive: false,
      onClick: vi.fn(),
    }) as any;

    expect(result.props.$active).toBe(false);
    expect(result.props.children[1].props.children).toBe("Não assistidos");
  });
});
