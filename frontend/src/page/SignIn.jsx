import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import Header from "../components/Header";
import LetterTextField from "../components/LetterTextField";
import InputField from "../components/InputField";
import { gsap } from "gsap";
import Topbar from "../components/Topbar";
import LetterModal from "../components/LetterModal";
import Grow from "@mui/material/Grow";
import Alert from "@mui/material/Alert";
import { useNavigate } from "react-router-dom";
import { API } from "../utils/ApiConfig";

const SignIn = () => {
  const infoTextRefs = useRef([]);
  const infoTitleRefs = useRef([]);
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState({
    email: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState("");

  const isButtonEnabled =
    inputValue.email.length > 0 && inputValue.password.length > 0;

  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setInputValue({ ...inputValue, [name]: value });
  };

  const loginHandler = () => {
    fetch(`${API.signin}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: inputValue.email,
        password: inputValue.password,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res.email);
      })
      .then((res) => {
        if (res.message === "로그인에 성공하였습니다") {
          localStorage.setItem("AuthToken", res.access);
          navigate("/");
        } else if (
          res.email &&
          res.email[0] === "유효한 이메일 주소를 입력하십시오."
        ) {
          setErrorMessage("유효한 이메일을 입력해주세요.");
        }
        setErrorMessage(res.message);
      });
  };

  useEffect(() => {
    if (localStorage.getItem("AuthToken")) {
      navigate("/");
    }
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
          로그인
        </LetteringTitle>
        <LetteringTitle ref={(el) => (infoTitleRefs.current[1] = el)}>
          How Are You에 오신 것을 환영해요!
        </LetteringTitle>
      </ContentSection>
      <Grow in={true} style={{ transformOrigin: "0 2 2" }} timeout={700}>
        <div>
          <Body>
            <LetterTextField text="👋 만나서 반가워요" />
            <LetterTextField text="🙌 오늘 하루도 화이팅!" />
            <LetterTextField />
            <LetterTextField text="아이디를 입력해주세요" />
            <InputField
              placeholder="HowAreYou@email.com"
              type="text"
              value={inputValue.email}
              name="email"
              changeHandler={onChangeInput}
            />
            <LetterTextField text="비밀번호를 입력해주세요" />
            <InputField
              placeholder="************"
              type="password"
              value={inputValue.password}
              name="password"
              changeHandler={onChangeInput}
            />
            <LetterTextField />
            {errorMessage && (
              <Grow in={true} timeout={1500}>
                <Alert severity="error">{errorMessage}</Alert>
              </Grow>
            )}
            <LoginButton onClick={loginHandler} disabled={!isButtonEnabled}>
              <Iconlogo src="/assets/signicon.png" alt="hand icon" />
              <BtnText>로그인</BtnText>
            </LoginButton>
            <KakaoLoginButton>
              <Iconlogo src="/assets/kakaoicon.png" alt="Kakao logo" />
              <BtnText>카카오 로그인</BtnText>
            </KakaoLoginButton>
            <SignupFooter>
              <Text>회원이 아니신가요?</Text>
              <SignText
                onClick={() => {
                  navigate("/signup");
                }}
              >
                회원가입 하기
              </SignText>
            </SignupFooter>
          </Body>
        </div>
      </Grow>
    </Container>
  );
};

export default SignIn;

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
  margin: 0 auto;
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

const ContentSection = styled.section`
  display: flex;
  flex-direction: column;
  height: 80px;
  margin-top: 100px;
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

const SignupFooter = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Text = styled.p`
  font-size: 14px;
  margin: 4px;
  cursor: pointer;
`;

const SignText = styled.p`
  font-size: 14px;
  margin: 4px;
  cursor: pointer;
  color: #aaa;
  transition: color 0.3s ease;
  &:hover {
    color: #000;
  }
`;
