import styled from "styled-components";

export const ProductContainer = styled.div `
  padding: 3rem 6rem;
  background-color: #fff;

  @media (max-width: 768px) {
    padding: 2rem 1.5rem;
  }
`;

export const Title = styled.h1 `
  font-size: 2.8rem;
  font-weight: 600;
  margin-bottom: 1rem;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

export const Price = styled.div `
  font-size: 2rem;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: 1rem;
`;

export const InfoList = styled.ul `
  list-style: none;
  padding: 0;
  margin: 0 0 1.5rem 0;
  font-size: 1.5rem;
  color: #555;
`;

export const InfoItem = styled.li `
  margin-bottom: 0.5rem;

  strong {
    color: #222;
    font-weight: 600;
  }
`;

export const Description = styled.p `
  font-size: 1.5rem;
  line-height: 1.6;
  color: #444;
  margin-bottom: 2rem;
`;

export const SectionTitle = styled.h2 `
  margin-top: 4rem;
  margin-bottom: 2rem;
  font-size: 1.8rem;
  text-align: center;
  font-weight: 600;
`;