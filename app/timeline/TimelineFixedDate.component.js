import styled, { css } from "styled-components";

export const TimelineFixedDate = styled.div`
  position: fixed;
  top: 10%;
  left: 0;
  width: 30%;
  color: ${({ theme }) => theme.primaryColor};
  /* background-color: var(--background-color); */
  font-size: var(--s1);
  z-index: 10;
  text-align: right;
  white-space: nowrap;
  display: flex;
  flex-direction: column;
  align-items: flex-end;

  &::after {
    content: "";
    flex-grow: 1;
    height: 1px;
    background-color: ${({ theme }) => theme.primaryColor};
    border-radius: 0;
    width: 100%;
  }
`;
