import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { gsap } from "gsap";
import Topbar from "../components/Topbar";
import LetteringInfo from "../components/LetteringInfo";
import LifeInfo from "../components/LifeInfo";
import Header from "../components/Header";
import LifeListContainer from "../components/LifeListContainer";
import Grow from "@mui/material/Grow";
import { API } from "../utils/ApiConfig";
import LoginCheckModal from "../components/LoginCheckModal";

const MainPage = () => {
  const infoTextRefs = useRef([]);
  const infoTitleRefs = useRef([]);
  const [data, setData] = useState();
  const token = localStorage.getItem("AuthToken");

  useEffect(() => {
    fetch(`${API.mainLifeList}`, {
      headers: {
        Authorization: `JWT ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        return res.json();
      })
      .then((data) => {
        setData(data);
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
      });
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
          <InfoImage src="/assets/char.png" />
        </InfoImageSection>
        <InfoTextSection>
          <InfoText ref={(el) => (infoTextRefs.current[0] = el)}>
            오늘 하루는 어때요?
          </InfoText>
          <InfoText ref={(el) => (infoTextRefs.current[1] = el)}>
            당신의 이야기가 듣고싶어요!
          </InfoText>
          <InfoText ref={(el) => (infoTextRefs.current[2] = el)}>
            다양한 이야기를 들려주세요! 🤙
          </InfoText>
        </InfoTextSection>
      </Info>
      <ContentSection>
        <LetteringTitle ref={(el) => (infoTitleRefs.current[0] = el)}>
          <ContentLogo src="/assets/letteringIcon.png" />
          레터링
        </LetteringTitle>
        <LetteringTitle ref={(el) => (infoTitleRefs.current[1] = el)}>
          여러분의 오늘이 궁금해요! 🙌
        </LetteringTitle>
      </ContentSection>
      <LetteringInfo />
      <ContentSection>
        <LetteringTitle ref={(el) => (infoTitleRefs.current[2] = el)}>
          <ContentLogo src="/assets/lifeIcon.png" />
          라이프
        </LetteringTitle>
        <LetteringTitle ref={(el) => (infoTitleRefs.current[3] = el)}>
          우리 같이 만나요! 👊
        </LetteringTitle>
      </ContentSection>
      {data &&
        data?.map((listdata) => {
          return (
            <Grow
              key={listdata.id}
              in={true}
              style={{ transformOrigin: "0 0 2" }}
              timeout={700}
            >
              <div>
                <LifeListContainer
                  id={listdata.id}
                  dateStr={listdata.startdate}
                  title={listdata.name}
                  subtitle={listdata.subname}
                  price={listdata.price}
                  category={listdata.category}
                />
              </div>
            </Grow>
          );
        })}
    </Container>
  );
};

export default MainPage;

const Container = styled.div`
  margin: auto;
  padding-bottom: 60px;
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
  padding-top: 56px;
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
