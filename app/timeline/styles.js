import styled, { css } from "styled-components";
import { Imposter } from "../components/layout/imposter";
import { Sidebar } from "../components/layout/sidebar";

export const TimelineFixed = styled.div`
  position: sticky;
  top: 6.5rem;
  left: 0;
  width: 30%;
  color: var(--primary-color);
  z-index: 10;
  text-align: end;
  white-space: nowrap;
  padding: 1.8rem 0;
  background: linear-gradient(
    rgb(0, 0, 0, 0) 10%,
    var(--background-color) 20%,
    var(--background-color) 80%,
    rgb(0, 0, 0, 0) 90%
  );
  display: flex;
  flex-direction: column;
  align-items: flex-end;

  #top-nav-buttons {
    pointer-events: auto;
    position: fixed;
    top: 1rem;
    visibility:hidden;
    // transition-delay: 0.2s;
    // transition: visibility 0.2s ease-in-out;

    & > :first-child {
      margin-inline-end: 1rem;
    }

    button {
      background: none;
      border: none;
      cursor: pointer;
      font-size: var(--s1);
      padding: 0
      color: var(--dark-gray);
      transition: color 0.2s ease-in-out;

      &:hover {
        color: var(--accent-color);
      }
    }
  }

  .middle {
    display: block;
    width: 100%;
    font-size: var(--s1);
    border-block-end: 1px solid var(--primary-color);
    margin-block-end: var(--s-2);
  }

  .bottom {
    text-wrap: balance;
    color: var(--secondary-color);

    a {
      cursor: pointer;
      color: var(--secondary-color);

      &.subfilter {
        margin-inline-end: 1rem;
      }

      &:hover {
        text-decoration: underline dotted;
      }
    }

  }
`;

export const StyledDetailPaneWrapper = styled(Imposter)`
  position: absolute;
  top: 0;
  left: 0;
  width: calc(100vw - 15px - 1rem);
  height: 100vh;
  visibility: hidden;
  opacity: 0;
  pointer-events: auto;
  transform: none;
  transition:
    visibility 0s,
    opacity 0.2s ease-in-out;
  background-color: var(--background-color);

  &.selected {
    visibility: visible;
    opacity: 1;

    imposter-l {
      transform: translate(0, 0);
      transition: 0.2s transform 0.3s ease-in-out;
    }
  }
`;

export const StyledDetailPane = styled.div`
  position: fixed;
  inset-block-start: 0;
  inset-inline-start: 30%;
  transform: none;
  min-width: calc(70% - 1rem);
  height: 100%;
  overflow-y: auto;
  margin-inline-start: var(--s1);
  padding: 8rem 2rem 2rem 2rem;
  background-color: var(--background-color);
  color: var(--primary-color);
  border-left: 1.5px solid var(--primary-color);

  h2 {
    margin-block-end: 2rem;
  }

  p {
    margin-block-end: 1rem;
  }

  .detail-pane-close {
    position: absolute;
    top: 1rem;
    left: 2rem;
    background: none;
    border: none;
    cursor: pointer;
    font-size: var(--s1);
    color: var(--dark-gray);
    transition: color 0.2s ease-in-out;

    &:hover {
      color: var(--accent-color);
    }
  }
`;

export const StyledTimelineItem = styled(Sidebar)`
  .date {
    text-align: end;
    margin-block-start: 0.3em;
    line-height: 1.2;
    color: var(--secondary-color);
    opacity: 0;
    transition: opacity 0.2s ease-in-out;
  }

  & > :last-child {
    cursor: pointer;
    padding-inline-start: calc(2rem + 1px);
  }

  .tag {
    color: var(--secondary-color);
    font-size: var(--s0);
  }

  .summary {
    color: var(--primary-color);
  }

  &:hover {
    .primaryTitle {
      color: var(--highlight-color);
      transition: color 0.2s ease-in-out;
    }

    .date {
      opacity: 1;
    }
  }
`;

export const Tag = styled.span`
  font-size: var(--s0);
  color: var(--secondary-color);
  padding: 0 1rem 0 0;

  &::before {
    content: "▩";
    padding: 0 0.5rem 0 0;
  }
`;
