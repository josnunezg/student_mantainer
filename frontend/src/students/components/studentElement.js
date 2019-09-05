import React from 'react';
import {
  Table,
  Icon
} from 'evergreen-ui';

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

export default StudentElement;