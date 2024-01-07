import {Schema, model, Model} from 'mongoose';
const bcrypt = require('bcryptjs');


export interface DBUser {
  _id : number ; 
  userId : string ; 
  password : string | undefined ;
}
interface DBUserModel extends Model<DBUser> {}

//mongoose 
const appUserSchema = new Schema<DBUser,DBUserModel>({
    userId : {type:String, required:true, unique:true}, 
    password:{type:String, required:true, select:false},
  });
  
  // [패스워드 관련 메서드]
  // Model.create, model.save 함수 실행시 먼저 일어남 ('save')
    appUserSchema.pre('save', function (next : any){
    const user = this; //_id
  
    if(!user.isModified('password')){ //생성시, 변경할때 작동 : (true)
      return next();
      //이미 해쉬되서 저장된게 있음! -> 빠져나가기 next(); 
    }
    else {
      user.password = bcrypt.hashSync(user.password); //해쉬값 만들기.
      return next();
    }
    });

    //입력값과 저장값 비교하기.(패스워드)
    appUserSchema.methods.authenticate = function (password:string) {
    const user = this;
    return bcrypt.compareSync(password, user.password);
    };

    
   const AppUser = model<DBUser,DBUserModel>('AppUser', appUserSchema); 
   export default AppUser; 