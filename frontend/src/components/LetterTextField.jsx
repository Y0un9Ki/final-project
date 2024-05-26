import React from "react";
import styled from "styled-components";

const LetterTextField = ({ text }) => {
  return <Container>{text}</Container>;
};

export default LetterTextField;

const Container = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  margin-top: 4px;
  border-bottom: 1px solid #ddd;
  min-height: 32px;
`;
