import React from "react";
import styled from "styled-components";
import Modal from "./components/Modal";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  background-image: url("https://i.postimg.cc/fb66hRk3/2024-01-03-8-09-33.png");
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  background-size: cover;
  background-repeat: no-repeat;
  position: relative;
  padding: 20px;
`;

const Text1 = styled.div`
  font-weight: bold;
  font-size: 40px;
  margin-top: 110px;
`;

const Text2 = styled.div`
  color: #3a3a3a;
  font-size: 16px;
  margin-top: 28px;
`;

const Text3 = styled.div`
  color: #4a4a4a;
  font-weight: 700;
  font-size: 16px;
  margin-top: 4px;
`;

const Image = styled.img`
  width: 200px;
  height: 200px;
  margin-top: 40px;
`;

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-top: 84px;
  margin-bottom: 76px;
`;

const Button = styled.div`
  background-color: #1a1a1a;
  color: #fff;
  font-weight: bold;
  font-size: 14px;
  width: 150px;
  height: 28px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px 20px;
  margin: 0 10px;
  cursor: pointer;
  transition: transform 0.3s ease-in-out;

  &:hover {
    background-color: #333;
    transform: translateY(-5px);
  }
`;

const ButtonContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ButtonImage = styled.img`
  width: 20px;
  height: 20px;
  margin-right: 8px;
`;

function Main() {
  const [showModal, setShowModal] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const handleAIInterviewClick = () => {
    navigate("/choose");
  };

  useEffect(() => {
    const closeModal = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        setShowModal(false);
      }
    };

    document.addEventListener("mousedown", closeModal);

    return () => {
      document.removeEventListener("mousedown", closeModal);
    };
  }, []);

  return (
    <Container>
      <Text1>깃허브를 이용한 AI면접</Text1>
      <Text2>깃허브 기반 AI면접. teamA입니다.</Text2>
      <Text3>다양한 컨텐츠를 경험해 보세요.</Text3>
      <Image
        src="https://i.postimg.cc/26rVTrmW/github-logo-icon-147285.png"
        alt="GitHub Logo"
      />
      <ButtonWrapper>
        <Button>
          <ButtonContent>
            <ButtonImage
              src="https://i.postimg.cc/26rVTrmW/github-logo-icon-147285.png"
              alt="GitHub Logo"
            />
            내 깃허브
          </ButtonContent>
        </Button>
        <Button onClick={handleAIInterviewClick}>AI 면접</Button>
        <Button onClick={() => setShowModal(true)}>
          <ButtonContent>
            <ButtonImage
              src="https://i.postimg.cc/ZRQBcYtj/2024-01-03-8-44-26.png"
              alt="Document Icon"
            />
            이력서 업로드
          </ButtonContent>
        </Button>
      </ButtonWrapper>
      {showModal && <Modal ref={modalRef}></Modal>}
    </Container>
  );
}

export default Main;
