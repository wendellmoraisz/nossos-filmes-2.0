import styled from "styled-components";

export const Container = styled.main`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 40px;
`;

export const ButtonsContainer = styled.div`
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: 16px;
    padding: 32px 0;
    position: fixed;
    z-index: 1;
    background-color: #13161a;
    width: 100%;
`;

export const MoviesCardsContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 40px;
    max-width: 1800px;
    margin-top: 150px;
`;