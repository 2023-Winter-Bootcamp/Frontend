import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import {
  githubLoginInfoState,
  githubProfileState,
  interviewResultState,
  resumeListState,
} from "./Recoil";
import { useRecoilState, useRecoilValue } from "recoil";
import axios from "axios";
import { useLocation } from "react-router-dom";
//import instagramwhiteicon from "./images/instagram-white-icon.webp";
import api from "./baseURL/baseURL";
import playImg from "./images/resultpage_play_button.jpg";
import stopImg from "./images/resultpage_stop_button.jpg";
declare global {
  interface Window {
    onInstagramLogin?: () => void;
  }
}

const ProfileContainer = styled.div`
  user-select: none;
  width: 100%;
  height: 420px;
  background: #070707;
  @media screen and (max-width: 768px) {
    height: 340px;
  }
  @media screen and (min-width: 769px) and (max-width: 1023px) {
    height: 380px;
  }
  @media screen and (min-width: 1024px) {
    height: 420px;
  }
`;

const ProfileBox = styled.div`
  width: 70%;
  display: flex;
  margin-left: 18%;
  @media screen and (max-width: 768px) {
    height: 180px;
    margin-left: 12%;
  }
  @media screen and (min-width: 769px) and (max-width: 1023px) {
    height: 220px;
    margin-left: 14%;
  }
  @media screen and (min-width: 1024px) {
    height: 250px;
  }
`;

const ProfileImage = styled.div<{ avatarUrl?: string }>`
  border-radius: 50%;
  background-image: ${(props) =>
    props.avatarUrl ? `url("${props.avatarUrl}")` : 'url("")'};
  background-position: center;
  background-size: cover;
  border: none;
  aspect-ratio: 1;
  margin-top: 60px;
  @media screen and (max-width: 768px) {
    width: 180px;
    height: 180px;
  }
  @media screen and (min-width: 769px) and (max-width: 1023px) {
    width: 220px;
    height: 220px;
  }
  @media screen and (min-width: 1024px) {
    width: 280px;
    height: 280px;
  }
`;

const ProfileInfo = styled.div`
  height: inherit;
  aspect-ratio: 1;
  margin-top: 60px;
  @media screen and (max-width: 768px) {
    width: 350px;
    margin-top: 0;
    margin-left: 30px;
  }
  @media screen and (min-width: 769px) and (max-width: 1023px) {
    width: 400px;
    margin-top: 0;
    margin-left: 50px;
  }
  @media screen and (min-width: 1024px) {
    width: 450px;
    margin-top: 10px;
    margin-left: 70px;
  }
`;

const Text1 = styled.div`
  width: 100%;
  font-weight: 700;
  color: white;
  margin-top: 60px;
  @media screen and (max-width: 768px) {
    height: 26px;
    font-size: 20px;
  }
  @media screen and (min-width: 769px) and (max-width: 1023px) {
    height: 30px;
    font-size: 24px;
  }
  @media screen and (min-width: 1024px) {
    height: 34px;
    font-size: 28px;
  }
`;

const Text2 = styled.div`
  font-weight: 600;
  margin-bottom: 10px;
  color: white;
  @media screen and (max-width: 768px) {
    width: 70px;
    height: 17px;
    font-size: 14px;
    line-height: 1.1;
  }
  @media screen and (min-width: 769px) and (max-width: 1023px) {
    width: 70px;
    height: 20px;
    font-size: 16px;
    line-height: 1.2;
  }
  @media screen and (min-width: 1024px) {
    width: 80px;
    height: 22px;
    font-size: 18px;
    line-height: 1.5;
  }
`;

const Text3 = styled.div`
  font-weight: 500;
  color: white;
  line-height: 1.5;
  margin-bottom: 10px;
  @media screen and (max-width: 768px) {
    width: 250px;
    height: 20px;
    font-size: 15px;
    line-height: 1.2;
    margin-bottom: 7px;
  }
  @media screen and (min-width: 769px) and (max-width: 1023px) {
    width: 250px;
    height: 22px;
    font-size: 16px;
    line-height: 1.2;
    margin-bottom: 8px;
  }
  @media screen and (min-width: 1024px) {
    width: 250px;
    height: 22px;
    font-size: 18px;
  }
`;

const TextBox1 = styled.div`
  display: flex;
  @media screen and (max-width: 768px) {
    width: 300px;
    height: 140px;
    margin-top: 10px;
  }
  @media screen and (min-width: 769px) {
    width: 400px;
    height: 200px;
    margin-top: 20px;
  }
`;

const TextBox2 = styled.div`
  width: 100px;
  height: inherit;
  display: flex;
  flex-direction: column;
  @media screen and (max-width: 768px) {
  }
  @media screen and (min-width: 769px) and (max-width: 1023px) {
    width: 80px;
  }
  @media screen and (min-width: 1024px) {
    width: 100px;
  }
`;

const TextBox3 = styled.div`
  width: 270px;
  height: inherit;
  display: flex;
  flex-direction: column;
  @media screen and (max-width: 768px) {
  }
  @media screen and (min-width: 769px) and (max-width: 1023px) {
    margin-left: 10px;
  }
  @media screen and (min-width: 1024px) {
    margin-left: 20px;
  }
`;

const QnAContainer = styled.div`
  user-select: none;
  width: 100%;
  background: linear-gradient(#f4f4f4 90%, lightgray);
`;

const QnABox = styled.div`
  width: 100%;
  box-sizing: border-box;
  padding: 20px 20px 0px 20px;
  display: flex;
  flex-direction: column;
`;

const QnAWrapper = styled.div`
  width: 100%;
  height: 555px;
  box-sizing: border-box;
  margin-bottom: -60px;
  margin-top: 20px;
  @media screen and (max-width: 1023px) {
    height: 90vh;
  }
`;

const QuestionBox = styled.div`
  width: 60%;
  box-sizing: border-box;
  padding: 25px 34px 15px;
  margin: 0 25% 20px 15%;
  background: #fff;
  @media screen and (max-width: 1023px) {
    margin: 0 12% 20px 12%;
    width: 75%;
  }
  @media screen and (min-width: 1024px) {
    margin: 0 25% 20px 15%;
    min-width: 700px;
  }
`;

const QLargeText = styled.div`
  width: 100%;
  height: 34px;
  font-size: 22px;
  font-weight: 700;
  margin-bottom: 10px;
  overflow: auto;
`;

const QSmallText = styled.div`
  width: 100%;
  height: 100px;
  font-size: 18px;
  font-weight: 400;
  color: #3a3a3a;
  overflow: auto;
`;

const ALargeText = styled.div`
  width: 100%;
  height: 34px;
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 10px;
  overflow: auto;
`;

const ASmallText = styled.div`
  width: 100%;
  height: 185px;
  font-size: 18px;
  font-weight: 400;
  color: #3a3a3a;
  overflow: auto;
  @media screen and (max-width: 1023px) {
    height: 40vh;
  }
`;

const AnswerBox = styled.div`
  width: 60%;
  box-sizing: border-box;
  margin: 0 15% 0 25%;
  padding: 30px 34px 0px;
  background: #fff;
  position: relative;
  @media screen and (max-width: 1023px) {
    width: 75%;
    margin: 0 12% 0 12%;
  }
  @media screen and (min-width: 1024px) {
    margin: 0 15% 0 25%;
    min-width: 700px;
  }
`;

const VoiceBox = styled.div`
  width: 160px;
  height: 43px;
  position: absolute;
  display: flex;
  justify-content: center;
  right: -35px;
  bottom: 15px;
`;

interface ButtonProps {
  $isPlaying: boolean;
}

const Button = styled.button<ButtonProps>`
  width: 15px;
  height: 18px;
  background-size: contain;
  margin-right: 8px;
  margin-top: 13px;
  border: none;
  outline: none;
  background-repeat: no-repeat;

  background-image: ${(props) =>
    props.$isPlaying
      ? `url(${stopImg})`
      : `url(${playImg})`
  };

  &:hover {
    cursor: pointer;
  }
`;

const Text4 = styled.div`
  width: 130px;
  height: 34px;
  font-size: 18px;
  font-weight: 400;
  line-height: 1.4;
  margin-top: 9px;
`;

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

const Resultpage = () => {
  const [interviewResult, setInterviewResult] =
    useRecoilState(interviewResultState);
  const { id } = useParams();
  const resumeList = useRecoilValue(resumeListState);
  const [isPlayingList, setIsPlayingList] = useState<boolean[]>([]);
  const audioRefs = useRef<HTMLAudioElement[]>([]);
  const [githubLoginInfo] = useRecoilState(githubLoginInfoState);
  // eslint-disable-next-line no-empty-pattern
  const [] = useRecoilState(githubProfileState);
  const [avatarUrl, setAvatarUrl] = useState("");
  const [gitName, setGitName] = useState("");
  const [resumeTitle, setResumeTitle] = useState('');
  const toggleAudio = (index: number) => {
    const newIsPlayingList = [...isPlayingList];
    newIsPlayingList[index] = !newIsPlayingList[index];
    setIsPlayingList(newIsPlayingList);
  };

  //오디오 실행 함수
  const playAudio = (index: number) => {
    if (audioRefs.current[index]) {
      audioRefs.current[index].play();
      // 재생 중인 오디오가 없을 때만 toggleAudio 호출
      if (!isPlayingList[index]) {
        toggleAudio(index);
      }
    }
  };

  //오디오 중지 함수
  const pauseAudio = (index: number) => {
    if (audioRefs.current[index]) {
      audioRefs.current[index].pause();
      // 일시 정지된 오디오가 있을 때만 toggleAudio 호출
      if (isPlayingList[index]) {
        toggleAudio(index);
      }
    }
  };

  //마우스 우클릭 방지해주는 함수
  const handleSelectStart = (event: React.MouseEvent<HTMLDivElement>) => {
    event.preventDefault();
    return false;
  };

  //면접 결과 get 함수
  const getResultInfo = async () => {
    try {
      const response = await api.get(`interviews/${id}/`, {
        withCredentials: true,
      });
      setInterviewResult(response.data);
    } catch (e) {
      console.error(e);
      console.log("인터뷰 결과 불러오는 중 에러 발생");
    }
  };

  // const handleInstagramShare = () => {
  //   // 면접 결과 페이지 URL
  //   const resultPageUrl = encodeURIComponent(
  //     "https://www.instagram.com/ahnnakyung/"
  //   );

  //   // 면접 결과를 설명하는 캡션
  //   const caption = encodeURIComponent("면접 결과를 공유합니다. #Giterview");

  //   // 인스타그램 스토리에 공유하는 URL
  //   const instagramStoryUrl = `https://www.instagram.com/stories/?url=${resultPageUrl}&caption=${caption}`;

  //   // 새 창에서 인스타그램 스토리 공유 페이지를 엽니다.
  //   window.open(instagramStoryUrl, "_blank");
  // };

  //페이지 첫 렌더링 시 깃허브 사용자 프로필사진 url과 닉네임을 get
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const gitId = githubLoginInfo.html_url.split("/").slice(-1)[0];
        const response = await axios.get(
          `https://api.github.com/users/${gitId}`
        );
        setAvatarUrl(response.data.avatar_url);
        setGitName(response.data.name);
      } catch (error) {
        console.error("GitHub 사용자 정보를 가져오는 중 에러 발생:", error);
      }
    };

    fetchUserData();
  }, [githubLoginInfo.html_url]);

  //오디오 시작 버튼을 누르면 해당하는 오디오 파일을 실행
  useEffect(() => {
    isPlayingList.forEach((isPlaying, index) => {
      const audioRef = audioRefs.current[index];

      if (audioRef) {
        // 오디오의 상태를 체크하여 버튼 상태 갱신
        if (isPlaying) {
          audioRef.play();
        } else {
          audioRef.pause();
        }

        audioRef.addEventListener("ended", () => {
          // 오디오 재생이 끝나면 버튼을 다시 play 상태로 변경
          const newIsPlayingList = [...isPlayingList];
          newIsPlayingList[index] = false;
          setIsPlayingList(newIsPlayingList);
        });
      }
    });
  }, [isPlayingList]);

  //페이지 첫 렌더링 시 면접결과 정보 get
  useEffect(() => {
    getResultInfo();
  }, []);

  //페이지 첫 렌더링 시 삭제된 이력서인지 먼저 확인하고 아니면 이력서 타이틀 설정
  useEffect(()=>{
    resumeList.map((item, idx) => {
      if (item.id === interviewResult.resume)
        setResumeTitle(item.title);
      return;
    })
    setResumeTitle('삭제된 이력서');
  }, [])

  return (
    <>
      {interviewResult && (
        <>
          <ScrollToTop />
          <ProfileContainer onContextMenu={handleSelectStart}>
            <ProfileBox>
              <ProfileImage avatarUrl={avatarUrl} />
              <ProfileInfo>
                <Text1>{gitName}</Text1>
                <TextBox1>
                  <TextBox2>
                    <Text2>면접 제목</Text2>
                    <Text2>면접 종류</Text2>
                    <Text2>포지션</Text2>
                    <Text2>면접 방식</Text2>
                    <Text2>이력서</Text2>
                    <Text2>Repository</Text2>
                  </TextBox2>
                  <TextBox3>
                    <Text3>{interviewResult.title}</Text3>
                    <Text3>
                      {interviewResult.interview_type_names
                        .map((type) => {
                          switch (type) {
                            case "common":
                              return "자기소개";
                            case "project":
                              return "프로젝트";
                            case "cs":
                              return "CS 질문";
                            case "personality":
                              return "인성 면접 질문";
                            default:
                              return type;
                          }
                        })
                        .join(", ")}
                    </Text3>
                    <Text3>
                      {(() => {
                        switch (interviewResult.position) {
                          case "frontend":
                            return "프론트엔드";
                          case "backend":
                            return "백엔드";
                          case "fullstack":
                            return "풀스택";
                          default:
                            return interviewResult.position;
                        }
                      })()}
                    </Text3>
                    <Text3>
                      {(() => {
                        switch (interviewResult.style) {
                          case "video":
                            return "화상 면접";
                          case "voice":
                            return "음성 면접";
                          default:
                            return interviewResult.style;
                        }
                      })()}
                    </Text3>
                    <Text3>
                      {resumeTitle}
                    </Text3>
                    <Text3>{interviewResult.repo_names.join(", ")}</Text3>
                  </TextBox3>
                  {/* <Button2 onClick={handleInstagramShare} /> */}
                </TextBox1>
              </ProfileInfo>
            </ProfileBox>
          </ProfileContainer>
          <QnAContainer onContextMenu={handleSelectStart}>
            <QnABox>
              {interviewResult.questions.map((question, index) => (
                <QnAWrapper key={index}>
                  <QuestionBox>
                    <QLargeText>
                      {question.type_name === "common"
                        ? "자기소개"
                        : question.type_name === "project"
                          ? "프로젝트 질문"
                          : question.type_name === "cs"
                            ? "CS 질문"
                            : question.type_name === "personality"
                              ? "인성 면접 질문"
                              : question.type_name}
                    </QLargeText>
                    <QSmallText>{question.content}</QSmallText>
                  </QuestionBox>
                  <AnswerBox>
                    <ALargeText>나의 답변</ALargeText>
                    <ASmallText>
                      {interviewResult.answers[index].content}
                    </ASmallText>
                    <VoiceBox>
                      <audio
                        ref={(audioRef) => {
                          // 여기서 non-null 어설션을 사용합니다.
                          audioRefs.current[index] = audioRef!;
                        }}
                        src={interviewResult.answers[index].record_url}
                      ></audio>
                      {isPlayingList[index] ? (
                        <Button
                          $isPlaying={isPlayingList[index]}
                          onClick={() => pauseAudio(index)}
                        />
                      ) : (
                        <Button
                          $isPlaying={isPlayingList[index]}
                          onClick={() => playAudio(index)}
                        />
                      )}
                      <Text4>음성 듣기</Text4>
                    </VoiceBox>
                  </AnswerBox>
                </QnAWrapper>
              ))}
            </QnABox>
          </QnAContainer>
        </>
      )}
    </>
  );
};

export default Resultpage;
