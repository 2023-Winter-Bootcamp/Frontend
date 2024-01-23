import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import Layout from './components/Layout';
import Main from './Mainpage';
import Mypage from './Mypage';
import Choose from './Choosepage';
import Interview from './Interviewpage';
import Footer from './components/Footer';
import Resultpage from './Resultpage';
import Endpage from './Endpage';
import Startpage from './Startpage';

function App() {
  return (
    <RecoilRoot>
      <Router>
        <Layout>
          <Routes>
            <Route path='/' element={<Main />} />
            <Route path='/mypage' element={<Mypage />} />
            <Route path='/choose' element={<Choose />} />
            <Route path='/start/:id' element={<Startpage />} />
            <Route path='/interview/:id' element={<Interview />} />
            <Route
              path='/end/:id'
              element={<Endpage />}
            />
            <Route path='/result/:id' element={<Resultpage />} />
          </Routes>
          <Footer />
        </Layout>
      </Router>
    </RecoilRoot>
  );
}

export default App;
