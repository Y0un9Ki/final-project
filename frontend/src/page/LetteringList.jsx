import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Topbar from "../components/Topbar";
import LetterListContainer from "../components/LetterListContainer";

const LetteringList = () => {
  return (
    <Container>
      <Topbar />
      <LetterListContainer />
      <LetterListContainer />
      <LetterListContainer />
      <LetterListContainer />
    </Container>
  );
};

export default LetteringList;

const Container = styled.div`
  margin: auto;
  padding-top: 80px;
  padding-bottom: 20px;
  max-width: 600px;
  min-height: 90vh;
  background-color: #f4f4f4;
`;
