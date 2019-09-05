import React from 'react';
import {
  Popover,
  Menu,
  IconButton,
  Pane,
  Avatar,
  Button,
  TextInputField,
  Position,
  Heading
} from 'evergreen-ui';


class StudentForm extends React.Component {

  state = {
    id: "",
    fullName: "",
    firstName: "",
    lastName: "",
    rut: "",
    listNumber: "",
    isPresent: false
  }

  _params = () => {
    const {
      id,
      firstName,
      lastName,
      rut,
      listNumber,
      isPresent
    } = this.state;

    return {
      id,
      firstName,
      lastName,
      rut,
      listNumber,
      isPresent
    }
  }

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    if (this.props.id)
      this.setState({...this.props});
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.id)
      this.setState({...nextProps});
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
    let menu;
    if (id > 0) menu = (
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
    )
    return (
      <Pane width="100%" height="100%" display="flex" flexDirection="column">
        <Pane width="100%" height="10%" display="flex" flexDirection="row" background="tint2" paddingX={10} alignItems="center" borderBottom>
          <Avatar name={fullName} size={40} isSolid={isPresent} marginRight={10} />
          <Heading size={600}>{fullName}</Heading>
          {menu}
        </Pane>
        <Pane height="90%" width="100%" paddingX={30} paddingY={20}>
          <Pane height="100%" width="100%" border background="tint1" display="flex" flexDirection="column" paddingX={20} paddingY={10}>
            {this.attributes().map((attribute, index) => (
              <TextInputField
                {...attribute}
                value={this.state[attribute.name]}
                onChange={this._handleChange}
                key={index}
              />
            ))}
            <Button
              appearance="primary"
              marginTop="auto"
              justifyContent="center"
              onClick={() =>{
                this.props.submitForm(this._params())
                this.props.handleShown();
              }
              }
            >
              Guardar
            </Button>
          </Pane>
        </Pane>
      </Pane>
    )
  }
}

export default StudentForm;