import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Main from "./Mainpage";
import Footer from "./components/Footer";
import Choose from "./Choosepage";

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/choose" element={<Choose />} />
        </Routes>
        <Footer />
      </Layout>
    </Router>
  );
}

export default App;
