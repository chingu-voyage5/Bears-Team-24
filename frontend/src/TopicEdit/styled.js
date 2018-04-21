import styled from 'styled-components';
import Select from 'material-ui/Select';

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
`;
Wrapper.displayName = 'Wrapper';

export default Wrapper;
