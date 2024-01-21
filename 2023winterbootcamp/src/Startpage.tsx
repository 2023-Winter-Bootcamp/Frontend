import { motion } from 'framer-motion';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';

const StartModal = styled.div`
  width: 100%;
  height: 700px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const TextContent = styled(motion.div)`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  text-align: center;
  margin-bottom: 100px;
`;

const AnswerPoint = styled(motion.div)`
  margin-bottom: 10px;
  font-size: 34px;
  letter-spacing: -10%;
  width: 200px;
  height: 180px;
  border-right: 1px solid;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
`;

const PointText = styled(motion.div)`
  font-size: 18px;
  margin-left: 20px;
  text-align: left;
  line-height: 1.5;
`;

const StartButton = styled(motion.button)`
  width: 240px;
  height: 50px;
  margin-top: 20px;
  background-color: #1a1a1a;
  color: white;
  font-size: 16px;
  font-weight: 600;
  text-align: center;
  border: none;

  &:hover {
    cursor: pointer;
    background-color: #333;
    transform: translateY(-0.5px);
  }
`;

const Dot = styled(motion.div)`
  margin-top: 10px;
  text-align: center;
  color: #afafaf;
  font-size: 14px;
  margin-top: 10px;
`;

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

function Startpage() {
  const navigate = useNavigate();
  const { id } = useParams(); // 면접 ID

  const handleStartButtonClick = () => {
    navigate('/interview/' + id);
  };

  return (
    <StartModal>
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 2 }}
      >
        <TextContent variants={fadeIn} initial='hidden' animate='visible'>
          <AnswerPoint>답변포인트</AnswerPoint>
          <PointText>
            <b>본인을 설명하는 키워드</b>가 회사의 조직문화나
            <br />
            <b>지원 직무와 어떤 연관성이 있는지</b>를 염두해 두고,
            <br />
            면접관의 긍정적인 판단에 도움이 되는 답변일지
            <br />
            고려해 봅시다.
          </PointText>
        </TextContent>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 3 }}
      >
        <StartButton onClick={handleStartButtonClick} variants={fadeIn}>
          면접 시작
        </StartButton>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 4 }}
      >
        <Dot variants={fadeIn}>
          *면접할 준비가 되셨다면,
          <br />
          면접 시작 버튼을 눌러주세요!
        </Dot>
      </motion.div>
    </StartModal>
  );
}

export default Startpage;
