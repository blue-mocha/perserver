import {Schema, model, Model, Types} from 'mongoose';


interface DBLikes {
  userId : Types.ObjectId, 
  seq : String ;
  title : String ;
  startDate: String ;
  endDate : String ;
  place : String ;
  thumbnail : String ; 
}
interface DBLikesModel extends Model<DBLikes> {}

//mongoose
const LikeSchema = new Schema<DBLikes,DBLikesModel>({
    userId : {type: Schema.Types.ObjectId, ref:'AppUser', required:true}, 
    seq :  {type:String, required:true, unique:true},
    title : {type:String, required:true}, 
    startDate : {type:String, required:true}, 
    endDate : {type:String, required:true}, 
    place : {type:String, required:true}, 
    thumbnail  : {type:String, required:true}, 
  });
  
const PerLike = model<DBLikes,DBLikesModel>('PerLike', LikeSchema); 
//PerLike.createIndexes(); //unique : true (not work)
module.exports = PerLike; 