import styled from "styled-components";

const LoadingContainer = styled.span`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    font-size: 24px;
`;

const LoadingAnimation = styled.div`
    width: 48px;
    height: 48px;
    border: 3px solid #FFF;
    border-radius: 50%;
    display: inline-block;
    position: relative;
    box-sizing: border-box;
    animation: rotation 1s linear infinite;

    &::after {
        content: '';
        box-sizing: border-box;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        width: 56px;
        height: 56px;
        border-radius: 50%;
        border: 3px solid;
        border-color: #32E0C4 transparent;
  }
  
  @keyframes rotation {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  } 
`;

const Loading = () => {
    return (
        <LoadingContainer>
            <LoadingAnimation />
        </LoadingContainer>
    )
}

export default Loading;