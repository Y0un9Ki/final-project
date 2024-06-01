import React from "react";
import Slider from "react-slick";
import styled from "styled-components";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Slick = ({ imageList }) => {
  const settings = {
    dots: true,
    fade: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    waitForAnimate: false,
  };

  return (
    <SliderWrapper>
      <StyledSlider {...settings}>
        {imageList.map((imgUrl, index) => (
          <div key={index}>
            <SlideImage src={imgUrl} alt={`Slide ${index}`} />
          </div>
        ))}
      </StyledSlider>
    </SliderWrapper>
  );
};

export default Slick;

const StyledSlider = styled(Slider)`
  .slick-slide {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .slick-prev,
  .slick-next {
    z-index: 1;
    font-size: 0rem;

    &:before {
      color: transparent;
    }
  }

  .slick-dots {
    bottom: 10px;

    li button:before {
      font-size: 12px;
      color: black;
    }

    li.slick-active button:before {
      color: black;
    }
  }
`;

const SlideImage = styled.img`
  width: 280px;
  height: 200px;
  object-fit: cover;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const SliderWrapper = styled.div`
  width: 80%;
  margin: auto;
`;
