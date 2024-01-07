import React, {useState} from 'react';
import {useNavigate } from 'react-router-dom';
import axios from 'axios'; 

interface Signup_Types{
  userId : string,  
  password : string, 
  cert_pw : string,
}

function SignUp<Signup_Types>(){
 const navigate = useNavigate(); 
 const URL = process.env.REACT_APP_SERVER_URL;
 
 const[checked_id, setId]= useState(false); //ID 중복체크

 const[Info, setInfo] = useState({
    userId : "", 
    password :"" ,
    cert_pw : "",
  });

  const {userId, password, cert_pw} = Info;

  //changeEvent. 
  const onChange = (e:React.ChangeEvent<HTMLInputElement>)=>{
    const { name, value }  = e.target;

   setInfo({
    ...Info, 
    [name] : value
   })

  }

  //회원가입 전송 
  const submit = async()=>{

    if(checked_id === true && password === cert_pw){
      const response = await axios.post(`${URL}/user`, Info)
      if(response.data === `created`){
        sessionStorage.setItem('userId', userId); 
        navigate("/");
      }
    }else{
      if(checked_id === false){
        alert('아이디 중복체크를 확인하세요!')
      }else{
        alert('패스워드가 일치하지 않습니다.')
      }
    }
   
  }

   //ID 중복체크 
   const checkID = async()=>{
    const res_id = await axios.get(`${URL}/user/${userId}`)
    //console.log(res_id.data)
    if(res_id.data === 'existed' ){
      alert('이미 존재하는 ID 입니다.');
    }else if(res_id.data === 'available'){
      setId(true);
      alert('사용가능한 ID 입니다.');
    }
  }

    return (
      <div className="Sign_up">

      <h2>유저등록</h2> 

       <p>편리한 사용을 위해 등록하세요!</p>
     
        <table style={{border : "1"}}>
          <tr>
            <td>아이디(ID)</td>
            <td><input type='text' name='userId' onChange ={onChange} value={userId}/>
            <button onClick={checkID}>중복체크</button>
            </td>
          </tr>
          <tr>
            <td>password</td>
            <td><input name='password' type='password' onChange ={onChange} value={password}/></td>
          </tr>
          <tr>
            <td>password</td>
            <td><input name='cert_pw' type='password'  onChange ={onChange} value={cert_pw}/>
            <span>(재입력)</span>
            </td>
          </tr>
        </table>
        
        <button onClick={submit}>유저 등록</button>
       
      </div>
    );
  }
  
  export default SignUp;