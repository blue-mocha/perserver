

 //로그인 여부 
export function IsLogin(){
    if(sessionStorage.getItem('userId')){
      return true; 
    }else{
      return false; 
    }
  }
  

 //유저(id)가져오기 
export function Login_info() {
    if(sessionStorage.getItem('userId')){
      return sessionStorage.userId;
     }
  }
  
  
  