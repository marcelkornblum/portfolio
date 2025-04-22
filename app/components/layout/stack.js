import styled, { css } from "styled-components";

export const Stack = styled.div`
  max-inline-size: none;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;

  &:only-child {
    block-size: 100%;
  }

  & > * + * {
    margin-block-start: var(--s2);
  }
`;
