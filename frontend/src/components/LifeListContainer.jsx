import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const LifeListContainer = () => {
  const navigate = useNavigate();

  return (
    <Container
      onClick={() => {
        navigate("/lifedetail");
      }}
    >
      <ImageSection>
        <Image />
      </ImageSection>
      <TextSection>
        <CategorySection>
          <CatItem>D - 4 </CatItem>
          <CatItem>공연 </CatItem>
        </CategorySection>
        <TitleSection>공연 제목</TitleSection>
        <SubTitleSection>공연 부 제목</SubTitleSection>
        <PointSection>
          <PointIcon src="/assets/pointicon.png" />
          12,000
        </PointSection>
      </TextSection>
    </Container>
  );
};

export default LifeListContainer;

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
  height: 120px;
  background-color: #e6e1e1;
`;

const Image = styled.img``;

const TextSection = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 70%;
  height: 120px;
`;

const CategorySection = styled.section`
  display: flex;
  margin-left: 20px;
`;

const CatItem = styled.section`
  margin: 2px 5px;
  width: max-content;
  padding: 4px 8px;
  background-color: #eee8e8;
  border-radius: 4px;
  border: 1px solid #e6e1e1;
  font-size: 12px;
`;

const TitleSection = styled.section`
  margin-left: 24px;
  font-size: 18px;
`;

const SubTitleSection = styled.section`
  margin-left: 24px;
  font-size: 16px;
  color: #777;
`;

const PointSection = styled.section`
  display: flex;
  align-items: center;
  margin-left: 24px;
`;

const PointIcon = styled.img`
  width: 20px;
  margin-right: 8px;
`;
