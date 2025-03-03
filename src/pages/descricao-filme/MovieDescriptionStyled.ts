import styled from "styled-components";

export const Container = styled.div`
    width: 100%;
    padding: 0 200px 0 200px;

    @media (max-width: 1100px) {
        padding: 0;
    }
`;

export const MovieInfosContainer = styled.div`
    margin: 0 100px 30px 100px;

    @media (max-width: 600px) {
        margin: 0 20px 15px 20px;
    }
`;

export const MovieBannerContainer = styled.div`
  margin-top: 0;
  height: 55vh;
  width: 100%;
  overflow: hidden;
  background-color: rgba(0, 0, 0, 0.5);

  @media (min-width: 1100px) {
    margin-top: 20px;
  }

  @media (max-width: 600px) {
        max-height: 200px;
    }
`;

export const MovieBanner = styled.div<{ $imageUrl: string }>`
    position: relative;
    z-index: -1;
    height: 100%;
    width: 100%;
    background-image: url(${props => props.$imageUrl});
    background-size: cover;
    background-position: center;
`;

export const MovieHeaderContainer = styled.div`
    display: flex;
    gap: 20px;
`;

export const MoviePoster = styled.img`
    width: 250px;
    height: 350px;
    object-fit: cover;
    margin-top: -241.5px;

    @media (max-width: 850px) {
        width: 200px;
        height: 300px;
    }

    @media (max-width: 600px) {
        width: 133.5px;
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