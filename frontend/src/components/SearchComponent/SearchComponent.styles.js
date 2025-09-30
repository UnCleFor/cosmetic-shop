import styled from "styled-components";

export const SearchWrapper = styled.div`
    .ant-input-search {
        .ant-input-affix-wrapper {
            transition: all 0.5s ease;
        }

        /* Trạng thái hover, focus, active */
        .ant-input-affix-wrapper:hover,
        .ant-input-affix-wrapper-focused,
        .ant-input-affix-wrapper:active {
            border-color: ${({theme}) => theme.colors.primary};
            box-shadow: 0 0 5px rgba(225, 84, 4, 0.5);
        }

        /* Nút tìm kiếm (button) */
        .ant-input-search-button {
            transition: all 0.5s ease;

            &:hover,
            &:focus {
                border-color: ${({theme}) => theme.colors.primary};

                .anticon-search {
                    color: ${({theme}) => theme.colors.primary};
                }
            }   
        }
    }
  }
`;
