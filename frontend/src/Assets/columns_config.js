/**
 * @prop {string} Header - Header title visible to the user
 * @prop {boolean} show - show column (defaults to true)
 *
 * @prop {string} accessor - object key to get the data from in the data file
 * or
 * @prop {function} accessor - a funciton to access nested data/transform data.
 * In this case id key is required:
 * @prop {string} id - id for the data created by accessor function
 */

export default [
  {
    Header: 'id',
    accessor: '_id',
    show: false,
  },
  {
    Header: 'Type',
    accessor: 'type',
  },
  {
    Header: 'Owner',
    accessor: 'creator',
  },
  {
    Header: 'Title',
    accessor: 'title',
  },
  {
    id: 'created',
    Header: 'Date created',
    accessor: d => new Date(d.created * 1000).toLocaleString(),
  },
];
