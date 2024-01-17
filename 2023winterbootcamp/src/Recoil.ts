import { atom } from "recoil";
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist();

export const interviewTypeState = atom({
  key: "interviewTypeState",
  default: {
    showCamera: true,
  },
});
export type githubLoginInfoType = {
    html_url: string;
    id: number;
    login_id: number;
    repos_url: string;
}
export const githubLoginInfoState = atom<githubLoginInfoType>({
    key: "githubLoginInfoState",
    effects_UNSTABLE: [persistAtom],
})

export type RepoType = {
  id : number;
  repo_name : string;
}

export const repoListState = atom<RepoType[]>({
  key: "repoListState",
  effects_UNSTABLE: [persistAtom],
})

