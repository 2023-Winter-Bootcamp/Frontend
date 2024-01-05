import React from "react";
import styled from "styled-components";
import Modal from "./components/Modal";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion, useScroll, useMotionValueEvent, useAnimationControls, animate } from "framer-motion";

const Container = styled.div`
  background-image: url("https://i.postimg.cc/fb66hRk3/2024-01-03-8-09-33.png");
  width: 100%;
  height: 110vh;
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
  overflow: hidden;
  width: 100%;
  height: 100vh;
  background-color: white;
  position: absolute;
  top: 100vh;
`;

const Page2 = styled(motion.div)`
  display: flex;
  align-items: center;
  width: 100%;
  height: 650px;
  background-color: white;
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
  line-height: 1.5;
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
  height: 100vh;
  color: white;
  font-size: 40px;
  font-weight: 700;
  text-align: center;
  background: black;
  box-sizing: border-box;
  padding-top: 300px;
`

const MiddleContainer = styled.div`
  width : 100%;
  height : 100vh;
  background: linear-gradient(#fff,#000);
`

function Main() {
  const [showModal, setShowModal] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const [scrollPosition, setScrollPosition] = useState(0);
  const { scrollY } = useScroll();
  const [isUp, setIsUp] = useState(false);
  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest >= 320 && !isUp) {
      setIsUp(true);
      const box = document.getElementById("page2container");
      animate(box as HTMLElement, { top: "30vh" }, { duration: 1 });
    } else if (latest < 320 && isUp) {
      setIsUp(false);
      const box = document.getElementById("page2container");
      animate(box as HTMLElement, { top: "120vh" }, { duration: 1 });
    }
  });
  useEffect(() => {
    const handleScroll = () => {
      const position = window.scrollY;
      setScrollPosition(position);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

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
    if(latest >= 450){
      control1.start({opacity: 1, y: 0})
    }
    if(latest >= 2400){
      control2.start({opacity: 1})
    }
  })
  //스크롤 이벤트

  return (
    <>
      <Container>
        <ScrollWrapper>
          <ScrollContent style={{ top: `-${scrollPosition * 2}px` }}>
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
            <TextField>
              <Text4>깃허브 연동</Text4>
              <Text4>개발자 필수 면접 플랫폼</Text4>
              <Text5>teamA.</Text5>
            </TextField>
          </ScrollContent>
        </ScrollWrapper>
      </Container>
      <Page2Container id="page2container">
        <Page2
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 2 }}
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
              이제 GitHub 계정과 이력서만 제출하면 강력한 언어 처리 능력을 지닌
              AI가 면접을 진행합니다. 당신의 개발 역량, 프로젝트 경험, 협업 능력
              등을 정확하게 평가하여 나만의 면접을 제공합니다
            </Text8>
          </TextComponents2>
          <Image2 />
        </Page2>
      </Page2Container>
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
            transition={{duration: 1, delay: 0.25}}>
            <ImageBox>
              <ImageBoxText>실시간 화상 면접, 음성 텍스트 변환</ImageBoxText>
              <ImageBoxImage imageurl="https://i.postimg.cc/RZyRkrnk/Screenshot-from-2024-01-05-03-14-22.png"/>
            </ImageBox>
          </motion.div>
          <motion.div
            initial={{opacity: 0, y:30}}
            animate={control1}
            transition={{duration: 1, delay: 0.5}}>
            <ImageBox>
              <ImageBoxText>면접 결과 확인, 보관</ImageBoxText>
              <ImageBoxImage imageurl="https://i.postimg.cc/nrGSxdtv/Screenshot-from-2024-01-05-03-14-48.png"/>
            </ImageBox>
          </motion.div>
        </ImageContainer>
      </Container1>
      <MiddleContainer/>
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
