import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { IoMenuOutline } from "react-icons/io5";

const Topbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  const handleScroll = () => {
    if (window.scrollY > 0) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <Container isScrolled={isScrolled}>
      <Logo src={"assets/logo.png"} />
    </Container>
  );
};

export default Topbar;

const Container = styled.div`
  position: fixed;
  top: 0;
  width: 100%;
  max-width: 600px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: ${(props) => (props.isScrolled ? "#eee8e8" : "#e6e1e1")};
  transition: background-color 0.3s ease;
  z-index: 1000;
  box-shadow: ${(props) =>
    props.isScrolled ? "0 2px 4px rgba(0, 0, 0, 0.1)" : "none"};
  height: 56px;
`;

const Logo = styled.img`
  margin-left: 20px;
  height: 20px;
`;

const Menu = styled(IoMenuOutline)`
  cursor: pointer;
`;
