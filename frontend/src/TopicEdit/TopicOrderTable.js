import React from 'react';
import PropTypes from 'prop-types';

import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import Table, { TableBody, TableCell, TableRow } from 'material-ui/Table';

import { TableHeadWrapper } from './styled';

const propTypes = {
  selectedTopic: PropTypes.object.isRequired,
  subTopicRows: PropTypes.array.isRequired,
  onTopicChange: PropTypes.func.isRequired,
};

const TopicOrderTable = ({ selectedTopic, onTopicChange, subTopicRows }) => (
  <Paper>
    <Table>
      <TableHeadWrapper>
        <TableRow key={selectedTopic._id}>
          <TableCell>
            <TextField
              id={selectedTopic._id}
              name="name"
              value={selectedTopic.name}
              onChange={onTopicChange}
            />
          </TableCell>
          <TableCell>
            <TextField
              id={selectedTopic._id}
              name="order"
              value={`${selectedTopic.order}`}
              onChange={onTopicChange}
            />
          </TableCell>
        </TableRow>
      </TableHeadWrapper>
      <TableBody>{subTopicRows}</TableBody>
    </Table>
  </Paper>
);

TopicOrderTable.propTypes = propTypes;

export default TopicOrderTable;
