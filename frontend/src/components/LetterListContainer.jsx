import React from "react";
import styled from "styled-components";

const LetterListContainer = () => {
  return (
    <Container>
      <ImageSection>
        <Image />
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
`;

const Image = styled.img``;
