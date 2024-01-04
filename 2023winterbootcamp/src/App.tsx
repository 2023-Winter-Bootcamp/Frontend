import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Main from "./Mainpage";
import Footer from "./components/Footer";
import Choose from "./Choosepage";
import Interview from "./Interviewpage";
import Mypage from "./Mypage";
import Resultpage from "./Resultpage";

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Resultpage/>} />
          <Route path="/choose" element={<Choose />} />
          <Route path="/interview" element={<Interview />} />
        </Routes>
        <Footer />
      </Layout>
    </Router>
  );
}

export default App;
