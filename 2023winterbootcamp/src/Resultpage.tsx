import React, { useState } from "react";
import styled from "styled-components";

const ProfileContainer = styled.div`
  width: 100%;
  height: 420px;
  background: #070707;
  padding: 20px;
  @media screen and (max-width: 768px){
    height: 340px;
  }
  @media screen and (min-width: 769px) and (max-width: 1023px) {
    height: 380px;
  }
  @media screen and (min-width: 1024px) {
    height: 420px;
  }
`;

const ProfileBox = styled.div`
  width: 700px;
  display: flex;
  margin-top: 60px;
  margin-left: 18%;
  @media screen and (max-width: 768px) {
    height: 180px;
    margin-left: 12%;
  }
  @media screen and (min-width: 769px) and (max-width: 1023px) {
    height: 220px;
    margin-left: 14%;
  }
  @media screen and (min-width: 1024px) {
    height: 250px;
    margin-top: 60px;
  }
`;

const ProfileImage = styled.div`
  border-radius: 50%;
  background-image: url("https://ifh.cc/g/bHznLB.png");
  background-position: center;
  border: none;
  aspect-ratio: 1;
  @media screen and (max-width: 768px) {
    width: 180px;
  }
  @media screen and (min-width: 769px) and (max-width: 1023px) {
    width: 220px;
  }
  @media screen and (min-width: 1024px) {
    width: 250px;
  }
`;

const ProfileInfo = styled.div`
  height: inherit;
  aspect-ratio: 1;
  @media screen and (max-width: 768px) {
    width: 350px;
    margin-top: 0;
    margin-left: 30px
  }
  @media screen and (min-width: 769px) and (max-width: 1023px) {
    width: 400px;
    margin-top: 0;
    margin-left: 50px;
  }
  @media screen and (min-width: 1024px) {
    width: 450px;
    margin-top: 10px;
    margin-left: 70px;
  }
`;

const Text1 = styled.div`
  font-weight: 700;
  color: white;
  @media screen and (max-width: 768px) {
    width: 60px;
    height: 26px;
    font-size: 20px;
  }
  @media screen and (min-width: 769px) and (max-width: 1023px) {
    width: 70px;
    height: 30px;
    font-size: 24px;
  }
  @media screen and (min-width: 1024px) {
    width: 90px;
    height: 34px;
    font-size: 28px;
  }
`;

const Text2 = styled.div`
  font-weight: 600;
  margin-bottom: 10px;
  color: white;
  @media screen and (max-width: 768px) {
    width: 70px;
    height: 17px;
    font-size: 14px;
    line-height: 1.1;
  }
  @media screen and (min-width: 769px) and (max-width: 1023px) {
    width: 70px;
    height: 20px;
    font-size: 16px;
    line-height: 1.2;
  }
  @media screen and (min-width: 1024px) {
    width: 80px;
    height: 22px;
    font-size: 18px;
    line-height: 1.5;
  }
`;

const Text3 = styled.div`
  font-weight: 500;
  color: white;
  line-height: 1.5;
  margin-bottom: 10px;
  @media screen and (max-width: 768px) {
    width: 250px;
    height: 20px;
    font-size: 15px;
    line-height: 1.2;
    margin-bottom: 7px;
  }
  @media screen and (min-width: 769px) and (max-width: 1023px) {
    width: 250px;
    height: 22px;
    font-size: 16px;
    line-height: 1.2;
    margin-bottom: 8px;
  }
  @media screen and (min-width: 1024px) {
    width: 250px;
    height: 22px;
    font-size: 18px;
  }
`;

const TextBox1 = styled.div`
  display: flex;
  @media screen and (max-width: 768px) {
    width: 300px;
    height: 140px;
    margin-top: 10px;
  }
  @media screen and (min-width: 769px) {
    width: 400px;
    height: 200px;
    margin-top: 20px;
  }
`;

const TextBox2 = styled.div`
  width: 100px;
  height: inherit;
  display: flex;
  flex-direction: column;
  @media screen and (max-width: 768px) {
    
  }
  @media screen and (min-width: 769px) and (max-width: 1023px) {
    width: 80px;
  }
  @media screen and (min-width: 1024px) {
    width: 100px;
  }
`;

const TextBox3 = styled.div`
  width: 270px;
  height: inherit;
  display: flex;
  flex-direction: column;
  @media screen and (max-width: 768px) {
    
  }
  @media screen and (min-width: 769px) and (max-width: 1023px) {
    margin-left: 10px;
  }
  @media screen and (min-width: 1024px) {
    margin-left: 20px;
  }
`;

const QnAContainer = styled.div`
  width: 100%;
  height: 1426px;
  padding: 20px;
`;

const QnABox = styled.div`
  width: 100%;
  height: 1426px;
  box-sizing: border-box;
  padding: 20px 20px 0px 20px;
  display: flex;
  flex-direction: column;
  background: linear-gradient(#f4f4f4 90%, lightgray);
  overflow: scroll;
`;

const QnAWrapper = styled.div`
  width: 100%;
  height: 555px;
  box-sizing: border-box;
  margin-bottom: 40px;
`;

const QuestionBox = styled.div`
  width: 60%;
  height: 200px;
  box-sizing: border-box;
  padding: 25px 34px 15px;
  margin: 0 25% 10px 15%;
  background: #fff;
`;

const QnALargeText = styled.div`
  width: 100%;
  height: 34px;
  font-size: 28px;
  font-weight: 600;
  margin-bottom: 10px;
`;

const QnASmallText = styled.div`
  width: 100%;
  height: 114px;
  font-size: 22px;
  font-weight: 400;
  color: #3a3a3a;
`;

const AnswerBox = styled.div`
  width: 60%;
  height: 350px;
  box-sizing: border-box;
  margin: 0 15% 0 25%;
  padding: 30px 34px 0px;
  background: #fff;
  position: relative;
`;

const VoiceBox = styled.div`
  width: 160px;
  height: 43px;
  position: absolute;
  display: flex;
  justify-content: center;
  right: 40px;
  bottom: 25px;
`;

interface ButtonProps {
  isPlaying: boolean;
}

const Button = styled.button<ButtonProps>`
  width: 29px;
  height: 33px;
  background-size: contain;
  margin-right: 14px;
  margin-top: 4px;
  border: none;
  outline: none;
  background-repeat: no-repeat;

  background-image: ${(props) =>
    props.isPlaying
      ? `url('https://i.postimg.cc/X7bpvB9Z/image.jpg')`
      : `url('https://i.postimg.cc/mDgPBv9m/Polygon-2.jpg')`};

  &:hover {
    cursor: pointer;
  }
`;

const Text4 = styled.div`
  width: 130px;
  height: 34px;
  font-size: 22px;
  font-weight: 400;
  line-height: 1.4;
  margin-top: 5px;
`;

function Resultpage() {
  const [isPlaying1, setIsPlaying1] = useState(false);
  const [isPlaying2, setIsPlaying2] = useState(false);
  return (
    <>
      <ProfileContainer>
        <ProfileBox>
          <ProfileImage />
          <ProfileInfo>
            <Text1>안나경</Text1>
            <TextBox1>
              <TextBox2>
                <Text2>직군/직무</Text2>
                <Text2>번호</Text2>
                <Text2>이메일</Text2>
                <Text2>면접 종류</Text2>
                <Text2>포지션</Text2>
                <Text2>면접 방식</Text2>
              </TextBox2>
              <TextBox3>
                <Text3>프론트엔드 개발자 및 디자이너</Text3>
                <Text3>010-XXXX-XXXX</Text3>
                <Text3>nakyung.ahn.03@gmail.com</Text3>
                <Text3>프로젝트, CS질문, 인성면접</Text3>
                <Text3>Frontend</Text3>
                <Text3>화상 면접</Text3>
              </TextBox3>
            </TextBox1>
          </ProfileInfo>
        </ProfileBox>
      </ProfileContainer>
      <QnAContainer>
        <QnABox>
          <QnAWrapper>
            <QuestionBox>
              <QnALargeText>프로젝트 질문</QnALargeText>
              <QnASmallText>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Nisl
                tincidunt eget nullam non. Quis hendrerit dolor magna eget est
                lorem ipsum dolor sit. Volutpat odio facilisis mauris sit amet
                massa.
              </QnASmallText>
            </QuestionBox>
            <AnswerBox>
              <QnALargeText>나의 답변</QnALargeText>
              <QnASmallText>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Nisl
                tincidunt eget nullam non. Quis hendrerit dolor magna eget est
                lorem ipsum dolor sit. Volutpat odio facilisis mauris sit amet
                massa. Commodo odio aenean sed adipiscing diam donec adipiscing
                tristique. Mi eget mauris pharetra et. Non tellus orci ac auctor
                augue. Elit at imperdiet dui accumsan sit. Ornare arcu dui
                vivamus arcu felis. Egestas integer eget aliquet nibh praesent.
                In hac habitasse platea dictumst quisque sagittis purus.
              </QnASmallText>
              <VoiceBox>
                <Button
                  isPlaying={isPlaying1}
                  onClick={() => {
                    setIsPlaying1(!isPlaying1);
                  }}
                />
                <Text4>음성 듣기</Text4>
              </VoiceBox>
            </AnswerBox>
          </QnAWrapper>
          <QnAWrapper>
            <QuestionBox>
              <QnALargeText>CS 지식 질문</QnALargeText>
              <QnASmallText>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Nisl
                tincidunt eget nullam non. Quis hendrerit dolor magna eget est
                lorem ipsum dolor sit. Volutpat odio facilisis mauris sit amet
                massa.
              </QnASmallText>
            </QuestionBox>
            <AnswerBox>
              <QnALargeText>나의 답변</QnALargeText>
              <QnASmallText>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Nisl
                tincidunt eget nullam non. Quis hendrerit dolor magna eget est
                lorem ipsum dolor sit. Volutpat odio facilisis mauris sit amet
                massa. Commodo odio aenean sed adipiscing diam donec adipiscing
                tristique. Mi eget mauris pharetra et. Non tellus orci ac auctor
                augue. Elit at imperdiet dui accumsan sit. Ornare arcu dui
                vivamus arcu felis.
              </QnASmallText>
              <VoiceBox>
                <Button
                  isPlaying={isPlaying2}
                  onClick={() => {
                    setIsPlaying2(!isPlaying2);
                  }}
                />
                <Text4>음성 듣기</Text4>
              </VoiceBox>
            </AnswerBox>
          </QnAWrapper>
          <QnAWrapper>
            <QuestionBox>
              <QnALargeText>인성 면접 질문</QnALargeText>
              <QnASmallText>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Nisl
                tincidunt eget nullam non. Quis hendrerit dolor magna eget est
                lorem ipsum dolor sit.
              </QnASmallText>
            </QuestionBox>
            <AnswerBox>
              <QnALargeText>나의 답변</QnALargeText>
              <QnASmallText>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Nisl
                tincidunt eget nullam non. Quis hendrerit dolor magna eget est
                lorem ipsum dolor sit. Volutpat odio facilisis mauris sit amet
                massa. Commodo odio aenean sed adipiscing diam donec adipiscing
                tristique. Mi eget mauris pharetra et. Non tellus orci ac auctor
                augue. Elit at imperdiet dui accumsan sit. Ornare arcu dui
                vivamus arcu felis.
              </QnASmallText>
              <VoiceBox>
                <Button
                  isPlaying={isPlaying2}
                  onClick={() => {
                    setIsPlaying2(!isPlaying2);
                  }}
                />
                <Text4>음성 듣기</Text4>
              </VoiceBox>
            </AnswerBox>
          </QnAWrapper>
        </QnABox>
      </QnAContainer>
    </>
  );
}

export default Resultpage;
