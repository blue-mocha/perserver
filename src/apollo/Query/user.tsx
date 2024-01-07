import { gql } from "@apollo/client";


const GET_USERS = gql`
  {
   GetUsers{
      id 
      userId
    }
  }
`;

const GET_USER = gql`
  query GetUser($id: ID){
    getUser(id: $id){
      id 
      userId
    }
  }

`;


export { GET_USERS, GET_USER };