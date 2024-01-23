import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

export const interviewTypeState = atom({
  key: "interviewTypeState",
  default: {
    showCamera: true,
  },
});
export type githubLoginInfoType = {
  username: any;
  html_url: string;
  id: number;
  login_id: number;
  repos_url: string;
};
export const githubLoginInfoState = atom<githubLoginInfoType>({
  key: "githubLoginInfoState",
  effects_UNSTABLE: [persistAtom],
  default: {
    username: "userName",
    html_url: "https://github.com/",
    id: -1,
    login_id: -1,
    repos_url: "https://api.github.com/users/userid",
  },
});

export type RepoType = {
  id: number;
  repo_name: string;
};

export const repoListState = atom<RepoType[]>({
  key: "repoListState",
  effects_UNSTABLE: [persistAtom],
  default: [],
});

export type githubProfileType = {
  name: string;
  avatar_url: string;
};

export type QuestionType = "project" | "cs" | "personality";

export type currentQuestionStateType = {
  currentType: string;
  counts: {
    [key in QuestionType]: number;
  };
};

export const githubProfileState = atom<githubProfileType>({
  key: "githubProfileState",
  effects_UNSTABLE: [persistAtom],
  default: {
    name: "userName",
    avatar_url: "",
  },
});

type InterviewQuestion = {
  type_name: string;
  content: string;
};

type InterviewAnswer = {
  content: string;
  record_url: string;
};

export type InterviewResultType = {
  title: string;
  interview_type_names: string[];
  position: string;
  style: string;
  resume: number;
  repo_names: string[];
  questions: InterviewQuestion[];
  answers: InterviewAnswer[];
};

export const interviewResultState = atom<InterviewResultType>({
  key: "interviewResultState",
  default: {
    title: "",
    interview_type_names: [""],
    position: "",
    style: "",
    resume: -1,
    repo_names: [""],
    questions: [],
    answers: [],
  },
  effects_UNSTABLE: [persistAtom],
});

// 현재 question 상태
export const currentQuestionState = atom<currentQuestionStateType>({
  key: "currentQuestionState",
  default: {
    currentType: "project", // 현재 질문 타입
    counts: {
      project: 0,
      cs: 0,
      personality: 0,
    },
  },
});

// 전체 질문 개수
export const totalQuestionCountState = atom({
  key: "totalQuestionCountState",
  default: 0,
});

export type ResumeType = {
  created_at: string;
  id: number;
  pre_image_url: string;
  text_contents: string;
  title: string;
  user_id: string;
};
export const resumeListState = atom<ResumeType[]>({
  key: "resumeListState",
  default: [],
});
