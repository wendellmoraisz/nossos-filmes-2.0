import { Link } from "react-router-dom";
import styled from "styled-components";
import AddIcon from "@mui/icons-material/Add";
import { commonButtonStyles } from "../common/CommonButtonStyles";

export const StyledLink = styled(Link)`
  ${commonButtonStyles}
`;

interface AddMovieButtonProps {
  redirectParams: {
    watcherId: string;
    listCategory: string;
  };
}

const AddMovieButton = ({ redirectParams }: AddMovieButtonProps) => {
  const { watcherId, listCategory } = redirectParams;

  return (
    <StyledLink to={`/adicionar-filme/${watcherId}/${listCategory}`}>
      <AddIcon /> <span>Adicionar Filme</span>
    </StyledLink>
  );
};

export default AddMovieButton;
