import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LetterListContainer = ({ title, date }) => {
  const [image, setImage] = useState("");
  const navigate = useNavigate();

  const formattingDate = (dateStr) => {
    const date = new Date(dateStr);
    return `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일`;
  };

  useEffect(() => {
    const url = `https://api.unsplash.com/search/photos`;
    const ACCESS_KEY = process.env.REACT_APP_ACCESS_KEY;
    console.log(ACCESS_KEY);
    axios
      .get(url, {
        params: {
          query: "letter",
          client_id: `${ACCESS_KEY}`,
          per_page: 30,
        },
      })
      .then((response) => {
        if (response.data.results.length > 0) {
          setImage(
            response.data.results[Math.floor(Math.random() * 30)].urls.small
          );
        }
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error fetching photos:", error);
      });
  }, []);

  return (
    <Container
      onClick={() => {
        navigate(`/lettering`);
      }}
    >
      <ImageSection>{image && <Image src={image} />}</ImageSection>
      <TextSection>
        <Title>{title}</Title>
        <SubTitle>{formattingDate(date)}</SubTitle>
      </TextSection>
    </Container>
  );
};

export default LetterListContainer;

const Container = styled.div`
  display: flex;
  margin: 15px auto;
  background-color: #fff;
  width: 90%;
  border-radius: 6px;
  box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  cursor: pointer;
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;
  &:hover {
    transform: translateY(-4px);
    box-shadow: 6px 6px 15px rgba(0, 0, 0, 0.2);
  }
`;

const ImageSection = styled.section`
  width: 30%;
  height: 80px;
  background-color: #e6e1e1;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
`;

const TextSection = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 70%;
  height: 80px;
`;

const Title = styled.p`
  display: flex;
  align-items: center;
  margin-left: 20px;
  font-size: 18px;
  height: 50px;
`;

const SubTitle = styled.p`
  display: flex;
  color: #777;
  margin-left: 24px;
  font-size: 14px;
  height: 30px;
`;
