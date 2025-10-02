import styled from 'styled-components';

export const SidebarWrapper = styled.div`
  width: ${(props) => (props.isOpen ? '250px' : '0')}; /* Chiều rộng sidebar khi mở */
  background-color: #2c3e50;
  color: white;
  height: 100vh;
  padding-top: 50px;
  position: fixed;
  overflow: hidden;
  transition: width 0.3s ease;
  z-index: 1; /* Đảm bảo sidebar luôn nổi trên các phần tử khác */

  @media (max-width: 768px) {
    width: ${(props) => (props.isOpen ? '250px' : '0')};
  }
`;

export const MenuButton = styled.button`
  display: block;
  background-color: #2c3e50;
//   color: white;
  border: none;
  font-size: 30px;
  padding: 10px;
  cursor: pointer;
//   position: absolute;
//   top: 10px;
//   left: 10px;
  z-index: 2;  /* Đảm bảo nút menu luôn hiển thị ở trên cùng */

  @media (min-width: 769px) {
    display: none; /* Không hiển thị nút menu trên các màn hình lớn hơn */
  }
`;

export const NavLink = styled.a`
  display: block;
  padding: 15px;
  text-decoration: none;
  color: white;
  margin-bottom: 10px;
  &:hover {
    background-color: #34495e;
  }
`;