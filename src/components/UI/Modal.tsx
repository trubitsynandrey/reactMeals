import React, { ReactElement } from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";

const BackDropWindow = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  z-index: 20;
  background-color: rgba(0, 0, 0, 0.75);
`;

const ModalBlock = styled.div`
  position: fixed;
  top: 15vh;
  left: 5%;
  width: 90%;
  background-color: white;
  padding: 1rem;
  border-radius: 14px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.25);
  z-index: 30;
  animation: slide-down 300ms ease-out forwards;
  @media (min-width: 768px) {
    width: 40rem;
    left: calc(50% - 20rem);
  }
  @keyframes slide-down {
    from {
      opacity: 0;
      transform: translateY(-3rem);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const BackDrop = ({onClose} : { onClose: () => void}) => {
  return <BackDropWindow onClick={onClose}></BackDropWindow>;
};

const ModalOverlay = ({
  children,
}: {
  children: JSX.Element;
}): ReactElement => {
  return (
    <ModalBlock>
      <div>{children}</div>
    </ModalBlock>
  );
};

const portalContainer = document.getElementById('overlays')
export const Modal = ({ children, onClose }: { children: JSX.Element, onClose: () => void}) => {
  return (
    <>
      {ReactDOM.createPortal(<BackDrop onClose={onClose}/>, portalContainer!)}
      {ReactDOM.createPortal(<ModalOverlay children={children} />, portalContainer!)}
    </>
  );
};
