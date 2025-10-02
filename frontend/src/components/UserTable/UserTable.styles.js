import styled from 'styled-components';

export const TableWrapper = styled.div`
  padding: 20px;
  @media (max-width: 768px) {
    margin-left: 0;
  }
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
  th, td {
    border: 1px solid #ddd;
    padding: 8px;
    text-align: left;
  }

  @media (max-width: 768px) {
    font-size: 12px;
  }
`;