import { gql } from 'apollo-boost';

export const CREATE_STUDENT = gql`
  mutation createStudent($student: StudentInputType!) {
    createStudent(student: $student) {
      id
      listNumber
      fullName
      isPresent
      firstName
      lastName
    }
  }
`

export const UPDATE_STUDENT = gql`
  mutation updateStudent($student: StudentInputType!) {
    updateStudent(student: $student)
  }
`

export const DELETE_STUDENT = gql`
  mutation deleteStudent($id: ID!) {
    deleteStudent(id: $id)
  }
`