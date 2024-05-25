import React from "react";
import styled from "styled-components";
import { IoMenuOutline } from "react-icons/io5";

const Topbar = () => {
  return (
    <Container>
      <Logo src={"assets/logo.png"} />
      <Menu size={32} />
    </Container>
  );
};

export default Topbar;

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  background-color: #e6e1e1;
`;

const Logo = styled.img`
  height: 20px;
`;

const Menu = styled(IoMenuOutline)`
  cursor: pointer;
`;
