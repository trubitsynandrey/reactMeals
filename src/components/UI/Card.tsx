import React, { ReactElement } from "react";
import styled from "styled-components";

const CardBlock = styled.div`
  padding: 1rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.25);
  border-radius: 14px;
  background-color: white;
`;

type CardProps = {
    children: JSX.Element;
}

export const Card = ({ children }: CardProps) => {
  return <CardBlock>{children}</CardBlock>;
};
