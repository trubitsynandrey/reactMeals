import React from "react";
import styled from "styled-components";

const InputWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 0.5rem;
  & label {
    font-weight: bold;
    margin-right: 1rem;
  }
  & input {
    width: 3rem;
    border-radius: 5px;
    border: 1px solid #ccc;
    font: inherit;
    padding-left: 0.5rem;
  }
`;

type InputProps = {
    label: string,
    input: React.InputHTMLAttributes<HTMLInputElement>,
}

const Input = ({ label, input }: InputProps) => {
  return (
    <InputWrapper>
      <label htmlFor=""></label>
      <input {...input}/>
    </InputWrapper>
  );
};

export default Input;
