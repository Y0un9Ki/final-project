import React from "react";
import styled from "styled-components";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();

  return (
    <FooterContainer>
      <Nav>
        <StyledButton
          onClick={() => {
            navigate("/");
          }}
        >
          <NavIcon src="/assets/homeicon.png" />
          <NavTitle>메인</NavTitle>
        </StyledButton>
        <StyledButton
          onClick={() => {
            navigate("/letterlist");
          }}
        >
          <NavIcon src="/assets/letteringicon.png" />
          <NavTitle>레터링</NavTitle>
        </StyledButton>
        <StyledButton onClick={() => {}}>
          <NavIcon src="/assets/lifeicon.png" />
          <NavTitle>라이프</NavTitle>
        </StyledButton>
        <StyledButton
          onClick={() => {
            navigate("/signin");
          }}
        >
          <NavIcon src="/assets/usericon.png" />
          <NavTitle>로그인</NavTitle>
        </StyledButton>
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
  box-sizing: border-box;
  box-shadow: 0 -2px 5px rgba(0, 0, 0, 0.1);
  @media (max-width: 600px) {
    padding: 10px 5px;
  }
`;

const Nav = styled.nav`
  display: flex;
  justify-content: space-around;
`;

const StyledButton = styled(Button)`
  display: flex;
  align-items: center;
  cursor: pointer;
  background-color: transparent;
  color: black;
  width: 150px;
  height: 50px;
  &:hover {
  }
  .MuiTouchRipple-root {
    color: #553830;
  }
`;

const NavIcon = styled.img`
  width: 20px;
`;

const NavTitle = styled.p`
  padding-left: 10px;
  color: black;
`;
