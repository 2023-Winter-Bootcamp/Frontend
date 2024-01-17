import { atom } from "recoil";

export const interviewTypeState = atom({
  key: "interviewTypeState",
  default: {
    showCamera: true,
  },
});
