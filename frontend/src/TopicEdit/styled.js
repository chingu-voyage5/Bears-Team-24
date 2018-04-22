import styled from 'styled-components';
import Select from 'material-ui/Select';
import { TableHead } from 'material-ui/Table';

export const ButtonWrapper = styled.div`
  margin: 1rem auto;
`;

export const TableHeadWrapper = styled(TableHead)`
  background: #eee;
`;

export const TopicWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: baseline;
`;

export const SelectWrapper = styled(Select)`
  width: 200px;
  bottom-margin: 1rem;
`;

const Wrapper = styled.div`
  cursor: default;
  display: flex;
  flex-direction: column;
  margin: auto;
  padding: 2rem 0;
  max-width: 60rem;
  padding: ${p => (p.mobile ? 0 : '1rem')};
`;

Wrapper.displayName = 'Wrapper';

export default Wrapper;
