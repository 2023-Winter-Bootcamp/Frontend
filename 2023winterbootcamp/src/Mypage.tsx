import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import { useDropzone } from "react-dropzone";
import axios from "axios";
import plus_icon from "./images/plus_icon.png";
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
  width: ${(props) => props.len * 400}px;
  height: 100%;
  flex: 1;
  display: flex;
`;

const ResumePreview = styled.div<{ $pre_image_url: string }>`
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
  & :hover {
    border: 0px solid #fff;
  }

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
`;

const Text3 = styled.div`
  text-align: center;
  color: #d7d7d7;
  font-size: 16px;
  height: auto;
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

const InterviewBox = styled.div`
  width: 60%;
  height: inherit;
  display: flex;
  overflow-x: auto;
  align-items: center;
  @media screen and (max-width: 768px) {
    margin-left: 120px;
  }

  @media screen and (min-width: 769px) and (max-width: 1023px) {
    margin-left: 220px;
  }

  @media screen and (min-width: 1024px) {
    margin-left: 287px;
  }
`;

const InterviewWrapper = styled.div`
  width: 355px;
  height: 255px;
  border-radius: 20px;
  margin-right: 20px;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  background: url(${interview_image});
  background-position: center;
  background-size: cover;
  &:hover {
    cursor: pointer;
  }
`;
const InterviewTitle = styled.div`
  width: 20%;
  height: 30px;
  color: white;
  font-size: 20px;
  font-weight: 600;
  margin-left: 6%;
  margin-top: 3%;
`;

const DeleteButton = styled.button`
  width: 20%;
  height: 20px;
  margin-top: 20px;
`;

const PlusIcon = styled.div`
  width: 30%;
  aspect-ratio: 1;
  background-image: url(${plus_icon});
  background-size: cover;
  opacity: 0.2;
  margin-top: 20px;
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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

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
    // 모달에서 등록 버튼이 눌렸을 때 실행되는 함수
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
    let findIndex;
    resumeList.forEach(async (item, idx) => {
      if (item.id === id) {
        try {
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
          <ScrollContainer len={resumeList.length}>
            <ResumePreview $pre_image_url="" {...getRootProps()}>
              <input type="file" {...getInputProps()} />
              <Text3>이력서를 등록해주세요!</Text3>
              <PlusIcon />
            </ResumePreview>
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
                  <Text3>
                    {item.title}
                    <br />
                    {item.created_at.slice(0, 10)}
                  </Text3>
                  <DeleteButton onClick={() => handleClick(item.id)}>
                    삭제
                  </DeleteButton>
                </ResumePreview>
              );
            })}
          </ScrollContainer>
        </ResumeContainer>
      </Container>
      <Text2>나의 면접</Text2>
      <InterviewContainer>
        <InterviewBox>
          {interviewList.length ? (
            interviewList.map((item, idx) => {
              return (
                <InterviewWrapper key={idx}>
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
      </InterviewContainer>
    </>
  );
}

export default Mypage;
