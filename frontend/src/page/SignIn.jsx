import React from "react";
import styled from "styled-components";
import Topbar from "../components/Topbar";
import Header from "../components/Haeder";
import LetterTextField from "../components/LetterTextField";
import InputField from "../components/InputField";

const SignIn = () => {
  return (
    <Container>
      <Header />
      <Body>
        <LetterTextField text="👋 만나서 반가워요" />
        <LetterTextField text="🙌 오늘 하루도 화이팅!" />
        <LetterTextField />
        <LetterTextField text="아이디를 입력해주세요" />
        <InputField placeholder="HowAreYou@email.com" type="text" />
        <LetterTextField text="비밀번호를 입력해주세요" />
        <InputField placeholder="************" type="password" />
        <LetterTextField />
        <LoginButton>
          <Iconlogo src="assets/signicon.png" alt="hand icon" />
          <BtnText>로그인</BtnText>
        </LoginButton>
        <KakaoLoginButton>
          <Iconlogo src="assets/kakaoicon.png" alt="Kakao logo" />
          <BtnText>카카오 로그인</BtnText>
        </KakaoLoginButton>
      </Body>
    </Container>
  );
};

export default SignIn;

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

const KakaoLoginButton = styled(LoginButton)`
  background-color: #ffe812;
  &:hover {
    background-color: #ffd900;
  }
`;

const Iconlogo = styled.img`
  width: 28px;
`;

const BtnText = styled.section`
  font-size: 20px;
  width: 100%;
`;
