import styled, { css } from "styled-components";

export const Switcher = styled.div`
  max-inline-size: none;
  display: flex;
  flex-wrap: wrap;

  & > * {
    flex-basis: calc((var(--measure) - 100%) * 999);
    flex-grow: 1;
  }
`;
