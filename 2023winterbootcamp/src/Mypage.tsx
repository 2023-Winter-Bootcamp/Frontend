import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import { useDropzone } from "react-dropzone";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import interview_image from "./images/interview_image.jpg";
import Modal from "./components/Modal";

const Container = styled.div`
  @media screen and (max-width: 768px) {
    width: 100%;
    height: 500px;
    padding: 20px;
    display: flex;
    flex-direction: column;
  }

  @media screen and (min-width: 769px) and (max-width: 1023px) {
    width: 100%;
    height: 500px;
    padding: 20px;
    display: flex;
    flex-direction: column;
  }

  @media screen and (min-width: 1024px) {
    width: 100%;
    height: 500px;
    padding: 20px;
    display: flex;
    flex-direction: column;
  }
`;

const Text1 = styled.div`
  @media screen and (max-width: 768px) {
    width: 170px;
    height: 35px;
    font-size: 28px;
    font-weight: 700;
    margin-top: 40px;
    margin-left: 100px;
    margin-bottom: 10px;
  }

  @media screen and (min-width: 769px) and (max-width: 1023px) {
    width: 170px;
    height: 35px;
    font-size: 28px;
    font-weight: 700;
    margin-top: 40px;
    margin-left: 200px;
    margin-bottom: 10px;
  }

  @media screen and (min-width: 1024px) {
    width: 170px;
    height: 35px;
    font-size: 28px;
    font-weight: 700;
    margin-top: 40px;
    margin-left: 267px;
    margin-bottom: 10px;
  }
`;

const ResumeContainer = styled.div`
  width: 60%;
  height: 370px;
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
  transition: opacity 0.1s ease;

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
  transition: opacity 0.1s ease;
  opacity: 0;
  position: relative;
  z-index: 2;

  &:hover {
    opacity: 1;
    z-index: 1;
  }
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
  cursor: pointer;
  transition: filter 0.1s ease;

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
    }
    & ${Text6} {
      opacity: 1;
      z-index: 1;
    }

    filter: brightness(50%);
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
  transition: filter 0.1s ease;

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
  @media screen and (max-width: 768px) {
    width: 170px;
    height: 35px;
    font-size: 28px;
    font-weight: 700;
    margin-left: 120px;
    margin-bottom: 10px;
  }

  @media screen and (min-width: 769px) and (max-width: 1023px) {
    width: 170px;
    height: 35px;
    font-size: 28px;
    font-weight: 700;
    margin-left: 220px;
    margin-bottom: 10px;
  }

  @media screen and (min-width: 1024px) {
    width: 170px;
    height: 35px;
    font-size: 28px;
    font-weight: 700;
    margin-left: 287px;
    margin-bottom: 10px;
  }
`;

const InterviewContainer = styled.div`
  width: 100%;
  height: 353px;
  background-color: #1a1a1a;
  overflow-x: auto;
  overflow-y: hidden;
`;

const InterviewContainer2 = styled.div`
  width: 60%;
  height: 360px;
  display: flex;
  margin-bottom: 20px;
  overflow-x: auto;
  margin-left: 290px;
  overflow-y: hidden;
`;

const TextContainer = styled.div`
  width: 100%;
  height: 353px;
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
  align-items: center;
  margin-left: 10px;
`;

const InterviewWrapper = styled.div`
  width: 1500px;
  height: 255px;
  border-radius: 20px;
  margin-right: 20px;
  background: url(${interview_image});
  background-position: center;
  background-size: cover;
  &:hover {
    cursor: pointer;
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
  width: 40%;
  height: 20px;
  margin-top: 20px;
  background-color: transparent;
  border: none;
  text-decoration: underline;
`;

type Interview = {
  id: number;
  title: string;
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

  const handleInterviewClick = async (id: number) => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/interviews/${id}/`
      );
      const interviewResult = response.data.title;

      // 여기에서 필요한 동작을 수행하고 페이지 이동
      console.log(`면접 결과: ${interviewResult}`);
      navigate(`/result/${id}`); // 해당 페이지로 이동
    } catch (error) {
      console.error(`면접 결과를 불러오는 중 오류 발생: ${error}`);
    }
  };

  const handleFileUpload = async (title: string) => {
    if (selectedFile) {
      const file = new FormData();
      file.append("file", selectedFile);
      const user_id = "1";
      file.append("user_id", user_id);
      file.append("title", title);

      try {
        const response = await axios.post(
          "http://localhost:8000/api/resumes/create",
          file
        );
        console.log("File uploaded successfully!", response.data);
        setIsModalOpen(false);
      } catch (error) {
        console.error("Error uploading file:", error);
      }
    }
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

  const [resumeList, setResumeList] = useState<Resume[]>([]);
  const [interviewList, setInterviewList] = useState<Interview[]>([]);

  const getInterviewList = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/interviews/");
      setInterviewList(response.data);
    } catch (e) {
      console.error(e);
    }
  };

  const getResumes = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/resumes/");
      setResumeList(response.data);
    } catch (e) {
      console.error(e);
    }
  };

  function handleClick(id: number) {
    resumeList.forEach(async (item, idx) => {
      if (item.id === id) {
        try {
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          const response = await axios.delete(
            `http://localhost:8000/api/resumes/delete/${id}`
          );
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

  return (
    <>
      <Container>
        <Text1>내 이력서</Text1>
        <ResumeContainer>
          <ScrollContainer len={interviewList.length}>
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
                <ResumePreview key={idx} $pre_image_url={item.pre_image_url}>
                  <Text6>{item.title}</Text6>
                  <Text3>
                    <br />
                    {item.created_at.slice(0, 10)}에 등록한
                    <br />
                    이력서 입니다.
                    <br />
                    <DeleteButton onClick={() => handleClick(item.id)}>
                      <b>삭제하기</b>
                    </DeleteButton>
                  </Text3>
                </ResumePreview>
              );
            })}
          </ScrollContainer>
        </ResumeContainer>
      </Container>
      <Text2>나의 면접</Text2>
      <InterviewContainer>
        <InterviewContainer2>
          <ScrollContainer len={interviewList.length}>
            <InterviewBox boxWidth={interviewList.length * 400}>
              {interviewList.length ? (
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
          </ScrollContainer>
        </InterviewContainer2>
      </InterviewContainer>
    </>
  );
}

export default Mypage;
