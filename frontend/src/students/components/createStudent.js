import React from 'react';
import {
  SideSheet,
  Table,
  Button
} from 'evergreen-ui';

import StudentForm from './studentForm';

class CreateStudent extends React.Component {

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
        <Table.Row>
          <Button onClick={this._handleShown} appearance="primary" marginTop="auto">Nuevo Estudiante</Button>
        </Table.Row>
      </React.Fragment>
    )
  }
}

export default CreateStudent;