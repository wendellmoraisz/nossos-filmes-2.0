import styled from "styled-components";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Visibility from "@mui/icons-material/Visibility";
import { commonButtonStyles } from "../common/CommonButtonStyles";

const StyledButton = styled.button<{ $active: boolean }>`
  ${commonButtonStyles}
  background-color: ${(props) =>
    props.$active ? "rgba(50, 224, 196, 0.2)" : "transparent"};
  border-color: ${(props) =>
    props.$active ? "#32e0c4" : "rgba(50, 224, 196, 0.5)"};
`;

interface FilterWatchedButtonProps {
  isActive: boolean;
  onClick: () => void;
}

const FilterWatchedButton = ({
  isActive,
  onClick,
}: FilterWatchedButtonProps) => {
  return (
    <StyledButton $active={isActive} onClick={onClick}>
      {isActive ? <VisibilityOff /> : <Visibility />}
      <span>{isActive ? "Todos os filmes" : "Não assistidos"}</span>
    </StyledButton>
  );
};

export default FilterWatchedButton;
