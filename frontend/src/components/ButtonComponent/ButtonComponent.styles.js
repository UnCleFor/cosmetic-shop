import styled from "styled-components";

export const StyledButton = styled.button `
    background-color: ${({ theme }) => theme.colors.primary};
    color: white;
    border: none;
    border-radius: 6px;
    padding: 0.8rem 1.6rem;
    font-size: 1rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.5s ease;

    &:hover {
        background-color: ${({ theme }) => theme.colors.primaryDark};
    }

    &:active {
        transform: scale(0.98);
    }
`;