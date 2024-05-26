import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import Topbar from "../components/Topbar";
import LetterListContainer from "../components/LetterListContainer";
import { gsap } from "gsap";
import Pagination from "@mui/material/Pagination";
import Grow from "@mui/material/Grow";

const LetteringList = () => {
  const infoTextRefs = useRef([]);
  const infoTitleRefs = useRef([]);

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
          레터링
        </LetteringTitle>
        <LetteringTitle ref={(el) => (infoTitleRefs.current[1] = el)}>
          여러분의 오늘이 궁금해요! 🙌
        </LetteringTitle>
      </ContentSection>
      <ListSection>
        {[...Array(7)].map((_, index) => (
          <Grow
            key={index}
            in={true}
            style={{ transformOrigin: "0 0 0" }}
            timeout={1000}
          >
            <div>
              <LetterListContainer />
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

export default LetteringList;

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
