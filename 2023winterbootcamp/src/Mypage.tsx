import React, {useState}from 'react'
import styled from 'styled-components'


const Container = styled.div`
    width: 100%;
    height: 1434px;
    padding: 20px;
    display: flex;
    flex-direction: column;
`
const Text1 = styled.div`
    width: 130px;
    height: 35px;
    font-size: 28px;
    font-weight: 700;
    margin-top: 10px;
    margin-left: 267px;
`
const Text2 = styled.div`
    width: 400px;
    height: 20px;
    font-size: 14px;
    font-weight: 500;
    margin-top: 10px;
    margin-left: 267px;
`
const ProfileContainer = styled.div`
    width: 917px;
    height: 250px;
    display: flex;
    margin-top: 20px;
    margin-left: 267px;
`
const ProfileImage = styled.div`
    width: 250px;
    height: 250px;
    border-radius: 50%;
    background-image: url("https://i.postimg.cc/Qt7wsv8d/Ellipse-1.jpg");
    margin-right: 50px;
`
const BlackLine = styled.div`
    width: 4px;
    height: 28px;
    background: #1a1a1a;
    margin-top: 6px;
`

const ProfileInfo = styled.div`
    width: 480px;
    height: 250px;
    display: flex;
    flex-direction: column;
    padding-left: 20px;
`
const InputTitle = styled.span`
    font-size: 14px;
    font-weight: 500;
`
const Input = styled.input`
    width: 250px;
    height: 17px;
    margin-top: 10px;
    border: 0;
    outline: none;
    &::placeholder{
        color: #c1c1c1
    }
`

const RegisterButton = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: end;
    & > button {
        width: 100px;
        height: 40px;
        background: #1a1a1a;
        color: #ffffff;
        text-align: center;
        border: none;
        &:hover{
            cursor: pointer;
        }
    }
`

const GithubOverview = styled.div`
    width: 917px;
    height: 150px;
    background-image: url('https://i.postimg.cc/W3dY6kGj/image-6.jpg');
    margin-left: 267px;
    margin-top: 40px;
    &:hover{
        cursor: pointer;
    }
`

const Text3 = styled.div`
    width: 170px;
    height: 35px;
    font-size: 28px;
    font-weight: 700;
    margin-top: 40px;
    margin-left: 267px;
`

const ResumeContainer = styled.div`
    width: 920px;
    height: 370px;
    display: flex;
    margin-top: 10px;
    margin-left: 267px;
`

const Text4 = styled.div`
    width: 90px;
    height: 20px;
    margin-top: 10px;
    font-size: 16px;
    font-weight: 500;
    color: #bababa;
`

const ResumePreview = styled.div`
    width: 249px;
    height: 345px;
    margin-top: 5px;
    border-radius: 4px;
    background-color: #FFF;
    border: 2px solid #fff;
    box-shadow: 4px 2px 8px rgba(0, 0, 0, 0.3);

    &:hover{
        border: 2px solid black
    }
`
const MyInterviewContainer = styled.div`
    width: 920px;
    height: 260px;
    display: flex;
    margin-left: 267px;
    margin-top: 10px;
`
const MyInterview = styled.div`
    width: 365px;
    height: 260px;
    border-radius: 20px;
    background: linear-gradient(298deg, rgba(255, 255, 255, 0.50) 7.5%, rgba(240, 239, 239, 0.15) 92.74%);
    box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
    backdrop-filter: blur(30px);
    border: 2px solid #fff;

    &:hover{
        border: 2px solid black
    }
`

interface ResumeProps{
    date : string
}

const Resume = ({date} : ResumeProps) => {
    return (
        <div style={{display : 'flex', flexDirection : 'column', marginRight: '14px'}}>
            <Text4>{date}</Text4>
            <ResumePreview></ResumePreview>
        </div>
    )
}

function Mypage(){
    const [name,setName] = useState('홍길동(hongildong)')

    return(
        <Container>
            <Text1>마이페이지</Text1>
            <Text2>{name}님의 마이페이지 입니다.</Text2>
            <ProfileContainer>
                <ProfileImage/>
                <BlackLine/>
                <ProfileInfo>
                    <div>
                        <InputTitle>이름: </InputTitle>
                        <Input placeholder='이름을 입력해주세요.'></Input>
                    </div>
                    <div>
                        <InputTitle>이메일: </InputTitle>
                        <Input placeholder='이메일을 입력해주세요.'></Input>
                    </div>
                    <div>
                        <InputTitle>번호: </InputTitle>
                        <Input placeholder='번호를 입력해주세요.'></Input>
                    </div>
                    <div>
                        <InputTitle>희망직종: </InputTitle>
                        <Input placeholder='희망직종을 입력해주세요.(프론트/백/풀스택)'></Input>
                    </div>
                    <div>
                        <InputTitle>내가 지원한 회사 </InputTitle>
                        <Input placeholder=''></Input>
                    </div>
                </ProfileInfo>
                    <RegisterButton><button>등록</button></RegisterButton>
            </ProfileContainer>
            <GithubOverview/>
            <Text3>내 이력서 보기</Text3>
            <ResumeContainer>
                <Resume date='2024.01.03'></Resume>
                <Resume date='2024.02.04'></Resume>
            </ResumeContainer>
            <Text3>나의 면접</Text3>
            <MyInterviewContainer>
                <MyInterview/>
            </MyInterviewContainer>
        </Container>
    )
}

export default Mypage