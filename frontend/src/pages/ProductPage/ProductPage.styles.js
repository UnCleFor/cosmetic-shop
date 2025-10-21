import styled from "styled-components";

export const PageContainer = styled.div `
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1rem;
`;

export const Title = styled.h1 `
  text-align: center;
  font-size: 2.4rem;
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: 2rem;
  font-weight: 700;
`;

export const FilterSortBar = styled.div `
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  background-color: #fafafa;
  padding: 1rem 1.5rem;
  border-radius: 8px;
  box-shadow: 0 0 5px rgba(225, 84, 4, 0.2);
  margin-bottom: 2rem;
`;

export const FilterGroup = styled.div `
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;

  label {
    font-size: 1.4rem;
    display: flex;
    align-items: center;
    gap: 0.4rem;
    cursor: pointer;
  }

  input {
    accent-color: ${({ theme }) => theme.colors.primary};
    cursor: pointer;
  }
`;

export const SortSelect = styled.div `
  display: flex;
  align-items: center;
  gap: 0.8rem;

  label {
    font-size: 1.4rem;
  }

  select {
    padding: 0.4rem 0.8rem;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 1.4rem;
    cursor: pointer;

    &:hover {
      border-color: ${({ theme }) => theme.colors.primary};
    }
  }
`;

export const ProductGrid = styled.div `
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 2rem;
`;