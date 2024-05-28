import React, { useState } from "react";
import styled, { keyframes } from "styled-components";
import Grow from "@mui/material/Grow";
import LoginCheckModal from "./LoginCheckModal";
import { useNavigate } from "react-router-dom";

const LetteringInfo = () => {
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem("AuthToken");

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  return (
    <>
      <Grow in={true} style={{ transformOrigin: "0 0 0" }} timeout={1000}>
        <div>
          <Container>
            <ImageSection>
              <Image src="/assets/char2.png" />
            </ImageSection>
            <LetteringSection>
              <>
                <Text delay="0.5s">편지가 도착했어요!</Text>
                <Text delay="1.5s">당신의 이야기를 들려주세요!</Text>
                <Text delay="2.5s">행복한 하루가 되길 응원할게요!</Text>
                <Text delay="3.5s">화이팅! 😄</Text>
              </>
              <Response
                onClick={
                  !token
                    ? openModal
                    : () => {
                        navigate("/letterlist");
                      }
                }
              >
                답장하기
              </Response>
            </LetteringSection>
          </Container>
        </div>
      </Grow>
      <LoginCheckModal show={showModal} onClose={closeModal} />
    </>
  );
};

export default LetteringInfo;

const typing = keyframes`
  from { width: 0; }
  to { width: 100%; }
`;

const Container = styled.div`
  display: flex;
  margin: auto;
  background-color: #fff;
  width: 90%;
  border-radius: 12px;
  box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition:
    transform 0.2s ease,
    box-shadow 0.3s ease;
  &:hover {
    transform: translateY(-4px);
    box-shadow: 6px 6px 15px rgba(0, 0, 0, 0.2);
  }
`;

const ImageSection = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 30%;
  height: 200px;
  background-color: #e6e1e1;
`;

const Image = styled.img`
  width: 70%;
`;

const LetteringSection = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 70%;
  padding: 20px;
`;

const Text = styled.p`
  font-size: 16px;
  margin: 6px 0;
  white-space: nowrap;
  overflow: hidden;
  width: 0;
  animation: ${typing} 0.7s steps(22) forwards;
  animation-delay: ${({ delay }) => delay};

  &:nth-child(2) {
    animation-delay: 1.5s;
  }
  &:nth-child(3) {
    animation-delay: 2.5s;
  }
  &:nth-child(4) {
    animation-delay: 3.5s;
  }
`;

const Response = styled.p`
  align-self: flex-end;
  cursor: pointer;
  font-size: 20px;
  color: #aaa;
  margin: 0;
  transition: color 0.3s ease;
  &:hover {
    color: #000;
  }
`;
