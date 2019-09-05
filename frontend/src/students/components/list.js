import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import {
  Pane,
  Spinner,
  Table,
  Heading,
  SideSheet,
  Avatar,
  Icon,
  Button,
  TextInputField,
  Popover,
  Position,
  Menu,
  IconButton
} from 'evergreen-ui';

import { GET_STUDENTS } from '../constants';

const Loading = ({}) => (
  <Spinner />
)

const Error = ({}) => (
    "Error..."
)

const StudentElement = ({id, fullName, isPresent, handleSelect}) => (
  <Table.Row
    key={id}
    isSelectable
    onSelect={handleSelect}
  >
    <Table.TextCell>{id}</Table.TextCell>
    <Table.TextCell>
      {fullName}
    </Table.TextCell>
    <Table.TextCell>
      {
        !!isPresent ? (
          <Icon icon="tick-circle" color="success" marginRight={16} />
        ) : (
          <Icon icon="cross" color="danger" marginRight={16} />
        )
      }
    </Table.TextCell>
  </Table.Row>
)

class StudentSheet extends React.Component {

  state = {
    isShown: false
  }
  constructor(props) {
    super(props)
  }

  _handleShown = () => this.setState({isShown: !this.state.isShown})

  render() {

    return (
      <React.Fragment>
        <SideSheet
          isShown={this.state.isShown}
          onCloseComplete={this._handleShown}
        >
          <StudentForm {...this.props} handleShown={this._handleShown}/>
        </SideSheet>
        <StudentElement {...this.props} handleSelect={this._handleShown}/>
      </React.Fragment>
    )
  }
}

class StudentForm extends React.Component {

  state = {
    id: "",
    fullName: "",
    firstName: "",
    lastName: "",
    rut: "",
    listNumber: 0,
    isPresent: false
  }

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.setState({...this.props})
  }

  _handleChange = (event) => {
    this.setState({[event.target.name]: event.target.value});
  }

  handlePresent = () => {
    const { isPresent, id } = this.state;
    const willPresent = !isPresent;
    this.setState({isPresent: willPresent})
    this.props.submitForm({id, isPresent: willPresent})
  }

  attributes = () => (
    [
      {name: "firstName", label: "Nombre", required: true, type: "text"},
      {name: "lastName", label: "Apellido", required: true, type: "text"},
      {name: "rut", label: "RUT", required: true, type: "text"}
    ]
  )

  render() {
    const { fullName, isPresent, firstName, id } = this.state;
    return (
      <Pane width="100%" height="100%" display="flex" flexDirection="column">
        <Pane width="100%" height="10%" display="flex" flexDirection="row" background="tint2" paddingX={10} alignItems="center" borderBottom>
          <Avatar name={fullName} size={40} isSolid={isPresent} marginRight={10} />
          <Heading size={600}>{fullName}</Heading>
          <Popover
            position={Position.BOTTOM_LEFT}
            content={
              <Menu>
                <Menu.Group>
                <Menu.Item
                    icon="check"
                    onSelect={this.handlePresent }
                  >
                    Marcar {!!isPresent ? "Ausente" : "Presente"}
                  </Menu.Item>
                </Menu.Group>
                <Menu.Divider />
                <Menu.Group>
                  <Menu.Item
                    icon="trash"
                    intent="danger"
                    onSelect={() => this.props.handleDeleted(id)}
                  >
                    Eliminar
                  </Menu.Item>
                </Menu.Group>
              </Menu>
            }
          >
            <IconButton appearance="minimal" icon="menu" iconSize={18} marginLeft="auto"/>
          </Popover>
        </Pane>
        <Pane height="90%" width="100%" paddingX={30} paddingY={20}>
          <Pane height="100%" width="100%" border background="tint1" display="flex" flexDirection="column" paddingX={20} paddingY={10}>
            {this.attributes().map((attribute, index) => (
              <TextInputField
                {...attribute}
                value={this.state[attribute.name]}
                onChange={this._handleChange}
              />
            ))}
            <Button appearance="primary" marginTop="auto" justifyContent="center" onClick={() => this.props.submitForm(this.state)}>Guardar</Button>
          </Pane>
        </Pane>
      </Pane>
    )
  }
}

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
  }

  handleUpdate = (student) => {
    debugger;
    this.setState({students: this.state.students.map(_student => {
      if (_student.id == student.id) return {..._student, ...student};
      return _student;
    })})
  }

  handleCreate = (student) => {
    this.setState({students: [...this.state.students, student]})
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
        </Table.Body>
      </Table>
    )
  }
}

export const List = (props) => {
  const { loading, error, data } = useQuery(GET_STUDENTS);
  let component = <StudentList {...data}/>
  if (loading) component = <Loading />
  if (error) component = <Error />

  return (
    <Pane display="flex" alignItems="center" justifyContent="center" height="100vh" width="100vw" flexDirection="column">
      {component}
    </Pane>
  )
}