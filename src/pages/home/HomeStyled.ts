import styled from "styled-components";
import { Link } from "react-router-dom";

export const Container = styled.main`
    height: 100vh;
    width: 100vw;
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const LinksContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 24px;
`;

export const StyledLink = styled(Link)`
    width: 100%;
    text-align: center;
    text-decoration: none;
    font-size: 16px;
    border: 1px solid #32E0C4;
    color: #fff;
    padding: 10px 20px;
    border-radius: 5px;
    transition: background-color 0.3s ease;

    &:hover {
        background-color: rgba(50, 224, 196, .1);
    }
`;