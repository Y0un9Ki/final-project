import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import DaumPostcode from "react-daum-postcode";
import Topbar from "../components/Topbar";
import LetterTextField from "../components/LetterTextField";
import { gsap } from "gsap";
import Grow from "@mui/material/Grow";
import { API } from "../utils/ApiConfig";
import LogoutModal from "../components/LogoutModal";
import { useNavigate } from "react-router-dom";
import ReserveContainer from "../components/ReserveContainer";

const ReserveList = () => {
  const infoTextRefs = useRef([]);
  const infoTitleRefs = useRef([]);
  const token = localStorage.getItem("AuthToken");
  const [data, setData] = useState("");
  const navigate = useNavigate("");

  const formattingDate = (dateStr) => {
    const date = new Date(dateStr);
    return `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일`;
  };

  useEffect(() => {
    fetch(`${API.reserve}`, {
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
      <ContentSection>
        <LetteringTitle ref={(el) => (infoTitleRefs.current[0] = el)}>
          <ContentLogo src="/assets/usericon.png" />
          당신을 위한 공연이에요!
        </LetteringTitle>
      </ContentSection>
      <Grow in={true} style={{ transformOrigin: "0 0 2" }} timeout={700}>
        <div>
          <Body>
            <TopSection>
              <LetterSection>
                <LetterTextField text="👋 장소를 확인해주세요!" />
                <LetterTextField text="🙌 날짜를 확인해주세요!" />
                <LetterTextField />
              </LetterSection>
              <ImageSection>
                <ProfileImg src="/assets/defaultprofile.png" />
              </ImageSection>
            </TopSection>
            <LetterTextField />
            {data &&
              data?.map((datalist) => {
                return (
                  <ReserveContainer
                    key={datalist.id}
                    title={datalist.performance_name}
                    date={formattingDate(datalist.performance_startdate)}
                    performanceId={datalist.performance}
                  />
                );
              })}
            <LetterTextField />
            <LetterTextField />
            <NavButton
              onClick={() => {
                navigate("/mypage");
              }}
            >
              <Iconlogo src="/assets/user_empty.png" alt="hand icon" />
              <BtnText>마이페이지</BtnText>
            </NavButton>
          </Body>
        </div>
      </Grow>
    </Container>
  );
};

export default ReserveList;

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
  width: 320px;
  margin: 20px auto;
  padding: 20px;
  border-radius: 10px;
  background-color: #fff;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const TopSection = styled.div`
  display: flex;
`;

const LetterSection = styled.div`
  display: flex;
  flex-direction: column;
  width: 55%;
`;

const LetterText = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: max-content;
  width: 80%;
  border-bottom: 1px solid #ddd;
  min-height: 32px;
  cursor: pointer;
  transition: 0.3s ease-in-out;
  &:hover {
    background-color: #ddd;
    border-radius: 8px;
  }
`;

const ImageSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 45%;
`;
const ProfileImg = styled.img`
  width: 100px;
`;

const NavButton = styled.button`
  width: 100%;
  padding: 8px 28px;
  margin: 10px 0;
  border: none;
  border-radius: 5px;
  background-color: #e6e1e1;
  font-size: 16px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #d1cdcd;
  }
`;

const SignOutButton = styled.button`
  width: 100%;
  padding: 8px 28px;
  margin: 10px 0;
  border: none;
  border-radius: 5px;
  background-color: #e46c68;
  color: white;
  font-size: 16px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #f53c36;
  }
`;

const Iconlogo = styled.img`
  margin-left: 4px;
  width: 20px;
`;

const BtnText = styled.section`
  font-size: 20px;
  width: 100%;
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

const Wrap = styled.div`
  display: flex;
  align-items: center;
`;
