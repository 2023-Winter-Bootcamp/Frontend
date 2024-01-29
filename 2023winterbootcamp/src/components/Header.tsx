import React, { useEffect, useState } from "react";
import styled, { css } from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import api from "../baseURL/baseURL";
import { useRecoilState, useRecoilValue, useResetRecoilState } from "recoil";
import {
  ResumeType,
  githubLoginInfoState,
  githubProfileState,
  interviewHeaderPoint,
  mypageHeaderPoint,
  repoListState,
  resumeListState,
} from "../Recoil";
import logo from "../images/logo.png";

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: white;
  width: 100%;
  height: 80px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  user-select: none;
  z-index: 1;
`;

const Logo = styled(motion(Link))`
  font-weight: bold;
  text-decoration: none;
  color: black;
  font-size: 28px;
  background: url(${logo}) no-repeat;
  background-size: contain;
  width: 150px;
  height: 38px;
  align-items: center;
  @media screen and (max-width: 768px) {
    margin-left: 15%;
  }
  @media screen and (min-width: 769px) and (max-width: 1023px) {
    margin-left: 20%;
  }
  @media screen and (min-width: 1024px) {
    margin-left: 18.1%;
  }
`;

const Navigationbar = styled.div`
  align-items: center;
  @media screen and (max-width: 768px) {
    display: flex;
    gap: 20px;
    margin-right: 10%;
  }
  @media screen and (min-width: 769px) and (max-width: 1023px) {
    display: flex;
    gap: 20px;
    margin-right: 14%;
  }
  @media screen and (min-width: 1024px) {
    display: flex;
    gap: 20px;
    margin-right: 20%;
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

const NavButton = styled.button`
  border: none;
  background-color: transparent;
`;

const ActiveBox = styled.div<{ $isActive: boolean }>`
  ${(props) =>
    props.$isActive &&
    css`
      font-weight: 800;
      text-decoration: underline;
      text-underline-position: under;
      text-decoration-thickness: 2px;
    `}
`;

const MotionDiv = styled(motion.div)`
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
interface Resume {
  id: number;
  pre_image_url: string;
  created_at: string;
}

function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [selectedNavItem, setSelectedNavItem] = useState("");

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const response = await api.get("users/status/", {
          withCredentials: true,
        });
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
  const _interviewHeaderPoint = useRecoilValue(interviewHeaderPoint);
  const _mypageHeaderPoint = useRecoilValue(mypageHeaderPoint);
  const [resumeList, setResumeList] =
    useRecoilState<ResumeType[]>(resumeListState);
  const navigate = useNavigate();

  const resetRecoilWhenLogout = () => {
    infoReset(); // 호출해야 하는 함수로 수정
    profileReset();
    repoListReset();
  };

  const handleLogout = async () => {
    try {
      const response = await api.get("users/logout/", {
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

  const handleSelectStart = (event: React.MouseEvent<HTMLDivElement>) => {
    event.preventDefault();
    return false;
  };

  //이력서가 존재하면 면접선택창으로 이동, 없다면 이력서를 조회하고 없다면 등록이 필요하다고 알림
  const goToChoosePage = async () => {
    // 이미 존재하는 이력서가 있으면 바로 면접선택창으로 이동
    if (resumeList.length !== 0) {
      navigate("/choose");
    } //존재하는 이력서가 없다면(초깃값이라면) 이력서 조회 후 분기 
    else {
      const response = await api.get("resumes/", { withCredentials: true });
      if (response.data.length === 0) {
        window.alert("이력서 등록이 필요합니다.");
        return;
      }
      const sortedData = response.data.sort((a: Resume, b: Resume) =>
        b.created_at.localeCompare(a.created_at)
      );
      setResumeList(sortedData);
      navigate("/choose");
    }
  };

  const goToMyPage = () => {
    navigate('/mypage');
  }

  const goToLogout = () => {
    navigate('/');
  }

  return (
    <HeaderContainer onContextMenu={handleSelectStart}>
      <Logo
        to="/"
        initial={{ opacity: 0, y: -5 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.2 }}
      ></Logo>
      <Navigationbar>
        {isLoggedIn ? (
          <>
            <ActiveBox
              $isActive={_interviewHeaderPoint}
              onClick={goToChoosePage}
            >
              <MotionDiv
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.7 }}
              >
                면접보기
              </MotionDiv>
            </ActiveBox>
            <ActiveBox $isActive={_mypageHeaderPoint}>
              <MotionDiv
                onClick={goToMyPage}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.8 }}
              >
                마이페이지
              </MotionDiv>
            </ActiveBox>
            <ActiveBox $isActive={false}>
              <MotionDiv
                onClick={goToLogout}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.9 }}
              >
                로그아웃
              </MotionDiv>
            </ActiveBox>
          </>
        ) : (
          <MotionNavItem
            to="/"
            onClick={handleGithubLogin}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.9 }}
          >
            로그인
          </MotionNavItem>
        )}
      </Navigationbar>
    </HeaderContainer>
  );
}

export default Header;