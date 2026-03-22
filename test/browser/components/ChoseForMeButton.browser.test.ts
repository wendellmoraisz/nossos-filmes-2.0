import { describe, it, expect, vi } from "vitest";
import { useState } from "react";
import ChoseForMeButton from "@/components/ChoseForMeButton";
import * as ChoseForMeModalModule from "@/components/ChoseForMeModal";
const ChoseForMeModal = ChoseForMeModalModule.default;

vi.mock("react", async (importOriginal) => {
  const actual = await importOriginal<typeof import("react")>();
  return {
    ...actual,
    useState: vi.fn(),
  };
});

vi.mock("@/components/ChoseForMeModal", () => ({
  default: vi.fn(),
}));

vi.mock("@/components/Loading", () => ({
  default: () => "LoadingComponent",
}));

describe("ChoseForMeButton", () => {
  const props = { label: "Sortear", watcherId: "1", listCategory: "all" };

  it("should open modal when clicked", () => {
    const setOpen = vi.fn();
    vi.mocked(useState).mockReturnValue([false, setOpen]);

    const result = ChoseForMeButton(props) as any;

    // Fragment children: [StyledButton, ChoseForMeModal or false]
    const button = result.props.children[0];
    button.props.onClick();
    expect(setOpen).toHaveBeenCalledWith(true);
  });

  it("should render modal when open is true", () => {
    vi.mocked(useState).mockReturnValue([true, vi.fn()]);
    vi.mocked(ChoseForMeModal).mockReturnValue({
      type: "ChoseForMeModal",
    } as any);

    const result = ChoseForMeButton(props) as any;
    const modal = result.props.children[1];

    expect(modal).not.toBe(false);
    expect(modal.type).toBe(ChoseForMeModal);
  });
});
