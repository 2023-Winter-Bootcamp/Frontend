import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const Up = styled.div`
  margin-top: 40px;
  margin-bottom: 30px;
  display: flex;
  justify-content: space-between;
`;

const Camera = styled.div`
  margin-left: 287px;
  @media screen and (max-width: 768px) {
    margin-left: 120px;
  }

  @media screen and (min-width: 769px) and (max-width: 1023px) {
    margin-left: 220px;
  }

  @media screen and (min-width: 1024px) {
  }
`;

const Image = styled.img`
  @media screen and (max-width: 768px) {
    width: 480px;
    height: 300px;
  }

  @media screen and (min-width: 769px) and (max-width: 1023px) {
    width: 480px;
    height: 300px;
  }

  @media screen and (min-width: 1024px) {
  }
`;

const Info = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  margin-right: 310px;
  @media screen and (max-width: 768px) {
    margin-left: 10px;
  }

  @media screen and (min-width: 769px) and (max-width: 1023px) {
    margin-left: 10px;
    margin-right: 400px;
  }

  @media screen and (min-width: 1024px) {
    margin-left: 10px;
    margin-right: 310px;
  }
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
  @media screen and (max-width: 768px) {
    width: 20px;
    height: 20px;
  }

  @media screen and (min-width: 769px) and (max-width: 1023px) {
    width: 20px;
    height: 20px;
  }

  @media screen and (min-width: 1024px) {
    width: 25px;
    height: 25px;
  }
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
  @media screen and (max-width: 768px) {
    margin-left: 120px;
    width: 540px;
  }

  @media screen and (min-width: 769px) and (max-width: 1023px) {
    margin-left: 220px;
    width: 600px;
  }

  @media screen and (min-width: 1024px) {
    margin-left: 290px;
    width: 900px;
  }
`;

const Q = styled.div`
  width: 435px;
  height: 220px;
  margin-left: 30px;
  border-right: 1px solid #d6d6d6;
  //background-color: white; 간격 맞추기 위한 거니까 무시해도 됨
  @media screen and (max-width: 768px) {
    width: 235px;
    height: 220px;
  }

  @media screen and (min-width: 769px) and (max-width: 1023px) {
    width: 280px;
    height: 220px;
  }

  @media screen and (min-width: 1024px) {
    width: 435px;
    height: 220px;
  }
`;

const Text1 = styled.div`
  font-weight: bold;
  font-size: 20px;
  margin-bottom: 10px;
`;

const Par = styled.div`
  color: #5a5a5a;
  font-size: 18px;
  @media screen and (max-width: 768px) {
    font-size: 14px;
    margin-right: 20px;
  }

  @media screen and (min-width: 769px) and (max-width: 1023px) {
    font-size: 16px;
    margin-right: 20px;
  }

  @media screen and (min-width: 1024px) {
    font-size: 18px;
    margin-right: 20px;
  }
`;

const A = styled.div`
  width: 435px;
  height: 220px;
  margin-left: 30px;
  //background-color: white; 간격 맞추기 위한 거니까 무시해도 됨
  @media screen and (max-width: 768px) {
    width: 230px;
    height: 220px;
  }

  @media screen and (min-width: 769px) and (max-width: 1023px) {
    width: 240px;
    height: 220px;
  }

  @media screen and (min-width: 1024px) {
    width: 435px;
    height: 220px;
  }
`;

const Text2 = styled.div`
  font-weight: bold;
  font-size: 20px;
  margin-bottom: 10px;
`;

const Par2 = styled.div`
  color: #5a5a5a;
  font-size: 18px;
  @media screen and (max-width: 768px) {
    font-size: 14px;
    margin-right: 10px;
  }

  @media screen and (min-width: 769px) and (max-width: 1023px) {
    font-size: 16px;
    margin-right: 10px;
  }

  @media screen and (min-width: 1024px) {
    font-size: 18px;
    margin-right: 30px;
  }
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
  @media screen and (max-width: 768px) {
    width: 40px;
    height: 40px;
    margin-top: 25px;
    margin-left: 180px;
  }

  @media screen and (min-width: 769px) and (max-width: 1023px) {
    width: 40px;
    height: 40px;
    margin-left: 190px;
    margin-top: -10px;
  }

  @media screen and (min-width: 1024px) {
    width: 50px;
    height: 50px;
    margin-left: 340px;
    margin-top: 20px;
  }
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

  const navigate = useNavigate();

  const handleNextButtonClick = () => {
    navigate("/result");
  };

  return (
    <>
      <Up>
        <Camera>
          <Image
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
          <Next onClick={handleNextButtonClick}>
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
