import React from "react";
import styled from "styled-components";
import Topbar from "../components/Topbar";
import Header from "../components/Haeder";

const SignIn = () => {
  return (
    <Container>
      <Header />
      <Body>
        <WelcomeMessage>
          <span role="img" aria-label="hand waving">
            🙌
          </span>
          만나서 반가워요!
        </WelcomeMessage>
        <SubMessage>오늘하루도 화이팅!</SubMessage>
        <Input type="text" placeholder="아이디" />
        <Input type="password" placeholder="비밀번호" />
        <LoginButton>
          <img src="hand-icon.png" alt="hand icon" /> 로그인
        </LoginButton>
        <KakaoLoginButton>
          <img src="kakao-logo.png" alt="Kakao logo" /> 카카오 로그인
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
  text-align: center;
`;

const WelcomeMessage = styled.div`
  font-size: 18px;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  justify-content: center;

  & span {
    margin-right: 10px;
  }
`;

const SubMessage = styled.div`
  font-size: 14px;
  color: #555;
  margin-bottom: 20px;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-sizing: border-box;
  font-size: 14px;
`;

const LoginButton = styled.button`
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  border: none;
  border-radius: 5px;
  background-color: #ddd;
  font-size: 16px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;

  & img {
    margin-right: 10px;
  }
`;

const KakaoLoginButton = styled(LoginButton)`
  background-color: #ffe812;
  color: #000;
`;
