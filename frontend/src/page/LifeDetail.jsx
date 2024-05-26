import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import Topbar from "../components/Topbar";
import LetterTextField from "../components/LetterTextField";
import { gsap } from "gsap";
import LetterModal from "../components/LetterModal";

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
          당신을 위한 공연입니다!
        </LetteringTitle>
      </ContentSection>
      <Body>
        <LetterTextField text="👋 만나서 반가워요" />
        <LetterTextField text="매일 당신에게 편지를 보내려해요" />
        <LetterTextField text="앞으로 만들어나갈 우리 이야기를 위해" />
        <LetterTextField text="다짐하는 글을 부탁해요!" />
        {[...Array(4)].map((value, index) => {
          return <LetterTextField key={index} />;
        })}
        <BottomSection>
          <LetterTextField />
          <Response>
            <LetterModal show={showModal} onClose={closeModal} />
          </Response>
        </BottomSection>
        <LetterImage src="/assets/char4.png" />
        <LetterTextField text="👋 만나서 반가워요" />
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
  padding-bottom: 20px;
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
  bottom: 58px;
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
