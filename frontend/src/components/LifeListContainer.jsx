import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import LoginCheckModal from "./LoginCheckModal";
import { Category } from "../utils/Category";
import { DdayCal } from "../utils/DdayCal";
import axios from "axios";

const LifeListContainer = ({
  id,
  title,
  dateStr,
  category,
  subtitle,
  price,
}) => {
  const navigate = useNavigate();
  const token = localStorage.getItem("AuthToken");
  const [showModal, setShowModal] = useState(false);
  const [image, setImage] = useState("");
  const [imageList, setImageList] = useState([]);

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  const formattingDate = (dateStr) => {
    const date = new Date(dateStr);
    return `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일`;
  };

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
    <>
      <Container
        onClick={
          !token
            ? openModal
            : () => {
                navigate("/lifedetail", {
                  state: { id: id, image: imageList },
                });
              }
        }
      >
        <ImageSection>{image && <Image src={image} />}</ImageSection>
        <TextSection>
          <CategorySection>
            <CatItem>{DdayCal(formattingDate(dateStr))}</CatItem>
            <CatItem>{Category[category]}</CatItem>
          </CategorySection>
          <TitleSection>{title}</TitleSection>
          <SubTitleSection>{subtitle}</SubTitleSection>
          <PointSection>
            <PointIcon src="/assets/pointicon.png" />
            {price}
          </PointSection>
        </TextSection>
      </Container>
      <LoginCheckModal show={showModal} onClose={closeModal} />
    </>
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
