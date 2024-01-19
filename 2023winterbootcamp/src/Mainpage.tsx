import React, {
  useState,
  useRef,
  useEffect,
  startTransition,
  Suspense,
} from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import {
  motion,
  animate,
  useScroll,
  useMotionValueEvent,
  useAnimationControls,
} from 'framer-motion';
import { DropzoneInputProps, useDropzone } from 'react-dropzone';
import axios from 'axios';
import api from './baseURL/baseURL';
import Modal from './components/Modal';
import LoadingModal from './components/LoadingModal';
import {
  RepoType,
  githubLoginInfoState,
  githubProfileState,
  repoListState,
} from './Recoil';
import { GitHubRepo } from './components/githubLogin';
import { useSetRecoilState, useRecoilState } from 'recoil';

const Container = styled.div`
  background-image: url('https://ifh.cc/g/9wn5LW.jpg');
  width: 100%;
  height: 120vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  background-size: cover;
  background-repeat: no-repeat;
  position: relative;
`;

const ScrollWrapper = styled.div`
  width: 100%;
  height: 100vh;
  overflow: hidden;
  position: relative;
`;

const ScrollContent = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  top: 0;
  transition: top 0.5s ease-out;
`;

const Text1 = styled.div`
  font-weight: bold;
  font-size: 40px;
  margin-top: 120px;
  @media screen and (max-width: 768px) {
    font-size: 32px;
  }
  @media screen and (min-width: 769px) and (max-width: 1023px) {
    font-size: 35px;
  }
  @media screen and (min-width: 1024px) {
    font-size: 40px;
  }
`;

const Text2 = styled.div`
  color: #3a3a3a;
  font-size: 16px;
  margin-top: 20px;
  @media screen and (max-width: 1023px) {
    font-size: 15px;
  }
  @media screen and (min-width: 1024px) {
    font-size: 16px;
  }
`;

const Text3 = styled.div`
  color: #4a4a4a;
  font-weight: 700;
  font-size: 16px;
  margin-top: 4px;
  @media screen and (max-width: 1023px) {
    font-size: 14px;
  }
  @media screen and (min-width: 1024px) {
    font-size: 16px;
  }
`;

const Image = styled.img`
  width: 200px;
  height: 200px;
  margin-top: 40px;
  @media screen and (max-width: 1023px) {
    width: 180px;
    height: 180px;
  }
  @media screen and (min-width: 1024px) {
    width: 200px;
    height: 200px;
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-top: 84px;
  margin-bottom: 76px;
`;

const Button = styled.div`
  background-color: #1a1a1a;
  color: #fff;
  font-weight: bold;
  font-size: 14px;
  width: 150px;
  height: 28px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px 20px;
  margin: 0 10px;
  cursor: pointer;
  transition: transform 0.3s ease-in-out;

  &:hover {
    background-color: #333;
    transform: translateY(-5px);
  }

  @media screen and (max-width: 1023px) {
    width: 128.4px;
    height: 24px;
  }
  @media screen and (min-width: 1024px) {
    width: 150px;
    height: 28px;
  }
`;

const ButtonContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ButtonImage = styled.img`
  width: 20px;
  height: 20px;
  margin-right: 8px;
`;

const TextField = styled.div`
  text-align: left;
  margin-top: 172px;
  @media screen and (max-width: 768px) {
    margin-left: 80px;
  }
  @media screen and (min-width: 769px) and (max-width: 1023px) {
    margin-left: 150px;
  }
  @media screen and (min-width: 1024px) {
    margin-left: 267px;
  }
`;

const Text4 = styled.div`
  font-weight: bold;
  font-size: 40px;
  color: white;
`;

const Text5 = styled.div`
  font-weight: bold;
  font-size: 80px;
  color: white;
`;

const Page2Container = styled.div`
  width: 100%;
  height: 100%;
  background-color: white;
  box-sizing: border-box;
  position: absolute;
  top: 100%;
  display: flex;
  align-items: center;
  padding-top: 30px;
`;

const Page2 = styled(motion.div)`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  width: 100%;
  height: 60%;
  background-color: white;
  text-align: start;
  line-height: 1.5;
`;

const TextComponents = styled.div`
  width: 300px;
  display: flex;
  align-items: center;
`;

const Textb = styled.div`
  border-left: 3px solid black;
  display: flex;
  flex-direction: column;
  @media screen and (max-width: 768px) {
    width: 270px;
    height: 80px;
  }
  @media screen and (min-width: 769px) and (max-width: 1023px) {
    width: 300px;
    height: 90px;
  }
  @media screen and (min-width: 1024px) {
    width: 350px;
    height: 100px;
  }
`;

const Text6 = styled.div`
  @media screen and (max-width: 768px) {
    color: black;
    font-weight: bold;
    font-size: 27px;
    margin-left: 10px;
  }
  @media screen and (min-width: 769px) and (max-width: 1023px) {
    color: black;
    font-weight: bold;
    font-size: 30px;
    margin-left: 10px;
  }
  @media screen and (min-width: 1024px) {
    color: black;
    font-weight: bold;
    font-size: 31px;
    margin-left: 10px;
  }
`;

const Text8 = styled.div`
  color: black;
  @media screen and (max-width: 768px) {
    width: 270px;
    font-size: 18px;
    line-height: 1.6;
    margin-top: 18px;
  }
  @media screen and (min-width: 769px) and (max-width: 1023px) {
    width: 300px;
    font-size: 20px;
    line-height: 1.8;
    margin-top: 22px;
  }
  @media screen and (min-width: 1024px) {
    width: 350px;
    font-size: 22px;
    line-height: 1.8;
    margin-top: 30px;
  }
`;

const Image2 = styled.div`
  background-image: url('https://ifh.cc/g/Y5bZkt.jpg');
  background-size: cover;
  background-position: center;
  margin-bottom: 20px;
  @media screen and (max-width: 768px) {
    width: 250px;
    height: 330px;
  }
  @media screen and (min-width: 769px) and (max-width: 1023px) {
    width: 300px;
    height: 400px;
  }
  @media screen and (min-width: 1024px) {
    width: 330px;
    height: 440px;
  }
`;

const TextComponents2 = styled.div`
  display: flex;
  flex-direction: column;
`;

const Container1 = styled.div`
  width: 100%;
  background: white;
  position: relative;
  display: flex;
  align-items: center;
  z-index: 3;
  @media screen and (max-width: 768px) {
    height: 1900px;
  }
  @media screen and (min-width: 769px) and (max-width: 1023px) {
    height: 2500px;
  }
  @media screen and (min-width: 1024px) {
    height: 900px;
  }
`;

const ImageContainer = styled.div`
  width: 100%;
  box-sizing: border-box;
  padding: 60px;
  display: flex;
  @media screen and (max-width: 768px) {
    height: 1800px;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
  }
  @media screen and (min-width: 769px) and (max-width: 1023px) {
    height: 2100px;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
  }
  @media screen and (min-width: 1024px) {
    height: 650px;
    flex-direction: row;
    justify-content: space-evenly;
  }
`;

const ImageBox = styled.div`
  aspect-ratio: 1 / 1.5;
  display: flex;
  flex-direction: column;
  @media screen and (max-width: 768px) {
    aspect-ratio: 1 / 1.6;
    width: 350px;
  }
  @media screen and (min-width: 769px) and (max-width: 1023px) {
    width: 500px;
  }
  @media screen and (min-width: 1024px) {
    width: 26vw;
  }
`;

const ImageBox2 = styled.div`
  aspect-ratio: 1 / 1;
  display: flex;
  flex-direction: column;
  @media screen and (max-width: 768px) {
    width: 480px;
  }
  @media screen and (min-width: 769px) and (max-width: 1023px) {
    width: 500px;
  }
  @media screen and (min-width: 1024px) {
    width: 32vw;
  }
`;

const ImageBox3 = styled.div`
  aspect-ratio: 1 / 1.78;
  display: flex;
  flex-direction: column;
  @media screen and (max-width: 768px) {
    width: 350px;
  }
  @media screen and (min-width: 769px) and (max-width: 1023px) {
    width: 500px;
  }
  @media screen and (min-width: 1024px) {
    width: 22vw;
  }
`;

const ImageBoxText = styled.div`
  width: 100%;
  height: 90px;
  box-sizing: border-box;
  padding: 10px 10px;
  font-size: 20px;
  font-weight: 700;
  text-align: center;
  line-height: 1.4;
  @media screen and (max-width: 1023px) {
    font-size: 24px;
    padding: 0;
  }
`;

const ImageBoxText2 = styled.div`
  width: 100%;
  height: 90px;
  box-sizing: border-box;
  font-size: 20px;
  font-weight: 700;
  text-align: center;
  line-height: 1.7;
  margin-top: 10px;
  @media screen and (max-width: 1023px) {
    font-size: 24px;
    height: 60px;
  }
  @media screen and (min-width: 1024px) {
    padding: 10px 28px;
    height: 90px;
  }
`;

const ImageBoxText3 = styled.div`
  width: 100%;
  height: 70px;
  box-sizing: border-box;
  padding: 10px 28px;
  font-size: 20px;
  font-weight: 700;
  text-align: center;
  line-height: 1.7;
  margin-top: 10px;
  @media screen and (max-width: 1023px) {
    font-size: 24px;
    padding: 0;
    height: 60px;
  }
`;

interface ImageProps {
  imageurl: string;
}

const ImageBoxImage = styled.div<ImageProps>`
  aspect-ratio: 1 / 1.15;
  background-image: url(${(props) => props.imageurl});
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
  box-shadow: 0px 2px 20px 0px rgba(0, 0, 0, 0.25);

  @media screen and (max-width: 1023px) {
    width: 100%;
  }
  @media screen and (min-width: 1024px) {
    width: 26vw;
  }
`;

const ImageBoxImage2 = styled.div<ImageProps>`
  aspect-ratio: 9 / 6.5;
  background-image: url(${(props) => props.imageurl});
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
  box-shadow: 0px 2px 20px 0px rgba(0, 0, 0, 0.25);
  margin-left: 5px;

  @media screen and (max-width: 1023px) {
    width: 100%;
  }
  @media screen and (min-width: 1024px) {
    width: 31vw;
    margin-top: 10%;
  }
`;

const ImageBoxImage3 = styled.img<ImageProps>`
  aspect-ratio: 1 / 1.34;
  background-image: url(${(props) => props.imageurl});
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
  box-shadow: 0px 2px 20px 0px rgba(0, 0, 0, 0.25);

  @media screen and (max-width: 1023px) {
    width: 100%;
  }
  @media screen and (min-width: 1024px) {
    width: 22vw;
  }
`;

const Container2 = styled.div`
  width: 100%;
  height: 60vh;
  color: white;
  font-size: 40px;
  font-weight: 700;
  text-align: center;
  background: black;
  padding: 300px 0px 0px 0px;

  @media screen and (max-width: 1023px) {
    & div {
      font-size: 25px;
    }
  }
`;

const MiddleContainer = styled.div`
  width: 100%;
  height: 50vh;
  background: linear-gradient(#fff, #000);
`;

function Main() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const setRepoListState = useSetRecoilState(repoListState);
  const [githubInfo, setGithubInfo] = useRecoilState(githubLoginInfoState);
  const setGithubProfile = useSetRecoilState(githubProfileState);
  const handleMyGitHubClick = () => {
    //사용자의 GitHub 프로필로 이동합니다.
    if (githubInfo.id === -1) {
      window.alert('로그인이 필요한 기능입니다.');
      return;
    }
    window.open(githubInfo.html_url, '_blank');
  };

  const handleFileUpload = async (title: string) => {
    if (selectedFile) {
      const file = new FormData();
      file.append('file', selectedFile);
      const user_id = '1';
      file.append('user_id', user_id);
      file.append('title', title);

      try {
        const response = await api.post('resumes/create', file);
        console.log('File uploaded successfully!', response.data);
        setIsModalOpen(false);
      } catch (error) {
        console.error('Error uploading file:', error);
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
    if (githubInfo.id === -1) {
      window.alert('로그인이 필요한 기능입니다.');
      return;
    }
    setIsModalOpen(false);
  };

  const navigate = useNavigate();
  const { scrollY } = useScroll();
  const [isUp, setIsUp] = useState(false);

  useMotionValueEvent(scrollY, 'change', (latest) => {
    if (latest >= 400 && !isUp) {
      setIsUp(true);
      const box = document.getElementById('page2container');
      animate(box as HTMLElement, { top: '20%' }, { duration: 0.8 });
    } else if (latest < 370 && isUp) {
      setIsUp(false);
      const box = document.getElementById('page2container');
      animate(box as HTMLElement, { top: '100%' }, { duration: 0.5 });
    }
  });

  const handleAIInterviewClick = () => {
    if (githubInfo.id === -1) {
      window.alert('로그인이 필요한 기능입니다.');
      return;
    }
    navigate('/choose');
  };

  const [isDone, setIsDone] = useState([false, false, false]);
  const [throttler, setThrottler] = useState(false);
  const control1 = useAnimationControls();
  const control2 = useAnimationControls();
  const control3 = useAnimationControls();
  useMotionValueEvent(scrollY, 'change', (latest) => {
    if (latest < 400) {
      const scroll = document.getElementById('scrollContent') as HTMLDivElement;
      scroll.style.top = `-${latest * 2}px`;
    }
    //쓰로틀링으로 0.1초마다 함수 실행하도록 제어
    if (throttler) return;
    setThrottler(true);
    setTimeout(() => {
      //함수가 한 번만 실행될 수 있도록 상태변수 추가
      if (latest >= 400 && !isDone[0]) {
        let _isDone = [...isDone];
        _isDone[0] = true;
        setIsDone(_isDone);
        control1.start({ opacity: 1, y: 0 });
      }
      if (latest >= 760 && !isDone[1]) {
        let _isDone = [...isDone];
        _isDone[1] = true;
        setIsDone(_isDone);
        control2.start({ opacity: 1, y: 0 });
      }
      if (
        (latest >= 2100 && !isDone[2] && window.innerWidth >= 1024) ||
        (latest >= 3570 &&
          !isDone[2] &&
          window.innerWidth >= 769 &&
          window.innerWidth <= 1023) ||
        (latest >= 2900 && !isDone[2] && window.innerWidth <= 768)
      ) {
        let _isDone = [...isDone];
        _isDone[2] = true;
        setIsDone(_isDone);
        control3.start({ opacity: 1 });
      }
      setThrottler(false);
    }, 100);
  });

  useEffect(() => {
    const githubLoginStatus = window.localStorage.getItem('githubLogin');
    if (githubLoginStatus === 'inProgress') {
      startTransition(() => {
        const fetchData = async () => {
          try {
            const response = await api.get('users/', {
              withCredentials: true,
            });
            console.log(response.data);
            const response2 = await axios.get(`${response.data.repos_url}`);
            console.log(response2.data);
            let tmpRepoList: RepoType[] = [];
            (response2.data as GitHubRepo[]).forEach((element) => {
              if (element.fork === false) {
                tmpRepoList.push({ id: element.id, repo_name: element.name });
              }
            });
            console.log(tmpRepoList);
            setGithubInfo(response.data);
            setRepoListState(tmpRepoList);
            //유저 정보 저장
            const gitUrlList = (response.data.html_url as string).split('/');
            const gitId = gitUrlList[gitUrlList.length - 1];
            const response3 = await axios.get(
              `https://api.github.com/users/${gitId}`
            );
            console.log(response3);
            setGithubProfile({
              name: response3.data.name,
              avatar_url: response3.data.avatar_url,
            });
          } catch (error) {
            console.error('API 요청 중 오류 발생:', error);
          }
        };

        fetchData();
        window.localStorage.removeItem('githubLogin'); // 상태 초기화
        // GitHub 로그인이 진행 중이었다면 API 요청을 수행
      });
    }
  }, []);

  return (
    <Suspense fallback={<LoadingModal />}>
      <>
        <Container>
          <ScrollWrapper>
            <ScrollContent id='scrollContent'>
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
              >
                <Text1>깃허브를 이용한 AI면접</Text1>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 2, delay: 1 }}
              >
                <Text2>깃허브 기반 AI면접. teamA입니다.</Text2>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 2, delay: 1.5 }}
              >
                <Text3>다양한 컨텐츠를 경험해 보세요.</Text3>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 2.5, delay: 2.5 }}
              >
                <Image
                  src='https://i.postimg.cc/26rVTrmW/github-logo-icon-147285.png'
                  alt='GitHub Logo'
                />
              </motion.div>
              <ButtonWrapper>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, delay: 1 }}
                >
                  <Button onClick={handleMyGitHubClick}>
                    <ButtonContent>
                      <ButtonImage
                        src='https://i.postimg.cc/26rVTrmW/github-logo-icon-147285.png'
                        alt='GitHub Logo'
                      />
                      내 깃허브
                    </ButtonContent>
                  </Button>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, delay: 1 }}
                >
                  <Button onClick={handleAIInterviewClick}>AI 면접</Button>
                </motion.div>
                <ResumeButton
                  id={githubInfo.id}
                  getRootProps={getRootProps}
                  getInputProps={getInputProps}
                  handleModalClose={handleModalClose}
                />
                {isModalOpen && (
                  <Modal
                    ref={modalRef}
                    onClose={handleModalClose}
                    onRegister={handleModalRegister}
                  />
                )}
              </ButtonWrapper>

              <TextField>
                <Text4>깃허브 연동</Text4>
                <Text4>개발자 필수 면접 플랫폼</Text4>
                <Text5>teamA.</Text5>
              </TextField>
            </ScrollContent>
          </ScrollWrapper>
          <Page2Container id='page2container'>
            <Page2
              initial={{ opacity: 0, y: 50 }}
              animate={control1}
              transition={{ duration: 1, delay: 0.25 }}
            >
              <TextComponents2>
                <TextComponents>
                  <Textb>
                    <Text6>GitHub 계정과</Text6>
                    <Text6>이력서만 제출하세요</Text6>
                  </Textb>
                </TextComponents>
                <Text8>
                  이제 GitHub 계정과 이력서만 제출하면 강력한 언어 처리 능력을
                  지닌 AI가 면접을 진행합니다. 당신의 개발 역량, 프로젝트 경험,
                  협업 능력 등을 정확하게 평가하여 나만의 면접을 제공합니다
                </Text8>
              </TextComponents2>
              <Image2 />
            </Page2>
          </Page2Container>
        </Container>
        <Container1>
          <ImageContainer>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={control2}
              transition={{ duration: 1, delay: 0.2 }}
            >
              <ImageBox>
                <ImageBoxText>
                  면접 종류, 포지션, 면접 방식, <br />
                  이력서 선택 등 다양한 옵션
                </ImageBoxText>
                <ImageBoxImage imageurl='https://ifh.cc/g/QKjM80.png' />
              </ImageBox>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={control2}
              transition={{ duration: 1, delay: 0.5 }}
            >
              <ImageBox2>
                <ImageBoxText2>
                  실시간 화상 면접, 음성 텍스트 변환
                </ImageBoxText2>
                <ImageBoxImage2 imageurl='https://ifh.cc/g/LG1kHy.png' />
              </ImageBox2>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={control2}
              transition={{ duration: 1, delay: 0.8 }}
            >
              <ImageBox3>
                <ImageBoxText3>면접 결과 확인, 보관</ImageBoxText3>
                <ImageBoxImage3 imageurl='https://ifh.cc/g/vgbofK.jpg' />
              </ImageBox3>
            </motion.div>
          </ImageContainer>
        </Container1>
        <MiddleContainer />
        <Container2>
          <motion.div
            initial={{ opacity: 0 }}
            animate={control3}
            transition={{ duration: 1 }}
          >
            teamA.와 함께 개발자 커리어 준비를 시작해보세요
          </motion.div>
        </Container2>
      </>
    </Suspense>
  );
}
type ResumeModalProps = {
  id: number;
  getRootProps: <T extends DropzoneInputProps>(props?: T | undefined) => T;
  getInputProps: <T extends DropzoneInputProps>(props?: T | undefined) => T;
  handleModalClose: () => void;
};

const ResumeButton = (props: ResumeModalProps) => {
  if (props.id !== -1) {
    return (
      <div {...props.getRootProps()}>
        <input {...props.getInputProps()} />
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1 }}
        >
          <Button onClick={props.handleModalClose}>
            <ButtonContent>
              <ButtonImage
                src='https://i.postimg.cc/ZRQBcYtj/2024-01-03-8-44-26.png'
                alt='Document Icon'
              />
              이력서 업로드
            </ButtonContent>
          </Button>
        </motion.div>
      </div>
    );
  } else {
    return (
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 1 }}
      >
        <Button onClick={props.handleModalClose}>
          <ButtonContent>
            <ButtonImage
              src='https://i.postimg.cc/ZRQBcYtj/2024-01-03-8-44-26.png'
              alt='Document Icon'
            />
            이력서 업로드
          </ButtonContent>
        </Button>
      </motion.div>
    );
  }
};
export default Main;
