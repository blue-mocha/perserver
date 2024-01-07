const { buildSchema } = require('graphql');

//field: JSON
const typeDefs = buildSchema(`

schema{
  query : Query
  mutation : Mutation
 }

type UserLike{
  seq : String
  title : String
  startDate: String
  endDate : String
  place : String    
  thumbnail : String         
}

input LikeInput{
  seq : String
  title : String
  startDate: String
  endDate : String
  place : String
  thumbnail : String
}

type Return{
  message : String 
}

type Query{
  GetLikes : [UserLike]
}

type Mutation{
   AddLike(input:LikeInput): UserLike
   DeleteLike(userId : String , seq : String): Return
 } 

`);



export default typeDefs;