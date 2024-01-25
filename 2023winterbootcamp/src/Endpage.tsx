import { motion } from "framer-motion";
import React, { useEffect } from "react";
import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { interviewResultState, interviewTitleState } from "./Recoil";

const Container = styled.div`
  width: 100%;
  height: 550px;
  display: flex;
  flex-direction: column;
  user-select: none;
`;

const Box = styled.div<{ width: string; height: string }>`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
`;

const TopBox = styled(Box)`
  margin-top: 60px;
  box-sizing: border-box;
  border-bottom: 1px solid black;
  margin-left: 20%;
  display: flex;
  align-items: end;
`;

const BottomBox = styled(Box)`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  border: 2px solid lightgray;
  margin-top: 50px;
  margin-left: 20%;
`;

const TopText = styled(Box)`
  font-size: 32px;
  text-align: left;
  @media screen and (max-width: 768px) {
    font-size: 25px;
    height: 70px;
  }
`;

const BottomText = styled(Box)`
  font-size: 22px;
  text-align: center;
  text-decoration: underline;
  text-underline-position: under;
  text-decoration-thickness: 0.8px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
  @media screen and (max-width: 768px) {
    font-size: 22px;
  }
`;

const StartButton = styled(motion.button)`
  width: 180px;
  height: 45px;
  background-color: #1a1a1a;
  color: white;
  font-size: 16px;
  font-weight: 500;
  text-align: center;
  border: none;

  &:hover {
    cursor: pointer;
    background-color: #333;
    transform: translateY(-0.5px);
  }
`;

function Endpage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const interviewTitle = useRecoilValue(interviewTitleState);

  const handleSelectStart = (event: React.MouseEvent<HTMLDivElement>) => {
    event.preventDefault();
    return false;
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Container onContextMenu={handleSelectStart}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 2 }}
      >
        <TopBox width="60%" height="100px">
          <TopText width="100%" height="90px">
            본인이 지원한 면접의
            <br />
            <b>결과를 확인</b>하실 수 있습니다.
          </TopText>
        </TopBox>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 3 }}
      >
        <BottomBox width="60%" height="270px">
          <BottomText width="80%" height="100px">
            {interviewTitle}
          </BottomText>
          <StartButton onClick={() => navigate(`/result/${id}`)}>
            결과 보기
          </StartButton>
        </BottomBox>
      </motion.div>
    </Container>
  );
}

export default Endpage;
