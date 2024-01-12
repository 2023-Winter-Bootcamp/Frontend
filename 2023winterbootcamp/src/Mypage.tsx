import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useDropzone } from "react-dropzone";
import axios from "axios";
import { Document, Page } from "react-pdf";

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
  @media screen and (max-width: 768px) {
    width: 920px;
    height: 370px;
    display: flex;
    margin-left: 100px;
    margin-bottom: 20px;
  }

  @media screen and (min-width: 769px) and (max-width: 1023px) {
    width: 920px;
    height: 370px;
    display: flex;
    margin-left: 200px;
    margin-bottom: 20px;
  }

  @media screen and (min-width: 1024px) {
    width: 920px;
    height: 370px;
    display: flex;
    margin-left: 267px;
    margin-bottom: 20px;
  }
`;

const ResumePreview = styled.div`
  @media screen and (max-width: 768px) {
    width: 240px;
    height: 340px;
    margin-top: 5px;
    border-radius: 4px;
    background-color: #fff;
    box-shadow: 4px 2px 8px rgba(0, 0, 0, 0.3);
    cursor: pointer;
    & :hover {
      border: 0px solid #fff;
    }
  }

  @media screen and (min-width: 769px) and (max-width: 1023px) {
    width: 249px;
    height: 345px;
    margin-top: 5px;
    border-radius: 4px;
    background-color: #fff;
    box-shadow: 4px 2px 8px rgba(0, 0, 0, 0.3);
    cursor: pointer;
    & :hover {
      border: 0px solid #fff;
    }
  }

  @media screen and (min-width: 1024px) {
    width: 249px;
    height: 345px;
    margin-top: -140px;
    border-radius: 4px;
    background-color: #fff;
    box-shadow: 4px 2px 8px rgba(0, 0, 0, 0.3);
    cursor: pointer;
    & :hover {
      border: 0px solid #fff;
    }
  }
`;

const Text3 = styled.div`
  text-align: center;
  color: #d7d7d7;
  font-size: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 145px;
  justify-content: center;
  height: 95%;
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
  width: 65%;
  height: inherit;
  display: flex;
  overflow-x: auto;
  margin-left: 287px;
  align-items: center;
`;

const InterviewWrapper = styled.div`
  width: 355px;
  height: 255px;
  border-radius: 20px;
  margin-right: 20px;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  background: url("https://i.postimg.cc/ZqvhQ27G/Rectangle-17.png");
  background-position: center;
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

type Interview = {
  id: number;
  title: string;
};
function Mypage() {
  const [pdfUrl, setPdfUrl] = useState(""); // PDF 파일 URL 상태 추가

  const handleFileUpload = async (acceptedFiles: (string | Blob)[]) => {
    const file = new FormData();
    file.append("file", acceptedFiles[0]); // 파일을 FormData에 추가
    const user_id = "1";
    file.append("user_id", user_id);

    try {
      const response = await axios.post(
        "http://localhost:8000/api/resumes/create",
        file
      );
      console.log("File uploaded successfully!", response.data);

      // 업로드된 PDF 파일의 URL을 설정하여 렌더링
      setPdfUrl(response.data.url); // 여기서 URL은 실제 업로드된 PDF 파일의 URL로 설정해야 합니다.
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  const [interviewList, setInterviewList] = useState<Interview[]>([]);

  const getInterviewList = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/interviews/");
      console.log(response.data);
      setInterviewList(response.data);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    getInterviewList();
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: handleFileUpload,
    //accept: ".pdf",
  });

  useEffect(() => {
    // 이력서 목록을 가져오는 API 호출
    axios
      .get("http://localhost:8000/api/resumes/")
      .then((response) => {
        // 받아온 데이터에서 이력서의 URL을 가져옴 (예시로는 response.data[0].url을 가져왔다고 가정)
        const resumeUrl = response.data[0]?.url; // 올바른 데이터가 없을 경우를 처리하기 위해 ?. 연산자 사용

        // 이력서의 URL을 상태에 설정하여 미리보기로 사용
        if (resumeUrl) {
          setPdfUrl(resumeUrl);
        }
      })
      .catch((error) => {
        console.error("Error fetching resume data:", error);
      });
  }, [pdfUrl]); // pdfUrl이 변경될 때마다 이펙트 실행

  const EmptyResumePreview = () => (
    <ResumePreview>
      <Text3>
        등록된 이력서가 없습니다.
        <br />
        이력서를 등록해주세요!
      </Text3>
    </ResumePreview>
  );

  const FilledResumePreview = () => (
    <ResumePreview>
      <Document file={pdfUrl}>
        <Page pageNumber={1} />
      </Document>
    </ResumePreview>
  );

  return (
    <>
      <Container>
        <Text1>내 이력서</Text1>
        <ResumeContainer>
          <div {...getRootProps()}>
            <input {...getInputProps()} />
            {pdfUrl ? <FilledResumePreview /> : <EmptyResumePreview />}
          </div>
        </ResumeContainer>
      </Container>
      <Text2>나의 면접</Text2>
      <InterviewContainer>
        <InterviewBox>
          {interviewList.length ? (
            interviewList.map((item, idx) => {
              return (
                <InterviewWrapper>
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
