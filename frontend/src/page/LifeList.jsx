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
import { API } from "../utils/ApiConfig";
import { Category } from "../utils/Category";

const LifeList = () => {
  const [value, setValue] = useState(0);
  const infoTextRefs = useRef([]);
  const infoTitleRefs = useRef([]);
  const [page, setPage] = useState(0);
  const [requestPage, setRequestPage] = useState(1);
  const [data, setData] = useState();
  const token = localStorage.getItem("AuthToken");
  const [categoryNum, setCategoryNum] = useState(0);

  const pageChange = (e, v) => {
    setRequestPage(v);
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    const categoryRequest = () => {
      if (categoryNum === 0) {
        return `${API.totalLifeList}?page=${requestPage}`;
      } else
        return `${API.totalLifeList}category/${categoryNum}/?page=${requestPage}`;
    };

    fetch(categoryRequest(), {
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
        setPage(Math.ceil(data.count / 5));
        console.log(data);
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
      });

    gsap.from(infoTextRefs.current, {
      duration: 0.5,
      y: 20,
      opacity: 0,
      stagger: 0.7,
      ease: "power3.out",
    });
    gsap.from(infoTitleRefs.current, {
      duration: 0.5,
      y: 20,
      opacity: 0,
      stagger: 0.7,
      ease: "power3.out",
    });
  }, [categoryNum]);
  return (
    <Container>
      <Topbar />
      <ContentSection>
        <LetteringTitle>
          <ContentLogo src="/assets/letteringIcon.png" />
          라이프
        </LetteringTitle>
        <LetteringTitle ref={(el) => (infoTitleRefs.current[0] = el)}>
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
          <StyleTab
            label="전체"
            onClick={() => {
              setCategoryNum(0);
            }}
          />
          <StyleTab
            label="공연"
            onClick={() => {
              setCategoryNum(1);
            }}
          />
          <StyleTab
            label="뮤지컬"
            onClick={() => {
              setCategoryNum(2);
            }}
          />
          <StyleTab
            label="영화"
            onClick={() => {
              setCategoryNum(3);
            }}
          />
        </StyleTabs>
      </Tapbar>
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
                  <LifeListContainer
                    id={listdata.id}
                    dateStr={listdata.startdate}
                    title={listdata.name}
                    subtitle={listdata.subname}
                    price={listdata.price}
                    category={listdata.category}
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
          onChange={pageChange}
        />
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
