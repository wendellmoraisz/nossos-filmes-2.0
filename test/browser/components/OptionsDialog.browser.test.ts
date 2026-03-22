import { describe, it, expect, vi } from "vitest";
import { useState, useRef } from "react";
import OptionsDialog from "@/components/OptionsDialog";

vi.mock("react", async (importOriginal) => {
  const actual = await importOriginal<typeof import("react")>();
  return {
    ...actual,
    useState: vi.fn(),
    useRef: vi.fn(),
    useEffect: vi.fn(),
  };
});

vi.mock("@mui/material/Button", () => ({
  default: vi.fn(({ children, onClick }) => ({
    type: "Button",
    props: { children, onClick },
  })),
}));
vi.mock("@mui/material/Dialog", () => ({
  default: vi.fn(({ children, open }) => ({
    type: "Dialog",
    props: { children, open },
  })),
}));
vi.mock("@mui/material/DialogActions", () => ({
  default: vi.fn(({ children }) => ({
    type: "DialogActions",
    props: { children },
  })),
}));
vi.mock("@mui/material/DialogContent", () => ({
  default: vi.fn(({ children }) => ({
    type: "DialogContent",
    props: { children },
  })),
}));
vi.mock("@mui/material/DialogTitle", () => ({
  default: vi.fn(({ children }) => ({
    type: "DialogTitle",
    props: { children },
  })),
}));
vi.mock("@mui/material/RadioGroup", () => ({
  default: vi.fn(({ children, value, onChange }) => ({
    type: "RadioGroup",
    props: { children, value, onChange },
  })),
}));
vi.mock("@mui/material/Radio", () => ({ default: () => "Radio" }));
vi.mock("@mui/material/FormControlLabel", () => ({
  default: vi.fn(({ label, value }) => ({
    type: "FormControlLabel",
    props: { label, value },
  })),
}));

describe("OptionsDialog", () => {
  const props = {
    open: true,
    title: "Choose",
    options: ["A", "B"],
    confirmAction: vi.fn(),
    cancelAction: vi.fn(),
    value: "A",
  };

  it("should render correctly and handle actions", () => {
    vi.mocked(useState).mockReturnValue(["A", vi.fn()]);
    vi.mocked(useRef).mockReturnValue({ current: null });

    const result = OptionsDialog(props) as any;
    expect(result.props.open).toBe(true);

    // Dialog children: [Title, Content, Actions]
    const actions = result.props.children[2];
    const confirmBtn = actions.props.children[1];
    confirmBtn.props.onClick();
    expect(props.confirmAction).toHaveBeenCalledWith("A");
  });
});
