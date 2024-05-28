import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import Topbar from "../components/Topbar";
import LetterListContainer from "../components/LetterListContainer";
import { gsap } from "gsap";
import Pagination from "@mui/material/Pagination";
import Grow from "@mui/material/Grow";
import { API } from "../utils/ApiConfig";

const LetteringList = () => {
  const infoTextRefs = useRef([]);
  const infoTitleRefs = useRef([]);
  const token = localStorage.getItem("AuthToken");
  const [data, setData] = useState();
  const [page, setPage] = useState(0);
  const [requestPage, setRequestPage] = useState(1);

  const handleChange = (e, v) => {
    setRequestPage(v);
  };

  useEffect(() => {
    fetch(`${API.letterList}?page=${requestPage}`, {
      headers: {
        Authorization: `JWT ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        return res.json();
      })
      .then((data) => {
        setData(data);
        setPage(Math.ceil(data.count / 7));
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
      });

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
  }, [requestPage]);
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
        {data &&
          data.results?.map((listdata) => {
            return (
              <Grow
                key={listdata.id}
                in={true}
                style={{ transformOrigin: "0 0 2" }}
                timeout={700}
              >
                <div>
                  <LetterListContainer
                    id={listdata.id}
                    title={listdata.title}
                    date={listdata.create_date}
                  />
                </div>
              </Grow>
            );
          })}
      </ListSection>
      <PageSection>
        <Pagination
          count={page}
          shape="rounded"
          page={requestPage}
          onChange={handleChange}
        />
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
