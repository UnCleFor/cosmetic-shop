import styled from "styled-components";

export const Nav = styled.nav `
  display: flex;
  gap: 2.4rem;
  
  a {
    font-size: 1.4rem;
    text-transform: uppercase;
    letter-spacing: 1px;
    color: #000;
    text-decoration: none;
    transition: color 0.5s ease;

    &:hover {
      color: ${({theme}) => theme.colors.primary};
    }
  }

  &.desktop {
    @media (max-width: 768px) {
      display: none;
    }
  }

  &.mobile {
    display: flex;
    flex-direction: column;
    gap: 1.2rem;

    @media (min-width: 769px) {
      display: none;
    }
  }
`;