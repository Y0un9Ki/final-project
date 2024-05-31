import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import DaumPostcode from "react-daum-postcode";
import Topbar from "../components/Topbar";
import LetterTextField from "../components/LetterTextField";
import { gsap } from "gsap";
import Grow from "@mui/material/Grow";
import { API } from "../utils/ApiConfig";
import LogoutModal from "../components/LogoutModal";

const Mypage = () => {
  const [showModal, setShowModal] = useState(false);
  const infoTextRefs = useRef([]);
  const infoTitleRefs = useRef([]);
  const token = localStorage.getItem("AuthToken");
  const [data, setData] = useState("");
  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  const formattingDate = (dateStr) => {
    const date = new Date(dateStr);
    return `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일`;
  };

  const formattingNumber = (phoneNumber) => {
    const cleaned = ("" + phoneNumber).replace(/\D/g, "");
    const match = cleaned.match(/^(\d{3})(\d{4})(\d{4})$/);
    if (match) {
      return match[1] + " - " + match[2] + " - " + match[3];
    }
    return phoneNumber;
  };

  useEffect(() => {
    fetch(`${API.mypage}`, {
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
          USER 님!
        </LetteringTitle>
        <LetteringTitle ref={(el) => (infoTitleRefs.current[1] = el)}>
          How Are You에 오신걸 환영해요!
        </LetteringTitle>
      </ContentSection>
      <Grow in={true} style={{ transformOrigin: "0 0 2" }} timeout={700}>
        <div>
          <Body>
            <TopSection>
              <LetterSection>
                <LetterTextField text="👋 만나서 반가워요" />
                <LetterTextField text="🙌 오늘 하루도 화이팅!" />
                <LetterTextField />
              </LetterSection>
              <ImageSection>
                <ProfileImg src="/assets/defaultprofile.png" />
              </ImageSection>
            </TopSection>
            <LetterTextField />
            <TopSection>
              <LetterTextField text="보유 포인트" />
              <LetterTextField text={!data?.point ? 0 : data?.point} />
            </TopSection>
            <LetterTextField />
            <LetterTextField text="아이디" />
            <LetterTextField text={data?.email} />
            <LetterTextField text="이름" />
            <LetterTextField text={data?.username} />
            <LetterTextField text="생년월일" />
            <LetterTextField text={formattingDate(data?.birthday)} />
            <LetterTextField text="전화번호" />
            <LetterTextField text={formattingNumber(data?.number)} />
            <LetterTextField text="주소" />
            <LetterTextField text={data?.location} />
            <LetterTextField />
            <EditButton>
              <Iconlogo src="/assets/editicon.png" alt="hand icon" />
              <BtnText>회원정보 변경</BtnText>
            </EditButton>
            <SignOutButton onClick={openModal}>
              <Iconlogo src="/assets/user_empty.png" alt="hand icon" />
              <BtnText>로그아웃</BtnText>
            </SignOutButton>
          </Body>
        </div>
      </Grow>
      <LogoutModal show={showModal} onClose={closeModal} />
    </Container>
  );
};

export default Mypage;

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
  margin: 50px auto;
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

const ImageSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 45%;
`;
const ProfileImg = styled.img`
  width: 100px;
`;

const EditButton = styled.button`
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
  width: 28px;
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
