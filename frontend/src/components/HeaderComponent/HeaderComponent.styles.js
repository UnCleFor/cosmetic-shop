import styled from "styled-components";

export const HeaderWrapper = styled.header`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.6rem 3.2rem;
  border-bottom: 1px solid #f0f0f0;
  background-color: #fff;
  position: sticky;
  top: 0;
  z-index: 1000;
`;

export const Logo = styled.div`
  font-size: 2.4rem;
  font-weight: bold;
  letter-spacing: 2px;
  cursor: pointer;
`;

export const Nav = styled.nav`
  display: flex;
  gap: 2.4rem;

  a {
    font-size: 1.4rem;
    text-transform: uppercase;
    letter-spacing: 1px;
    color: #000;
    text-decoration: none;
    transition: color 0.3s ease;

    &:hover {
      color: #b8860b; /* vàng gold giống Guerlain */
    }
  }
`;

export const RightActions = styled.div`
  display: flex;
  align-items: center;
  gap: 1.6rem;
`;
