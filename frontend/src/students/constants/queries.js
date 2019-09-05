import { gql } from 'apollo-boost';

export const GET_STUDENTS = gql`
  query {
    students {
      id
      listNumber
      fullName
      isPresent
      firstName
      lastName
    }
  }
`