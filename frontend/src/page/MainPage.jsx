import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import { gsap } from "gsap";
import Topbar from "../components/Topbar";
import LetteringInfo from "../components/LetteringInfo";
import LifeInfo from "../components/LifeInfo";

const MainPage = () => {
  const infoTextRefs = useRef([]);
  const infoTitleRefs = useRef([]);

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
      <Info>
        <InfoImageSection>
          <InfoImage src="assets/char.png" />
        </InfoImageSection>
        <InfoTextSection>
          <InfoText ref={(el) => (infoTextRefs.current[0] = el)}>
            오늘 하루는 어때요?
          </InfoText>
          <InfoText ref={(el) => (infoTextRefs.current[1] = el)}>
            당신의 이야기가 듣고싶어요!
          </InfoText>
          <InfoText ref={(el) => (infoTextRefs.current[2] = el)}>
            다양한 이야기를 들려주세요!
          </InfoText>
        </InfoTextSection>
      </Info>
      <ContentSection>
        <LetteringTitle ref={(el) => (infoTitleRefs.current[0] = el)}>
          <ContentLogo src="assets/letteringIcon.png" />
          레터링
        </LetteringTitle>
        <LetteringTitle ref={(el) => (infoTitleRefs.current[1] = el)}>
          여러분의 오늘이 궁금해요!
        </LetteringTitle>
      </ContentSection>
      <LetteringInfo />
      <ContentSection>
        <LetteringTitle ref={(el) => (infoTitleRefs.current[2] = el)}>
          <ContentLogo src="assets/lifeIcon.png" />
          라이프
        </LetteringTitle>
        <LetteringTitle ref={(el) => (infoTitleRefs.current[3] = el)}>
          우리 같이 만나요!
        </LetteringTitle>
      </ContentSection>
      <LifeInfo />
      <LifeInfo />
      <LifeInfo />
    </Container>
  );
};

export default MainPage;

const Container = styled.div`
  margin: auto;
  padding-bottom: 20px;
  max-width: 600px;
  min-height: 100vh;
  background-color: #f4f4f4;
`;

const Info = styled.section`
  display: flex;
  height: 360px;
  background-color: #e6e1e1;
`;

const InfoTextSection = styled.section`
  width: 50%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const InfoImageSection = styled.section`
  width: 50%;
  height: 100%;
  display: flex;
  align-items: flex-end;
`;

const InfoImage = styled.img`
  width: 100%;
  align-self: flex-end;
  margin: 0 10px;
`;

const InfoText = styled.p`
  margin: 10px 0;
  font-size: 18px;
`;

const ContentSection = styled.section`
  display: flex;
  flex-direction: column;
  padding: 40px;
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
