import styled from "styled-components";

export const Container = styled.div`
`;

export const MovieInfosContainer = styled.div`
    margin: 0 100px 30px 100px;

    @media (max-width: 600px) {
        margin: 0 20px 15px 20px;
    }
`;

export const MovieBanner = styled.img`
    width: 100%;
    max-height: 300px;
    object-fit: cover;

    @media (max-width: 600px) {
        max-height: 400px;
    }
`;

export const MovieHeaderContainer = styled.div`
    display: flex;
    gap: 20px;
`;

export const MoviePoster = styled.img`
    width: 200px;
    height: 300px;
    object-fit: cover;
    margin-top: -150px;

    @media (max-width: 600px) {
        width: 150px;
        height: 200px;
        margin-top: -100px;
    }
`;

export const MovieHeadInfo = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
`;

export const MovieTitle = styled.h2`
    font-size: 2rem;
    margin-bottom: 0;

    @media (max-width: 600px) {
        font-size: 1.3rem;
    }
`;

export const MovieTagline = styled.p`
    font-size: 1rem;
    margin-top: 0;
`;

export const MovieAdittionalInfoContainer = styled.div`
    display: flex;
    gap: 20px;
    margin-top: 20px;
    color: #92929D;
    font-size: 1rem;
    align-items: center;

    @media (max-width: 600px) {
        gap: 10px;
        font-size: 0.7rem;
        justify-content: center;
    }
`;

export const MovieAdittionalInfoItem = styled.div`
    display: flex;
    gap: 5px;
    align-items: center;
`;

export const CategoryTitle = styled.h3`
    font-size: 1.2rem;
    margin-top: 30px;

    @media (max-width: 600px) {
        font-size: 1rem;
    }
`;

export const MovieGenresContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    color: #92929D;
    font-size: 1rem;
    align-items: center;

    @media (max-width: 600px) {
        gap: 10px;
        font-size: 0.8rem;
    }
`;

export const WatchProvidersContainer = styled.div`
    display: flex;
    align-items: center;
    flex-wrap: wrap;
`;

export const WatchProviderLogo = styled.img`
    width: 50px;
    height: 50px;
`;