import React from "react";
import styled from "styled-components";

const HeaderContainer = styled.div`
  background-color: white;
  width: 100%;
  padding: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const Logo = styled.div`
  font-weight: bold;
  font-size: 28px;
  margin-bottom: 30px;
  margin-left: 267px;
`;

const Navigationbar = styled.div`
  display: flex;
  gap: 20px;
  margin-left: 267px;
`;

const NavItem = styled.div`
  cursor: pointer;
  font-size: 14px;
`;

function App() {
  return (
    <HeaderContainer>
      <Logo>teamA.</Logo>
      <Navigationbar>
        <NavItem>마이페이지</NavItem>
        <NavItem>로그인</NavItem>
        <NavItem>이력서</NavItem>
        <NavItem>면접</NavItem>
        <NavItem>깃허브</NavItem>
      </Navigationbar>
    </HeaderContainer>
  );
}

export default App;
