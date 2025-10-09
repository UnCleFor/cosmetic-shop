import styled from "styled-components";

export const ProductContainer = styled.div`
  padding: 3rem 6rem;
  background-color: #fff;
  @media (max-width: 768px) {
    padding: 2rem;
  }
`;

export const Title = styled.h1`
  font-size: 2.2rem;
  font-weight: 600;
  margin-bottom: 1rem;
`;

export const Price = styled.div`
  font-size: 1.8rem;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: 1rem;
`;

export const Description = styled.p`
  font-size: 1rem;
  line-height: 1.6;
  color: #444;
  margin-bottom: 2rem;
`;

export const SectionTitle = styled.h2`
  margin-top: 4rem;
  margin-bottom: 2rem;
  font-size: 1.8rem;
  text-align: center;
  font-weight: 600;
`;
