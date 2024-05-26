import React, { useRef, useEffect } from "react";
import styled from "styled-components";
import { gsap } from "gsap";
import LetterTextField from "./LetterTextField";

const LetterModal = ({ show, onClose }) => {
  const modalRef = useRef(null);
  const overlayRef = useRef(null);

  useEffect(() => {
    if (show) {
      gsap.fromTo(
        modalRef.current,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, ease: "power3.out" }
      );
      gsap.fromTo(
        overlayRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.5, ease: "power3.out" }
      );
    } else {
      gsap.to(modalRef.current, {
        y: 50,
        opacity: 0,
        duration: 0.5,
        ease: "power3.in",
        onComplete: onClose,
      });
      gsap.to(overlayRef.current, {
        opacity: 0,
        duration: 0.5,
        ease: "power3.in",
      });
    }
  }, [show, onClose]);

  return (
    <>
      <Overlay ref={overlayRef} show={show} onClick={onClose} />
      <ModalContainer ref={modalRef} show={show}>
        <ModalContent>
          <h2>👋 당신의 이야기를 들려주세요!</h2>
          {[...Array(10)].map((value, index) => {
            return <LetterTextField key={index} />;
          })}
          <TextInput maxLength="200" placeholder="답장 내용을 입력해주세요!" />
          <ButtonSection>
            <SubmitButton>제출하기</SubmitButton>
            <CloseButton onClick={onClose}>닫기</CloseButton>
          </ButtonSection>
        </ModalContent>
      </ModalContainer>
    </>
  );
};

export default LetterModal;

const Overlay = styled.div`
  display: ${({ show }) => (show ? "block" : "none")};
  position: fixed;
  top: 0;
  left: 50%;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  transform: translateX(-50%);
  z-index: 1050;
`;

const ModalContainer = styled.div`
  display: ${({ show }) => (show ? "block" : "none")};
  position: fixed;
  left: 50%;
  width: 400px;
  height: 500px;
  background: white;
  transform: translate(-50%, -50%);
  z-index: 1100;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
`;

const ModalContent = styled.div`
  position: relative;
  padding: 20px;
`;

const CloseButton = styled.button`
  margin-top: 20px;
  padding: 10px 20px;
  background-color: #e6e1e1;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  color: black;

  &:hover {
    color: white;
    background-color: #d2b48c;
  }
`;

const TextInput = styled.textarea`
  position: absolute;
  top: 30px;
  width: 360px;
  height: 380px;
  padding: 10px;
  font-size: 16px;
  border: none;
  resize: none;
  outline: none;
  box-sizing: border-box;
  background-color: transparent;
  color: black;
  line-height: 2.3;

  &:focus {
    outline: none;
  }
`;

const ButtonSection = styled.div`
  display: flex;
  justify-content: space-between;
`;

const SubmitButton = styled.button`
  margin-top: 20px;
  padding: 10px 20px;
  background-color: #e6e1e1;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  color: black;

  &:hover {
    color: white;
    background-color: #d2b48c;
  }
`;
