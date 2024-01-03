import React, { useState } from "react";
import styled from "styled-components";

const Up = styled.div`
  margin-top: 40px;
  margin-bottom: 30px;
  display: flex;
  justify-content: space-between;
`;

const Camera = styled.div`
  margin-left: 287px;
`;

const Info = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  margin-right: 310px;
`;

const Timer = styled.div`
  margin-bottom: 4px;
`;

const Button = styled.div`
  cursor: pointer;
`;

const StyledButtonImage = styled.img`
  width: 25px;
  height: 25px;
`;

const Down = styled.div`
  width: 900px;
  height: 280px;
  background-color: #f6f6f6;
  border-radius: 20px;
  margin-bottom: 120px;
  display: flex;
  align-items: center;
  margin: 0 auto;
  margin-bottom: 120px;
`;

const Q = styled.div`
  width: 435px;
  height: 220px;
  margin-top: 10px;
  margin-left: 30px;
  border-right: 1px solid #d6d6d6;
  //background-color: white; 간격 맞추기 위한 거니까 무시해도 됨
`;

const Text1 = styled.div`
  font-weight: bold;
  font-size: 20px;
  margin-bottom: 10px;
`;

const Par = styled.div`
  color: #5a5a5a;
  font-size: 18px;
`;

const A = styled.div`
  width: 380px;
  height: 220px;
  margin-top: 10px;
  margin-left: 28px;
  //background-color: white; 간격 맞추기 위한 거니까 무시해도 됨
`;

const Text2 = styled.div`
  font-weight: bold;
  font-size: 20px;
  margin-bottom: 10px;
`;

const Par2 = styled.div`
  color: #5a5a5a;
  font-size: 18px;
`;

const Next = styled.button`
  border: none;
  background: none;
  cursor: pointer;
`;

const StyledNextImage = styled.img`
  width: 50px;
  height: 50px;
  margin-top: 10px;
  margin-left: 330px;
`;

function Interviewpage() {
  const [buttonImage, setButtonImage] = useState(
    "https://i.postimg.cc/9F5kxyNS/2024-01-04-2-23-04.png"
  );

  const handleButtonClick = () => {
    if (
      buttonImage === "https://i.postimg.cc/9F5kxyNS/2024-01-04-2-23-04.png"
    ) {
      setButtonImage("https://i.postimg.cc/SxLc9SV2/2024-01-04-2-59-20.png");
    } else {
      setButtonImage("https://i.postimg.cc/9F5kxyNS/2024-01-04-2-23-04.png");
    }
  };

  return (
    <>
      <Up>
        <Camera>
          <img
            src="https://i.postimg.cc/QdcMWgKq/Rectangle-23.png"
            alt="camera"
          />
        </Camera>
        <Info>
          <Timer>00:00</Timer>
          <Button onClick={handleButtonClick}>
            <StyledButtonImage src={buttonImage} alt="button" />
          </Button>
        </Info>
      </Up>
      <Down>
        <Q>
          <Text1>질문</Text1>
          <Par>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat
          </Par>
        </Q>
        <A>
          <Text2>답변</Text2>
          <Par2>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis
          </Par2>
          <Next>
            <StyledNextImage
              src="https://i.postimg.cc/5yNzdTCP/2024-01-04-3-15-41.png"
              alt="next"
            />
          </Next>
        </A>
      </Down>
    </>
  );
}

export default Interviewpage;
