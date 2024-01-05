import React from "react";
import styled from "styled-components";
import Modal from "./components/Modal";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion, useScroll, useMotionValueEvent, useAnimationControls } from "framer-motion";

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
  margin-top: 100px;
`;

const Text2 = styled.div`
  color: #3a3a3a;
  font-size: 16px;
  margin-top: 20px;
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

const Container1 = styled.div`
  width: 100%;
  height: 900px;
  padding: 20px;
  background: linear-gradient(white 80%,gray);
`

const ImageContainer = styled.div`
  width: 100%;
  height: 650px;
  box-sizing: border-box;
  padding: 60px;
  display: flex;
  justify-content: space-evenly;
`

const ImageBox = styled.div`
  width: 400px;
  height: 550px;
  display: flex;
  flex-direction: column;
  
`

const ImageBoxText = styled.div`
  width: 100%;
  height: 90px;
  box-sizing: border-box;
  padding: 10px 28px;
  font-size: 20px;
  font-weight: 600;
  text-align: center;
  line-height: 1.7;
`
interface ImageProps {
  imageurl : string;
}

const ImageBoxImage = styled.div<ImageProps>`
  width: 100%;
  height: 450px;
  background-image: url(${(props) => props.imageurl});
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
  box-shadow: 0px 2px 20px 0px rgba(0, 0, 0, 0.25);
`

const Container2 = styled.div`
  width: 100%;
  height: 680px;
  color: white;
  font-size: 40px;
  font-weight: 700;
  text-align: center;
  background: black;
  box-sizing: border-box;
  padding-top: 300px;
`

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
  
  //스크롤 이벤트
  const { scrollY } = useScroll()
  const control1 = useAnimationControls()
  const control2 = useAnimationControls()
  useMotionValueEvent(scrollY, "change", (latest) => {
    if(latest >= 160){
      control1.start({opacity: 1, y: 0})
    }
    if(latest >= 960){
      control2.start({opacity: 1})
    }
  })
  //스크롤 이벤트

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: -100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 4 }}
      ></motion.div>
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <Text1>깃허브를 이용한 AI면접</Text1>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 2, delay: 1 }}
        >
          <Text2>깃허브 기반 AI면접. teamA입니다.</Text2>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 2, delay: 1.2 }}
        >
          <Text3>다양한 컨텐츠를 경험해 보세요.</Text3>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 2.5, delay: 3 }}
        >
          <Image
            src="https://i.postimg.cc/26rVTrmW/github-logo-icon-147285.png"
            alt="GitHub Logo"
          />
        </motion.div>
        <ButtonWrapper>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1 }}
          >
            <Button>
              <ButtonContent>
                <ButtonImage
                  src="https://i.postimg.cc/26rVTrmW/github-logo-icon-147285.png"
                  alt="GitHub Logo"
                />
                내 깃허브
              </ButtonContent>
            </Button>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1 }}
          >
            <Button onClick={handleAIInterviewClick}>AI 면접</Button>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1 }}
          >
            <Button onClick={() => setShowModal(true)}>
              <ButtonContent>
                <ButtonImage
                  src="https://i.postimg.cc/ZRQBcYtj/2024-01-03-8-44-26.png"
                  alt="Document Icon"
                />
                이력서 업로드
              </ButtonContent>
            </Button>
          </motion.div>
        </ButtonWrapper>
        {showModal && <Modal ref={modalRef}></Modal>}
      </Container>
      <Container1>
        <ImageContainer>
          <motion.div
            initial={{opacity: 0, y:30}}
            animate={control1}
            transition={{duration: 1}}>
            <ImageBox>
              <ImageBoxText>면접 종류, 포지션, 면접 방식, 이력서, 레포지토리 선택 등 다양한 옵션</ImageBoxText>
              <ImageBoxImage imageurl="https://i.postimg.cc/LXZGcBXT/Screenshot-from-2024-01-05-03-13-48.png"/>
            </ImageBox>
          </motion.div>
          <motion.div
            initial={{opacity: 0, y:30}}
            animate={control1}
            transition={{duration: 1}}>
            <ImageBox>
              <ImageBoxText>실시간 화상 면접, 음성 텍스트 변환</ImageBoxText>
              <ImageBoxImage imageurl="https://i.postimg.cc/RZyRkrnk/Screenshot-from-2024-01-05-03-14-22.png"/>
            </ImageBox>
          </motion.div>
          <motion.div
            initial={{opacity: 0, y:30}}
            animate={control1}
            transition={{duration: 1}}>
            <ImageBox>
              <ImageBoxText>면접 결과 확인, 보관</ImageBoxText>
              <ImageBoxImage imageurl="https://i.postimg.cc/nrGSxdtv/Screenshot-from-2024-01-05-03-14-48.png"/>
            </ImageBox>
          </motion.div>
        </ImageContainer>
      </Container1>
      <Container2>
        <motion.div
          initial={{opacity: 0}}
          animate={control2}
          transition={{duration: 1}}>
          teamA.와 함께 개발자 커리어 준비를 시작해보세요
        </motion.div>
      </Container2>
    </>
  );
}

export default Main;
