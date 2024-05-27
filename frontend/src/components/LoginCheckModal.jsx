import React, { useRef, useEffect, useState } from "react";
import styled from "styled-components";
import { gsap } from "gsap";
import LetterTextField from "./LetterTextField";
import Checkbox from "@mui/material/Checkbox";
import { useNavigate } from "react-router-dom";

const LoginCheckModal = ({ show, onClose }) => {
  const modalRef = useRef(null);
  const overlayRef = useRef(null);
  const navigate = useNavigate();

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
          <LetterTextField text="로그인이 필요한 서비스 입니다! 🙌" />
          <LetterTextField text="로그인을 하면 이런 서비스를 받을수 있어요 👋" />
          <LetterTextField />
          <LetterTextField text="✅ 매일 매일 당신을 위한 편지가 도착해요!" />
          <LetterTextField text="✅ 편지에 답장을 주면 포인트를 지급받아요!" />
          <LetterTextField text="✅  매일 매일 챌린지를 제안해요!" />
          <LetterTextField />
          <LetterTextField text="포인트를 이용해서 각종 영화, 뮤지컬, 공연을 " />
          <LetterTextField text="이용할 수 있어요!" />
          <LetterTextField />
          <LetterTextField text="우리 같이 How Are You 에 참여해요! 👊" />
          <LetterTextField />
          <ButtonSection>
            <SubmitButton>
              <Iconlogo src="/assets/user_empty.png" />
              <BtnText
                onClick={() => {
                  navigate("/signin");
                }}
              >
                로그인 하러가기
              </BtnText>
            </SubmitButton>
            <CloseButton onClick={onClose}>닫기</CloseButton>
          </ButtonSection>
        </ModalContent>
      </ModalContainer>
    </>
  );
};

export default LoginCheckModal;

const Overlay = styled.div`
  display: ${({ show }) => (show ? "block" : "none")};
  position: fixed;
  top: 0;
  left: 50%;
  width: 600px;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  transform: translateX(-50%);
  z-index: 1050;
`;

const ModalContainer = styled.div`
  display: ${({ show }) => (show ? "block" : "none")};
  position: fixed;
  top: 15%;
  left: 50%;
  width: 400px;
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

const CheckBoxField = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  margin-top: 4px;
  border-bottom: 1px solid #ddd;
  min-height: 32px;
`;

const CheckboxText = styled.label`
  font-size: 16px;
  cursor: pointer;
`;
