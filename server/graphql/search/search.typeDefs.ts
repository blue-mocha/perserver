const { buildSchema } = require('graphql');

const typeDefs = buildSchema(`

schema{
  query :Query
 
}

type Query{
  GetSearch(input:SearchInput):[MyObject]
}

input SearchInput{
  sido : String 
  gugun : String
  from : String
  to : String
  keyword : String
}

type Text{
  _text : String   
}

type MyObject{
  seq : Text 
  title : Text  
  startDate : Text  
  endDate : Text
  place :  Text 
  thumbnail : Text 
}



`);


export default typeDefs;