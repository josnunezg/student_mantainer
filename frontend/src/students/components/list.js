import React from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import {
  Pane,
  Spinner
} from 'evergreen-ui';

import { GET_STUDENTS, CREATE_STUDENT, UPDATE_STUDENT, DELETE_STUDENT } from '../constants';
import StudentList from './studentList';

const Loading = ({}) => (
  <Spinner />
)

const Error = ({}) => (
    "Error..."
)


export const List = (props) => {
  const { loading, error, data } = useQuery(GET_STUDENTS);
  const [createStudent] = useMutation(CREATE_STUDENT);
  const [updateStudent] = useMutation(UPDATE_STUDENT);
  const [deleteStudent] = useMutation(DELETE_STUDENT);
  let component = (
    <StudentList
      {...data}
      createStudent={createStudent}
      updateStudent={updateStudent}
      deleteStudent={deleteStudent}
    />
  )
  if (loading) component = <Loading />
  if (error) component = <Error />

  return (
    <Pane display="flex" alignItems="center" justifyContent="center" height="100vh" width="100vw" flexDirection="column">
      {component}
    </Pane>
  )
}