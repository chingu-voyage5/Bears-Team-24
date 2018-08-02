import styled from 'styled-components';
import Select from '@material-ui/core/Select';
import TextFieldMUI from '@material-ui/core/TextField';

export const ButtonWrapper = styled.div`
  display: flex;
  justify-content: 'flex-start';
  margin: 1rem auto;
`;

export const DragHandle = styled.div`
  background-color: orange;
  width: 100px;

  &:hover {
    background-color: darkorange;
  }
`;

export const TextField = styled(TextFieldMUI).attrs({
  fullWidth: true,
  margin: 'none',
})``;

export const TopicWrapper = styled.div`
  background-color: #f2f2f2;
  display: flex;
  flex-direction: column;
  margin: 8px;
  padding: 0 8px;
`;

export const SubTopicWrapper = styled.div`
  background-color: #f9f9f9;
  border: 1px solid #eee;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 1px;
  margin-left: 10px;
  max-width: 500px;
  padding: 0;

  &:hover {
    background-color: #f5f5f5;
  }
`;

export const SelectWrapper = styled(Select)`
  width: 200px;
  margin-bottom: 1rem;
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
