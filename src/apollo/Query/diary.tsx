import { gql } from "@apollo/client";

const GET_DIARIES = gql`
  query {
    user {
      userId

    }
  }
`;

const ADD_DIARY = gql`
  mutation AddUser($userId: String!, $userName: String!) {
  addDiary(userId: $userId, userName: $userName)
 }
`;

const UPDATE_DIARY = gql`
  mutation AddUser($userId: String!, $userName: String!) {
  addUser(userId: $userId, userName: $userName)
 }
`;

const DELET_DIARY= gql`
  mutation AddUser($userId: String!, $userName: String!) {
  addUser(userId: $userId, userName: $userName)
 }
`;

export { GET_DIARIES , ADD_DIARY , UPDATE_DIARY, DELET_DIARY};