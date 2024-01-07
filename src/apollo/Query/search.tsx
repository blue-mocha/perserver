import { gql } from "@apollo/client";


const GET_SEARCH = gql`
  query GetSearch($input:SearchInput){
    GetSearch(input:$input){
        seq { _text}
        title { _text}
        startDate { _text}
        endDate { _text}
        place { _text}
        thumbnail { _text}
    }
  }
`;


export { GET_SEARCH };