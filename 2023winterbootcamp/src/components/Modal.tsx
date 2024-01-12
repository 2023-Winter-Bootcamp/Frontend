import React, { forwardRef, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

interface ModalProps {
  onClose: () => void;
}

const ModalWrapper = styled.div`
  position: absolute;
  top: 29%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 400px;
  height: 220px;
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

interface ModalProps {
  onClose: () => void;
  onRegister: (title: string) => void; // onRegister 프로퍼티 추가
}

const Modal = forwardRef<HTMLDivElement, ModalProps>(
  ({ onClose, onRegister }, ref) => {
    const navigate = useNavigate();
    const [title, setTitle] = useState("");

    const handleRegisterClick = () => {
      if (title.trim() === "") {
        return;
      }

      onRegister(title); // 콜백 함수 호출
      onClose();
      navigate("/mypage");
    };

    return (
      <ModalWrapper ref={ref}>
        <TextWrapper>
          <Text>이력서가 등록되었습니다. 제목을 입력해주세요</Text>
          <Input
            placeholder="이력서 제목을 입력해주세요."
            value={title}
            onChange={(e) => setTitle(e.target.value)} // 제목 변경 핸들러
          />
          <Button onClick={handleRegisterClick}>등록</Button>
        </TextWrapper>
      </ModalWrapper>
    );
  }
);

export default Modal;
