import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import Topbar from "../components/Topbar";
import LetterTextField from "../components/LetterTextField";
import { gsap } from "gsap";
import LifeReserveModal from "../components/LifeReserveModal";
import Grow from "@mui/material/Grow";

const LifeDetail = () => {
  const infoTextRefs = useRef([]);
  const infoTitleRefs = useRef([]);
  const [showModal, setShowModal] = useState(false);

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  useEffect(() => {
    gsap.from(infoTextRefs.current, {
      duration: 1,
      y: 20,
      opacity: 0,
      stagger: 0.7,
      ease: "power3.out",
    });
    gsap.from(infoTitleRefs.current, {
      duration: 1,
      y: 20,
      opacity: 0,
      stagger: 0.7,
      ease: "power3.out",
    });
  }, []);

  return (
    <Container>
      <Topbar />
      <ContentSection>
        <LetteringTitle ref={(el) => (infoTitleRefs.current[0] = el)}>
          <ContentLogo src="/assets/letteringIcon.png" />
          라이프
        </LetteringTitle>
        <LetteringTitle ref={(el) => (infoTitleRefs.current[1] = el)}>
          포인트를 통해 문화공연을 즐겨봐요!
        </LetteringTitle>
      </ContentSection>
      <Body>
        <LetterTextField text="당신을 위한 공연을 준비했어요 👏" />
        <LetterTextField text="공연 제목" />
        <LetterTextField />
        <LetterTextField text="등장인물 및 배우" />
        <LetterTextField />
        <LetterTextField text="포인트" />
        <LetterTextField />
        <LetterTextField text="상영날짜" />
        <LetterTextField />
        <LetterTextField text="장소 및 위치" />
        <LetterTextField />
        {[...Array(4)].map((value, index) => {
          return <LetterTextField key={index} />;
        })}
        <BottomSection>
          <LetterTextField />
        </BottomSection>
        <SubmitButton>
          <Iconlogo src="/assets/ticketicon.png" />
          <BtnText onClick={openModal}>공연 예약하기</BtnText>
          <LifeReserveModal show={showModal} onClose={closeModal} />
        </SubmitButton>
        <LetterImage src="/assets/char4.png" />
      </Body>
    </Container>
  );
};

export default LifeDetail;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: auto;
  padding-top: 80px;
  padding-bottom: 80px;
  max-width: 600px;
  min-height: 90vh;
  background-color: #f4f4f4;
`;

const Body = styled.div`
  position: relative;
  width: 320px;
  margin: 50px auto;
  padding: 20px;
  border-radius: 10px;
  background-color: #fff;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const BottomSection = styled.div`
  display: flex;
`;

const Response = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 100%;
  margin-top: 4px;
  border-bottom: 1px solid #ddd;
  min-height: 32px;
`;

const LetterImage = styled.img`
  position: absolute;
  right: 28px;
  bottom: 78px;
  height: 160px;
`;

const ContentSection = styled.section`
  display: flex;
  flex-direction: column;
  height: 30px;
`;

const LetteringTitle = styled.p`
  display: flex;
  align-items: center;
  font-size: 20px;
  margin-bottom: 12px;
`;

const ContentLogo = styled.img`
  width: 24px;
  margin-right: 10px;
`;

const SubmitButton = styled.button`
  width: 320px;
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

const Iconlogo = styled.img`
  width: 20px;
`;

const BtnText = styled.section`
  width: 100%;
`;
