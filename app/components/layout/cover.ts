import styled, { css } from "styled-components";

export const Cover = styled.div <{ $principalElement: string } >`
  display: flex;
  flex-direction: column;
  min-block-size: 100vh;
  padding: 1rem;

  & > * {
    margin-block: 1rem;
  }

  & > :first-child:not(${({ $principalElement }) => $principalElement}) {
    margin-block-start: 0;
  }

  & > :last-child:not(${({ $principalElement }) => $principalElement}) {
    margin-block-end: 0;
  }

  & > ${({ $principalElement }) => $principalElement} {
    margin-block: auto;
  }
`;
