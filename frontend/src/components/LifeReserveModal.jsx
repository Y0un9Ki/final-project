import React, { useRef, useEffect } from "react";
import styled from "styled-components";
import { gsap } from "gsap";
import LetterTextField from "./LetterTextField";

const LifeReserveModal = ({ show, onClose }) => {
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

    // Cleanup on component unmount
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [show, onClose]);

  return (
    <>
      <Overlay ref={overlayRef} show={show} onClick={onClose} />
      <ModalContainer ref={modalRef} show={show}>
        <ModalContent>
          <h2>👋 예약전 확인할 정보입니다!</h2>
          <LetterTextField />
          <LetterTextField text="본 티켓은 양도 및 판매가 불가능 합니다." />
          <LetterTextField text="예약 취소 방침을 미리 확인해 주세요." />
          <LetterTextField />
          <LetterTextField text="좌석은 임의로 배정됩니다." />
          <LetterTextField text="예약 확정 시 보유 포인트 만큼 차감됩니다." />
          <LetterTextField text="티켓 구매 내역은 1년간 보관됩니다." />
          <LetterTextField />
          <LetterTextField text="공연 시작 10분 전 부터 입장 가능합니다." />
          <LetterTextField text="입장 시 본 티켓을 보여주세요." />
          <LetterTextField text="공연 중 소음을 자제해 주세요." />
          <LetterTextField text="식음료 여부는 각 공연장 방침을 확인해주세요." />
          <LetterTextField />
          <LetterTextField text="즐거운 공연관람 되세요." />
          <ButtonSection>
            <SubmitButton>
              <Iconlogo src="/assets/ticketicon.png" />
              <BtnText>예약 확정하기</BtnText>
            </SubmitButton>
            <CloseButton onClick={onClose}>닫기</CloseButton>
          </ButtonSection>
        </ModalContent>
      </ModalContainer>
    </>
  );
};

export default LifeReserveModal;

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
  top: 20%;
  left: 50%;
  width: 400px;
  height: 640px;
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
  background-color: #e6e1e1;
  font-size: 18px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #d1cdcd;
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
