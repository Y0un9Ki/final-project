import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import Topbar from "../components/Topbar";
import LetterTextField from "../components/LetterTextField";
import { gsap } from "gsap";
import LetterModal from "../components/LetterModal";
import { API } from "../utils/ApiConfig";
import { useLocation } from "react-router-dom";

const Lettering = () => {
  const infoTextRefs = useRef([]);
  const infoTitleRefs = useRef([]);
  const [showModal, setShowModal] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [data, setData] = useState("");
  const location = useLocation();
  const id = location.state;
  const token = localStorage.getItem("AuthToken");

  const onChangeHandler = (e) => {
    setInputValue(e.target.value);
  };

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  const answerHandler = () => {
    fetch(`${API.addAnswer}`, {
      headers: {
        Authorization: `JWT ${token}`,
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        comment: inputValue,
        question: data.question_id,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
      });
  };

  useEffect(() => {
    fetch(`${API.letterList}${id}`, {
      headers: {
        Authorization: `JWT ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setData(data);
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
      <ContentSection>
        <LetteringTitle ref={(el) => (infoTitleRefs.current[0] = el)}>
          <ContentLogo src="/assets/letteringIcon.png" />
          레터링
        </LetteringTitle>
        <LetteringTitle ref={(el) => (infoTitleRefs.current[1] = el)}>
          당신을 위한 편지가 도착했어요!
        </LetteringTitle>
      </ContentSection>
      <Body>
        <LetterTextField text="👋 만나서 반가워요" />
        {data &&
          data.question_content?.map((quesData, i) => {
            return (
              <>
                <LetterTextField key={i} text={quesData} />
              </>
            );
          })}
        <LetterTextField text="오늘 하루도 화이팅 👊" />
        {[...Array(4)].map((value, index) => {
          return <LetterTextField key={index} />;
        })}
        <BottomSection>
          <LetterTextField />
          <Response>
            {data.question_answer?.length === 0 ? (
              <ResText onClick={openModal}>답장하기</ResText>
            ) : null}
            <LetterModal
              show={showModal}
              onClose={closeModal}
              value={inputValue}
              onChange={onChangeHandler}
              onClick={answerHandler}
            />
          </Response>
        </BottomSection>
        <LetterImage src="/assets/char3.png" />
      </Body>
      {data.question_answer?.length > 0 ? (
        <Body>
          <LetterTextField text="👋 안녕하세요!" />
          {data &&
            data.question_answer?.map((ansData, i) => {
              return (
                <>
                  <LetterTextField key={i} text={ansData} />
                </>
              );
            })}
          <LetterTextField text="편지 고마워요! 👊" />
          {[...Array(4)].map((value, index) => {
            return <LetterTextField key={index} />;
          })}
          <BottomSection>
            <LetterTextField />
          </BottomSection>
          <LetterImage src="/assets/char4.png" />
        </Body>
      ) : null}
    </Container>
  );
};

export default Lettering;

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

const ResText = styled.p`
  margin: 4px 20px;
  align-self: flex-end;
  cursor: pointer;
  font-size: 20px;
  color: #aaa;
  transition: color 0.3s ease;
  &:hover {
    color: #000;
  }
`;

const LetterImage = styled.img`
  position: absolute;
  bottom: 20px;
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
