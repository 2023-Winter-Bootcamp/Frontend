import React, { useState } from "react";
import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  height: 1434px;
  padding: 20px;
  display: flex;
  flex-direction: column;
`;
const Text1 = styled.div`
  width: 130px;
  height: 35px;
  font-size: 28px;
  font-weight: 700;
  margin-top: 10px;
  margin-left: 267px;
`;
const Text2 = styled.div`
  width: 400px;
  height: 20px;
  font-size: 14px;
  font-weight: 500;
  margin-top: 10px;
  margin-left: 267px;
`;
const ProfileContainer = styled.div`
  width: 917px;
  height: 250px;
  display: flex;
  margin-top: 20px;
  margin-left: 267px;
`;

const ProfileImage = styled.div`
  width: 250px;
  height: 250px;
  border-radius: 50%;
  background-image: url("https://i.postimg.cc/Qt7wsv8d/Ellipse-1.jpg");
  margin-right: 50px;
`;

const BlackLine = styled.div`
  width: 4px;
  height: 28px;
  background: #1a1a1a;
  margin-top: 6px;
`;

const ProfileInfo = styled.div`
  width: 480px;
  height: 250px;
  display: flex;
  flex-direction: column;
  padding-left: 20px;
`;

const InputTitle = styled.span`
  font-size: 14px;
  font-weight: 500;
`;

const Input = styled.input`
  width: 250px;
  height: 17px;
  margin-top: 10px;
  border: 0;
  outline: none;
  &::placeholder {
    color: #c1c1c1;
  }
`;

interface RegisterButtonProps {
  isEditing: boolean;
}

const RegisterButton = styled.div<RegisterButtonProps>`
  display: flex;
  flex-direction: column;
  justify-content: end;
  & > button {
    width: 100px;
    height: 40px;
    background: ${(props) => (props.isEditing ? "#ffffff" : "#1a1a1a")};
    color: ${(props) => (props.isEditing ? "#bababa" : "#ffffff")};
    text-align: center;
    border: none;
    &:hover {
      background-color: ${(props) => (props.isEditing ? "#ffffff" : "#333")};
      color: ${(props) => (props.isEditing ? "#bababa" : "#ffffff")};
      cursor: pointer;
    }
  }
`;

const GithubOverview = styled.div`
  display: flex;
  align-items: flex-start;
  width: 904px;
  height: 150px;
  margin-left: 267px;
  margin-top: 40px;
  border: 1px solid #dadada;
  border-radius: 4px;
  &:hover {
    cursor: pointer;
  }
`;

const Colup = styled.div`
  flex-grow: 1;
`;

const Text5 = styled.div`
  color: #3a3a3a;
  font-weight: 500;
  margin-top: 20px;
  margin-left: 20px;
`;

const Text6 = styled.div`
  color: #a7a7a7;
  font-weight: 500;
  margin-top: 10px;
  margin-left: 20px;
  width: 520px;
`;

const Github = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
`;

const Githubimg = styled.div`
  width: 20px;
  height: 20px;
  background-image: url("https://ifh.cc/g/d6tOq8.png");
  background-size: cover;
  margin-right: 5px;
  margin-left: 20px;
  margin-top: 45px;
`;

const Text7 = styled.div`
  font-weight: 500;
  font-size: 14px;
  color: #373737;
  margin-top: 45px;
  margin-left: 2px;
`;

const Colimg = styled.div`
  width: 330px;
  height: 150px;
  background-image: url("https://ifh.cc/g/WWn6Kd.jpg");
  margin-left: 20px;
  background-size: cover;
  background-position: center;
`;

const Text3 = styled.div`
  width: 170px;
  height: 35px;
  font-size: 28px;
  font-weight: 700;
  margin-top: 60px;
  margin-left: 267px;
`;

const ResumeContainer = styled.div`
  width: 920px;
  height: 370px;
  display: flex;
  margin-left: 267px;
`;

const Text4 = styled.div`
  width: 90px;
  height: 20px;
  margin-top: 10px;
  font-size: 16px;
  font-weight: 500;
  color: #bababa;
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
    border: 2px solid #fff;
  }
`;

const MyInterviewContainer = styled.div`
  width: 920px;
  height: 260px;
  display: flex;
  margin-left: 267px;
  margin-top: 10px;
`;

const MyInterview = styled.div`
  width: 365px;
  height: 260px;
  border-radius: 20px;
  background: linear-gradient(
    298deg,
    rgba(255, 255, 255, 0.5) 7.5%,
    rgba(240, 239, 239, 0.15) 92.74%
  );
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  backdrop-filter: blur(30px);
  border: 2px solid #fff;

  &:hover {
    cursor: pointer;
  }
`;

interface ResumeProps {
  date: string;
}

const Resume = ({ date }: ResumeProps) => {
  return (
    <div
      style={{ display: "flex", flexDirection: "column", marginRight: "14px" }}
    >
      <Text4>{date}</Text4>
      <ResumePreview></ResumePreview>
    </div>
  );
};

function Mypage() {
  const [name] = useState("Ahnnakyung");
  const [isEditing, setIsEditing] = useState(false);

  const handleButtonClick = () => {
    setIsEditing(!isEditing);
  };

  return (
    <Container>
      <Text1>마이페이지</Text1>
      <Text2>{name}님의 마이페이지 입니다.</Text2>
      <ProfileContainer>
        <ProfileImage />
        <BlackLine />
        <ProfileInfo>
          <div>
            <InputTitle>이름: </InputTitle>
            <Input placeholder="이름을 입력해주세요."></Input>
          </div>
          <div>
            <InputTitle>이메일: </InputTitle>
            <Input placeholder="이메일을 입력해주세요."></Input>
          </div>
          <div>
            <InputTitle>번호: </InputTitle>
            <Input placeholder="번호를 입력해주세요."></Input>
          </div>
          <div>
            <InputTitle>희망직종: </InputTitle>
            <Input placeholder="희망직종을 입력해주세요.(프론트/백/풀스택)"></Input>
          </div>
          <div>
            <InputTitle>내가 지원한 회사 </InputTitle>
            <Input placeholder=""></Input>
          </div>
        </ProfileInfo>
        <RegisterButton isEditing={isEditing}>
          <button onClick={handleButtonClick}>
            {isEditing ? "수정하기 >" : "등록"}
          </button>
        </RegisterButton>
      </ProfileContainer>
      <GithubOverview>
        <Colup>
          <Text5>Ahnnakyung - Overview</Text5>
          <Text6>
            Ahnnakyung has 3 repositories available. Follow thier code on
            Github.
          </Text6>
          <Github>
            <Githubimg />
            <Text7>https://github.com/{name}</Text7>
          </Github>
        </Colup>
        <Colimg />
      </GithubOverview>
      <Text3>내 이력서 보기</Text3>
      <ResumeContainer>
        <Resume date="2024.01.03"></Resume>
        <Resume date="2024.02.03"></Resume>
      </ResumeContainer>
      <Text3>나의 면접</Text3>
      <MyInterviewContainer>
        <MyInterview />
      </MyInterviewContainer>
    </Container>
  );
}

export default Mypage;
