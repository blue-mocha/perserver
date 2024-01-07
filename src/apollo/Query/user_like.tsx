import { gql } from "@apollo/client";


const GET_LIKES = gql`
  query{
    GetLikes{
      seq
      title
      startDate
      endDate
      place
      thumbnail
    }
  }
`;


const ADD_LIKE = gql` 
   mutation AddLike($input:LikeInput!){
    AddLike(input : $input){     
       seq
       title 
       startDate
       endDate 
       place
       thumbnail
    }
  }

`;

const DELETE_LIKE = gql` 
  mutation DeleteLike($userId: String, $seq : String) {
    DeleteLike(userId: $userId, seq: $seq) {
     message
    }
  }
  `;


export { GET_LIKES, ADD_LIKE, DELETE_LIKE };