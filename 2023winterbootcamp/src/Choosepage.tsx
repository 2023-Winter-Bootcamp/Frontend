import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { atom, useRecoilState, useSetRecoilState } from "recoil";
import { questionState } from "./App";
const Container = styled.div`
  @media screen and (max-width: 768px) {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 40px;
    margin-top: 20px;
  }

  @media screen and (min-width: 769px) and (max-width: 1023px) {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 40px;
    margin-top: 20px;
  }

  @media screen and (min-width: 1024px) {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 40px;
    margin-top: 20px;
  }
`;

const TextWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-start;
`;

const Text = styled.div`
  font-size: 28px;
  font-weight: bold;
  margin-top: 40px;
  margin-left: 29%;

  @media screen and (max-width: 769px) {
    margin-left: 15%;
  }

  @media screen and (min-width: 769px) and (max-width: 1023px) {
    margin-left: 28%;
  }

  @media screen and (min-width: 1024px) {
  }
`;

const Input = styled.input`
  width: 41%;
  height: 40px;
  @media screen and (max-width: 768px) {
    border: none;
    border-bottom: 1px solid #1a1a1a;
    outline: none;
    width: 68%;
    &::placeholder {
      color: #c1c1c1;
    }
  }

  @media screen and (min-width: 769px) and (max-width: 1023px) {
    border: none;
    border-bottom: 1px solid #1a1a1a;
    outline: none;
    width: 51%;
    margin-left: 9%;
    &::placeholder {
      color: #c1c1c1;
    }
  }

  @media screen and (min-width: 1024px) {
    border: none;
    border-bottom: 1px solid #1a1a1a;
    outline: none;
    &::placeholder {
      color: #c1c1c1;
    }
  }
`;

const Container1 = styled.div`
  @media screen and (max-width: 768px) {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 40px;
    margin-top: 20px;
  }

  @media screen and (min-width: 769px) and (max-width: 1023px) {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 40px;
    margin-top: 20px;
  }

  @media screen and (min-width: 1024px) {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 40px;
    margin-top: 20px;
  }
`;

const TextWrapper1 = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-start;
`;

const Text1 = styled.div`
  font-size: 28px;
  font-weight: bold;
  margin-top: 40px;
  margin-left: 29%;

  @media screen and (max-width: 769px) {
    margin-left: 15%;
  }

  @media screen and (min-width: 769px) and (max-width: 1023px) {
    margin-left: 28.5%;
  }

  @media screen and (min-width: 1024px) {
  }
`;

const ButtonsContainer = styled.div`
  width: 42.5%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-top: 10px;
  @media screen and (max-width: 768px) {
    width: 71%;
  }

  @media screen and (min-width: 769px) and (max-width: 1023px) {
    width: 52%;
    margin-left: 9%;
  }

  @media screen and (min-width: 1024px) {
  }
`;

const Button = styled.button<{ isSelected: boolean }>`
  font-size: 14px;
  width: 200px;
  height: 54px;
  background-color: ${(props) => (props.isSelected ? "#1a1a1a" : "white")};
  color: ${(props) => (props.isSelected ? "white" : "#1a1a1a")};
  border: 1px solid white;
  border-bottom: 1px solid #1a1a1a;
  margin: 0 5px;
  cursor: pointer;

  &:hover {
    border: 1px solid #1a1a1a;
  }
`;

function Choose() {
  const [selectedMultiButtons, setSelectedMultiButtons] = useState<string[]>(
    []
  );
  const [selectedPosition, setSelectedPosition] = useState<string | null>(null);
  const [selectedInterviewType, setSelectedInterviewType] = useState<
    string | null
  >(null);
  const [startClicked, setStartClicked] = useState(false);
  const [selectedResume, setSelectedResume] = useState<number | null>(null);
  const [selectedRepos, setSelectedRepos] = useState<number[]>([]);
  const [id,setId] = useState('1'); //사용자 아이디
  const [question, setQuestion] = useRecoilState(questionState);
  const handleMultiButtonClick = (buttonName: string) => {
    const selectedIndex = selectedMultiButtons.indexOf(buttonName);
    let updatedSelectedButtons: string[];

    if (selectedIndex !== -1) {
      updatedSelectedButtons = selectedMultiButtons.filter(
        (selectedButton) => selectedButton !== buttonName
      );
    } else {
      updatedSelectedButtons = [...selectedMultiButtons, buttonName];
    }

    setSelectedMultiButtons(updatedSelectedButtons);
  };

  const handlePositionClick = (buttonName: string) => {
    setSelectedPosition((prevSelected) =>
      prevSelected === buttonName ? null : buttonName
    );
  };

  const handleInterviewTypeClick = (buttonName: string) => {
    setSelectedInterviewType((prevSelected) =>
      prevSelected === buttonName ? null : buttonName
    );
  };

  const navigate = useNavigate();

  const handleStartClick = () => {
    setStartClicked(true);
    getQuestions(id);
  };

  const handleResumeSelect = (index: number) => {
    if (selectedResume === index) {
      setSelectedResume(null);
    } else {
      setSelectedResume(index);
    }
  };

  const handleRepoSelect = (index: number) => {
    const selectedIndex = selectedRepos.indexOf(index);
    let updatedSelectedRepos: number[];

    if (selectedIndex === -1) {
      updatedSelectedRepos = [...selectedRepos, index];
    } else {
      updatedSelectedRepos = selectedRepos.filter((i) => i !== index);
    }

    setSelectedRepos(updatedSelectedRepos);
  };

  const getQuestions = async (id : string) => {
    try{
      const response = await axios.get(`http://localhost:8000/api/interviews/${id}/questions/`);
      setQuestion(response.data.questions);
      navigate("/interview/1");
    }catch(e){
      console.error(e)
    }
  }

  const Container2 = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 40px;
    margin-top: 20px;
  `;

  const Container3 = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 40px;
    margin-top: 20px;
  `;

  const Container4 = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    @media screen and (max-width: 768px) {
    }

    @media screen and (min-width: 769px) and (max-width: 1023px) {
    }

    @media screen and (min-width: 1024px) {
    }
  `;

  const ResumeContainer = styled.div`
    display: flex;
    justify-content: space-between;
    margin-right: 80px;
    width: 100%;
    max-width: 530px;
    margin: 0 auto;
    @media screen and (max-width: 769px) {
      margin-left: 15%;
    }

    @media screen and (min-width: 769px) and (max-width: 1023px) {
      margin-left: 29%;
    }

    @media screen and (min-width: 1024px) {
      margin-left: 29%;
    }
  `;

  const ResumeBox = styled.div<{ isSelected: boolean }>`
    width: 249px;
    height: 345px;
    background-color: white;
    box-shadow: 4px 2px 8px rgba(0, 0, 0, 0.3);
    margin-bottom: 60px;
    margin-right: 10px;

    border: ${(props) =>
      props.isSelected ? "2px solid black" : "2px solid #ffffff"};
    cursor: pointer;

    &:hover {
      border: 2px solid black;
    }
  `;

  const TextWrapper2 = styled.div`
    width: 100%;
    display: flex;
    justify-content: flex-start;
    height: 90px;
  `;

  const Text2 = styled.div`
    font-size: 28px;
    font-weight: bold;
    margin-top: 40px;
    margin-left: 29%;

    @media screen and (max-width: 769px) {
      margin-left: 15%;
    }

    @media screen and (min-width: 769px) and (max-width: 1023px) {
    }

    @media screen and (min-width: 1024px) {
    }
  `;

  const RepoContainer = styled.div`
    display: flex;
    justify-content: space-between;
    width: 100%;
    max-width: 630px;
    margin: 0 auto;
    margin-bottom: 80px;
    @media screen and (max-width: 769px) {
      margin-left: 14%;
    }

    @media screen and (min-width: 769px) and (max-width: 1023px) {
      margin-left: 28%;
    }

    @media screen and (min-width: 1024px) {
      margin-left: 29%;
    }
  `;

  const Repo = styled.div<{ isSelected: boolean }>`
    width: 308px;
    height: 130px;
    background-color: white;
    border-radius: 10px;
    margin-left: 5px;
    border: ${(props) =>
      props.isSelected ? "2px solid black" : "2px solid #e7e7e7"};
    cursor: pointer;

    &:hover {
      border: 2px solid black;
    }
    @media screen and (max-width: 769px) {
    }

    @media screen and (min-width: 769px) and (max-width: 1023px) {
    }

    @media screen and (min-width: 1024px) {
    }
  `;

  const Reponame = styled.div`
    color: #7a7a7a;
    font-size: 18px;
    font-weight: 500;
    margin-left: 20px;
    margin-top: 15px;
  `;

  const Start = styled.button`
    background-color: ${startClicked ? "#1a1a1a" : "#cacaca"};
    color: #fff;
    font-weight: bold;
    font-size: 14px;
    width: 200px;
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px 20px;
    margin-bottom: 100px;
    margin-left: 70%;
    border: none;
    cursor: pointer;

    &:hover {
      background-color: ${startClicked ? "#1a1a1a" : "#1a1a1a"};
    }
  `;

  return (
    <>
      <Container>
        <TextWrapper>
          <Text>면접 제목</Text>
        </TextWrapper>
        <Input placeholder=""></Input>
      </Container>
      <Container1>
        <TextWrapper1>
          <Text1>면접 종류</Text1>
        </TextWrapper1>
        <ButtonsContainer>
          <Button
            isSelected={selectedMultiButtons.includes("프로젝트")}
            onClick={() => handleMultiButtonClick("프로젝트")}
          >
            프로젝트
          </Button>
          <Button
            isSelected={selectedMultiButtons.includes("CS 질문")}
            onClick={() => handleMultiButtonClick("CS 질문")}
          >
            CS 질문
          </Button>
          <Button
            isSelected={selectedMultiButtons.includes("인성 면접")}
            onClick={() => handleMultiButtonClick("인성 면접")}
          >
            인성 면접
          </Button>
        </ButtonsContainer>
      </Container1>
      <Container2>
        <TextWrapper1>
          <Text1>포지션</Text1>
        </TextWrapper1>
        <ButtonsContainer>
          <Button
            isSelected={selectedPosition === "Frontend"}
            onClick={() => handlePositionClick("Frontend")}
          >
            Frontend
          </Button>
          <Button
            isSelected={selectedPosition === "Backend"}
            onClick={() => handlePositionClick("Backend")}
          >
            Backend
          </Button>
          <Button
            isSelected={selectedPosition === "Fullstack"}
            onClick={() => handlePositionClick("Fullstack")}
          >
            Fullstack
          </Button>
        </ButtonsContainer>
      </Container2>
      <Container3>
        <TextWrapper1>
          <Text1>면접 방식</Text1>
        </TextWrapper1>
        <ButtonsContainer>
          <Button
            isSelected={selectedInterviewType === "화상 면접"}
            onClick={() => handleInterviewTypeClick("화상 면접")}
          >
            화상 면접
          </Button>
          <Button
            isSelected={selectedInterviewType === "음성 면접"}
            onClick={() => handleInterviewTypeClick("음성 면접")}
          >
            음성 면접
          </Button>
          <Button
            isSelected={selectedInterviewType === "텍스트 면접"}
            onClick={() => handleInterviewTypeClick("텍스트 면접")}
          >
            텍스트 면접
          </Button>
        </ButtonsContainer>
      </Container3>
      <Container4>
        <TextWrapper2>
          <Text2>이력서</Text2>
        </TextWrapper2>
        <ResumeContainer>
          <ResumeBox
            isSelected={selectedResume === 0}
            onClick={() => handleResumeSelect(0)}
          />
          <ResumeBox
            isSelected={selectedResume === 1}
            onClick={() => handleResumeSelect(1)}
          />
        </ResumeContainer>
      </Container4>
      <Container4>
        <TextWrapper2>
          <Text2>Github reposiotries</Text2>
        </TextWrapper2>
        <RepoContainer>
          <Repo
            isSelected={selectedRepos.includes(0)}
            onClick={() => handleRepoSelect(0)}
          >
            <Reponame>repository1</Reponame>
          </Repo>
          <Repo
            isSelected={selectedRepos.includes(1)}
            onClick={() => handleRepoSelect(1)}
          >
            <Reponame>repository2</Reponame>
          </Repo>
        </RepoContainer>
      </Container4>
      <Start onClick={handleStartClick}>선택 완료</Start>
    </>
  );
}

export default Choose;
