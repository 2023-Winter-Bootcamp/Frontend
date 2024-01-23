import React, { forwardRef, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

interface ModalProps {
  onClose: () => void;
  onRegister: (title: string) => void;
}

const ModalBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalWrapper = styled.div`
  position: absolute;
  width: 400px;
  height: 180px;
  background-color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  left: 50%;
  top: 50%;
  transform: translateX(-50%) translateY(-50%);
  z-index: 1000;
`;

const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
`;

const Button = styled.div`
  width: 80px;
  height: 20px;
  color: #1a1a1a;
  font-weight: bold;
  font-size: 14px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px 20px;
  margin-left: 290px;
  border: none;
  cursor: pointer;
  transition: transform 0.3s ease-in-out;
`;

const Input = styled.input`
  width: 325px;
  height: 40px;
  border: none;
  outline: none;
  margin-top: -15px;
  margin-bottom: 10px;
  font-size: 16px;
  &::placeholder {
    color: #c1c1c1;
  }

  &:focus {
    outline: none;
  }
`;

const Text = styled.div`
  margin-bottom: 20px;
  margin-top: 5px;
  font-weight: 500;
  font-size: 20px;
  margin-left: -200px;
`;

const Modal = forwardRef<HTMLDivElement, ModalProps>(
  ({ onClose, onRegister }, ref) => {
    const navigate = useNavigate();
    const [title, setTitle] = useState("");

    const handleRegisterClick = () => {
      if (title.trim() === "") {
        return;
      }

      onRegister(title);
      onClose();
    };

    const handleModalClick = (e: React.MouseEvent<HTMLDivElement>) => {
      if (e.target === e.currentTarget) {
        onClose();
      }
    };

    const handleInputKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
        handleRegisterClick();
      }
    };

    return (
      <ModalBackground onClick={handleModalClick}>
        <ModalWrapper ref={ref}>
          <TextWrapper>
            <Text>이력서 이름 등록</Text>
            <Input
              placeholder="이력서 제목을 입력해주세요."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              onKeyPress={handleInputKeyPress} // 엔터 키 처리
            />
            <Button onClick={handleRegisterClick}>등록</Button>
          </TextWrapper>
        </ModalWrapper>
      </ModalBackground>
    );
  }
);

export default Modal;
