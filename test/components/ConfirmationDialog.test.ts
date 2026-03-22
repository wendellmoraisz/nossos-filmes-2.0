import { describe, it, expect, vi } from "vitest";
import ConfirmationDialog from "../../src/components/ConfirmationDialog";

vi.mock("@mui/material/Button", () => ({
  default: vi.fn(({ children, onClick }) => ({
    type: "Button",
    children,
    onClick,
  })),
}));
vi.mock("@mui/material/Dialog", () => ({
  default: vi.fn(({ children, open, onClose }) => ({
    type: "Dialog",
    children,
    open,
    onClose,
  })),
}));
vi.mock("@mui/material/DialogActions", () => ({
  default: vi.fn(({ children }) => ({ type: "DialogActions", children })),
}));
vi.mock("@mui/material/DialogContent", () => ({
  default: vi.fn(({ children }) => ({ type: "DialogContent", children })),
}));
vi.mock("@mui/material/DialogContentText", () => ({
  default: vi.fn(({ children }) => ({ type: "DialogContentText", children })),
}));
vi.mock("@mui/material/DialogTitle", () => ({
  default: vi.fn(({ children }) => ({ type: "DialogTitle", children })),
}));

describe("ConfirmationDialog", () => {
  const props = {
    open: true,
    title: "Confirm?",
    content: "Are you sure?",
    confirmAction: vi.fn(),
    cancelAction: vi.fn(),
  };

  it("should render correctly and handle actions", () => {
    const result = ConfirmationDialog(props) as any;
    // Fragment -> Dialog
    const dialog = result.props.children;

    expect(dialog.props.open).toBe(true);

    // Dialog -> [Title, Content, Actions]
    const actions = dialog.props.children[2];
    const noButton = actions.props.children[0];
    const yesButton = actions.props.children[1];

    noButton.props.onClick();
    expect(props.cancelAction).toHaveBeenCalled();

    yesButton.props.onClick();
    expect(props.confirmAction).toHaveBeenCalled();
  });
});
