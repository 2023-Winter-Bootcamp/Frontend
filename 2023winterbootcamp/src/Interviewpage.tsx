/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef } from "react";
import styled, { createGlobalStyle, keyframes } from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
import { useAudioRecorder } from "react-audio-voice-recorder";
import axios from "axios";
import api from "./baseURL/baseURL";
import Camera from "./components/Camera";
import { useRecoilValue, useSetRecoilState } from "recoil";
import {
  interviewTypeState,
  currentQuestionState,
  QuestionType,
  totalQuestionCountState,
  interviewResultState,
  interviewHeaderPoint,
} from "./Recoil";
import nextIcon from "./images/nextbutton.png";
import recordIcon from "./images/recordbutton.png";
import LoadingModal from "./components/LoadingModal";
import { useRecoilState } from "recoil";
import { Line } from "rc-progress";

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
  }
`;

const Container = styled.div`
  width: 100%;
`;

const Up = styled.div`
  user-select: none;
  width: 100%;
  box-sizing: border-box;
  margin-top: 50px;
  display: flex;
  justify-content: center;
  position: relative;
  margin-bottom: 20px;
  @media screen and (max-width: 768px) {
  }
  @media screen and (min-width: 769px) and (max-width: 1023px) {
  }
  @media screen and (min-width: 1024px) {
  }
`;

const Down = styled.div`
  user-select: none;
  width: 70%;
  min-width: 500px;
  max-width: 900px;
  //height: 200px;
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  margin-left: 50.3%;
  transform: translateX(-50%);
  //margin-top: 120px;
  margin-bottom: 40px;
`;

const Q = styled.div`
  width: 90%;
  //height: 220px;
  margin: 0 auto;
  background-color: #f0f0f0;
  border-radius: 10px;
`;

const QuestionText = styled.div`
  font-weight: bold;
  font-size: 20px;
  margin-top: 20px;
  margin-left: 24px;
`;

const ContentText = styled.div`
  width: 94%;
  color: #5a5a5a;
  font-size: 16px;
  margin-top: 4px;
  margin-left: 24px;
  margin-bottom: 20px;
  @media screen and (max-width: 768px) {
    font-size: 14px;
  }

  @media screen and (min-width: 769px) and (max-width: 1023px) {
    font-size: 16px;
  }

  @media screen and (min-width: 1024px) {
    font-size: 16px;
  }
`;

const Next = styled.button`
  width: 40px;
  height: 40px;
  border: none;
  background: none;
  cursor: pointer;
  visibility: hidden;
  margin-right: 24px;
`;

const StyledNextImage = styled.img`
  width: 44px;
  height: 44px;
`;

const RecordBox = styled.div`
  width: 100%;
  //height: 50px;
  display: flex;
  justify-content: end;
  align-items: center;
  margin-right: 8px;
  margin-bottom: 10px;
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
  width: 70%;
  max-width: 660px;
  min-height: 400px;
  background-color: #ffffff;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  align-items: flex-start;
  transform: scaleX(-1);
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
  $gradientColor: string;
  $animationDuration: number;
}

const SpinnerBox = styled.div`
  width: 100%;
  height: 380px;
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
    rgba(${(props) => props.$gradientColor}, 0.1) 33%,
    rgba(${(props) => props.$gradientColor}, 1) 100%
  );
  animation: ${spin3D} ${(props) => props.$animationDuration}s linear 0s
    infinite;
`;

interface LeoCoreProps {
  $backgroundColor: string;
}

const LeoCore = styled.div<LeoCoreProps>`
  ${commonStyle}
  width: 100%;
  height: 100%;
  background-color: ${(props) => props.$backgroundColor};
`;

const InstructionText = styled.div`
  width: auto;
  height: 18px;
  font-size: 14px;
  color: #3b3b3b;
  visibility: hidden;
  margin-top: 8px;
`;

const ProgressBar = styled.div`
  width: 90%;
  height: 20px;
  margin: 0 auto 20px;
`;

const QuestionNum = styled.div`
  width: auto;
  height: 20px;
  font-size: 16px;
  margin: 0 auto;
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
  const { id } = useParams(); // 면접 ID
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [, setInterviewData] = useRecoilState(interviewResultState);
  const [throttler, setThrottler] = useState(false);
  //질문 관련
  const [, setQuestion] = useState<Question[]>([]);
  const [questionId, setQuestionId] = useState<number>(0);
  const [questionContent, setQuestionContent] = useState<string>("");
  const [questionType, setQuestionType] = useState<string>("");
  const [questionTypeTitle, setQuestionTypeTitle] = useState<string>("common");
  const [questionState, setQuestionState] =
    useRecoilState(currentQuestionState);
  const questionTotalCount = useRecoilValue(totalQuestionCountState);
  const [responseCount, setResponseCount] = useState(0);
  const [currentQuestionNumber, setCurrentQuestionNumber] = useState(0);
  const [linePercent, setLinePercent] = useState(0);

  //음성녹음 관련
  const recorderControls = useAudioRecorder();
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const btnRef = useRef<HTMLButtonElement | null>(null);
  const instRef = useRef<HTMLDivElement | null>(null);
  const [instText, setInstText] = useState("");

  //스탑워치 관련
  const [elapsedTime, setElapsedTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [cameraWidth, setCameraWidth] = useState(600);
  const [cameraHeight, setCameraHeight] = useState(400);

  const setInterviewHeaderPoint = useSetRecoilState(interviewHeaderPoint);

  // 첫 질문 조회
  const fetchCommonQuestion = async () => {
    if (id) {
      try {
        const response = await api.get(`interviews/${id}/questions`, {
          withCredentials: true,
        });
        console.log(response.data.questions);
        setQuestion(response.data.questions);
        setQuestionType(response.data.questions[0].type_name);
        setQuestionContent(response.data.questions[0].content);
        setQuestionId(response.data.questions[0].id);
      } catch (e) {
        console.log(e);
      }
    }
  };

  // 면접화면이 처음 렌더링될 때 질문정보 수신
  useEffect(() => {
    window.scrollTo(0, 0);
    fetchCommonQuestion();
    interviewStart();

    console.log(selectedInterviewType);
  }, [id]);

  // 면접 시작할때 시작되는 함수
  const interviewStart = () => {
    setIsInterviewStart(true);
    startStopwatch();
  };

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
            name: "ko-KR-Wavenet-C",
          },
          input: {
            text: questionContent,
          },
          audioConfig: {
            audioEncoding: "mp3",
            effectsProfileId: ["small-bluetooth-speaker-class-device"],
            pitch: -1.5,
            speakingRate: 1.11,
          },
        },
      });

      const base64String = response.data.audioContent;
      const audioBlob = base64ToBlob(base64String);
      if (audioRef.current && audioBlob !== undefined) {
        const objectURL = URL.createObjectURL(audioBlob);
        audioRef.current.src = objectURL;

        audioRef.current.addEventListener("loadeddata", playAudio);
      }
    } catch (error) {
      console.error("Error fetching audio data:", error);
    }
  };

  // 오디오 파일 재생 함수
  const playAudio = () => {
    if (audioRef.current) {
      audioRef.current
        .play()
        .catch((e) => console.error("Error playing audio:", e));
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
  }, [questionId]);

  //버튼을 눌렀을 때, 녹음 중지 or 질문초기화
  const handleNextButtonClick = () => {
    if (recorderControls.isRecording) {
      recorderControls.stopRecording();
      console.log("녹음 중지");
      responseCount === questionTotalCount
        ? setInstText("모든 답변이 완료되었습니다. 면접을 종료합니다.")
        : setInstText("다음 질문 준비가 완료됐다면 버튼을 눌러주세요");
    }
    if (!recorderControls.isRecording && recorderControls.recordingBlob) {
      if (questionTotalCount === responseCount) {
        sendLastAnswer(recorderControls.recordingBlob);
      } else {
        getQuestion(recorderControls.recordingBlob);
        console.log("녹음파일 전송 & 다음 질문 설정");
      }
    }
  };

  //pollingFetchResult
  const pollingFetchResult = async (taskId: string, waitTime: number) => {
    await new Promise((resolve) => setTimeout(resolve, waitTime));

    try {
      while (true) {
        const response = await api.get(`interviews/task-result/${taskId}`, {
          withCredentials: true,
        });
        const statusCode = response.status;

        if (statusCode === 202) {
          await new Promise((resolve) => setTimeout(resolve, 1000));
        } else if (statusCode === 200) {
          return response;
        } else {
          throw new Error(
            `Failed to fetch task-result. Status code: ${statusCode}`
          );
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  // 답변 등록 + 질문 생성 API (음성 파일 보내고 질문 받아오는 메소드)
  const getQuestion = async (blob: Blob) => {
    if (!id) return;
    const file = new FormData();
    file.append("question_id", questionId.toString());
    file.append("interview_id", id as string);
    file.append("record_url", blob);
    file.append("question_type", questionState.currentType);
    try {
      setIsLoading(true);
      //음성파일 보내는 기능
      const response = await api
        .post(
          `interviews/${parseInt(id)}/questions/${questionId}/process`,
          file
        )
        .then((response) =>
          pollingFetchResult(response.data.task_id, response.data.wait_time)
        );

      setResponseCount((prevCount) => prevCount + 1); // api Response가 올때마다 count를 1씩 증가시킴

      console.log(response?.data);

      if (response?.data && response.data.question) {
        setQuestionId(response.data.question[0].id);
        setQuestionType(response.data.question[0].question_type);
        setQuestionContent(response.data.question[0].content);
        updateQuestionState(); // question_type count 차감 및 다음 question_type 변경
        console.log(response.data);
      }
      setIsLoading(false);
    } catch (e) {
      console.error(e);
    }
  };

  // 마지막 질문일 때 실행
  useEffect(() => {
    if (questionTotalCount === responseCount) {
      endInterview();
      return;
    }
  }, [responseCount]);

  // questionContent의 값이 변경되면 TTS 실행
  useEffect(() => {
    if (questionContent !== "") {
      if (!isInterviewStart) return;
      getQ2AudioData();
      btnRef.current?.style.setProperty("visibility", "hidden");
      instRef.current?.style.setProperty("visibility", "hidden");
      //TTS가 실행된 후 현재 질문의 번호가 1 증가
      setCurrentQuestionNumber((prev) => prev + 1);
    }
    window.scrollTo(0, 0);
  }, [questionContent]);

  // 현재 question_type의 count 차감 및 다음 question_type으로 변경
  const updateQuestionState = () => {
    setQuestionState((prevState) => {
      const currentType = prevState.currentType as QuestionType;
      let currentCounts = prevState.counts[currentType];
      let nextType = prevState.currentType;

      // currentType의 count를 차감
      currentCounts = Math.max(0, currentCounts - 1);

      // 현재 question_type의 count가 0이면 다음 question_type으로 변경
      if (currentCounts === 0) {
        nextType = getNextQuestionType(currentType);
      }

      return {
        ...prevState,
        currentType: nextType,
        counts: {
          ...prevState.counts,
          [currentType]: currentCounts,
        },
      };
    });
  };

  // 다음 question_type을 결정
  const getNextQuestionType = (currentType: QuestionType) => {
    const { counts } = questionState;
    if (currentType === "project" && counts.cs > 0) {
      return "cs";
    } else if (currentType === "cs" && counts.personality > 0) {
      return "personality";
    } else {
      return "";
    }
  };

  // 마지막 질문 조회
  const fetchLastQuestion = async () => {
    if (id) {
      try {
        const response = await api.get(`interviews/${id}/questions`, {
          withCredentials: true,
        });
        console.log(response.data.questions);
        const lastArrayIndex = response.data.questions.length - 1;
        setQuestion(response.data.questions);
        setQuestionType(response.data.questions[lastArrayIndex].type_name);
        setQuestionContent(response.data.questions[lastArrayIndex].content);
        setQuestionId(response.data.questions[lastArrayIndex].id);
      } catch (e) {
        console.log(e);
      }
    }
  };

  // 마지막 question 답변 등록 API
  const sendLastAnswer = async (blob: Blob) => {
    if (!id || !blob) return;
    setIsLoading(true);
    const file = new FormData();
    file.append("question", questionId.toString());
    file.append("record_url", blob);
    file.append("is_last", "true");
    try {
      await api
        .post(
          `interviews/${parseInt(id)}/questions/${questionId}/process`,
          file
        )
        .then((response) =>
          pollingFetchResult(response.data.task_id, response.data.wait_time)
        );

      // 면접 결과 조회 API
      const setInterviewResult = async () => {
        try {
          const response = await api.get(`interviews/${id}`, {
            withCredentials: true,
          });
          setInterviewData(response.data);
        } catch (e) {
          console.log(e);
        }
      };

      setInterviewResult(); // 면접 결과 저장
      navigate("/end/" + id);
    } catch (e) {
      console.log(e);
    }
    setIsLoading(false);
  };

  //인터뷰 종료 메소드
  const endInterview = async () => {
    if (!id) return;
    await fetchLastQuestion(); // 마지막 질문 조회
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

  // 스탑워치 스톱
  const startStopwatch = () => {
    setIsRunning(true);
  };

  const handleSelectStart = (event: React.MouseEvent<HTMLDivElement>) => {
    event.preventDefault();
    return false;
  };

  //질문 타입 바뀔 때마다 그에 맞는 질문 타이틀 설정
  useEffect(() => {
    if (questionType === "common") setQuestionTypeTitle("자기소개");
    else if (questionType === "project") setQuestionTypeTitle("프로젝트 질문");
    else if (questionType === "cs") setQuestionTypeTitle("CS 질문");
    else if (questionType === "personality")
      setQuestionTypeTitle("인성 면접 질문");
  }, [questionType]);

  useEffect(() => {
    const cameraResize = () => {
      let wh = { width: 2500, height: 500 };

      // 미디어쿼리를 사용하여 뷰포트 크기에 따라 가로 길이 설정
      if (window.matchMedia("(max-width: 1000px)").matches) {
        wh = { width: 800, height: 400 };
      }

      setCameraWidth(wh.width);
      setCameraHeight(wh.height);
    };

    const handleResize = () => {
      if (throttler) return;
      setThrottler(true);
      setTimeout(() => {
        cameraResize();
        setThrottler(false);
      }, 500);
    };

    // 초기 렌더링 시 실행
    cameraResize();

    // 창 크기가 변경될 때마다 실행
    window.addEventListener("resize", handleResize);

    // 컴포넌트가 언마운트되거나 업데이트되기 전에 이벤트 리스너 정리
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [throttler]);

  //현재 질문 번호가 바뀔 때마다 면접 진행 상태(progress bar 상태) 업데이트
  useEffect(() => {
    setLinePercent((currentQuestionNumber / (questionTotalCount + 1)) * 100);
  }, [currentQuestionNumber]);

  //interview 관련 페이지가 렌더링되면 헤더에 강조해서 표현하고 다른 곳으로 이동시 강조 해제
  useEffect(() => {
    setInterviewHeaderPoint(true);
    return () => {
      setInterviewHeaderPoint(false);
    };
  }, []);

  return (
    <>
      <GlobalStyle />
      <Container>
        <Up onContextMenu={handleSelectStart}>
          {selectedInterviewType.showCamera === false ? (
            <VideoContainer>
              <SpinnerBox>
                <LeoBorder
                  color="rgb(102, 102, 102)"
                  $gradientColor="102, 102, 102"
                  $animationDuration={1.8}
                >
                  <LeoCore $backgroundColor="#191919aa" />
                </LeoBorder>
                <LeoBorder
                  color="rgb(255, 215, 244)"
                  $gradientColor="255, 215, 244"
                  $animationDuration={2.2}
                >
                  <LeoCore $backgroundColor="#bebebeaa" />
                </LeoBorder>
              </SpinnerBox>
            </VideoContainer>
          ) : (
            <Camera
              elapsedTime={elapsedTime}
              children={undefined}
              cameraWidth={cameraWidth}
              cameraHeight={cameraHeight}
            />
          )}
        </Up>

        <Down onContextMenu={handleSelectStart}>
          <QuestionNum>{`${
            questionTotalCount + 1
          }개의 질문 중 ${currentQuestionNumber}번째 질문`}</QuestionNum>
          <ProgressBar>
            <Line
              percent={linePercent}
              strokeWidth={1}
              strokeColor={"#6e6e6e"}
              style={{ transition: "all 1s ease-out" }}
            ></Line>
          </ProgressBar>
          <Q>
            <QuestionText>{questionTypeTitle}</QuestionText>
            <ContentText>{questionContent}</ContentText>
            <RecordBox>
              <InstructionText ref={instRef}>{instText}</InstructionText>
              <Next onClick={handleNextButtonClick} ref={btnRef}>
                <StyledNextImage
                  src={recorderControls.isRecording ? recordIcon : nextIcon}
                  alt="next"
                />
              </Next>
            </RecordBox>
          </Q>
        </Down>
        {isLoading ? <LoadingModal /> : null}
        <audio ref={audioRef} style={{ display: "none" }} preload="auto" />
      </Container>
    </>
  );
}
export default Interviewpage;
