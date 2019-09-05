import React from 'react';
import {
  Table,
  toaster
} from 'evergreen-ui';

import StudentSheet from './studentSheet';
import CreateStudent from './createStudent';



class StudentList extends React.Component {

  state = {
    students: []
  }

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.setState({students: this.props.students})
  }

  handleDeleted = (id) => {
    const oldStudents = [...this.state.students]
    this.setState({students: this.state.students.filter(student => student.id != id)})
    toaster.success("Estudiante Eliminado")
    this.props.deleteStudent({variables: {id}}).catch(error => {
      toaster.danger("Ocurrio un error")
      this.setState({students: oldStudents});
    })
  }

  handleUpdate = (student) => {
    this.props.updateStudent({variables: {student}}).then(response => {
      if (student.firstName && student.lastName)
        student["fullName"] = `${student.firstName} ${student.lastName}`;
      toaster.success("Estudiante Actualizado")
      this.setState({students: this.state.students.map(_student => {
        if (_student.id == student.id) return {..._student, ...student};
        return _student;
      })})
    })
  }

  handleCreate = (student) => {
    this.props.createStudent({variables: {student}}).then(response => {
      const { createStudent: newStudent } = response.data;
      toaster.success("Estudiante Creado")
      this.setState({students: [...this.state.students, newStudent]})
    })
  }

  submitForm = (student) => {
    const action = student.id > 0 ? this.handleUpdate : this.handleCreate
    action(student);
  }

  render() {
    const { students } = this.state;
    return (
      <Table width="50%">
        <Table.Head>
          <Table.TextHeaderCell>#</Table.TextHeaderCell>
          <Table.TextHeaderCell>Nombre</Table.TextHeaderCell>
          <Table.TextHeaderCell>Esta Presente</Table.TextHeaderCell>
        </Table.Head>
        <Table.Body>
          {students.map(student => (
            <StudentSheet {...student} handleDeleted={this.handleDeleted} submitForm={this.submitForm}/>
          ))}
          <CreateStudent submitForm={this.submitForm}/>
        </Table.Body>
      </Table>
    )
  }
}

export default StudentList;