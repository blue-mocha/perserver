import React  from 'react';
import {Link} from 'react-router-dom';
import { IsLogin, Login_info } from '../utils/IsLogin';
import {useNavigate } from 'react-router-dom';
import axios from 'axios'
 
function Header() {
 const URL = process.env.REACT_APP_SERVER_URL;
 const username = Login_info(); 
 const navigate = useNavigate(); 

 
 //로그아웃 
  const Logout = async()=>{
    const response = await axios.get(`${URL}/login/logout`,{withCredentials: true }); 
    if (response.data == "success"){
      sessionStorage.clear(); 
      navigate("/");
      }
  }

    return (
      <div className="App_header">
   
        <h1>공연전시 + PLUS </h1> 
      
      {IsLogin() === false ?
        (<>
         <Link to="/login"> 로그인</Link>
         <Link to="/signup"> 유저등록</Link>
        </>)
        :
        (<div>
          <button onClick={Logout}>로그아웃</button>
          <span> {username}님, 접속중.</span>
        </div>)
      }

        <span>▶</span>
        <Link to="/search"> Search </Link><span>/</span>
        <Link to="/likes"> 즐겨찾기</Link>
      </div>
    );
  }
  
  export default Header;
  