// FloatingBubble.js
import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import { gsap } from "gsap";

const FloatingBubble = () => {
  const bubbleRef = useRef(null);

  useEffect(() => {
    gsap.to(bubbleRef.current, {
      duration: 1,
      y: 5,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut",
    });
  }, []);

  return <Bubble ref={bubbleRef}>로그인이 필요해요!</Bubble>;
};

export default FloatingBubble;

const Bubble = styled.div`
  position: absolute;
  bottom: 40px;
  left: -50px;
  background: #938888;
  border-radius: 12px;
  width: 120px;
  height: 40px;
  display: flex;
  color: white;
  justify-content: center;
  align-items: center;
  font-size: 11px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);

  &:after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 50%;
    width: 0;
    height: 0;
    border: 15px solid transparent;
    border-top-color: #938888;
    border-bottom: 0;
    margin-bottom: -5px;
  }

  @media (max-width: 500px) {
    bottom: 35px;
    left: -20px;
    width: 80px;
    height: 30px;
    font-size: 8px;

    &:after {
      border: 10px solid transparent;
      border-top-color: #938888;
      margin-bottom: -15px;
    }
  }
`;
