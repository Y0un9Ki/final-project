import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";

const LetterListContainer = () => {
  const [image, setImage] = useState("");

  useEffect(() => {
    const url = `https://api.unsplash.com/search/photos`;

    axios
      .get(url, {
        params: {
          query: "letter",
          client_id: "",
          per_page: 12,
        },
      })
      .then((response) => {
        if (response.data.results.length > 0) {
          setImage(
            response.data.results[Math.floor(Math.random() * 12)].urls.small
          );
        }
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error fetching photos:", error);
      });
  }, []);

  return (
    <Container>
      <ImageSection>
        <Image src={image} />
      </ImageSection>
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
