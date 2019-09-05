import React from 'react';
import {
  SideSheet
} from 'evergreen-ui';

import StudentForm from './studentForm';
import StudentElement from './studentElement';


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

export default StudentSheet;