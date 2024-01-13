import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
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
  background-image: url('https://i.postimg.cc/QdcMWgKq/Rectangle-23.png');
  background-position: center;
  background-size: cover;
`;

const Image = styled.img`
 /*  @media screen and (max-width: 768px) {
    width: 480px;
    height: 300px;
  }

  @media screen and (min-width: 769px) and (max-width: 1023px) {
    width: 480px;
    height: 300px;
  }

  @media screen and (min-width: 1024px) {
  } */
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

  @media screen and (min-width: 1024px) {
    width: 25px;
    height: 25px;
  }
`;

const Down = styled.div`
  width: 80%;
  max-width: 800px;
  height: 280px;
  background-color: #f6f6f6 ;
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
  //background-color: white; 간격 맞추기 위한 거니까 무시해도 됨
`;

const QuestionText = styled.div`
  font-weight: bold;
  font-size: 20px;
  margin-bottom: 10px;
`;

const ContentText = styled.div`
  color: #5a5a5a;
  font-size: 18px;
  @media screen and (max-width: 768px) {
    font-size: 14px;
    margin-right: 20px;
  }

  @media screen and (min-width: 769px) and (max-width: 1023px) {
    font-size: 16px;
    margin-right: 20px;
  }

  @media screen and (min-width: 1024px) {
    font-size: 18px;
    margin-right: 20px;
  }
`;

const Next = styled.button`
  border: none;
  background: none;
  cursor: pointer;
  margin-left: auto;
  margin-bottom: 30px;
`;

const StyledNextImage = styled.img`
  width: 50px;
  height: 50px;
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

  return (
    <>
      <Up>
        <Camera/>
        <Info>
          <Timer>00:00</Timer>
          <Button onClick={handleButtonClick}>
            <StyledButtonImage src={buttonImage} alt="button" />
          </Button>
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
      </Down>
    </>
  );
}

export default Interviewpage;
