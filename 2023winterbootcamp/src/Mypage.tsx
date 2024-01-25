import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import { useDropzone } from "react-dropzone";
import api from "./baseURL/baseURL";
import { useNavigate } from "react-router-dom";
import interview_image from "./images/interview_image.jpg";
import Modal from "./components/Modal";
import { githubLoginInfoState, resumeListState } from "./Recoil";
import { useRecoilState, useRecoilValue } from "recoil";
import LoadingModal from "./components/LoadingModal";

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
  user-select: none;
  @media screen and (max-width: 768px) {
    height: 450px;
  }
  @media screen and (min-width: 769px) and (max-width: 1023px) {
    height: 475x;
  }

  @media screen and (min-width: 1024px) and (max-width: 1399px) {
    height: 475px;
  }
  @media screen and (min-width: 1400px) {
    height: 500px;
  }
`;

const Text1 = styled.div`
  width: 170px;
  height: 35px;
  font-size: 28px;
  font-weight: 700;
  margin-top: 60px;
  margin-bottom: 10px;
  @media screen and (max-width: 768px) {
    margin-left: 100px;
  }

  @media screen and (min-width: 769px) and (max-width: 1023px) {
    margin-left: 200px;
  }

  @media screen and (min-width: 1024px) {
    margin-left: 267px;
  }
`;

const ResumeContainer = styled.div`
  width: 70%;
  display: flex;
  margin-bottom: 20px;
  overflow-x: auto;
  @media screen and (max-width: 768px) {
    margin-left: 100px;
    height: 330px;
  }

  @media screen and (min-width: 769px) and (max-width: 1023px) {
    margin-left: 200px;
    height: 355px;
  }

  @media screen and (min-width: 1024px) and (max-width: 1399px) {
    margin-left: 267px;
    height: 355px;
  }
  @media screen and (min-width: 1400px) {
    margin-left: 267px;
    height: 380px;
  }
`;

const ScrollContainer = styled.div<{ len: number }>`
  width: ${(props) => props.len * 500}px;
  height: 100%;
  flex: 1;
  display: flex;
`;

const Text7 = styled.div`
  text-align: center;
  color: #d7d7d7;
  font-size: 16px;
  height: auto;
  opacity: 1;

  &:hover {
    opacity: 1;
  }
`;

const Text3 = styled.div`
  text-align: center;
  color: black;
  font-size: 16px;
  height: auto;
  opacity: 0;
  position: relative;
  z-index: 2;

  &:hover {
    opacity: 1;
    z-index: 1;
  }
`;

const Text6 = styled.div`
  font-weight: 400;
  font-size: 16px;
  text-align: left;
  color: black;
  opacity: 0;
  position: relative;
  z-index: 2;

  &:hover {
    opacity: 1;
    z-index: 1;
  }
`;

const BlackBox = styled.div`
  width: 100%;
  height: 0;
  background-color: black;
  opacity: 0.6;
  position: absolute;
`;

const ResumePreview = styled.div<{ $pre_image_url: string }>`
  position: relative;
  background-image: url(${(props) => props.$pre_image_url});
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-right: 20px;
  box-shadow: 4px 2px 8px rgba(0, 0, 0, 0.3);
  margin-top: 5px;
  border-radius: 4px;

  @media screen and (max-width: 768px) {
    width: 215px;
    height: 300px;
  }

  @media screen and (min-width: 769px) and (max-width: 1023px) {
    width: 230px;
    height: 320px;
  }

  @media screen and (min-width: 1024px) and (max-width: 1399px) {
    width: 230px;
    height: 320px;
  }

  @media screen and (min-width: 1400px) {
    width: 249px;
    height: 345px;
  }

  &:hover {
    & ${Text3} {
      opacity: 1;
      z-index: 2;
      color: white;
    }
    & ${Text6} {
      opacity: 1;
      z-index: 1;
      color: white;
    }
    & ${BlackBox} {
      height: 100%;
    }
  }
`;

const ResumePreview1 = styled.div<{ $pre_image_url: string }>`
  position: relative;
  background-image: url(${(props) => props.$pre_image_url});
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-right: 20px;
  box-shadow: 4px 2px 8px rgba(0, 0, 0, 0.3);
  margin-top: 5px;
  margin-left: 5px;
  border-radius: 4px;
  cursor: pointer;

  @media screen and (max-width: 768px) {
    width: 215px;
    height: 300px;
  }

  @media screen and (min-width: 769px) and (max-width: 1023px) {
    width: 230px;
    height: 320px;
  }

  @media screen and (min-width: 1024px) and (max-width: 1399px) {
    width: 230px;
    height: 320px;
  }

  @media screen and (min-width: 1400px) {
    width: 249px;
    height: 345px;
  }

  &:hover {
    & ${Text3} {
      opacity: 1;
      z-index: 1;
    }

    filter: brightness(100%);
  }
`;

const Text2 = styled.div`
  user-select: none;
  @media screen and (max-width: 768px) {
    width: 170px;
    height: 35px;
    font-size: 28px;
    font-weight: 700;
    margin-left: 100px;
    margin-bottom: 10px;
  }

  @media screen and (min-width: 769px) and (max-width: 1023px) {
    width: 170px;
    height: 35px;
    font-size: 28px;
    font-weight: 700;
    margin-left: 200px;
    margin-bottom: 10px;
  }

  @media screen and (min-width: 1024px) {
    width: 170px;
    height: 35px;
    font-size: 28px;
    font-weight: 700;
    margin-left: 267px;
    margin-bottom: 10px;
  }
`;

const InterviewContainer = styled.div`
  width: 100%;
  height: 370px;
  background-color: #1a1a1a;
  overflow-x: auto;
  overflow-y: hidden;
  display: flex;
  align-items: center;
  user-select: none;
`;

const InterviewContainer2 = styled.div`
  width: 70%;
  height: 310px;
  display: flex;
  margin-bottom: 20px;
  overflow-x: auto;
  overflow-y: hidden;
  @media screen and (max-width: 768px) {
    margin-left: 110px;
  }

  @media screen and (min-width: 769px) and (max-width: 1023px) {
    margin-left: 190px;
  }

  @media screen and (min-width: 1024px) and (max-width: 1399px) {
    margin-left: 257px;
  }

  @media screen and (min-width: 1400px) {
    margin-left: 257px;
  }
`;

const TextContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Text4 = styled.div`
  text-align: center;
  color: #d7d7d7;
  font-size: 18px;
  font-weight: bold;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const InterviewBox = styled.div<{ boxWidth: number }>`
  width: ${(props) => props.boxWidth}px;
  height: inherit;
  display: flex;
  overflow-x: auto;
  /* overflow-y: hidden; */
  align-items: center;
  margin-left: 10px;
`;

const InterviewWrapper = styled.div`
  width: 380px;
  height: 255px;
  border-radius: 20px;
  margin-right: 20px;
  background: url(${interview_image});
  background-position: center;
  background-size: cover;
  &:hover {
    cursor: pointer;
  }
  @media screen and (max-width: 768px) {
    width: 345px;
    height: 230px;
  }

  @media screen and (min-width: 769px) and (max-width: 1023px) {
    width: 360px;
    height: 240px;
  }

  @media screen and (min-width: 1024px) and (max-width: 1399px) {
    width: 360px;
    height: 240px;
  }

  @media screen and (min-width: 1400px) {
    width: 380px;
    height: 255px;
  }
`;

const InterviewTitle = styled.div`
  width: 70%;
  height: 30px;
  color: white;
  font-size: 20px;
  font-weight: 600;
  margin-left: 6%;
  margin-top: 5%;
`;

const DeleteButton = styled.button`
  width: 50%;
  height: 20px;
  margin-top: 20px;
  background-color: transparent;
  border: none;
  text-decoration: underline;
`;

const BoldText = styled.b`
  width: 100%;
  height: 100%;
  font-size: 14px;
  cursor: pointer;
`;

const Text5 = styled(Text4)`
  color: black;
`
type Interview = {
  id: number;
  title: string;
  created_at: string;
};

type Resume = {
  id: number;
  pre_image_url: string;
  title: string;
  created_at: string;
};

function Mypage() {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const githubLoginInfo = useRecoilValue(githubLoginInfoState);
  const [isLoading, setIsLoading] = useState(false);
  const [isResumeLoading, setIsResumeLoading] = useState(true);
  const [isInterviewLoading, setIsInterviewLoading] = useState(true);

  const handleInterviewClick = async (id: number) => {
    try {
      const response = await api.get(`interviews/${id}/`, {
        withCredentials: true,
      });
      navigate(`/result/${id}`); // 해당 페이지로 이동
    } catch (error) {
      console.error(`면접 결과를 불러오는 중 오류 발생: ${error}`);
    }
  };

  const handleFileUpload = async (title: string) => {
    setIsLoading(true);
    if (selectedFile) {
      const file = new FormData();
      file.append("file", selectedFile);
      const user_id = githubLoginInfo.id;
      file.append("user_id", user_id.toString());
      file.append("title", title);

      try {
        const response = await api.post("resumes/create", file);
        console.log("File uploaded successfully!", response.data);
        setIsModalOpen(false);
        window.location.href = "/mypage";
      } catch (error) {
        console.error("Error uploading file:", error);
      }
    }
    setIsLoading(false);
  };

  const handleModalRegister = (title: string) => {
    handleFileUpload(title);
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: (acceptedFiles) => {
      setSelectedFile(acceptedFiles[0]);
      setIsModalOpen(true);
    },
    // accept: ".pdf",
  });

  const handleModalClose = () => {
    setIsModalOpen(false);
    getResumes();
  };

  const [resumeList, setResumeList] = useRecoilState(resumeListState);
  const [interviewList, setInterviewList] = useState<Interview[]>([]);

  const getInterviewList = async () => {
    try {
      const response = await api.get("interviews/", { withCredentials: true });
      const sortedData = response.data.sort((a: Interview, b: Interview) =>
        b.created_at.localeCompare(a.created_at)
      );
      setInterviewList(sortedData);
    } catch (e) {
      console.error(e);
    }
    setIsInterviewLoading(false);
  };

  const getResumes = async () => {
    try {
      const response = await api.get("resumes/", { withCredentials: true });
      const sortedData = response.data.sort((a: Resume, b: Resume) =>
        b.created_at.localeCompare(a.created_at)
      );
      setResumeList(sortedData);
      console.log(response.data);
    } catch (e) {
      console.error(e);
    }
    setIsResumeLoading(false);
  };

  function handleClick(id: number) {
    resumeList.forEach(async (item, idx) => {
      if (item.id === id) {
        console.log(id);
        try {
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          const response = await api.delete(`resumes/delete/${id}`);
          let cpyResumeList = [...resumeList];
          cpyResumeList.splice(idx, 1);
          setResumeList(cpyResumeList);
        } catch (e) {
          console.error(e);
        }
      }
    });
  }

  useEffect(() => {
    getResumes();
    getInterviewList();
  }, []);

  const scrollConRef = useRef<HTMLDivElement>(null);
  const interviewConRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (interviewList.length === 0) {
      scrollConRef.current?.style.setProperty("justify-content", "center");
      interviewConRef.current?.style.setProperty("justify-content", "center");
    } else {
      scrollConRef.current?.style.setProperty("justify-content", "start");
      interviewConRef.current?.style.setProperty("justify-content", "start");
    }
  }, [interviewList]);

  const handleSelectStart = (event: React.MouseEvent<HTMLDivElement>) => {
    event.preventDefault();
    return false;
  };

  return (
    <>
      <Container onContextMenu={handleSelectStart}>
        <Text1>내 이력서</Text1>
        <ResumeContainer>
          <ScrollContainer len={resumeList.length}>
            {isResumeLoading ? (
              <TextContainer>
                <Text5>이력서를 불러오는 중입니다.</Text5>
              </TextContainer>
            ) : (
              <>
                <ResumePreview1 $pre_image_url="" {...getRootProps()}>
                  <input type="file" {...getInputProps()} />
                  <Text7>
                    이 곳을 클릭해
                    <br />
                    이력서를 등록해주세요!
                  </Text7>
                </ResumePreview1>
                {isModalOpen && (
                  <Modal
                    ref={modalRef}
                    onClose={handleModalClose}
                    onRegister={handleModalRegister}
                  />
                )}
                {resumeList.map((item, idx) => {
                  return (
                    <ResumePreview
                      key={idx}
                      $pre_image_url={item.pre_image_url}
                    >
                      <BlackBox />
                      <Text6>{item.title}</Text6>
                      <Text3>
                        <br />
                        {item.created_at.slice(0, 10)}에 등록한
                        <br />
                        이력서 입니다.
                        <br />
                        <DeleteButton onClick={() => handleClick(item.id)}>
                          <BoldText>삭제하기</BoldText>
                        </DeleteButton>
                      </Text3>
                    </ResumePreview>
                  );
                })}
              </>
            )}
          </ScrollContainer>
        </ResumeContainer>
      </Container>
      <Text2 onContextMenu={handleSelectStart}>나의 면접</Text2>
      <InterviewContainer onContextMenu={handleSelectStart}>
        <InterviewContainer2 ref={interviewConRef}>
          <ScrollContainer len={interviewList.length || 2} ref={scrollConRef}>
            {isInterviewLoading ? (
              <TextContainer>
                <Text4>면접 결과를 불러오는 중입니다.</Text4>
              </TextContainer>
            ) : (
              <InterviewBox boxWidth={interviewList.length * 400 || 400}>
                {interviewList.length !== 0 ? (
                  interviewList.map((item, idx) => {
                    return (
                      <InterviewWrapper
                        key={idx}
                        onClick={() => handleInterviewClick(item.id)}
                      >
                        <InterviewTitle>{item.title}</InterviewTitle>
                      </InterviewWrapper>
                    );
                  })
                ) : (
                  <TextContainer>
                    <Text4>진행된 면접이 없습니다.</Text4>
                  </TextContainer>
                )}
              </InterviewBox>
            )}
          </ScrollContainer>
        </InterviewContainer2>
      </InterviewContainer>
      {isLoading ? <LoadingModal /> : null}
    </>
  );
}

export default Mypage;
