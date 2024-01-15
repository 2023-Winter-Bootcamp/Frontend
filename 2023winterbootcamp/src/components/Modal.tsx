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
  background: rgba(0, 0, 0, 0);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalWrapper = styled.div`
  position: absolute;
  width: 400px;
  height: 220px;
  background-color: #fff;
  border: 2px solid;
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
  width: 270px;
  height: 26px;
  background-color: #1a1a1a;
  color: #fff;
  font-weight: bold;
  font-size: 14px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px 20px;
  border: none;
  cursor: pointer;
  transition: transform 0.3s ease-in-out;
`;

const Input = styled.input`
  width: 300px;
  height: 40px;
  border: none;
  border-bottom: 0.7px solid #1a1a1a;
  outline: none;
  margin-bottom: 10px;
  &::placeholder {
    color: #c1c1c1;
  }
`;

const Text = styled.div`
  margin-bottom: 20px;
  margin-top: -10px;
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
      navigate("/mypage");
    };

    const handleModalClick = (e: React.MouseEvent<HTMLDivElement>) => {
      // 모달 바깥 부분 클릭 시 모달 닫기
      if (e.target === e.currentTarget) {
        onClose();
      }
    };

    return (
      <ModalBackground onClick={handleModalClick}>
        <ModalWrapper ref={ref}>
          <TextWrapper>
            <Text>이력서가 등록되었습니다. 제목을 입력해주세요</Text>
            <Input
              placeholder="이력서 제목을 입력해주세요."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <Button onClick={handleRegisterClick}>등록</Button>
          </TextWrapper>
        </ModalWrapper>
      </ModalBackground>
    );
  }
);

export default Modal;
