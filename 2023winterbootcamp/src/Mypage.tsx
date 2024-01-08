import React from "react";
import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  height: 500px;
  padding: 20px;
  display: flex;
  flex-direction: column;
`;

const Text1 = styled.div`
  width: 170px;
  height: 35px;
  font-size: 28px;
  font-weight: 700;
  margin-top: 40px;
  margin-left: 267px;
  margin-bottom: 10px;
`;

const ResumeContainer = styled.div`
  width: 920px;
  height: 370px;
  display: flex;
  margin-left: 267px;
  margin-bottom: 20px;
`;

const ResumePreview = styled.div`
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
`;

const Text3 = styled.div`
  text-align: center;
  color: #d7d7d7;
  font-size: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 145px;
`;

const Text2 = styled.div`
  width: 170px;
  height: 35px;
  font-size: 28px;
  font-weight: 700;
  margin-left: 287px;
  margin-bottom: 10px;
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

function Mypage() {
  return (
    <>
      <Container>
        <Text1>내 이력서</Text1>
        <ResumeContainer>
          <ResumePreview>
            <Text3>
              등록된 이력서가 없습니다.
              <br />
              이력서를 등록해주세요!
            </Text3>
          </ResumePreview>
        </ResumeContainer>
      </Container>
      <Text2>나의 면접</Text2>
      <InterviewContainer>
        <TextContainer>
          <Text4>진행된 면접이 없습니다.</Text4>
        </TextContainer>
      </InterviewContainer>
    </>
  );
}

export default Mypage;
