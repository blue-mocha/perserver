import React from 'react';
import {Route,Routes} from 'react-router-dom';
import Header from './pages/Header';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Search from './pages/Search';
import Likes from './pages/Likes';

function App() {

  return (
    <div className="app">
      <Header/>
      
      <div className ="contents" style={{width : '100%'}}>
        <Routes>
            <Route index element={<Search/>}/>
            <Route path="/search" element={<Search/>} />
            <Route path="/signup" element={<SignUp/>} />
            <Route path="/likes" element={<Likes/>} />
            <Route path="/login" element={<Login/>} />
        </Routes>
      </div>
      
    </div>
  );
}

export default App;
