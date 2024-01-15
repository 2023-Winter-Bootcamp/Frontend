import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Main from "./Mainpage";
import Mypage from "./Mypage";
import Choose from "./Choosepage";
import Interview from "./Interviewpage";
import Footer from "./components/Footer";
import Resultpage from "./Resultpage";
import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
} from "recoil";

export type QuestionType = {
  type_name : string;
  content: string;
}
export const questionState = atom<QuestionType[]>({
  key: "questionState", // unique ID (with respect to other atoms/selectors)
  default: [],
});

function App() {
  return (
    <RecoilRoot>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/mypage" element={<Mypage />} />
            <Route path="/choose" element={<Choose />} />
            <Route path="/interview/:id" element={<Interview />} />
            <Route path="/result" element={<Resultpage />} />
          </Routes>
          <Footer />
        </Layout>
      </Router>
    </RecoilRoot>
  );
}

export default App;
