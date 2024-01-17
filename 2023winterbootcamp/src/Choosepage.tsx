import React, { useEffect, useState, Suspense } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import LoadingModal from "./components/LoadingModal";
import { githubLoginInfoState, repoListState } from "./Recoil";
import { useRecoilState, useRecoilValue } from "recoil";
import { interviewTypeState } from "./Recoil";

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
  justify-content: space-between;
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
  width: 45%;
  min-width: 500px;
  margin: 0 auto;
  margin-bottom: 80px;
  flex-wrap: wrap;
  gap: 20px 2%;
  @media screen and (max-width: 769px) {
    margin-left: 15%;
  }

  @media screen and (min-width: 769px) and (max-width: 1023px) {
    margin-left: 28%;
  }

  @media screen and (min-width: 1024px) {
    margin-left: 29%;
  }
`;

const Repo = styled.div<{ isSelected: boolean }>`
  width: 45%;
  height: 130px;
  background-color: white;
  border-radius: 10px;
  border: ${(props) =>
    props.isSelected ? "2px solid black" : "2px solid #e7e7e7"};
  cursor: pointer;

  &:hover {
    border: 2px solid black;
  }

  @media screen and (min-width: 1400px) {
    width: 31%;
  }
`;

const Reponame = styled.div`
  width: 80%;
  color: #7a7a7a;
  font-size: 18px;
  font-weight: 500;
  margin-left: 20px;
  margin-top: 15px;
  overflow-wrap: normal;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Start = styled.button<{startClicked : boolean }>`
    background-color: ${props => props.startClicked ? "#1a1a1a" : "#cacaca"};
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
      background-color: ${props => props.startClicked ? "#1a1a1a" : "#1a1a1a"};
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
  const [selectedRepos, setSelectedRepos] = useState<string[]>([]);
  const githubLoginInfo = useRecoilValue(githubLoginInfoState);
  const [title, setTitle] = useState<string>("");
  const [, setInterviewType] = useRecoilState(interviewTypeState);

  useEffect(() => {
    const isAllSelected =
      selectedMultiButtons.length > 0 &&
      selectedPosition !== null &&
      selectedInterviewType !== null &&
      selectedResume !== null &&
      selectedRepos.length > 0 &&
      title !== "";

    setStartClicked(isAllSelected);
    
  }, [
    selectedMultiButtons,
    selectedPosition,
    selectedInterviewType,
    selectedResume,
    selectedRepos,
    title,
  ]);

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
    if (buttonName === "video") {
      setInterviewType({ showCamera: true });
    } else {
      setInterviewType({ showCamera: false });
    }
  };

  const navigate = useNavigate();

  const handleStartClick = (id: number) => {
    setStartClicked(true);
    navigate("/interview/" + id);
  };

  const handleResumeSelect = (index: number) => {
    if (selectedResume === index) {
      setSelectedResume(null);
    } else {
      setSelectedResume(index);
    }
  };

  const handleRepoSelect = (repoName: string) => {
    const selectedIndex = selectedRepos.indexOf(repoName);
    let updatedSelectedRepos: string[];

    if (selectedIndex === -1) {
      updatedSelectedRepos = [...selectedRepos, repoName];
    } else {
      updatedSelectedRepos = selectedRepos.filter((name) => name !== repoName);
    }

    setSelectedRepos(updatedSelectedRepos);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const [showVideoComponent, setShowVideoComponent] = useState(false);

  const createInterview = async () => {
    try {
      setIsLoading(true);

      const response = await axios.post(
        "http://localhost:8000/api/interviews/create/",
        {
          user: githubLoginInfo.id,
          title: title,
          position: selectedPosition,
          style: selectedInterviewType,
          resume: selectedResume,
          repo_names: selectedRepos,
          type_names: selectedMultiButtons,
        }
      );
      handleStartClick(response.data.id);
      console.log(response.data);
      // 음성 면접 또는 텍스트 면접인 경우에만 처리
      if (selectedInterviewType !== "video") {
        setShowVideoComponent(false);
      }
    } catch (e) {
      console.log(e);
    }
    setIsLoading(false);
  };

  
  
  const [isLoading, setIsLoading] = useState(false);
  const repoList = useRecoilValue(repoListState);
  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <Container>
          <TextWrapper>
            <Text>면접 제목</Text>
          </TextWrapper>
          <Input placeholder="" onChange={handleChange}></Input>
        </Container>
        <Container1>
          <TextWrapper1>
            <Text1>면접 종류</Text1>
          </TextWrapper1>
          <ButtonsContainer>
            <Button
              isSelected={selectedMultiButtons.includes("project")}
              onClick={() => handleMultiButtonClick("project")}
            >
              프로젝트
            </Button>
            <Button
              isSelected={selectedMultiButtons.includes("cs")}
              onClick={() => handleMultiButtonClick("cs")}
            >
              CS 질문
            </Button>
            <Button
              isSelected={selectedMultiButtons.includes("personality")}
              onClick={() => handleMultiButtonClick("personality")}
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
              isSelected={selectedPosition === "frontend"}
              onClick={() => handlePositionClick("frontend")}
            >
              Frontend
            </Button>
            <Button
              isSelected={selectedPosition === "backend"}
              onClick={() => handlePositionClick("backend")}
            >
              Backend
            </Button>
            <Button
              isSelected={selectedPosition === "fullstack"}
              onClick={() => handlePositionClick("fullstack")}
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
              isSelected={selectedInterviewType === "video"}
              onClick={() => handleInterviewTypeClick("video")}
            >
              화상 면접
            </Button>
            <Button
              isSelected={selectedInterviewType === "voice"}
              onClick={() => handleInterviewTypeClick("voice")}
            >
              음성 면접
            </Button>
            <Button
              isSelected={selectedInterviewType === "text"}
              onClick={() => handleInterviewTypeClick("text")}
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
              isSelected={selectedResume === 1}
              onClick={() => handleResumeSelect(1)}
            />
            <ResumeBox
              isSelected={selectedResume === 2}
              onClick={() => handleResumeSelect(2)}
            />
          </ResumeContainer>
        </Container4>
        <Container4>
          <TextWrapper2>
            <Text2>Github reposiotries</Text2>
          </TextWrapper2>
          <RepoContainer>
            {repoList.length !== 0 ? (
              repoList.map((repo, idx) => {
                return (
                  <Repo
                    key={idx}
                    isSelected={selectedRepos.includes(repo.repo_name)}
                    onClick={() => handleRepoSelect(repo.repo_name)}
                  >
                    <Reponame>{repo.repo_name}</Reponame>
                  </Repo>
                );
              })
            ) : (
              <Repo
                isSelected={selectedRepos.includes("")}
                onClick={() => handleRepoSelect("")}
              >
                <Reponame>repository가 없습니다.</Reponame>
              </Repo>
            )}
          </RepoContainer>
        </Container4>
        <Start startClicked={startClicked}onClick={createInterview}>선택 완료</Start>
        {isLoading ? <LoadingModal /> : null}
      </Suspense>
    </>
  );
}

export default Choose;
