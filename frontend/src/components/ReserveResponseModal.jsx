import React, { useRef, useEffect, useState } from "react";
import styled from "styled-components";
import { gsap } from "gsap";
import LetterTextField from "./LetterTextField";
import { useNavigate } from "react-router-dom";

const ReserveResponseModal = ({ show, onClose, status }) => {
  const modalRef = useRef(null);
  const overlayRef = useRef(null);
  const navigate = useNavigate("");

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
          {status ? (
            <>
              <h2>👋 예약해 주셔서 감사해요</h2>
              <LetterTextField />
              <LetterTextField text="예약하신 상품은 마이페이지에서 볼 수 있어요!" />
              <LetterTextField />
              <LetterTextField text="✅ 관람 전 시간을 확인해주세요" />
              <LetterTextField text="✅ 관람 전 장소를 확인해 주세요 👍" />
              <LetterTextField />
              <LetterTextField text="예약 현황을 보려면 확인할게요 버튼을 눌러주세요!" />
              <LetterTextField text="계속 보려면 여기서 볼게요 버튼을 눌러주세요!" />
              <LetterTextField />
              <LetterTextField text="즐거운 시간 보내세요! 👋" />
            </>
          ) : (
            <>
              <h2>🥲 포인트가 부족해요</h2>
              <LetterTextField />
              <LetterTextField text="포인트를 쌓고 상품을 예약할 수 있어요!" />
              <LetterTextField />
              <LetterTextField text="✅ 포인트는 하루에 한번 쌓을 수 있어요." />
              <LetterTextField text="✅ 포인트는 500포인트 씩 쌓여요 👍" />
              <LetterTextField text="✅ 챌린지를 통해 포인트를 쌓을수 있어요" />
              <LetterTextField />
              <LetterTextField text="편지를 쓰려면 답장할게요 버튼을 눌러주세요!" />
              <LetterTextField text="계속 보려면 여기서 볼게요 버튼을 눌러주세요!" />
            </>
          )}
          <ButtonSection>
            {status ? (
              <SubmitButton
                onClick={() => {
                  navigate("/reserveList");
                }}
              >
                <Iconlogo src="/assets/editicon.png" />
                <BtnText>확인할게요!</BtnText>
              </SubmitButton>
            ) : (
              <SubmitButton
                onClick={() => {
                  navigate("/letterlist");
                }}
              >
                <Iconlogo src="/assets/editicon.png" />
                <BtnText>답장 할게요!</BtnText>
              </SubmitButton>
            )}
            {status ? (
              <CloseButton onClick={onClose}>여기서 볼게요!</CloseButton>
            ) : (
              <CloseButton onClick={onClose}>여기서 볼게요!</CloseButton>
            )}
          </ButtonSection>
        </ModalContent>
      </ModalContainer>
    </>
  );
};

export default ReserveResponseModal;

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
  width: 50%;
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
  width: 45%;
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
