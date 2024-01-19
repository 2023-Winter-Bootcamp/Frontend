import { motion } from "framer-motion";
import React from "react";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { interviewResultState } from "./Recoil";
import api from "./baseURL/baseURL";
import { useNavigate, useParams } from "react-router-dom";

const Container = styled.div`
  width: 100%;
  height: 550px;
  display: flex;
  flex-direction: column;
`;

const Box = styled.div<{ width: string; height: string }>`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
`;

const TopBox = styled(Box)`
  margin-top: 60px;
  box-sizing: border-box;
  border-bottom: 1px solid black;
  @media screen and (max-width: 768px) {
    margin-left: 100px;
  }
  @media screen and (min-width: 768px) and (max-width: 1023px) {
    margin-left: 200px;
  }
  @media screen and (min-width: 1024px) {
    margin-left: 267px;
  }
`;

const BottomBox = styled(Box)`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  border: 2px solid lightgray;
  margin-top: 50px;
  @media screen and (max-width: 768px) {
    margin-left: 100px;
  }
  @media screen and (min-width: 768px) and (max-width: 1023px) {
    margin-left: 200px;
  }
  @media screen and (min-width: 1024px) {
    margin-left: 267px;
  }
`;
const TopText = styled(Box)`
  font-size: 32px;
  text-align: left;
  word-break: keep-all;
  overflow-y: auto;
`;

const BottomText = styled(Box)`
  font-size: 28px;
  text-align: center;
  text-decoration: underline;
  text-underline-position: under;
  text-decoration-thickness: 0.8px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StartButton = styled(motion.button)`
  width: 240px;
  height: 50px;
  background-color: #1a1a1a;
  color: white;
  font-size: 21px;
  font-weight: bold;
  text-align: center;
  border: none;

  &:hover {
    cursor: pointer;
    background-color: #333;
    transform: translateY(-0.5px);
  }
`;

type Props = {
  interview_name: string;
};

function Endpage(props: Props) {
  const setInterviewResult = useSetRecoilState(interviewResultState);
  const { id } = useParams();
  const navigate = useNavigate();

  const getResultInfo = async () => {
    try {
      const response = await api.get(`interviews/${id}/`);
      setInterviewResult(response.data);
      navigate(`/result/${id}`);
    } catch (e) {
      console.error(e);
      console.log("인터뷰 결과 불러오는 중 에러 발생");
    }
  };
  return (
    <Container>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 2 }}
      >
        <TopBox width="63vw" height="100px">
          <TopText width="65vw" height="90px">
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
        <BottomBox width="63vw" height="270px">
          <BottomText width="70vw" height="100px">
            {props.interview_name}
          </BottomText>
          <StartButton onClick={getResultInfo}>결과 보기</StartButton>
        </BottomBox>
      </motion.div>
    </Container>
  );
}

export default Endpage;
