import React, { forwardRef } from "react";
import styled from "styled-components";

const ModalWrapper = styled.div`
  position: absolute;
  top: 42%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 639px;
  height: 350px;
  background-color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
`;

const Text1 = styled.div`
  font-size: 20px;
  color: #4a4a4a;
  font-weight: bold;
`;

const Text2 = styled.div`
  font-size: 20px;
  color: #a2a2a2;
`;

const Modal = forwardRef<HTMLDivElement>((props, ref) => {
  return (
    <ModalWrapper ref={ref}>
      <TextWrapper>
        <Text1>업로드할 이력서를 선택해주세요.</Text1>
        <Text2>PDF 파일만 허용됩니다.</Text2>
      </TextWrapper>
    </ModalWrapper>
  );
});

export default Modal;
