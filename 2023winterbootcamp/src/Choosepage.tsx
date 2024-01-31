import React, { useEffect, useState, Suspense } from "react";
import styled, { createGlobalStyle, css } from "styled-components";
import { useNavigate } from "react-router-dom";
import api from "./baseURL/baseURL";
import LoadingModal from "./components/LoadingModal";
import {
  ResumeType,
  currentQuestionState,
  githubLoginInfoState,
  interviewHeaderPoint,
  interviewTitleState,
  repoListState,
  resumeListState,
  totalQuestionCountState,
} from "./Recoil";
import {
  useRecoilState,
  useRecoilValue,
  useSetRecoilState,
  useResetRecoilState,
} from "recoil";
import { interviewTypeState } from "./Recoil";

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
  }
`;

const All = styled.div`
  margin-top: 40px;
`;

const Container = styled.div`
  user-select: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 40px;
  //margin-top: 40px;
`;

const TextWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-start;
  user-select: none;
`;

const Input = styled.input`
  width: 41.5%;
  height: 35px;
  user-select: none;
  border-bottom: 1px solid #1a1a1a;
  border-top: 1px solid #ffffff;
  border-left: 1px solid #ffffff;
  border-right: 1px solid #ffffff;
  outline: none;
  margin-top: 4px;

  &:focus {
    border: 1px solid #dadada;
    height: 35px;
  }

  @media screen and (max-width: 768px) {
    width: 68%;

    &::placeholder {
      color: #c1c1c1;
    }
  }

  @media screen and (min-width: 769px) and (max-width: 1023px) {
    width: 51%;
    margin-left: 9%;

    &::placeholder {
      color: #c1c1c1;
    }
  }

  @media screen and (min-width: 1024px) {
    &::placeholder {
      color: #c1c1c1;
    }
  }
`;

const Container1 = styled.div`
  user-select: none;
  @media screen and (max-width: 768px) {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 20px;
  }

  @media screen and (min-width: 769px) and (max-width: 1023px) {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 20px;
  }

  @media screen and (min-width: 1024px) {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 20px;
  }
`;

const TextWrapper1 = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-start;
`;

const Text1 = styled.div`
  font-size: 24px;
  font-weight: 700;
  margin-top: 40px;
  margin-left: 28.9%;
  user-select: none;
  @media screen and (max-width: 769px) {
    margin-left: 15%;
  }

  @media screen and (min-width: 769px) and (max-width: 1023px) {
    margin-left: 28.5%;
  }

  @media screen and (min-width: 1024px) {
  }
`;

const ButtonsContainer = styled.div`
  width: 42.5%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 10px;
  user-select: none;
  @media screen and (max-width: 768px) {
    width: 71%;
  }

  @media screen and (min-width: 769px) and (max-width: 1023px) {
    width: 52%;
    margin-left: 9%;
  }

  @media screen and (min-width: 1024px) {
  }
`;

const Button = styled.button<{ $isSelected: boolean }>`
  font-size: 14px;
  width: 300px;
  height: 54px;
  background-color: ${(props) => (props.$isSelected ? "#1a1a1a" : "white")};
  color: ${(props) => (props.$isSelected ? "white" : "#1a1a1a")};
  border: 1px solid white;
  border-bottom: 1px solid #1a1a1a;
  margin: 0 5px;
  cursor: pointer;

  &:hover {
    border: 1px solid #1a1a1a;
  }
`;

const Container2 = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 40px;
  margin-top: 20px;
`;

const Container3 = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 40px;
  margin-top: 20px;
`;

const Container4 = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  @media screen and (max-width: 768px) {
  }

  @media screen and (min-width: 769px) and (max-width: 1023px) {
  }

  @media screen and (min-width: 1024px) {
  }
`;

const ResumeContainer = styled.div`
  display: flex;
  justify-content: space-between;

  margin: 0 auto;
  overflow-x: auto;
  @media screen and (max-width: 769px) {
    margin-left: 15%;
    width: 70%;
  }

  @media screen and (min-width: 769px) and (max-width: 1023px) {
    margin-left: 29%;
    width: 50%;
  }

  @media screen and (min-width: 1024px) {
    margin-left: 28.87%;
    width: 42%;
  }
`;

const ScrollContainer = styled.div<{ $len: number }>`
  width: ${(props) => props.$len * 500}px;
  height: 100%;
  flex: 1;
  display: flex;
`;

const BlackBox = styled.div`
  width: 100%;
  height: 0;
  background-color: black;
  opacity: 0.6;
  position: absolute;
`;

const Text6 = styled.div`
  font-weight: 400;
  font-size: 16px;
  text-align: left;
  color: white;
  opacity: 0;
  position: relative;
  z-index: 2;

  &:hover {
    opacity: 1;
    z-index: 1;
  }
`;

const Text3 = styled.div`
  text-align: center;
  color: white;
  font-size: 16px;
  height: auto;
  opacity: 0;
  position: relative;
  z-index: 2;

  &:hover {
    opacity: 1;
    z-index: 1;
  }
`;

const BoldText = styled.span`
  /* Existing styles */
  opacity: 0;
  transition:
    opacity 0.3s,
    transform 0.3s;
  font-weight: bold;
`;

type ResumeBoxType = {
  $pre_image_url: string;
  $isSelected: boolean;
  $isResumeSelected: boolean;
};

const ResumeBox = styled.div<ResumeBoxType>`
  position: relative;
  width: 249px;
  height: 345px;
  background-image: url(${(props) => props.$pre_image_url});
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-right: 5px;
  box-shadow: 4px 2px 8px rgba(0, 0, 0, 0.3);
  margin-left: 5px;
  border-radius: 4px;
  margin-bottom: 20px;
  margin-top: 20px;
  cursor: pointer;
  border: ${(props) =>
    props.$isSelected ? "2px solid black" : "2px solid #ffffff"};
  overflow: hidden;
  transition:
    filter 0.3s,
    opacity 0.3s;

  &:hover {
    border: 2px solid #000000;
    background-color: rgba(0, 0, 0, 0.5);
    border-radius: 6px;
    filter: none;
    opacity: 1;

    ${BlackBox} {
      height: 100%;
      opacity: 0.6;
    }
    ${Text6}, ${Text3}, ${BoldText} {
      opacity: 1;
      transform: translateY(0);
    }
  }

  &:hover::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.2);
    border-radius: 4px;
  }

  ${(props) =>
    !props.$isSelected &&
    props.$isResumeSelected &&
    css`
      filter: blur(1px);
      opacity: 0.6;
    `};

  @media screen and (max-width: 769px) {
    width: 210px;
    height: 310px;
  }

  @media screen and (min-width: 769px) and (max-width: 1023px) {
    width: 229px;
    height: 325px;
  }

  @media screen and (min-width: 1024px) {
    width: 249px;
    height: 345px;
  }
`;

const TextWrapper2 = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-start;
  height: 60px;
  margin-top: 20px;
`;

// const Text2 = styled.div`
//   font-size: 28px;
//   font-weight: bold;
//   margin-top: 40px;
//   margin-left: 29%;
// `;

const Text33 = styled.div`
  color: gray;
  font-size: 14px;
  margin-top: 50px;
  margin-left: 10px;
  user-select: none;
`;

const RepoContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 620px;
  margin: 0 auto;
  margin-bottom: 80px;
  flex-wrap: wrap;
  gap: 20px 2%;
  user-select: none;
  margin-top: 20px;
  @media screen and (max-width: 769px) {
    margin-left: 15.3%;
    width: 70%;
  }

  @media screen and (min-width: 769px) and (max-width: 1023px) {
    margin-left: 29%;
    width: 50%;
  }

  @media screen and (min-width: 1024px) {
    margin-left: 29%;
    width: 42%;
  }
`;

const Circle = styled.div`
  width: 12px;
  height: 11px;
  border-radius: 50%;

  @media screen and (max-width: 769px) {
    //background-color: white;
  }

  @media screen and (min-width: 769px) and (max-width: 1023px) {
  }

  @media screen and (min-width: 1024px) {
  }
`;

interface RepoProps extends React.HTMLAttributes<HTMLDivElement> {
  $isSelected: boolean;
  language?: string;
}

const Repo = styled.div<RepoProps>`
  width: 299px;
  height: 100px;
  background-color: white;
  border-radius: 8px;
  border: ${(props) =>
    props.$isSelected ? "2px solid black" : "2px solid #e7e7e7"};
  cursor: pointer;

  &:hover {
    background-color: #e9e9e9;
  }

  ${Circle} {
    background-color: ${(props) => getLanguageColor(props.language)};
  }

  @media screen and (max-width: 769px) {
    width: 47.4%;
    height: 60px;
  }

  @media screen and (min-width: 769px) and (max-width: 1023px) {
    width: 47.5%;
    height: 70px;
  }

  @media screen and (min-width: 1024px) {
    width: 48.2%;
    height: 100px;
  }
`;

const getLanguageColor = (language: any) => {
  switch (language) {
    case "JavaScript":
      return "#f1e05a";
    case "Python":
      return "#3572A5";
    case "HTML":
      return "#e34c26";
    case "Java":
      return "#b07219";
    case "C#":
      return "#178600";
    case "TypeScript":
      return "#2b7489";
    case "Ruby":
      return "#701516";
    case "Go":
      return "#00ADD8";
    case "Swift":
      return "#ffac45";
    case "Kotlin":
      return "#F18E33";
    case "C++":
      return "#f34b7d";
    case "Rust":
      return "#dea584";
    case "PHP":
      return "#4F5D95";
    case "Objective-C":
      return "#438eff";
    case "Scala":
      return "#c22d40";
    case "mercury":
      return "#abcdef";
    case "typescript":
      return "#31859c";
    case "purebasic":
      return "#5a6986";
    case "objective-c++":
      return "#4886FC";
    case "self":
      return "#0579aa";
    case "edn":
      return "#db5855";
    case "newlisp":
      return "#eedd66";
    case "rebol":
      return "#358a5b";
    case "frege":
      return "#00cafe";
    case "dart":
      return "#98BAD6";
    case "aspectj":
      return "#1957b0";
    case "shell":
      return "#89e051";
    case "web ontology language":
      return "#3994bc";
    case "xbase":
      return "#3a4040";
    case "eiffel":
      return "#946d57";
    case "nix":
      return "#7070ff";
    case "supercollider":
      return "#46390b";
    case "mtml":
      return "#0095d9";
    case "racket":
      return "#ae17ff";
    case "elixir":
      return "#6e4a7e";
    case "sas":
      return "#1E90FF";
    case "agda":
      return "#467C91";
    case "d":
      return "#fcd46d";
    case "opal":
      return "#f7ede0";
    case "standard ml":
      return "#dc566d";
    case "objective-c":
      return "#438eff";
    case "coldfusion cfc":
      return "#ed2cd6";
    case "oz":
      return "#fcaf3e";
    case "mirah":
      return "#c7a938";
    case "objective-j":
      return "#ff0c5a";
    case "gosu":
      return "#82937f";
    case "ruby":
      return "#701516";
    case "component pascal":
      return "#b0ce4e";
    case "arc":
      return "#ca2afe";
    case "systemverilog":
      return "#343761";
    case "apl":
      return "#8a0707";
    case "go":
      return "#375eab";
    case "visual basic":
      return "#945db7";
    case "php":
      return "#4F5D95";
    case "cirru":
      return "#aaaaff";
    case "sqf":
      return "#FFCB1F";
    case "glyph":
      return "#e4cc98";
    case "java":
      return "#b07219";
    case "scala":
      return "#7dd3b0";
    case "coldfusion":
      return "#ed2cd6";
    case "perl":
      return "#0298c3";
    case "elm":
      return "#60B5CC";
    case "lua":
      return "#fa1fa1";
    case "verilog":
      return "#848bf3";
    case "factor":
      return "#636746";
    case "haxe":
      return "#f7941e";
    case "pure data":
      return "#91de79";
    case "forth":
      return "#341708";
    case "red":
      return "#ee0000";
    case "hy":
      return "#7891b1";
    case "volt":
      return "#0098db";
    case "lsl":
      return "#3d9970";
    case "coffeescript":
      return "#244776";
    case "html":
      return "#e44b23";
    case "unrealscript":
      return "#a54c4d";
    case "swift":
      return "#ffac45";
    case "c":
      return "#555";
    case "autohotkey":
      return "#6594b9";
    case "isabelle":
      return "#fdcd00";
    case "boo":
      return "#d4bec1";
    case "autoit":
      return "#36699B";
    case "clojure":
      return "#db5855";
    case "rust":
      return "#dea584";
    case "prolog":
      return "#74283c";
    case "sourcepawn":
      return "#f69e1d";
    case "antlr":
      return "#9DC3FF";
    case "harbour":
      return "#0e60e3";
    case "tcl":
      return "#e4cc98";
    case "blitzmax":
      return "#cd6400";
    case "piglatin":
      return "#fcd7de";
    case "lasso":
      return "#2584c3";
    case "ecl":
      return "#8a1267";
    case "vhdl":
      return "#543978";
    case "arduino":
      return "#bd79d1";
    case "propeller spin":
      return "#2b446d";
    case "idl":
      return "#e3592c";
    case "ats":
      return "#1ac620";
    case "ada":
      return "#02f88c";
    case "nu":
      return "#c9df40";
    case "lfe":
      return "#004200";
    case "raml":
      return "#77d9fb";
    case "oxygene":
      return "#5a63a3";
    case "asp":
      return "#6a40fd";
    case "assembly":
      return "#6E4C13";
    case "gnuplot":
      return "#f0a9f0";
    case "turing":
      return "#45f715";
    case "vala":
      return "#ee7d06";
    case "processing":
      return "#2779ab";
    case "flux":
      return "#33CCFF";
    case "netlogo":
      return "#ff2b2b";
    case "c sharp":
      return "#178600";
    case "css":
      return "#563d7c";
    case "livescript":
      return "#499886";
    case "qml":
      return "#44a51c";
    case "pike":
      return "#066ab2";
    case "lolcode":
      return "#cc9900";
    case "ooc":
      return "#b0b77e";
    case "mask":
      return "#f97732";
    case "emberscript":
      return "#f64e3e";
    case "tex":
      return "#3D6117";
    case "nemerle":
      return "#0d3c6e";
    case "krl":
      return "#f5c800";
    case "unified parallel c":
      return "#755223";
    case "golo":
      return "#f6a51f";
    case "perl6":
      return "#0298c3";
    case "fancy":
      return "#7b9db4";
    case "ocaml":
      return "#3be133";
    case "wisp":
      return "#7582D1";
    case "pascal":
      return "#b0ce4e";
    case "f#":
      return "#b845fc";
    case "puppet":
      return "#cc5555";
    case "actionscript":
      return "#e3491a";
    case "ragel in ruby host":
      return "#ff9c2e";
    case "fantom":
      return "#dbded5";
    case "zephir":
      return "#118f9e";
    case "smalltalk":
      return "#596706";
    case "dm":
      return "#075ff1";
    case "ioke":
      return "#078193";
    case "pogoscript":
      return "#d80074";
    case "emacs lisp":
      return "#c065db";
    case "javascript":
      return "#f1e05a";
    case "viml":
      return "#199c4b";
    case "matlab":
      return "#bb92ac";
    case "slash":
      return "#007eff";
    case "r":
      return "#198ce7";
    case "erlang":
      return "#0faf8d";
    case "pan":
      return "#cc0000";
    case "lookml":
      return "#652B81";
    case "eagle":
      return "#3994bc";
    case "scheme":
      return "#1e4aec";
    case "pawn":
      return "#dbb284";
    case "python":
      return "#3581ba";
    case "max":
      return "#ce279c";
    case "common lisp":
      return "#3fb68b";
    case "latte":
      return "#A8FF97";
    case "xquery":
      return "#2700e2";
    case "omgrofl":
      return "#cabbff";
    case "nimrod":
      return "#37775b";
    case "nit":
      return "#0d8921";
    case "chapel":
      return "#8dc63f";
    case "groovy":
      return "#e69f56";
    case "dylan":
      return "#3ebc27";
    case "e":
      return "#ccce35";
    case "parrot":
      return "#f3ca0a";
    case "grammatical framework":
      return "#ff0000";
    case "game maker language":
      return "#8ad353";
    case "vcl":
      return "#0298c3";
    case "papyrus":
      return "#6600cc";
    case "fortran":
      return "#4d41b1";
    case "clean":
      return "#3a81ad";
    case "alloy":
      return "#cc5c24";
    case "ags script":
      return "#B9D9FF";
    case "slim":
      return "#ff8877";
    case "purescript":
      return "#bcdc53";
    case "julia":
      return "#a270ba";
    case "haskell":
      return "#29b544";
    case "io":
      return "#a9188d";
    case "rouge":
      return "#cc0088";
    case "cpp":
      return "#f34b7d";
    case "shen":
      return "#120F14";
    case "dogescript":
      return "#cca760";
    case "nesc":
      return "#ffce3b";
    case "other":
      return "#ededed";
    default:
      return "#6a6a6a";
  }
};

const Reponame = styled.div`
  width: 80%;
  color: #474747;
  font-weight: 500;
  overflow-wrap: normal;
  overflow: hidden;
  text-overflow: ellipsis;
  &:hover {
    background-color: #e9e9e9;
  }
  @media screen and (max-width: 769px) {
    margin-top: 8px;
    margin-left: 12px;
    font-size: 14px;
  }

  @media screen and (min-width: 769px) and (max-width: 1023px) {
    margin-top: 10px;
    margin-left: 15px;
    font-size: 16px;
  }

  @media screen and (min-width: 1024px) {
    margin-top: 15px;
    margin-left: 20px;
    font-size: 18px;
  }
`;

const Start = styled.button<{ $startClicked: boolean }>`
  background-color: ${(props) => (props.$startClicked ? "#1a1a1a" : "#cacaca")};
  color: #fff;
  font-weight: bold;
  font-size: 14px;
  width: 200px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px 20px;
  margin-bottom: 100px;
  border: none;
  user-select: none;
  cursor: pointer;
  ${(props) =>
    props.$startClicked &&
    css`
      &:hover {
        background-color: "#1a1a1a";
      }
    `}
  @media screen and (max-width: 769px) {
    margin-left: 60%;
  }

  @media screen and (min-width: 769px) and (max-width: 1023px) {
    margin-left: 70%;
  }

  @media screen and (min-width: 1024px) {
    margin-left: 73%;
  }
`;

const DropdownContainer = styled.div`
  width: 70%;
  display: flex;
  align-items: center;
  flex-direction: row;
  margin-bottom: 10px;
  margin-top: -10px;
  user-select: none;
  @media screen and (max-width: 769px) {
    margin-left: 15%;
  }

  @media screen and (min-width: 769px) and (max-width: 1023px) {
    margin-left: 29%;
  }

  @media screen and (min-width: 1024px) {
    margin-left: 29.2%;
  }
`;

const DropdownWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  @media screen and (max-width: 769px) {
    width: 35%;
  }

  @media screen and (min-width: 769px) and (max-width: 1023px) {
    width: 24.7%;
  }

  @media screen and (min-width: 1024px) {
    width: 20.2%;
  }
`;

const DropdownLabel = styled.div`
  font-size: 14px;
  margin-top: 40px;
  color: #4e4e4e;
  margin-bottom: 4px;
  font-weight: 500;
  @media screen and (max-width: 769px) {
  }

  @media screen and (min-width: 769px) and (max-width: 1023px) {
  }

  @media screen and (min-width: 1024px) {
  }
`;

const DropdownSelect1 = styled.select`
  width: 190px;
  height: 38px;
  border-radius: 4px;
  border: 1px solid #ccc;
  @media screen and (max-width: 769px) {
    width: 98%;
  }

  @media screen and (min-width: 769px) and (max-width: 1023px) {
    width: 95.5%;
  }

  @media screen and (min-width: 1024px) {
    width: 93%;
  }
`;

const DropdownSelect2 = styled.select`
  width: 190px;
  height: 38px;
  border-radius: 4px;
  border: 1px solid #ccc;
  @media screen and (max-width: 769px) {
    width: 96%;
    margin-left: 3%;
  }

  @media screen and (min-width: 769px) and (max-width: 1023px) {
    width: 94.5%;
  }

  @media screen and (min-width: 1024px) {
    width: 94%;
  }
`;

const DropdownSelect3 = styled.select`
  width: 190px;
  height: 38px;
  border-radius: 4px;
  border: 1px solid #ccc;
  @media screen and (max-width: 769px) {
    width: 97%;
    margin-left: 4%;
  }

  @media screen and (min-width: 769px) and (max-width: 1023px) {
    width: 95%;
  }

  @media screen and (min-width: 1024px) {
    width: 94%;
  }
`;

const DropText = styled.div`
  font-size: 14px;
  color: gray;
  margin-bottom: 40px;
  user-select: none;
  text-align: right;
  @media screen and (max-width: 769px) {
    margin-right: 15%;
  }

  @media screen and (min-width: 769px) and (max-width: 1023px) {
    margin-right: 20%;
  }

  @media screen and (min-width: 1024px) {
    margin-right: 29%;
  }
`;

const LanguageWrapper = styled.div`
  width: 80%;
  height: 30px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-left: 20px;
  @media screen and (max-width: 769px) {
    margin-top: 5px;
  }

  @media screen and (min-width: 769px) and (max-width: 1023px) {
    margin-top: 9px;
  }

  @media screen and (min-width: 1024px) {
    margin-top: 26px;
  }
`;

const Language = styled.div`
  width: 100%;
  height: 20px;
  font-weight: 500;
  color: #6a6a6a;
  font-size: 14px;
  margin-left: 5px;
  @media screen and (max-width: 769px) {
    //color: white;
    margin-top: 7px;
    font-size: 10px;
  }

  @media screen and (min-width: 769px) and (max-width: 1023px) {
    margin-top: 5px;
    font-size: 12px;
  }

  @media screen and (min-width: 1024px) {
    font-size: 14px;
  }
`;

interface Resume {
  id: number;
  pre_image_url: string;
  created_at: string;
}

function Choose() {
  const [selectedMultiButtons, setSelectedMultiButtons] = useState<string[]>(
    []
  );
  const [selectedPosition, setSelectedPosition] = useState<string | null>(null);
  const [selectedInterviewType, setSelectedInterviewType] = useState<
    string | null
  >(null);
  const [startClicked, setStartClicked] = useState(false);
  const [selectedResume, setSelectedResume] = useState<number | null>(null);
  const [selectedRepos, setSelectedRepos] = useState<string[]>([]);
  const githubLoginInfo = useRecoilValue(githubLoginInfoState);
  const [title, setTitle] = useState<string>("");
  const [interviewType, setInterviewType] = useRecoilState(interviewTypeState);
  const [, setShowVideoComponent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const repoList = useRecoilValue(repoListState);
  const [resumeList, setResumeList] =
    useRecoilState<ResumeType[]>(resumeListState);
  const navigate = useNavigate();
  const setInterviewTitle = useSetRecoilState(interviewTitleState);
  const [isCameraPossible, setIsCameraPossible] = useState(false);

  // question_type 관련 state
  const [projectCount, setProjectCount] = useState(0);
  const [csCount, setCsCount] = useState(0);
  const [personalityCount, setPersonalityCount] = useState(0);
  const [questionState, setQuestionState] =
    useRecoilState(currentQuestionState);
  const [, setTotalQuestionCountState] = useRecoilState(
    totalQuestionCountState
  );
  const resetCurrentQuestion = useResetRecoilState(currentQuestionState);
  const setInterviewHeaderPoint = useSetRecoilState(interviewHeaderPoint);

  // question_type 관련 함수
  const handleProjectCountChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setProjectCount(parseInt(e.target.value));
  };
  const handleCsCountChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCsCount(parseInt(e.target.value));
  };
  const handlePersonalityCountChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setPersonalityCount(parseInt(e.target.value));
  };

  // question_type의 count에 따라 currentType 업데이트하는 함수
  const updateSelectedQuestionCounts = () => {
    setQuestionState((prevState) => {
      let newCurrentType = prevState.currentType;
      if (projectCount === 0 && csCount > 0) {
        newCurrentType = "cs";
      } else if (projectCount === 0 && csCount === 0 && personalityCount > 0) {
        newCurrentType = "personality";
      }
      return {
        ...prevState,
        currentType: newCurrentType,
        counts: {
          project: projectCount,
          cs: csCount,
          personality: personalityCount,
        },
      };
    });
  };

  // question_type의 count가 바뀔때마다 실행
  useEffect(() => {
    updateSelectedQuestionCounts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [projectCount, csCount, personalityCount]);

  // 모든 칸이 입력돼야 면접을 시작할 수 있음
  useEffect(() => {
    let isAllSelected =
      Boolean(projectCount || csCount || personalityCount) &&
      selectedPosition !== null &&
      selectedInterviewType !== null &&
      selectedResume !== null &&
      selectedRepos.length > 0 &&
      title !== "";

    if (interviewType.showCamera === true && !isCameraPossible)
      isAllSelected = false;
    setStartClicked(isAllSelected);
  }, [
    selectedMultiButtons,
    selectedPosition,
    selectedInterviewType,
    selectedResume,
    selectedRepos,
    title,
    projectCount,
    csCount,
    personalityCount,
  ]);

  // 면접 제목 Change 이벤트 함수
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTitle = e.target.value;
    // 제목의 최대 길이를 30으로 제한
    if (newTitle.length > 30) {
      setTitle(newTitle.slice(0, 30));
    } else {
      setTitle(newTitle);
    }
  };

  // question_type 중복 선택 클릭 이벤트 함수
  const handleMultiButtonClick = (buttonName: string) => {
    const selectedIndex = selectedMultiButtons.indexOf(buttonName);
    let updatedSelectedButtons: string[];

    if (selectedIndex !== -1) {
      updatedSelectedButtons = selectedMultiButtons.filter(
        (selectedButton) => selectedButton !== buttonName
      );
      // 버튼 클릭 취소 시 count 0으로 초기화
      if (buttonName === "project") setProjectCount(0);
      else if (buttonName === "cs") setCsCount(0);
      else if (buttonName === "personality") setPersonalityCount(0);

      if (selectedIndex === 0) setProjectCount(0);
      else if (selectedIndex === 1) setCsCount(0);
      else if (selectedIndex === 2) setPersonalityCount(0);
    } else {
      updatedSelectedButtons = [...selectedMultiButtons, buttonName];
    }
    setSelectedMultiButtons(updatedSelectedButtons);
  };

  // position 클릭 이벤트 함수
  const handlePositionClick = (buttonName: string) => {
    setSelectedPosition((prevSelected) =>
      prevSelected === buttonName ? null : buttonName
    );
  };

  // interview_type 클릭 이벤트 함수
  const handleInterviewTypeClick = (buttonName: string) => {
    setSelectedInterviewType((prevSelected) =>
      prevSelected === buttonName ? null : buttonName
    );
    if (buttonName === "video") {
      setInterviewType({ showCamera: true });
    } else {
      setInterviewType({ showCamera: false });
    }
  };

  // 이력서 선택 클릭 이벤트 함수
  const handleResumeSelect = (resumeId: number) => {
    // 만약 클릭한 이력서가 이미 선택된 상태라면, 선택 해제
    if (selectedResume === resumeId) {
      setSelectedResume(null);
    } else {
      // 그렇지 않다면, 이력서 선택
      setSelectedResume(resumeId);
    }
  };

  // Repository 선택 클릭 이벤트 함수
  const handleRepoSelect = (repoName: string) => {
    const selectedIndex = selectedRepos.indexOf(repoName);
    let updatedSelectedRepos: string[];

    if (selectedIndex === -1) {
      updatedSelectedRepos = [...selectedRepos, repoName];
    } else {
      updatedSelectedRepos = selectedRepos.filter((name) => name !== repoName);
    }

    setSelectedRepos(updatedSelectedRepos);
  };

  // 선택 완료 버튼 클릭 이벤트 함수 (다른 페이지로 이동)
  const handleStartClick = (id: number) => {
    setStartClicked(true);
    navigate(`/start/${id}`);
    console.log(questionState);
  };

  //화상면접을 위한 카메라가 존재하는 지 여부 확인
  const checkCamera = () => {
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
        console.log(stream);
        if (stream !== null) setIsCameraPossible(true);
        else setIsCameraPossible(false);
      })
      .catch((e) => {
        console.error(e);
      });
  };

  //사용자가 선택사항들을 모두 체크했는지 확인하고 아니면 alert를 한 후 선택 안 한 선택지로 스크롤 이동
  const checkChoices = () => {
    if (title === "") {
      window.scrollTo(0, 0);
      window.alert("면접 제목을 입력해주세요.");
    } else if (!Boolean(projectCount || csCount || personalityCount)) {
      window.scrollTo(0, 0);
      window.alert("면접 종류와 개수를 선택해주세요.");
    } else if (selectedPosition === null) {
      window.scrollTo(0, 230);
      window.alert("Position을 선택해주세요.");
    } else if (selectedInterviewType === null) {
      window.scrollTo(0, 420);
      window.alert("면접 방식을 선택해주세요.");
    } else if (selectedResume === null) {
      window.scrollTo(0, 750);
      window.alert("이력서를 선택해주세요.");
    } else if (selectedRepos.length === 0) {
      window.scrollTo(0, 1100);
      window.alert("Repository를 선택해주세요.");
    } else if (!isCameraPossible) {
      window.scrollTo(0, 420);
      window.alert(
        "화상면접을 위한 카메라가 없습니다.\n음성면접을 사용해주세요."
      );
    }
  };

  // 면접 생성 API 함수
  const createInterview = async () => {
    if (!startClicked) {
      checkChoices();
      return;
    }
    try {
      setIsLoading(true);
      // 전체 질문 개수 update
      const { project, cs, personality } = questionState.counts;
      const total = project + cs + personality;
      setTotalQuestionCountState(total);

      const response = await api.post("interviews/create/", {
        user: githubLoginInfo.id,
        title: title,
        position: selectedPosition,
        style: selectedInterviewType,
        resume: selectedResume,
        repo_names: selectedRepos,
        type_names: selectedMultiButtons,
      });
      handleStartClick(response.data.id);

      // 음성 면접인 경우에만 처리
      if (selectedInterviewType !== "video") {
        setShowVideoComponent(false);
      }
    } catch (e) {
      console.error(e);
    }
    setInterviewTitle(title);
    setIsLoading(false);
  };

  // 이력서 목록 조회 API
  useEffect(() => {
    window.scrollTo(0, 0);
    const getResumes = async () => {
      try {
        const response = await api.get("resumes/", { withCredentials: true });
        const sortedData = response.data.sort((a: Resume, b: Resume) =>
          b.created_at.localeCompare(a.created_at)
        );
        setResumeList(sortedData);
        console.log(response.data);
      } catch (e) {
        console.error(e);
      }
    };

    getResumes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // 드롭다운 메뉴 만드는 Array
  const options = Array.from({ length: 6 }, (_, index) => index);

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
    };

    const containerElement = document.getElementById("choose-container");
    if (startClicked && containerElement) {
      containerElement.style.overflow = "hidden";
      containerElement.addEventListener("wheel", handleWheel, {
        passive: false,
      });
    }

    return () => {
      if (containerElement) {
        containerElement.style.overflow = "auto";
        containerElement.removeEventListener("wheel", handleWheel);
      }
    };
  }, [startClicked]);

  //면접선택 페이지 들어올 때마다 이전에 저장된 전역상태정보 초기화
  useEffect(() => {
    resetCurrentQuestion();
  }, [resetCurrentQuestion]);

  //페이지 첫 렌더링시 사용자가 웹캠을 사용할 수 있는지 확인하는 함수 실행
  useEffect(() => {
    checkCamera();
  }, []);

  //interview 관련 페이지가 렌더링되면 헤더에 강조해서 표현하고 다른 곳으로 이동시 강조 해제
  useEffect(() => {
    setInterviewHeaderPoint(true);
    return () => {
      setInterviewHeaderPoint(false);
    };
  }, []);

  return (
    <>
      <GlobalStyle />
      <Suspense fallback={<div>Loading...</div>}>
        {/* <All> */}
        <Container>
          <TextWrapper>
            <Text1>면접 제목</Text1>
          </TextWrapper>
          <Input placeholder='' maxLength={30} onChange={handleChange}></Input>
        </Container>
        <Container1>
          <TextWrapper1>
            <Text1>면접 종류</Text1>
            <Text33>복수 선택이 가능합니다.</Text33>
          </TextWrapper1>
          <ButtonsContainer>
            <Button
              $isSelected={selectedMultiButtons.includes("project")}
              onClick={() => handleMultiButtonClick("project")}
            >
              프로젝트
            </Button>
            <Button
              $isSelected={selectedMultiButtons.includes("cs")}
              onClick={() => handleMultiButtonClick("cs")}
            >
              CS 질문
            </Button>
            <Button
              $isSelected={selectedMultiButtons.includes("personality")}
              onClick={() => handleMultiButtonClick("personality")}
            >
              인성 면접
            </Button>
          </ButtonsContainer>
        </Container1>
        <DropdownContainer>
          <DropdownWrapper>
            <DropdownLabel>Project Label</DropdownLabel>
            <DropdownSelect1
              value={projectCount}
              disabled={!selectedMultiButtons.includes("project")}
              onChange={handleProjectCountChange}
            >
              {options.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </DropdownSelect1>
          </DropdownWrapper>
          <DropdownWrapper>
            <DropdownLabel>CS Label</DropdownLabel>
            <DropdownSelect2
              value={csCount}
              disabled={!selectedMultiButtons.includes("cs")}
              onChange={handleCsCountChange}
            >
              {options.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </DropdownSelect2>
          </DropdownWrapper>
          <DropdownWrapper>
            <DropdownLabel>Personality Label</DropdownLabel>
            <DropdownSelect3
              value={personalityCount}
              disabled={!selectedMultiButtons.includes("personality")}
              onChange={handlePersonalityCountChange}
            >
              {options.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </DropdownSelect3>
          </DropdownWrapper>
        </DropdownContainer>
        <DropText>*원하는 질문의 개수를 선택해주세요</DropText>
        <Container2>
          <TextWrapper1>
            <Text1>Position</Text1>
          </TextWrapper1>
          <ButtonsContainer>
            <Button
              $isSelected={selectedPosition === "frontend"}
              onClick={() => handlePositionClick("frontend")}
            >
              Frontend
            </Button>
            <Button
              $isSelected={selectedPosition === "backend"}
              onClick={() => handlePositionClick("backend")}
            >
              Backend
            </Button>
            <Button
              $isSelected={selectedPosition === "fullstack"}
              onClick={() => handlePositionClick("fullstack")}
            >
              Fullstack
            </Button>
          </ButtonsContainer>
        </Container2>
        <Container3>
          <TextWrapper1>
            <Text1>면접 방식</Text1>
          </TextWrapper1>
          <ButtonsContainer>
            <Button
              $isSelected={selectedInterviewType === "video"}
              onClick={() => handleInterviewTypeClick("video")}
            >
              화상 면접
            </Button>
            <Button
              $isSelected={selectedInterviewType === "voice"}
              onClick={() => handleInterviewTypeClick("voice")}
            >
              음성 면접
            </Button>
          </ButtonsContainer>
        </Container3>
        <Container4>
          <TextWrapper2>
            <Text1>이력서</Text1>
            {resumeList.length === 0 ? (
              <Text33>등록된 이력서가 없습니다.</Text33>
            ) : null}
          </TextWrapper2>
          <ResumeContainer>
            <ScrollContainer $len={resumeList.length}>
              {resumeList.map((item, idx) => (
                <ResumeBox
                  key={idx}
                  $pre_image_url={item.pre_image_url}
                  $isResumeSelected={selectedResume !== null}
                  $isSelected={selectedResume === item.id}
                  onClick={() => handleResumeSelect(item.id)}
                >
                  <BlackBox />
                  <Text6>{item.title}</Text6>
                  <Text3>
                    <br />
                    {item.created_at.slice(0, 10)}에 등록한
                    <br />
                    이력서 입니다.
                    <br />
                  </Text3>
                </ResumeBox>
              ))}
            </ScrollContainer>
          </ResumeContainer>
        </Container4>
        <Container4>
          <TextWrapper2>
            <Text1>Github repositories</Text1>
            <Text33>복수 선택이 가능합니다.</Text33>
          </TextWrapper2>
          <RepoContainer>
            {repoList.length !== 0 ? (
              repoList.map((repo, idx) => {
                if (repo.language) {
                  return (
                    <Repo
                      key={idx}
                      $isSelected={selectedRepos.includes(repo.repo_name)}
                      onClick={() => handleRepoSelect(repo.repo_name)}
                      language={repo.language}
                    >
                      <Reponame>{repo.repo_name}</Reponame>
                      <LanguageWrapper>
                        <Circle />
                        <Language>{repo.language}</Language>
                      </LanguageWrapper>
                    </Repo>
                  );
                }
              })
            ) : (
              <Repo $isSelected={false}>
                <Reponame>repository가 없습니다.</Reponame>
              </Repo>
            )}
          </RepoContainer>
        </Container4>
        <Start $startClicked={startClicked} onClick={createInterview}>
          선택 완료
        </Start>
        {isLoading ? <LoadingModal /> : null}
        {/* </All> */}
      </Suspense>
    </>
  );
}

export default Choose;
