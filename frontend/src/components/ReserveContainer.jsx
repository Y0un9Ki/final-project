import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const ReserveContainer = ({ title, date, performanceId }) => {
  const navigate = useNavigate("");
  const [image, setImage] = useState("");
  const [imageList, setImageList] = useState([]);

  useEffect(() => {
    const url = `https://api.unsplash.com/search/photos`;
    const ACCESS_KEY = process.env.REACT_APP_ACCESS_KEY;
    axios
      .get(url, {
        params: {
          query: "festival",
          client_id: `${ACCESS_KEY}`,
          per_page: 30,
        },
      })
      .then((response) => {
        if (response.data.results.length > 0) {
          const allImages = response.data.results;

          const selectedImages = [];
          const selectedIndexes = new Set();
          while (selectedIndexes.size < 7) {
            const randomIndex = Math.floor(Math.random() * allImages.length);
            if (!selectedIndexes.has(randomIndex)) {
              selectedIndexes.add(randomIndex);
              selectedImages.push(allImages[randomIndex].urls.small);
            }
          }
          setImage(selectedImages[0]);
          setImageList(selectedImages);
        }
      })
      .catch((error) => {});
  }, []);

  return (
    <Container
      onClick={() => {
        navigate("/lifedetail", {
          state: { id: performanceId, image: imageList },
        });
      }}
    >
      <Image src={image} />
      <Title>✅ {title}</Title>
      <Date>📅 {date}</Date>
    </Container>
  );
};

export default ReserveContainer;

const Container = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  margin-top: 4px;
  border-bottom: 1px solid #ddd;
  min-height: 32px;
  cursor: pointer;
  transition: 0.2s ease-in-out;
  &:hover {
    background-color: #e6e1e1;
    border-radius: 8px;
  }
`;

const Title = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  margin-top: 4px;
  padding-left: 8px;
  border-bottom: 1px solid #ddd;
  min-height: 32px;
  font-size: 16px;
`;

const Date = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  margin-top: 4px;
  border-bottom: 1px solid #ddd;
  min-height: 32px;
  font-size: 14px;
`;

const Image = styled.img`
  min-width: 40px;
  height: 30px;
  margin-bottom: 2px;
`;
