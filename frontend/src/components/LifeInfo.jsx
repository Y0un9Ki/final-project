import React from "react";
import styled from "styled-components";

const LifeInfo = () => {
  return (
    <Container>
      <ImageSection>
        <Image />
      </ImageSection>
    </Container>
  );
};

export default LifeInfo;

const Container = styled.div`
  display: flex;
  margin: 15px auto;
  background-color: #fff;
  width: 90%;
  border-radius: 12px;
  box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.1);
  overflow: hidden;
`;

const ImageSection = styled.section`
  width: 30%;
  height: 120px;
  background-color: #e6e1e1;
`;

const Image = styled.img``;
