import { css } from "styled-components";

export const commonButtonStyles = css`
  text-align: center;
  text-decoration: none;
  font-size: 16px;
  border: 1px solid #32e0c4;
  color: #fff;
  padding: 10px 20px;
  border-radius: 5px;
  transition: background-color 0.3s ease;
  display: flex;
  align-items: center;
  gap: 5px;
  cursor: pointer;
  background-color: transparent;

  &:hover {
    background-color: rgba(50, 224, 196, 0.1);
  }

  @media (max-width: 768px) {
    padding: 8px 12px;
    font-size: 14px;
    gap: 4px;

    svg {
      font-size: 20px;
    }

    span {
      display: none;
    }
  }
`;
