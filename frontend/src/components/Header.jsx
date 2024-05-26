import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import { IoMenuOutline } from "react-icons/io5";
import { gsap } from "gsap";

const Header = () => {
  const textRef = useRef(null);

  useEffect(() => {
    gsap.from(textRef.current, {
      duration: 1,
      y: 50,
      opacity: 0,
      ease: "power3.out",
    });
  }, []);

  return (
    <>
      <Container>
        <Logo src={"assets/logo.png"} />
      </Container>
      <TextSection>
        <Text ref={textRef}>오늘 하루는 어때요?</Text>
      </TextSection>
    </>
  );
};

export default Header;

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

const TextSection = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  height: 60px;
  background-color: #e6e1e1;
  padding-right: 16px;
  overflow: hidden;
`;

const Text = styled.p`
  font-size: 24px;
  margin: 0;
`;
