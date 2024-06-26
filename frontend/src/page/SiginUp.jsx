import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import Header from "../components/Header";
import LetterTextField from "../components/LetterTextField";
import InputField from "../components/InputField";
import { gsap } from "gsap";
import Topbar from "../components/Topbar";
import Grow from "@mui/material/Grow";
import { useNavigate } from "react-router-dom";
import { API } from "../utils/ApiConfig";
import Alert from "@mui/material/Alert";

const SignUp = () => {
  const infoTextRefs = useRef([]);
  const infoTitleRefs = useRef([]);
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState({
    email: "",
    password: "",
    password2: "",
    username: "",
    birthday: "",
    phoneNumber: "",
    location: "",
  });
  const [alertMessage, setAlertMessage] = useState(null);

  const isButtonEnabled =
    inputValue.email.length > 0 &&
    inputValue.password.length > 0 &&
    inputValue.password2.length > 0 &&
    inputValue.username.length > 0 &&
    inputValue.birthday.length > 0 &&
    inputValue.phoneNumber.length > 0 &&
    inputValue.location.length > 0;

  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setInputValue({ ...inputValue, [name]: value });
  };

  const signupHandler = () => {
    fetch(`${API.signup}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: inputValue.email,
        password: inputValue.password,
        password2: inputValue.password2,
        username: inputValue.username,
        birthday: inputValue.birthday,
        number: inputValue.phoneNumber,
        location: inputValue.location,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message === "회원가입에 성공하였습니다") {
          setAlertMessage({ type: "success", text: data.message });
          setTimeout(() => navigate("/signin"), 1000);
        } else {
          const errorKey = Object.keys(data)[0];
          setAlertMessage({ type: "error", text: data[errorKey][0] });
        }
      });
  };

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
      <ContentSection>
        <LetteringTitle ref={(el) => (infoTitleRefs.current[0] = el)}>
          <ContentLogo src="/assets/usericon.png" />
          회원가입
        </LetteringTitle>
        <LetteringTitle ref={(el) => (infoTitleRefs.current[1] = el)}>
          How Are You에 오신걸 환영해요!
        </LetteringTitle>
      </ContentSection>
      <Grow in={true} style={{ transformOrigin: "0 0 2" }} timeout={500}>
        <div>
          <Body>
            <LetterTextField text="👋 만나서 반가워요" />
            <LetterTextField />
            <LetterTextField text="사용하실 아이디를 입력해주세요" />
            <InputField
              placeholder="HowAreYou@email.com"
              type="text"
              name="email"
              value={inputValue.email}
              changeHandler={onChangeInput}
            />
            <LetterTextField text="사용하실 비밀번호를 입력해주세요" />
            <InputField
              placeholder="************"
              type="password"
              name="password"
              value={inputValue.password}
              changeHandler={onChangeInput}
            />
            <LetterTextField text="비밀번호를 확인해주세요" />
            <InputField
              placeholder="************"
              type="password"
              name="password2"
              value={inputValue.password2}
              changeHandler={onChangeInput}
            />
            <LetterTextField text="이름을 입력해주세요" />
            <InputField
              placeholder="홍길동"
              type="text"
              name="username"
              value={inputValue.username}
              changeHandler={onChangeInput}
            />
            <LetterTextField text="생년월일을 입력해주세요" />
            <InputField
              placeholder="20240101"
              type="text"
              name="birthday"
              value={inputValue.birthday}
              changeHandler={onChangeInput}
            />
            <LetterTextField text="전화번호를 입력해주세요" />
            <InputField
              placeholder="01012345678"
              type="text"
              name="phoneNumber"
              value={inputValue.phoneNumber}
              changeHandler={onChangeInput}
            />
            <LetterTextField text="주소를 입력해주세요" />
            <InputField
              placeholder="서울특별시 영등포구 영등포로"
              type="text"
              name="location"
              value={inputValue.location}
              changeHandler={onChangeInput}
            />
            <LetterTextField />
            <LoginButton disabled={!isButtonEnabled} onClick={signupHandler}>
              <Iconlogo src="/assets/signicon.png" alt="hand icon" />
              <BtnText>회원가입</BtnText>
            </LoginButton>
            {alertMessage && (
              <Alert
                severity={alertMessage.type}
                onClose={() => setAlertMessage(null)}
              >
                {alertMessage.text}
              </Alert>
            )}
            <SignupFooter>
              <Text>이미 가입하셨나요?</Text>
              <SignText
                onClick={() => {
                  navigate("/signin");
                }}
              >
                로그인 하기
              </SignText>
            </SignupFooter>
          </Body>
        </div>
      </Grow>
    </Container>
  );
};

export default SignUp;

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

  &:disabled {
    background-color: #f0f0f0;
    cursor: not-allowed;
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
