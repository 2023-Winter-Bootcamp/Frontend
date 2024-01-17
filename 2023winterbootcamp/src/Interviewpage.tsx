import React, { useState, useEffect, useRef } from "react";
import styled, { keyframes } from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
import { AudioRecorder, useAudioRecorder } from "react-audio-voice-recorder";
import axios from "axios";
import Camera from "./components/Camera";
import { useRecoilValue } from "recoil";
import { interviewTypeState } from "./Recoil";
import { motion, useAnimation } from "framer-motion";
import nextIcon from "./images/next_question.png";
import stopIcon from "./images/stop_recording.png";

const Up = styled.div`
  width: 100%;
  height: 400px;
  box-sizing: border-box;
  margin-top: 50px;
  display: flex;
  justify-content: center;
  position: relative;
`;

// const Info = styled.div`
//   width: 50px;
//   height: 50px;
//   margin-left: 15px;
//   margin-top: 15px;
//   display: flex;
//   flex-direction: column;
//   justify-content: start;
//   align-items: center;
// `;

// const Timer = styled.div`
//   color: white;
//   font-size: 20px;
//   margin-left: 20px;
//   z-index: 9999;
//   position: absolute;
// `;

const Down = styled.div`
  width: 740px;
  height: 300px;
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  margin-left: 50.3%;
  transform: translateX(-50%);
  margin-top: 20px;
  margin-bottom: 50px;
`;

const Q = styled.div`
  width: 90%;
  height: 220px;
  margin: 0 auto;
  //background-color: white; 간격 맞추기 위한 거니까 무시해도 됨
`;

const QuestionText = styled.div`
  font-weight: bold;
  font-size: 20px;
  margin-bottom: 10px;
`;

const ContentText = styled.div`
  width: 100%;
  height: 100px;
  color: #5a5a5a;
  font-size: 18px;
  @media screen and (max-width: 768px) {
    font-size: 14px;
  }

  @media screen and (min-width: 769px) and (max-width: 1023px) {
    font-size: 16px;
  }

  @media screen and (min-width: 1024px) {
    font-size: 18px;
  }
`;

const Next = styled.button`
  width: 40px;
  height: 40px;
  border: none;
  background: none;
  cursor: pointer;
  margin-bottom: 30px;
  visibility: hidden;
`;

const StyledNextImage = styled.img`
  width: 44px;
  height: 44px;
`;

const RecordBox = styled.div`
  width: 100%;
  height: 300px;
  display: flex;
  justify-content: center;
`;

const StartModal = styled.div`
  width: 100%;
  height: 700px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const TextContent = styled(motion.div)<{ isInterviewStart: boolean }>`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  text-align: center;
  margin-bottom: 100px;
`;

const AnswerPoint = styled(motion.div)`
  margin-bottom: 10px;
  font-size: 34px;
  letter-spacing: -10%;
  width: 200px;
  height: 180px;
  border-right: 1px solid;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
`;

const PointText = styled(motion.div)`
  font-size: 18px;
  margin-left: 20px;
  text-align: left;
  line-height: 1.5;
`;

const StartButton = styled(motion.button)`
  width: 240px;
  height: 50px;
  margin-top: 20px;
  background-color: #1a1a1a;
  color: white;
  font-size: 16px;
  font-weight: 600;
  text-align: center;
  border: none;

  &:hover {
    cursor: pointer;
    background-color: #333;
    transform: translateY(-0.5px);
  }
`;

const Dot = styled(motion.div)`
  margin-top: 10px;
  text-align: center;
  color: #afafaf;
  font-size: 14px;
  margin-top: 10px;
`;

const spin3D = keyframes`
  from {
    transform: rotate3d(.5, .5, .5, 360deg);
  }
  to {
    transform: rotate3d(0deg);
  }
`;

const VideoContainer = styled.div`
  min-height: 400px;
  background-color: #ffffff;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  align-items: flex-start;
  //border: 1px solid lightgray;
`;

// Common styles
const commonStyle = `
  width: 150px;
  height: 150px;
  padding: 3px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
`;

// Styled components

interface LeoBorderProps {
  color: string;
  gradientColor: string;
  animationDuration: number;
}

const SpinnerBox = styled.div`
  width: 670px;
  height: 400px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: transparent;
`;

const LeoBorder = styled.div<LeoBorderProps>`
  position: absolute;
  ${commonStyle}
  background: ${(props) => props.color};
  background: linear-gradient(
    0deg,
    rgba(${(props) => props.gradientColor}, 0.1) 33%,
    rgba(${(props) => props.gradientColor}, 1) 100%
  );
  animation: ${spin3D} ${(props) => props.animationDuration}s linear 0s infinite;
`;

interface LeoCoreProps {
  backgroundColor: string;
}

const LeoCore = styled.div<LeoCoreProps>`
  ${commonStyle}
  width: 100%;
  height: 100%;
  background-color: ${(props) => props.backgroundColor};
`;

export interface Question {
  id: number;
  type_name: string;
  content: string;
}

function Interviewpage() {
  // const [buttonImage, setButtonImage] = useState(
  //   "https://i.postimg.cc/9F5kxyNS/2024-01-04-2-23-04.png"
  // );
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(1);
  const [questionId, setQuestionId] = useState<number>(0);
  const [isInterviewStart, setIsInterviewStart] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  const selectedInterviewType = useRecoilValue(interviewTypeState);
  useEffect(() => {
    window.scrollTo(0, 0);
    if (id) {
      axios
        .get(`http://localhost:8000/api/interviews/${id}/questions/`)
        .then((response) => {
          console.log(response.data.qusetions);
          setQuestions(response.data.questions);
          setQuestionId(response.data.questions[currentQuestionIndex - 1].id);
        })
        .catch((error) => {
          console.error("Error fetching questions:", error);
        });
    }
    console.log(selectedInterviewType);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  useEffect(() => {
    const audioElement = audioRef.current;
    const handleEnded = () => {
      handleRecordingStart();
    };

    if (audioElement) {
      audioElement.addEventListener("ended", handleEnded);
    }

    return () => {
      if (audioElement) {
        audioElement.removeEventListener("ended", handleEnded);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const btnRef = useRef<HTMLButtonElement | null>(null);
  //처음 페이지 로딩된 후, 다음 질문 넘어간 후 질문 음성 TTS 변환 & 음성 시작
  /* useEffect(() => {
    if(!isInterviewStart) return;
    getQ2AudioData();
  }, [isInterviewStart, currentQuestionIndex]); */

  const getQ2AudioData = async () => {
    try {
      const response = await axios({
        method: "post",
        url: "https://texttospeech.googleapis.com/v1/text:synthesize?key=",
        headers: {},
        data: {
          voice: {
            languageCode: "ko-KR",
          },
          input: {
            text: `${questions[currentQuestionIndex - 1].content}`,
          },
          audioConfig: {
            audioEncoding: "mp3",
          },
        },
      });

      // 여기서 response를 사용하여 로그를 출력하거나 다른 작업을 수행할 수 있습니다.
      console.log("Audio data response:", response);

      const base64String = response.data.audioContent;
      const audioBlob = base64ToBlob(base64String);
      if (audioRef.current && audioBlob !== undefined) {
        audioRef.current.src = URL.createObjectURL(audioBlob);
        audioRef.current.play();
      }
    } catch (error) {
      console.error("Error fetching audio data:", error);
    }
  };

  const base64ToBlob = (base64: string) => {
    const byteCharacters = atob(base64);
    const byteNumbers = Array.from(byteCharacters).map((char) =>
      char.charCodeAt(0)
    );
    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: "audio/mp3" });
    return blob;
  };

  const handleNextButtonClick = () => {
    if (recorderControls.isRecording) {
      recorderControls.stopRecording();
      console.log("녹음 중지");
    }
    if (!recorderControls.isRecording && recorderControls.recordingBlob) {
      addAudioElement(recorderControls.recordingBlob);
      console.log("녹음본 전송");
      // 다음 질문이 있는지 확인
      if (currentQuestionIndex < questions.length) {
        // 다음 질문의 인덱스로 업데이트
        setQuestionId(questions[currentQuestionIndex].id);
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      } else {
        // 마지막 질문이었다면 결과 페이지로 이동
        navigate("/result/" + id);
      }
    }
  };

  const recorderControls = useAudioRecorder();

  const addAudioElement = async (blob: Blob) => {
    const file = new FormData();
    file.append("question", questionId.toString());
    file.append("record_url", blob);
    try {
    } catch (e) {
      console.error(e);
    }
  };

  const handleRecordingStart = () => {
    setTimeout(() => {
      recorderControls.startRecording();
      btnRef.current?.style.setProperty('visibility','visible');
    }, 1000);
  };

  const [elapsedTime, setElapsedTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timer;

    if (isRunning) {
      interval = setInterval(() => {
        setElapsedTime((prevTime) => prevTime + 1);
      }, 1000);
    }

    return () => {
      clearInterval(interval);
    };
  }, [isRunning]);

  const startStopwatch = () => {
    setIsRunning(true);
  };

  const interviewStart = () => {
    setIsInterviewStart(true);
    getQ2AudioData();
    startStopwatch();
  };

  return (
    <>
      {!isInterviewStart ? (
        <StartModal>
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 2 }}
          >
            <TextContent
              isInterviewStart={isInterviewStart}
              variants={fadeIn}
              initial="hidden"
              animate="visible"
            >
              <AnswerPoint>답변포인트</AnswerPoint>
              <PointText>
                <b>본인을 설명하는 키워드</b>가 회사의 조직문화나
                <br />
                <b>지원 직무와 어떤 연관성이 있는지</b>를 염두해 두고,
                <br />
                면접관의 긍정적인 판단에 도움이 되는 답변일지
                <br />
                고려해 봅시다.
              </PointText>
            </TextContent>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 3 }}
          >
            <StartButton onClick={interviewStart} variants={fadeIn}>
              면접 시작
            </StartButton>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 4 }}
          >
            <Dot variants={fadeIn}>
              *면접할 준비가 되셨다면,
              <br />
              면접 시작 버튼을 눌러주세요!
            </Dot>
          </motion.div>
        </StartModal>
      ) : (
        <>
          <Up>
            {selectedInterviewType.showCamera === false ? (
              <VideoContainer>
                <SpinnerBox>
                  <LeoBorder
                    color="rgb(102, 102, 102)"
                    gradientColor="102, 102, 102"
                    animationDuration={1.8}
                  >
                    <LeoCore backgroundColor="#191919aa" />
                  </LeoBorder>
                  <LeoBorder
                    color="rgb(255, 215, 244)"
                    gradientColor="255, 215, 244"
                    animationDuration={2.2}
                  >
                    <LeoCore backgroundColor="#bebebeaa" />
                  </LeoBorder>
                </SpinnerBox>
              </VideoContainer>
            ) : (
              <Camera elapsedTime={elapsedTime} children={undefined} />
            )}
          </Up>

          <Down>
            {questions.map((question, index) => (
              <Q
                key={index}
                style={{
                  display:
                    index + 1 === currentQuestionIndex ? "block" : "none",
                }}
              >
                <QuestionText>{question.type_name}</QuestionText>
                <ContentText>{question.content}</ContentText>
              </Q>
            ))}
            <RecordBox>
              <Next onClick={handleNextButtonClick} ref={btnRef}>
                <StyledNextImage
                  src={recorderControls.isRecording ? stopIcon : nextIcon}
                  alt="next"
                />
              </Next>
            </RecordBox>
          </Down>
        </>
      )}

      <audio ref={audioRef} style={{ display: "none" }} preload="auto" />
    </>
  );
}
export default Interviewpage;
