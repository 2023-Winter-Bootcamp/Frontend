import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Main from "./Mainpage";
import Mypage from "./Mypage";
import Choose from "./Choosepage";
import Interview from "./Interviewpage";
import Footer from "./components/Footer";
import Resultpage from "./Resultpage";

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/mypage" element={<Mypage />} />
          <Route path="/choose" element={<Choose />} />
          <Route path="/interview" element={<Interview />} />
          <Route path="/result" element={<Resultpage />} />
        </Routes>
        <Footer />
      </Layout>
    </Router>
  );
}

export default App;
