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

export const githubProfileState = atom<githubProfileType>({
  key: "githubProfileState",
  effects_UNSTABLE: [persistAtom],
  default: {
    name: "userName",
    avatar_url: "",
  },
});

// 면접 로직 바뀐 부분
export const selectedQuestionCountsState = atom({
  key: "selectedQuestionCounts",
  default: {
    project: 0,
    cs: 0,
    personality: 0,
  },
});
