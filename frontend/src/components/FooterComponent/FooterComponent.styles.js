import styled from "styled-components";
import {
    FacebookOutlined,
    InstagramOutlined
} from "@ant-design/icons";

export const FooterWrapper = styled.footer `
    background-color: #ffff
    color: #fff;
    padding: 20px 40px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 0.9rem;
`;

export const FooterLeft = styled.div `
    display: flex;
    align-items: center;
    gap: 10px;
`;

export const Logo = styled.img `
    width: 40px;
    height: 40px;
    border-radius: 50%;
`;

export const Info = styled.div `
    display: flex;
    flex-direction: column;
    gap: 4px;
`;

export const FooterRight = styled.div `
    display: flex;
    gap: 12px;
    font-size: 2rem;
`;

export const FacebookIcon = styled(FacebookOutlined) `
    cursor: pointer;
    color: #000;

    &:hover {
        transition: all 0.5s ease;
        color: ${({theme}) => theme.colors.primary};
    }
`;

export const InstagramIcon = styled(InstagramOutlined) `
    cursor: pointer;
    color: #000;

    &:hover {
        transition: all 0.5s ease;
        color: ${({theme}) => theme.colors.primary};
    }
`;