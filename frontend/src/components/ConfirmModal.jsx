import React, { useRef, useEffect, useState } from "react";
import styled from "styled-components";
import { gsap } from "gsap";
import LetterTextField from "./LetterTextField";

const ConfirmModal = ({ show, onClose, onClick }) => {
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
      // Disable scroll
      document.body.style.overflow = "hidden";
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
      // Enable scroll
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [show, onClose]);

  return (
    <>
      <Overlay ref={overlayRef} show={show} onClick={onClose} />
      <ModalContainer ref={modalRef} show={show}>
        <ModalContent>
          <h2>👋 답장해주셔서 감사해요!</h2>
          <LetterTextField />
          <LetterTextField text="작성하신 답장은 다시 볼 수 있어요." />
          <LetterTextField text="포인트는 하루에 한번 쌓을 수 있어요." />
          <LetterTextField text="포인트는 500포인트 씩 쌓여요 👍" />
          <LetterTextField text="라이프 페이지에서 포인트 사용이 가능해요!" />
          <LetterTextField />
          <LetterTextField text="작성하신 답장은 수정이 불가해요!" />
          <LetterTextField text="잘 확인해 주세요 🙌" />
          <LetterTextField />
          <LetterTextField text="확인하셨다면 작성할게요 버튼을 눌러주세요!" />
          <ButtonSection>
            <SubmitButton onClick={onClick}>
              <Iconlogo src="/assets/editicon.png" />
              <BtnText>네 작성할게요!</BtnText>
            </SubmitButton>
            <CloseButton onClick={onClose}>닫기</CloseButton>
          </ButtonSection>
        </ModalContent>
      </ModalContainer>
    </>
  );
};

export default ConfirmModal;

const Overlay = styled.div`
  display: ${({ show }) => (show ? "block" : "none")};
  position: fixed;
  top: 0;
  left: 50%;
  width: 600px;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  transform: translateX(-50%);
  z-index: 1150;
`;

const ModalContainer = styled.div`
  display: ${({ show }) => (show ? "block" : "none")};
  position: fixed;
  top: 25%;
  left: 50%;
  width: 400px;
  background: white;
  transform: translate(-50%, -50%);
  z-index: 1200;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
`;

const ModalContent = styled.div`
  position: relative;
  padding: 20px;
`;

const ButtonSection = styled.div`
  display: flex;
  justify-content: space-between;
`;

const SubmitButton = styled.button`
  width: 250px;
  padding: 8px 28px;
  margin-top: 20px;
  border: none;
  border-radius: 5px;
  background-color: ${({ disabled }) => (disabled ? "#f0f0f0" : "#e6e1e1")};
  font-size: 18px;
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  display: flex;
  align-items: center;
  justify-content: space-between;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${({ disabled }) => (disabled ? "#f0f0f0" : "#d1cdcd")};
  }
`;

const CloseButton = styled.button`
  width: 100px;
  margin-top: 20px;
  padding: 10px 20px;
  background-color: #e6e1e1;
  border: none;
  font-size: 16px;
  border-radius: 5px;
  cursor: pointer;
  color: black;
  transition: background-color 0.3s ease;

  &:hover {
    color: white;
    background-color: #f43d39;
  }
`;

const Iconlogo = styled.img`
  width: 20px;
`;

const BtnText = styled.section`
  width: 100%;
`;
