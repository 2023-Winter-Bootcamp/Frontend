import React, { useState, useEffect, useRef } from "react";
import styled, { keyframes } from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
import { useAudioRecorder } from "react-audio-voice-recorder";
import axios from "axios";
import Camera from "./components/Camera";
import { useRecoilValue } from "recoil";
import { interviewTypeState } from "./Recoil";
import { motion } from "framer-motion";
import nextIcon from "./images/nextbutton.png";
import recordIcon from "./images/recordbutton.png";

const Up = styled.div`
  width: 100%;
  height: 400px;
  box-sizing: border-box;
  margin-top: 50px;
  display: flex;
  justify-content: center;
  position: relative;
`;

const Down = styled.div`
  width: 740px;
  height: 300px;
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  margin-left: 50.3%;
  transform: translateX(-50%);
  margin-top: 120px;
  margin-bottom: 50px;
`;

const Q = styled.div`
  width: 90%;
  height: 220px;
  margin: 0 auto;
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
  justify-content: end;
  align-items: center;
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

const InstructionText = styled.div`
  width: auto;
  height: 16px;
  font-size: 16px;
  color: #909090;
  visibility: hidden;
`;

export interface Question {
  id: number;
  type_name: string;
  content: string;
}

function Interviewpage() {
  //인터뷰 관련
  const [isInterviewStart, setIsInterviewStart] = useState(false);
  const selectedInterviewType = useRecoilValue(interviewTypeState);
  const { id } = useParams();
  const navigate = useNavigate();

  //질문 관련
  const [question, setQuestion] = useState<Question[]>([]);
  const [questionId, setQuestionId] = useState<number>(0);
  const [questionType, setQuestionType] = useState<string>("");

  //음성녹음 관련
  const recorderControls = useAudioRecorder();
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const btnRef = useRef<HTMLButtonElement | null>(null);
  const instRef = useRef<HTMLDivElement | null>(null);
  const [instText, setInstText] = useState("");

  //스탑워치 관련
  const [elapsedTime, setElapsedTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  //면접화면이 처음 렌더링될 때 질문정보 수신
  useEffect(() => {
    window.scrollTo(0, 0);
    if (id) {
      axios
        .get(`http://localhost:8000/api/interviews/${id}/questions/`)
        .then((response) => {
          console.log(response.data.questions);
          setQuestion(response.data.questions);
          setQuestionId(response.data.questions[0].id);
        })
        .catch((error) => {
          console.error("Error fetching questions:", error);
        });
    }
    console.log(selectedInterviewType);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  //질문 음성이 종료됐을 때 녹음 시작해주는 이벤트함수 등록
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
  }, [id]);

  //질문 내용 TTS변환 후 음성파일 실행 메소드
  const getQ2AudioData = async () => {
    try {
      const response = await axios({
        method: "post",
        url: `https://texttospeech.googleapis.com/v1/text:synthesize?key=${process.env.REACT_APP_TTS_KEY}`,
        headers: {},
        data: {
          voice: {
            languageCode: "ko-KR",
          },
          input: {
            text: `${question[0].content}`,
          },
          audioConfig: {
            audioEncoding: "mp3",
          },
        },
      });

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

  //TTS로 받은 음성파일을 Blob파일로 변환해주는 메소드
  const base64ToBlob = (base64: string) => {
    const byteCharacters = atob(base64);
    const byteNumbers = Array.from(byteCharacters).map((char) =>
      char.charCodeAt(0)
    );
    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: "audio/mp3" });
    return blob;
  };

  //버튼을 눌렀을 때, 녹음 중지 or 질문초기화
  const handleNextButtonClick = () => {
    if (recorderControls.isRecording) {
      recorderControls.stopRecording();
      console.log("녹음 중지");
      setInstText("다음 질문 준비가 완료됐다면 버튼을 눌러주세요");
    }
    if (!recorderControls.isRecording && recorderControls.recordingBlob) {
      getQuestion(recorderControls.recordingBlob);
      console.log("녹음파일 전송 & 다음 질문 설정");
      //TODO: 녹음 종료 기능 추가해야함
    }
  };

  // 음성 파일 보내고 질문 받아오는 메소드
  const getQuestion = async (blob: Blob) => {
    const file = new FormData();
    file.append("question", questionId.toString());
    file.append("record_url", blob);
    try {
      //음성파일 보낸 후 서버에서 새로운 질문을 받아옴
      const response = await axios.post(
        `http://localhost:8000/api/interviews/questions/${questionId}/answers/create/`,
        file
      );
      // TODO: 다음 질문 정보가 왔을 때 질문 정보 초기화(예상 data)
      /* setQuestion(response.data.content);
      setQuestionType(response.data.type_name);
      setQuestionId(response.data.id); */
      endInterview();
    } catch (e) {
      console.error(e);
    }
  };

  //인터뷰 종료 메소드
  const endInterview = () => {
    navigate("/result/" + id);
  };

  //녹음 시작 메소드
  const handleRecordingStart = () => {
    setTimeout(() => {
      recorderControls.startRecording();
      btnRef.current?.style.setProperty("visibility", "visible");
      instRef.current?.style.setProperty("visibility", "visible");
      setInstText("답변이 완료되면 버튼을 눌러주세요");
    }, 1000);
  };

  //다음 질문 넘어간 후 질문 음성 TTS 변환 & 음성 시작
  useEffect(() => {
    if (!isInterviewStart) return;
    getQ2AudioData();
    btnRef.current?.style.setProperty("visibility", "hidden");
    instRef.current?.style.setProperty("visibility", "hidden");
  }, [question]);

  //스탑워치 시작 기능
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
            <Q>
              <QuestionText>{question[0].type_name}</QuestionText>
              <ContentText>{question[0].content}</ContentText>
            </Q>
            <RecordBox>
              <InstructionText ref={instRef}>{instText}</InstructionText>
              <Next onClick={handleNextButtonClick} ref={btnRef}>
                <StyledNextImage
                  src={recorderControls.isRecording ? recordIcon : nextIcon}
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
