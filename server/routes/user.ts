import express from "express";
const router = express.Router();
const AppUser = require('../models/user');


//새 아이디 생성 : 정상작동
router.post('/', function(req, res){
  
    AppUser.create(req.body, function(err : any , user : any){
      if(err) return console.log(err);
      if(user) return res.send('created');
    }); 

});


//중복ID 체크 : 정상작동
router.get('/:userId', (req, res) => {

    AppUser.findOne({userId: req.params.userId})
    .exec(function(err : any, user : any){
      if(err) return console.log(err);
      if (user){
        res.send('existed');
      }else{
        res.send('available'); 
      }
    });

});


//회원탈퇴 
router.post('/delete', function(req, res){

  AppUser.findOne({userId : req.body.userId})
  .select({password:1})
  .exec(function(err : any , user : any) {
    if (err) return console.log(err); 
    if (user && user.authenticate(req.body.password)){ // 정보확인 

      AppUser.deleteOne({userId:req.body.userId}, function(err : any){
        if(err) return console.log(err);
        res.send('success');
      });

    }else{
      return res.send('failed'); //user 없음. 
    }

  })
});


module.exports = router;

