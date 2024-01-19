import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";
import { useResetRecoilState } from "recoil";
import {
  githubLoginInfoState,
  githubProfileState,
  repoListState,
} from "../Recoil";

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
  height: 30px;
  background-color: transparent;
  width: 100%;
  height: 70px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const Logo = styled(motion(Link))`
  @media screen and (max-width: 768px) {
    font-weight: bold;
    font-size: 28px;
    margin-bottom: 30px;
    margin-left: 100px;
    text-decoration: none;
    color: black;
    position: absolute;
  }
  @media screen and (min-width: 769px) and (max-width: 1023px) {
    font-weight: bold;
    font-size: 28px;
    margin-bottom: 30px;
    margin-left: 200px;
    text-decoration: none;
    color: black;
  }
  @media screen and (min-width: 1024px) {
    font-weight: bold;
    font-size: 28px;
    margin-bottom: 20px;
    margin-left: 267px;
    text-decoration: none;
    color: black;
    margin-top: 4px;
  }
`;

const Navigationbar = styled.div`
  @media screen and (max-width: 768px) {
    display: flex;
    gap: 20px;
    margin-left: 60%;
  }
  @media screen and (min-width: 769px) and (max-width: 1023px) {
    display: flex;
    gap: 20px;
  }
  @media screen and (min-width: 1024px) {
    display: flex;
    gap: 20px;
    margin-right: 200px;
    margin-top: -10px;
  }
`;

const NavItem = styled(Link)`
  cursor: pointer;
  font-size: 14px;
  text-decoration: none;
  color: black;
  position: relative;
  transition: color 0.3s ease-in-out;

  &:hover {
    color: #ff7f50;
  }

  &:before {
    content: "";
    position: absolute;
    width: 100%;
    height: 2px;
    bottom: -2px;
    left: 0;
    background-color: #ff7f50;
    visibility: hidden;
    transform: scaleX(0);
    transition: all 0.3s ease-in-out 0s;
  }

  &:hover:before {
    visibility: visible;
    transform: scaleX(1);
  }
`;

const MotionNavItem = styled(motion(NavItem))`
  cursor: pointer;
  font-size: 14px;
  text-decoration: none;
  color: black;
  position: relative;
  transition: color 0.3s ease-in-out;

  &:hover {
    color: black;
    font-weight: bold;
  }

  &:before {
    content: "";
    position: absolute;
    width: 100%;
    height: 2px;
    bottom: -2px;
    left: 0;
    background-color: black;
    visibility: hidden;
    transform: scaleX(0);
    transition: all 0.3s ease-in-out 0s;
  }

  &:hover:before {
    visibility: visible;
    transform: scaleX(1);
  }
`;

function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/users/status/",
          {
            withCredentials: true,
          }
        );
        if (response.data.status === "logged_in") {
          setIsLoggedIn(true);
        }
      } catch (e) {
        setIsLoggedIn(false);
      }
    };

    checkLoginStatus();
  }, []);

  const handleGithubLogin = () => {
    const GITHUB_LOGIN_URL = `https://github.com/login/oauth/authorize?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}`;
    window.localStorage.setItem("githubLogin", "inProgress");
    window.location.assign(GITHUB_LOGIN_URL);
  };

  const infoReset = useResetRecoilState(githubLoginInfoState);
  const profileReset = useResetRecoilState(githubProfileState);
  const repoListReset = useResetRecoilState(repoListState);

  const resetRecoilWhenLogout = () => {
    infoReset(); // 호출해야 하는 함수로 수정
    profileReset();
    repoListReset();
  };

  const handleLogout = async () => {
    try {
      const response = await axios.get("http://localhost:8000/users/logout/", {
        withCredentials: true,
      });
      console.log(response.status);
      window.location.href = "/";
      setIsLoggedIn(false);
      resetRecoilWhenLogout();
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <HeaderContainer>
      <Logo
        to="/"
        initial={{ opacity: 0, y: -5 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.2 }}
      >
        teamA.
      </Logo>
      <Navigationbar>
        {isLoggedIn ? (
          <>
            <MotionNavItem
              to="/mypage"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.7 }}
            >
              마이페이지
            </MotionNavItem>
            <MotionNavItem
              to="/"
              onClick={handleLogout}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.7 }}
            >
              로그아웃
            </MotionNavItem>
          </>
        ) : (
          <MotionNavItem
            to="/"
            onClick={handleGithubLogin}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.7 }}
          >
            로그인
          </MotionNavItem>
        )}
      </Navigationbar>
    </HeaderContainer>
  );
}

export default Header;
