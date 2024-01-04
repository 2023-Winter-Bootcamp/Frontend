import React, { useState } from 'react'
import styled from 'styled-components'

const ProfileContainer = styled.div`
    width: 100%;
    height: 450px;
    background: #070707;
    padding: 20px;
`
const ProfileImage = styled.div`
    width: 250px;
    height: 250px;
    border-radius: 50%;
    background-image: url("https://i.postimg.cc/Qt7wsv8d/Ellipse-1.jpg");
    margin-right: 50px;
`
const ProfileBox = styled.div`
    width: 700px;
    height: 250px;
    display: flex;
    margin-top: 60px;
    margin-left: 267px;
`

const ProfileInfo = styled.div`
    width: 400px;
    height: 195px;
    margin-top: 55px;
`

const Text1 = styled.div`
    width: 90px;
    height: 34px;
    font-size: 28px;
    font-weight: 700;
    color: white;
`

const Text2 = styled.div`
    width: 80px;
    height: 22px;
    font-size: 18px;
    font-weight: 600;
    line-height: 1.5;
    margin-bottom: 10px;
    color: white;
`

const Text3 = styled.div`
    width: 250px;
    height: 22px;
    font-size: 18px;
    font-weight: 500;
    color: white;
    line-height: 1.5;
    margin-bottom: 10px;
`
const TextBox1 = styled.div`
    width: 400px;
    height: 86px;
    display: flex;
    margin-top: 20px;
`

const TextBox2 = styled.div`
    width: 100px;
    height: 86px;
    display: flex;
    flex-direction: column;
`

const TextBox3 = styled.div`
    width: 270px;
    height: 86px;
    display: flex;
    flex-direction: column;
    margin-left: 20px;
`
const QnAContainer = styled.div`
    width: 100%;
    height: 1426px;
    padding: 20px;
`
const QnABox = styled.div`
    width: 100%;
    height: 1426px;
    box-sizing: border-box;
    padding: 20px 20px 0px 20px;
    display: flex;
    flex-direction: column;
    background: linear-gradient(#f4f4f4 90%,lightgray);
    overflow: scroll;
`
const QnAWrapper = styled.div`
    width: 100%;
    height: 555px;
    box-sizing: border-box;
    margin-bottom: 40px;
`

const QuestionBox = styled.div`
    width: 100%;
    height: 200px;
    box-sizing: border-box;
    padding: 25px 34px 15px;
    margin-bottom: 10px;
    background: #fff;
`
const QnALargeText = styled.div`
    width: 100%;
    height: 34px;
    font-size: 28px;
    font-weight: 600;
    margin-bottom: 15px;
`
const QnASmallText = styled.div`
    width: 100%;
    height: 114px;
    font-size: 28px;
    font-weight: 400;
    color: #3a3a3a;
`
const AnswerBox = styled.div`
    width: 100%;
    height: 350px;
    box-sizing: border-box;
    padding: 69px 34px 0px;
    background: #fff;
    position: relative;
`
const VoiceBox = styled.div`
    width: 160px;
    height: 43px;
    position: absolute;
    display: flex;
    justify-content: center;
    right: 40px;
    bottom: 33px;
`
interface ButtonProps {
    isPlaying : boolean
}
const Button = styled.button<ButtonProps>`
    width: 30px;
    height: 37px;
    background-image: url(${(props) => props.isPlaying ? "https://i.postimg.cc/X7bpvB9Z/image.jpg" : "https://i.postimg.cc/mDgPBv9m/Polygon-2.jpg"});
    background-size: contain;
    margin-right: 10px;
    border: none;
    outline: none;
    &:hover{
        cursor: pointer;
    }
`
const Text4 = styled.div`
    width: 130px;
    height: 34px;
    font-size: 28px;
    font-weight: 400;
    line-height: 1.4;
`
function Resultpage(){
    const [isPlaying1,setIsPlaying1] = useState(false)
    const [isPlaying2,setIsPlaying2] = useState(false)
    return(
        <>
            <ProfileContainer>
                <ProfileBox>
                    <ProfileImage/>
                    <ProfileInfo>
                        <Text1>안나경</Text1>
                        <TextBox1>
                            <TextBox2>
                                <Text2>직군/직무</Text2>
                                <Text2>번호</Text2>
                                <Text2>이메일</Text2>
                            </TextBox2>
                            <TextBox3>
                                <Text3>프론트엔드 개발자 및 디자이너</Text3>
                                <Text3>010-XXXX-XXXX</Text3>
                                <Text3>nakyung.ahn.03@gmail.com</Text3>
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
                            <QnASmallText>Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis qui, distinctio dolores temporibus dolore, earum unde iste adipisci quas impedit sit voluptates quisquam blanditiis odio deserunt. Nisi provident ex maxime!</QnASmallText>
                        </QuestionBox>
                        <AnswerBox>
                            <QnALargeText>나의 답변</QnALargeText>
                            <QnASmallText>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Minima rem quam maxime itaque voluptatum expedita, iste nostrum odio vero ratione unde corrupti delectus ea? Odio veniam dignissimos maxime exercitationem quisquam.</QnASmallText>
                            <VoiceBox>
                                <Button isPlaying={isPlaying1} onClick={()=>{setIsPlaying1(!isPlaying1)}}/>
                                <Text4>음성 듣기</Text4>
                            </VoiceBox>
                        </AnswerBox>
                    </QnAWrapper>
                    <QnAWrapper>
                        <QuestionBox>
                            <QnALargeText>CS 지식 질문</QnALargeText>
                            <QnASmallText>Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis qui, distinctio dolores temporibus dolore, earum unde iste adipisci quas impedit sit voluptates quisquam blanditiis odio deserunt. Nisi provident ex maxime!</QnASmallText>
                        </QuestionBox>
                        <AnswerBox>
                            <QnALargeText>나의 답변</QnALargeText>
                            <QnASmallText>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Minima rem quam maxime itaque voluptatum expedita, iste nostrum odio vero ratione unde corrupti delectus ea? Odio veniam dignissimos maxime exercitationem quisquam.</QnASmallText>
                            <VoiceBox>
                                <Button isPlaying={isPlaying2} onClick={()=>{setIsPlaying2(!isPlaying2)}}/>
                                <Text4>음성 듣기</Text4>
                            </VoiceBox>
                        </AnswerBox>
                    </QnAWrapper>
                    <QnAWrapper>
                        <QuestionBox>
                            <QnALargeText>인성 면접 질문</QnALargeText>
                            <QnASmallText>Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis qui, distinctio dolores temporibus dolore, earum unde iste adipisci quas impedit sit voluptates quisquam blanditiis odio deserunt. Nisi provident ex maxime!</QnASmallText>
                        </QuestionBox>
                        <AnswerBox>
                            <QnALargeText>나의 답변</QnALargeText>
                            <QnASmallText>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Minima rem quam maxime itaque voluptatum expedita, iste nostrum odio vero ratione unde corrupti delectus ea? Odio veniam dignissimos maxime exercitationem quisquam.</QnASmallText>
                            <VoiceBox>
                                <Button isPlaying={isPlaying2} onClick={()=>{setIsPlaying2(!isPlaying2)}}/>
                                <Text4>음성 듣기</Text4>
                            </VoiceBox>
                        </AnswerBox>
                    </QnAWrapper>
                </QnABox>
            </QnAContainer>
        </>
    )
}

export default Resultpage