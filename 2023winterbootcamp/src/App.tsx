import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { RecoilRoot } from "recoil";
import Layout from "./components/Layout";
import Main from "./Mainpage";
import Mypage from "./Mypage";
import Choose from "./Choosepage";
import Interview from "./Interviewpage";
import Footer from "./components/Footer";
import Resultpage from "./Resultpage";
import Endpage from "./Endpage";

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
            <Route path="/end/:id" element={<Endpage interview_name="삼성전자 2022 하반기 3급"/>} />
            <Route path="/result/:id" element={<Resultpage />} />
          </Routes>
          <Footer />
        </Layout>
      </Router>
    </RecoilRoot>
  );
}

export default App;
