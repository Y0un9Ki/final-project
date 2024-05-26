import React, { useState, useEffect } from "react";
import styled from "styled-components";
import DaumPostcode from "react-daum-postcode";
import Topbar from "../components/Topbar";
import Header from "../components/Header";
import LetterTextField from "../components/LetterTextField";
import InputField from "../components/InputField";

const Mypage = () => {
  return (
    <Container>
      <Header />
      <Body>
        <TopSection>
          <LetterSection>
            <LetterTextField text="👋 만나서 반가워요" />
            <LetterTextField text="🙌 오늘 하루도 화이팅!" />
            <LetterTextField />
          </LetterSection>
          <ImageSection>
            <ProfileImg src="assets/defaultprofile.png" />
          </ImageSection>
        </TopSection>
        <LetterTextField />
        <TopSection>
          <LetterTextField text="보유 포인트" />
          <LetterTextField text="15,000" />
        </TopSection>
        <LetterTextField />
        <LetterTextField text="아이디" />
        <LetterTextField />
        <LetterTextField text="이름" />
        <LetterTextField />
        <LetterTextField text="생년월일" />
        <LetterTextField />
        <LetterTextField text="전화번호" />
        <LetterTextField />
        <LetterTextField text="주소" />
        <LetterTextField />
        <LetterTextField />
        <EditButton>
          <Iconlogo src="assets/editicon.png" alt="hand icon" />
          <BtnText>회원정보 변경</BtnText>
        </EditButton>
      </Body>
    </Container>
  );
};

export default Mypage;

const Container = styled.div`
  margin: auto;
  padding-bottom: 20px;
  max-width: 600px;
  min-height: 100vh;
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

const Iconlogo = styled.img`
  width: 28px;
`;

const BtnText = styled.section`
  font-size: 20px;
  width: 100%;
`;
