import React from "react";
import styled from "styled-components";
import { Oval } from "react-loader-spinner";

const BlackModalBackground = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
  z-index: 3;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  backdrop-filter: blur(2px);
`;

const LoadingCircle = styled.div`
  width: 230px;
  aspect-ratio: 1;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
`;

const LoadingText = styled.div`
  width: 180px;
  height: 30px;
  font-size: 28px;
  font-weight: 600;
  color: #000;
  text-align: center;
`;

type Props = {};

function LoadingModal({}: Props) {
  return (
    <BlackModalBackground>
      <LoadingCircle>
        <Oval
          visible={true}
          height="150"
          width="150"
          color="#000"
          secondaryColor="#c9c9c9"
          ariaLabel="oval-loading"
          wrapperStyle={{}}
          wrapperClass=""
        />
        <LoadingText>Loading...</LoadingText>
      </LoadingCircle>
    </BlackModalBackground>
  );
}

export default LoadingModal;
