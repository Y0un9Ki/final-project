import React, { useState, useEffect } from "react";
import styled from "styled-components";
import DaumPostcode from "react-daum-postcode";
import Topbar from "../components/Topbar";
import Header from "../components/Haeder";
import LetterTextField from "../components/LetterTextField";
import InputField from "../components/InputField";

const SignUp = () => {
  return (
    <Container>
      <Header />
      <Body>
        <LetterTextField text="👋 만나서 반가워요" />
        <LetterTextField text="🙌 오늘 하루도 화이팅!" />
        <LetterTextField />
        <LetterTextField text="사용하실 아이디를 입력해주세요" />
        <InputField placeholder="HowAreYou@email.com" type="text" />
        <LetterTextField text="사용하실 비밀번호를 입력해주세요" />
        <InputField placeholder="************" type="password" />
        <LetterTextField text="비밀번호를 확인해주세요" />
        <InputField placeholder="************" type="password" />
        <LetterTextField text="생년월일을 입력해주세요" />
        <InputField placeholder="2024-01-01" type="text" />
        <LetterTextField text="전화번호를 입력해주세요" />
        <InputField placeholder="01012345678" type="text" />
        <LetterTextField text="주소를 입력해주세요" />
        <InputField placeholder="서울특별시 영등포구 영등포로" type="text" />
        <LetterTextField />
        <LoginButton>
          <Iconlogo src="assets/signicon.png" alt="hand icon" />
          <BtnText>회원가입</BtnText>
        </LoginButton>
      </Body>
    </Container>
  );
};

export default SignUp;

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

const LoginButton = styled.button`
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
