
import {Schema, model, Model} from 'mongoose';


interface DBDiary {
  userId : string ; 
  content : string ;
}
interface DBDiaryModel extends Model<DBDiary> {}


//mongoose
const diarySchema = new Schema<DBDiary,DBDiaryModel>({
    userId : {type:String, required:true, unique:true}, 
    content :{type:String, required:true},
  });
  
const Diary = model<DBDiary,DBDiaryModel>('Diary', diarySchema); 
module.exports = Diary; 