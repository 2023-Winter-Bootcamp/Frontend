import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const HeaderContainer = styled.div`
  background-color: white;
  width: 100%;
  padding: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const Logo = styled(Link)`
  font-weight: bold;
  font-size: 28px;
  margin-bottom: 30px;
  margin-left: 267px;
  text-decoration: none;
  color: black;
`;

const Navigationbar = styled.div`
  display: flex;
  gap: 20px;
  margin-left: 267px;
  margin-top: 30px;
`;

const NavItem = styled(Link)`
  cursor: pointer;
  font-size: 14px;
  text-decoration: none;
  color: black;

  &:hover {
    text-decoration: none;
    color: black;
  }
`;

function App() {
  return (
    <HeaderContainer>
      <Logo to="/">teamA.</Logo>
      <Navigationbar>
        <NavItem to="/mypage">마이페이지</NavItem>
        <NavItem to="/login">로그인</NavItem>
        <NavItem to="/resume">이력서</NavItem>
        <NavItem to="/choose">면접</NavItem>
        <NavItem to="/github">깃허브</NavItem>
      </Navigationbar>
    </HeaderContainer>
  );
}

export default App;
