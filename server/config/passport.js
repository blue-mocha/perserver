import passport from 'passport';
const LocalStrategy = require('passport-local').Strategy; 
import AppUser from '../models/user';


// serialize// : 사용자 리스트 
passport.serializeUser(function(user , done) {
  console.log('session에 저장')
  done(null, user._id); 
  // =>session에 저장(req.session.passport.user = {_id :...}) 
  // _효율적으로 id 만 저장하기. //한번만 작동. 
  // password : 보안문제도 있음. 
});

//deserialize// : session에서 불러와서 사용. -> req.user에 저장. 
passport.deserializeUser((id, done)=>{ 
  AppUser.findById(id, (err, user) => {
     done(null, user)
  });
});


// local-strategy 
passport.use('local-login',
  new LocalStrategy({
      usernameField : 'userId', 
      passwordField : 'password', 
      session: true, 
      passReqToCallback : true //(req, id, password, done) => {};
    },

    function(req, userId, password, done) { 
  
      AppUser.findOne({userId : userId})
        .select({password:1})
        .exec(function(err, user) {
          if (err) return done(err);
         
          if (user && user.authenticate(password)){ 
            return done(null, user);
          }  
          else {
            return done(null, false); 
          }
        });
     }
   )
);

module.exports = passport;