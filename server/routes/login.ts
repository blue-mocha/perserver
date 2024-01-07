import express from "express";
const router = express.Router();
const passport = require('../config/passport'); 


//로그인 
router.post('/', function(req, res, next) {
                         //passport
  passport.authenticate('local-login', function(err : any, user : any){
 
    if(err) return console.log('local-login : err');
    if(!user) return res.send('failed')
    if(user){
      req.login(user, function(err : any) {// 
        if(err) { return console.log("req.login: err"); } 
        if(user) return res.send('success');
      })
    }
  })(req, res, next); 

}); 
 

//로그아웃  
router.get('/logout', function(req, res){

  req.session.destroy(err=> {
    if(err){
        console.log(err);
    } else {
       res.clearCookie('connect.sid').status(200).send('success');
    }
    }); 

});

module.exports = router;

