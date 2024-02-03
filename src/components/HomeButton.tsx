import { Link } from "react-router-dom";
import styled from "styled-components";
import HomeIcon from "@mui/icons-material/Home";

export const StyledLink = styled(Link)`
    text-align: center;
    text-decoration: none;
    font-size: 16px;
    border: 1px solid #32E0C4;
    color: #fff;
    padding: 10px 20px;
    border-radius: 5px;
    transition: background-color 0.3s ease;
    display: flex;
    align-items: center;
    gap: 5px;

    &:hover {
        background-color: rgba(50, 224, 196, .1);
    }
`;

const HomeButton = () => {
    return (
        <StyledLink to="/home">
            <HomeIcon /> Home
        </StyledLink>
    )
}

export default HomeButton;