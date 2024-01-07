import React ,{useState} from 'react';
import {useNavigate } from 'react-router-dom';
import axios from 'axios'; 

interface user_login{
  userId : string, 
  password :string, 
}

function Login<user_login>(){
  const URL = process.env.REACT_APP_SERVER_URL;
  const navigate = useNavigate(); 
  
  const[user, setInfo] = useState({
    userId : "", 
    password : "" ,
  });

  const {userId, password} = user;


 //onChange
  const onChange = (e:React.ChangeEvent<HTMLInputElement>)=>{
    const { name, value }  = e.target;

   setInfo({
    ...user, 
    [name] : value
   })

  }

  //로그인 
  const Login = async()=>{
    const response = await axios.post(
      `${URL}/login`, user, {withCredentials: true })
    if(response.data === 'success'){
      sessionStorage.setItem('userId', userId); 
      navigate("/");
    }else{
      alert('로그인실패');
      navigate(0); 
    }
  }


  //회원탈퇴
  const User_del = async() =>{

    if(userId !=="" && user.password !== ""){

      if(window.confirm('정말로 탈퇴하시겠습니까?')){
        const response = await axios.post(
          `${URL}/user/delete`, user, {withCredentials: true })
        if(response.data === 'success'){
          alert('회원탈퇴가 완료되었습니다.')
          navigate("/");
        }else{
          alert('정보가 맞지 않습니다. 다시입력하세요.');
          navigate(0);
        }
      }
    }else{
      alert('탈퇴를 원하시면 ID/PW 정보를 입력하세요.');
    }
  }

   
    return (
    <div className="App_Login">

      <h2>로그인</h2> 

      <table style={{border : "1"}}>
        <tr>
          <td>아이디(ID)</td>
          <td><input name='userId' onChange ={onChange} value={userId} maxLength={6} autoFocus/>
          </td>
        </tr>
        <tr>
          <td>password</td>
          <td><input name='password' type='password' onChange ={onChange} value={password}/></td>
        </tr>
      </table>
      
      <button onClick={Login}>로그인</button>
      <button onClick={User_del}>회원탈퇴</button>

    </div>
       
     
    );
  }
  
  export default Login;