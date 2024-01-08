import React from "react";
import styled from "styled-components";
import Modal from "./components/Modal";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  motion,
  animate,
  useScroll,
  useMotionValueEvent,
  useAnimationControls,
} from "framer-motion";

const Container = styled.div`
  background-image: url("https://i.postimg.cc/fb66hRk3/2024-01-03-8-09-33.png");
  width: 100%;
  height: 120vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  background-size: cover;
  background-repeat: no-repeat;
  position: relative;
  padding: 20px;
`;

const ScrollWrapper = styled.div`
  width: 100%;
  height: 100vh;
  overflow: hidden;
  position: relative;
`;

const ScrollContent = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  top: 0;
  transition: top 0.5s ease-out;
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

const TextField = styled.div`
  margin-left: 267px;
  text-align: left;
  margin-top: 172px;
`;

const Text4 = styled.div`
  font-weight: bold;
  font-size: 40px;
  color: white;
`;

const Text5 = styled.div`
  font-weight: bold;
  font-size: 80px;
  color: white;
`;

const Page2Container = styled.div`
  width: 100%;
  height: 100%;
  background-color: white;
  box-sizing: border-box;
  position: absolute;
  top: 100%;
  display: flex;
  align-items: center;
  padding-top: 30px;
`;

const Page2 = styled(motion.div)`
  display: flex;
  align-items: center;
  width: 100%;
  height: 80%;
  background-color: white;
  text-align: start;
  line-height: 1.5;
`;

const TextComponents = styled.div`
  margin-left: 300px;
  display: flex;
  align-items: center;
  margin-top: 130px;
`;

const Rectangle = styled.div`
  width: 3px;
  height: 80px;
  background-color: black;
`;

const Textb = styled.div`
  display: flex;
  flex-direction: column;
`;

const Text6 = styled.div`
  color: black;
  font-weight: bold;
  font-size: 34px;
  margin-left: 10px;
`;

const Text7 = styled.div`
  color: black;
  font-weight: bold;
  font-size: 34px;
  margin-left: 10px;
`;

const Text8 = styled.div`
  width: 350px;
  color: black;
  font-size: 22px;
  margin-left: 300px;
  margin-top: 10px;
  margin-bottom: 222px;
  line-height: 1.8;
`;

const Image2 = styled.div`
  width: 300px;
  max-width: 600px;
  height: 400px;
  background-image: url("https://ifh.cc/g/Y5bZkt.jpg");
  background-size: cover;
  background-position: center;
  margin-left: 300px;
  margin-bottom: 20px;
`;

const TextComponents2 = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const Container1 = styled.div`
  width: 100%;
  height: 900px;
  padding: 20px;
  background: white;
  position: relative;
  display: flex;
  align-items: center;
  z-index: 3;
`;

const ImageContainer = styled.div`
  width: 100%;
  height: 650px;
  box-sizing: border-box;
  padding: 60px;
  display: flex;
  justify-content: space-evenly;
`;

const ImageBox = styled.div`
  width: 380px;
  height: 540px;
  display: flex;
  flex-direction: column;
`;
const ImageBox2 = styled.div`
  width: 470px;
  height: 460px;
  display: flex;
  flex-direction: column;
`;
const ImageBox3 = styled.div`
  width: 330px;
  height: 590px;
  display: flex;
  flex-direction: column;
`;
const ImageBoxText = styled.div`
  width: 100%;
  height: 90px;
  box-sizing: border-box;
  padding: 10px 28px;
  font-size: 20px;
  font-weight: 700;
  text-align: center;
  line-height: 1.4;
`;
const ImageBoxText2 = styled.div`
  width: 100%;
  height: 90px;
  box-sizing: border-box;
  padding: 10px 28px;
  font-size: 20px;
  font-weight: 700;
  text-align: center;
  line-height: 1.7;
  margin-bottom: 70px;
  margin-top: 10px;
`;
const ImageBoxText3 = styled.div`
  width: 100%;
  height: 70px;
  box-sizing: border-box;
  padding: 10px 28px;
  font-size: 20px;
  font-weight: 700;
  text-align: center;
  line-height: 1.7;
  margin-top: 10px;
`;
interface ImageProps {
  imageurl: string;
}
const ImageBoxImage = styled.div<ImageProps>`
  width: 374px;
  height: 430px;
  background-image: url(${(props) => props.imageurl});
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
  box-shadow: 0px 2px 20px 0px rgba(0, 0, 0, 0.25);
`;
const ImageBoxImage2 = styled.div<ImageProps>`
  width: 450px;
  height: 400px;
  background-image: url(${(props) => props.imageurl});
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
  box-shadow: 0px 2px 20px 0px rgba(0, 0, 0, 0.25);
  margin-left: 5px;
`;
const ImageBoxImage3 = styled.div<ImageProps>`
  width: 342px;
  height: 458px;
  background-image: url(${(props) => props.imageurl});
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
  box-shadow: 0px 2px 20px 0px rgba(0, 0, 0, 0.25);
`;

const Container2 = styled.div`
  width: 100%;
  height: 60vh;
  color: white;
  font-size: 40px;
  font-weight: 700;
  text-align: center;
  background: black;
  padding: 300px 20px 20px 20px;
`;

const MiddleContainer = styled.div`
  width: 100%;
  height: 50vh;
  padding: 20px;
  background: linear-gradient(#fff, #000);
`;

function Main() {
  const [showModal, setShowModal] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const { scrollY } = useScroll();
  const [isUp, setIsUp] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest >= 400 && !isUp) {
      setIsUp(true);
      const box = document.getElementById("page2container");
      animate(box as HTMLElement, { top: "20%" }, { duration: 1 });
    } else if (latest < 400 && isUp) {
      setIsUp(false);
      const box = document.getElementById("page2container");
      animate(box as HTMLElement, { top: "100%" }, { duration: 0.5 });
    }
  });

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
  const [isDone, setIsDone] = useState([false, false, false]);
  const [throttler, setThrottler] = useState(false)
  const control1 = useAnimationControls();
  const control2 = useAnimationControls();
  const control3 = useAnimationControls();
  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest < 400){
      const scroll = document.getElementById('scrollContent') as HTMLDivElement
      scroll.style.top = `-${latest * 2}px`
    }
    //쓰로틀링으로 0.1초마다 함수 실행하도록 제어
    if (throttler) return;
    setThrottler(true)
    setTimeout(() => {
      //함수가 한 번만 실행될 수 있도록 상태변수 추가
      if (latest >= 400 && !isDone[0]) {
        let _isDone = [...isDone];
        _isDone[0] = true;
        setIsDone(_isDone);
        control1.start({ opacity: 1, y: 0 });
      }
      if (latest >= 760 && !isDone[1]) {
        let _isDone = [...isDone];
        _isDone[1] = true;
        setIsDone(_isDone);
        control2.start({ opacity: 1, y: 0 });
      }
      if (latest >= 2200 && !isDone[2]) {
        let _isDone = [...isDone];
        _isDone[2] = true;
        setIsDone(_isDone);
        control3.start({ opacity: 1 });
      }
      setThrottler(false)
    }, 100);
  });

  return (
    <>
      <Container>
        <ScrollWrapper>
          <ScrollContent id="scrollContent">
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
              transition={{ duration: 2, delay: 1.5 }}
            >
              <Text3>다양한 컨텐츠를 경험해 보세요.</Text3>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 2.5, delay: 2.5 }}
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

            <TextField>
              <Text4>깃허브 연동</Text4>
              <Text4>개발자 필수 면접 플랫폼</Text4>
              <Text5>teamA.</Text5>
            </TextField>
          </ScrollContent>
        </ScrollWrapper>
        <Page2Container id="page2container">
          <Page2
            initial={{ opacity: 0, y: 50 }}
            animate={control1}
            transition={{ duration: 1, delay: 0.25 }}
          >
            <TextComponents2>
              <TextComponents>
                <Rectangle />
                <Textb>
                  <Text6>GitHub 계정과</Text6>
                  <Text7>이력서만 제출하세요</Text7>
                </Textb>
              </TextComponents>
              <Text8>
                이제 GitHub 계정과 이력서만 제출하면 강력한 언어 처리 능력을
                지닌 AI가 면접을 진행합니다. 당신의 개발 역량, 프로젝트 경험,
                협업 능력 등을 정확하게 평가하여 나만의 면접을 제공합니다
              </Text8>
            </TextComponents2>
            <Image2 />
          </Page2>
        </Page2Container>
      </Container>
      <Container1>
        <ImageContainer>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={control2}
            transition={{ duration: 1, delay: 0.2 }}
          >
            <ImageBox>
              <ImageBoxText>
                면접 종류, 포지션, 면접 방식, 이력서, <br />
                레포지토리 선택 등 다양한 옵션
              </ImageBoxText>
              <ImageBoxImage imageurl="https://ifh.cc/g/QKjM80.png" />
            </ImageBox>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={control2}
            transition={{ duration: 1, delay: 0.5 }}
          >
            <ImageBox2>
              <ImageBoxText2>실시간 화상 면접, 음성 텍스트 변환</ImageBoxText2>
              <ImageBoxImage2 imageurl="https://ifh.cc/g/LG1kHy.png" />
            </ImageBox2>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={control2}
            transition={{ duration: 1, delay: 0.8 }}
          >
            <ImageBox3>
              <ImageBoxText3>면접 결과 확인, 보관</ImageBoxText3>
              <ImageBoxImage3 imageurl="https://ifh.cc/g/vgbofK.jpg" />
            </ImageBox3>
          </motion.div>
        </ImageContainer>
      </Container1>
      <MiddleContainer />
      <Container2>
        <motion.div
          initial={{ opacity: 0 }}
          animate={control3}
          transition={{ duration: 1 }}
        >
          teamA.와 함께 개발자 커리어 준비를 시작해보세요
        </motion.div>
      </Container2>
    </>
  );
}

export default Main;