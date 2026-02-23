import { Link } from "react-router-dom";
import styled from "styled-components";
import HomeIcon from "@mui/icons-material/Home";
import { commonButtonStyles } from "../common/CommonButtonStyles";

export const StyledLink = styled(Link)`
  ${commonButtonStyles}
`;

const HomeButton = () => {
  return (
    <StyledLink to="/home">
      <HomeIcon /> <span>Home</span>
    </StyledLink>
  );
};

export default HomeButton;
