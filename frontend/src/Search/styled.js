import styled from 'styled-components';
import ButtonMUI from '@material-ui/core/Button';

export const Button = styled(ButtonMUI).attrs({
  disableRipple: true,
})``;

export const TextField = styled.input`
  border: none;
  border-radius: 4px;
  box-shadow: 0 0 2px gray;
  box-sizing: border-box;
  font-size: 16px;
  height: 32px;
  margin-right: 1rem;
  padding: 0.3rem 0.5rem;
`;

export const Wrapper = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;
  width: 100%;
`;
