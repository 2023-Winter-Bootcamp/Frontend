import React from "react";
import styled from "styled-components";

const FooterContainer = styled.div`
  width: 100%;
  height: 380px;
  padding: 20px;
  background: #1a1a1a;
`;

const TextBox = styled.div`
  width: 252px;
  height: 144px;
  text-align: left;
  margin-left: 267px;
  margin-top: 80px;
  display: inline-block;
`;

const MainText = styled.div`
  color: #fff;
  font-size: 28px;
  font-weight: 700;
  margin-bottom: 20px;
`;

interface SubTextProps {
  margin_bottom: number;
}

const SubText = styled.div<SubTextProps>`
  color: #fff;
  font-size: 12px;
  font-weight: 500;
  margin-bottom: ${(props) => props.margin_bottom || 0}px;
`;

function App() {
  return (
    <FooterContainer>
      <TextBox>
        <MainText>teamA.</MainText>
        <SubText margin_bottom={40}>문의 - 제안 teama@gmail.com</SubText>
        <SubText margin_bottom={5}>2023-Winter-Techeer-SW-Bootcamp</SubText>
        <SubText margin_bottom={0}>
          Copyright 2023.teamA. All rights Reserved
        </SubText>
      </TextBox>
    </FooterContainer>
  );
}

export default App;
