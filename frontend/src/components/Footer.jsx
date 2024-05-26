import React from "react";
import styled from "styled-components";

const Footer = () => {
  return (
    <FooterContainer>
      <Nav>
        <NavItem>Home</NavItem>
        <NavItem>About</NavItem>
        <NavItem>Services</NavItem>
        <NavItem>Contact</NavItem>
      </Nav>
    </FooterContainer>
  );
};

export default Footer;

const FooterContainer = styled.footer`
  position: fixed;
  left: 50%;
  bottom: 0;
  transform: translateX(-50%);
  width: 100%;
  max-width: 600px;
  background-color: #e6e1e1;
  text-align: center;
  padding: 10px 0;
  box-sizing: border-box;
  box-shadow: 0 -2px 5px rgba(0, 0, 0, 0.1); /* 상단에 옅은 그림자 추가 */

  @media (max-width: 600px) {
    padding: 10px 5px;
  }
`;

const Nav = styled.nav`
  display: flex;
  justify-content: space-around;
`;

const NavItem = styled.div`
  flex: 1;
  padding: 10px;
  cursor: pointer;

  &:hover {
    background-color: #444;
  }
`;
