import React, { useState, useEffect, useRef } from "react";
import styled, { keyframes } from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
import { AudioRecorder, useAudioRecorder } from "react-audio-voice-recorder";
import axios from "axios";
import { motion, useAnimation } from "framer-motion";

const Up = styled.div`
  width: 100%;
  height: 400px;
  box-sizing: border-box;
  margin-top: 50px;
  display: flex;
  justify-content: center;
`;

const Camera = styled.div`
  width: 60%;
  max-width: 700px;
  min-width: 400px;
  height: 400px;
  background-image: url("https://i.postimg.cc/QdcMWgKq/Rectangle-23.png");
  background-position: center;
  background-size: cover;
`;

const Info = styled.div`
  width: 50px;
  height: 50px;
  margin-left: 15px;
  margin-top: 15px;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
`;

const Timer = styled.div`
  color: white;
  font-size: 20px;
  margin-left: 20px;
`;

const Down = styled.div`
  width: 60%;
  max-width: 800px;
  height: 300px;
  background-color: #f6f6f6;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  margin-left: 50%;
  transform: translateX(-50%);
  margin-top: 50px;
  margin-bottom: 50px;
  padding: 20px;
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
`;

const StyledNextImage = styled.img`
  width: 44px;
  height: 44px;
`;

const RecordBox = styled.div`
  width: 100%;
  height: 60px;
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

const Button = styled.div`
  width: 50px;
  height: 50px;
  border: 1px solid black;
  cursor: pointer;
`;

const StyledButtonImage = styled.img`
  width: 25px;
  height: 25px;
  @media screen and (max-width: 768px) {
    width: 20px;
    height: 20px;
  }

  @media screen and (min-width: 769px) and (max-width: 1023px) {
    width: 20px;
    height: 20px;
  }
`;

export interface Question {
  id: number;
  type_name: string;
  content: string;
}

function Interviewpage() {
  const [buttonImage, setButtonImage] = useState(
    "https://i.postimg.cc/9F5kxyNS/2024-01-04-2-23-04.png"
  );
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(1);
  const [questionId, setQuestionId] = useState<number>(0);
  const [isInterviewStart, setIsInterviewStart] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

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
  }, [id]);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  //처음 페이지 로딩된 후, 다음 질문 넘어간 후 질문 음성 TTS 변환 & 음성 시작
  /* useEffect(() => {
    if(!isInterviewStart) return;
    getQ2AudioData();
  }, [isInterviewStart, currentQuestionIndex]); */

  const getQ2AudioData = async () => {
    console.log(questions);
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
    const base64String = response.data.audioContent;
    const audioBlob = base64ToBlob(base64String);
    if (audioRef.current && audioBlob !== undefined) {
      audioRef.current.src = URL.createObjectURL(audioBlob);
      audioRef.current.play();
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
    // 다음 질문이 있는지 확인
    if (currentQuestionIndex < questions.length) {
      // 다음 질문의 인덱스로 업데이트
      setQuestionId(questions[currentQuestionIndex].id);
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // 마지막 질문이었다면 결과 페이지로 이동
      navigate("/result/" + id);
    }
  };

  const recorderControls = useAudioRecorder();

  const addAudioElement = async (blob: Blob) => {
    const file = new FormData();
    file.append("question", questionId.toString());
    file.append("record_url", blob);
    try {
      const response = await axios.post(
        `http://localhost:8000/api/interviews/questions/${questionId}/answers/create/`,
        file
      );
    } catch (e) {
      console.error(e);
    }
    handleNextButtonClick();
  };
  //질문 음성파일 실행 끝나면 2초 뒤 녹음 실행
  const handleRecordingStart = () => {
    setTimeout(() => {
      recorderControls.startRecording();
    }, 2000);
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

  const formatTime = (timeInSeconds: number) => {
    const hours = Math.floor(timeInSeconds / 3600);
    const minutes = Math.floor((timeInSeconds % 3600) / 60);
    const seconds = timeInSeconds % 60;

    const formattedHours = String(hours).padStart(2, "0");
    const formattedMinutes = String(minutes).padStart(2, "0");
    const formattedSeconds = String(seconds).padStart(2, "0");

    return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
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
              ‘면접 시작' 버튼을 눌러주세요!
            </Dot>
          </motion.div>
        </StartModal>
      ) : (
        <>
          <Up>
            <Camera>
              <Info>
                <Timer>{formatTime(elapsedTime)}</Timer>
              </Info>
            </Camera>
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
              <div>
                <AudioRecorder
                  onRecordingComplete={(blob) => addAudioElement(blob)}
                  recorderControls={recorderControls}
                  showVisualizer={true}
                />
              </div>
              <Next onClick={handleNextButtonClick}>
                <StyledNextImage
                  src={
                    currentQuestionIndex === questions.length - 1
                      ? "https://i.postimg.cc/5yNzdTCP/2024-01-04-3-15-41.png"
                      : "https://i.postimg.cc/5yNzdTCP/2024-01-04-3-15-41.png"
                  }
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
