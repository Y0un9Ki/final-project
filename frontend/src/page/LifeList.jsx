import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import Topbar from "../components/Topbar";
import { gsap } from "gsap";
import Pagination from "@mui/material/Pagination";
import Grow from "@mui/material/Grow";
import LifeListContainer from "../components/LifeListContainer";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { styled as muiStyled } from "@mui/material/styles";

const LifeList = () => {
  const [value, setValue] = useState(0);
  const infoTextRefs = useRef([]);
  const infoTitleRefs = useRef([]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
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
          <ContentLogo src="/assets/letteringIcon.png" />
          라이프
        </LetteringTitle>
        <LetteringTitle ref={(el) => (infoTitleRefs.current[1] = el)}>
          우리 같이 만나요! 👊
        </LetteringTitle>
      </ContentSection>
      <Tapbar>
        <StyleTabs
          value={value}
          onChange={handleChange}
          variant="scrollable"
          scrollButtons={false}
          aria-label="scrollable prevent tabs example"
          TabIndicatorProps={{ style: { backgroundColor: "#493d26" } }}
        >
          <StyleTab label="공연" />
          <StyleTab label="뮤지컬" />
          <StyleTab label="영화" />
        </StyleTabs>
      </Tapbar>
      <ListSection>
        {[...Array(5)].map((_, index) => (
          <Grow
            key={index}
            in={true}
            style={{ transformOrigin: "0 0 2" }}
            timeout={700}
          >
            <div>
              <LifeListContainer />
            </div>
          </Grow>
        ))}
      </ListSection>
      <PageSection>
        <Pagination count={10} shape="rounded" />
      </PageSection>
    </Container>
  );
};

export default LifeList;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin: auto;
  padding-top: 80px;
  padding-bottom: 80px;
  max-width: 600px;
  min-height: 90vh;
  background-color: #f4f4f4;
`;

const ContentSection = styled.section`
  display: flex;
  flex-direction: column;
  margin-left: 40px;
  height: 60px;
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

const ListSection = styled.div`
  width: 100%;
  height: 680px;
`;

const PageSection = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 10px;
`;

const Tapbar = styled.div`
  width: 90%;
  margin: 0 auto;
`;

const StyleTabs = muiStyled(Tabs)(() => ({
  color: "black",
}));

const StyleTab = muiStyled(Tab)(() => ({
  color: "#aaa",
  borderBottomColor: "#aaa",
  "&.Mui-selected": {
    color: "#493d26",
  },
}));
