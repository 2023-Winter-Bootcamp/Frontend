import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
import { AudioRecorder, useAudioRecorder } from "react-audio-voice-recorder";

import axios from "axios";

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
  justify-content: center;
  align-items: center;
`;

const Timer = styled.div`
  margin-bottom: 4px;
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

const Down = styled.div`
  width: 80%;
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
  justify-content: space-between;
`;

export interface Question {
  type_name: string;
  content: string;
}

function Interviewpage() {
  const [buttonImage, setButtonImage] = useState(
    "https://i.postimg.cc/9F5kxyNS/2024-01-04-2-23-04.png"
  );

  const [questions, setQuestions] = useState<Question[]>([]); // 질문 상태 배열 추가
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0); // 현재 질문의 인덱스 상태

  const { id } = useParams(); // 면접 ID를 useParams로 받아오기
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      axios
        .get(`http://localhost:8000/api/interviews/${id}/questions/`)
        .then((response) => {
          console.log(response.data.questions);
          setQuestions(response.data.questions);
        })
        .catch((error) => {
          console.error("Error fetching questions:", error);
        });
    }
  }, [id]);

  const handleButtonClick = () => {
    if (
      buttonImage === "https://i.postimg.cc/9F5kxyNS/2024-01-04-2-23-04.png"
    ) {
      setButtonImage("https://i.postimg.cc/SxLc9SV2/2024-01-04-2-59-20.png");
    } else {
      setButtonImage("https://i.postimg.cc/9F5kxyNS/2024-01-04-2-23-04.png");
    }
  };

  const handleNextButtonClick = () => {
    // 다음 질문이 있는지 확인
    if (currentQuestionIndex < questions.length - 1) {
      // 다음 질문의 인덱스로 업데이트
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // 마지막 질문이었다면 결과 페이지로 이동
      navigate("/result");
    }
  };

  const recorderControls = useAudioRecorder();

  const addAudioElement = async (blob: Blob) => {
    const url = URL.createObjectURL(blob);
    const audio = document.createElement("audio");
    audio.src = url;
    audio.controls = true;
    const file = new FormData();
    file.append("question", "1");
    file.append("record_url", blob);
    try {
      const response = await axios.post(
        `http://localhost:8000/api/interviews/questions/${
          currentQuestionIndex + 1
        }/answers/create/`,
        file
      );
    } catch (e) {
      console.error(e);
    }
  };
  //질문 음성파일 실행 끝나면 2초 뒤 녹음 실행
  const handleRecordingStart = () => {
    setTimeout(()=>{
      recorderControls.startRecording();
    },2000)
  }

  useEffect(()=> {
    if(!recorderControls.recordingBlob) return;
    handleNextButtonClick();
  }, [recorderControls.recordingBlob])

  return (
    <>
      <Up>
        <Camera />
        <Info>
          <Timer>00:00</Timer>
          <Button onClick={handleButtonClick}>
            <StyledButtonImage src={buttonImage} alt="button" />
          </Button>
          <Button onClick={handleRecordingStart}>질문 끝</Button>
        </Info>
      </Up>
      <Down>
        {questions.map((question, index) => (
          <Q
            key={index}
            style={{
              display: index === currentQuestionIndex ? "block" : "none",
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
  );
}

export default Interviewpage;
