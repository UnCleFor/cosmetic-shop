import styled from "styled-components";

export const PaginationWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 2rem;

  .ant-pagination-item-active {
    border-color: ${({ theme }) => theme.colors.primary};
  }

  .ant-pagination-item-active a {
    color: ${({ theme }) => theme.colors.primary};
  }

  .ant-pagination-item:hover a,
  .ant-pagination-next:hover .ant-pagination-item-link,
  .ant-pagination-prev:hover .ant-pagination-item-link {
    color: ${({ theme }) => theme.colors.primary};
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;