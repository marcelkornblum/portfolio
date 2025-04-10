import styled, { css } from "styled-components";

export const Sidebar = styled.div`
  max-inline-size: none;
  display: flex;
  flex-wrap: wrap;
  gap: var(--s1);

  & > :first-child {
    flex-basis: 30%;
    flex-grow: 1;
  }

  & > :last-child {
    flex-basis: 0;
    flex-grow: 999;
    min-inline-size: 400px;
  }
`;
