import React, { useState } from "react";
import styled from "styled-components";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import LoginCheckModal from "./LoginCheckModal";

const Footer = () => {
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem("AuthToken");

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  return (
    <FooterContainer>
      <Nav>
        <StyledButton
          onClick={() => {
            navigate("/");
          }}
          startIcon={<NavIcon src="/assets/homeicon.png" />}
        >
          <NavTitle>메인</NavTitle>
        </StyledButton>
        <StyledButton
          onClick={
            !token
              ? openModal
              : () => {
                  navigate("/letterlist");
                }
          }
          startIcon={<NavIcon src="/assets/letteringicon.png" />}
        >
          <NavTitle>레터링</NavTitle>
        </StyledButton>
        <StyledButton
          onClick={
            !token
              ? openModal
              : () => {
                  navigate("/lifelist");
                }
          }
          startIcon={<NavIcon src="/assets/lifeicon.png" />}
        >
          <NavTitle>라이프</NavTitle>
        </StyledButton>
        {!token ? (
          <StyledButton
            onClick={() => {
              navigate("/signin");
            }}
            startIcon={<NavIcon src="/assets/usericon.png" />}
          >
            <NavTitle>로그인</NavTitle>
          </StyledButton>
        ) : (
          <StyledButton
            onClick={() => {
              navigate("/mypage");
            }}
            startIcon={<NavIcon src="/assets/usericon.png" />}
          >
            <NavTitle>마이페이지</NavTitle>
          </StyledButton>
        )}
      </Nav>
      <LoginCheckModal show={showModal} onClose={closeModal} />
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
  font-size: 14px;
  padding-left: 10px;
  color: black;
`;
