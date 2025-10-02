import styled from 'styled-components';

export const AdminWrapper = styled.div`
    display: flex;
`;

export const ContentWrapper = styled.div`
  margin-left: 250px;
  padding: 20px;
  width: 100%;
  transition: margin-left 0.3s ease;
  
  @media (max-width: 768px) {
    margin-left: 0;
  }
`;