import React from "react";
import styled from "styled-components";

const InputField = ({ placeholder, type, changeHandler, value, name }) => {
  return (
    <StyledInput
      type={type}
      placeholder={placeholder}
      name={name}
      value={value}
      onChange={changeHandler}
    />
  );
};

export default InputField;

const StyledInput = styled.input`
  display: flex;
  align-items: center;
  width: 100%;
  height: 32px;
  margin-top: 4px;
  border: none;
  border-bottom: 1px solid #ddd;
  font-size: 14px;
  box-sizing: border-box;
  background-color: transparent;
  transition: border-bottom 0.3s ease;

  &::placeholder {
    color: #999;
  }

  &:focus {
    outline: none;
    border-bottom: 1px solid #000;
  }
`;
