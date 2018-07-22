import styled from 'styled-components';
import ButtonMUI from '@material-ui/core/Button';

export const Button = styled(ButtonMUI).attrs({
  disableRipple: true,
})`
  display: inline-block;
`;

export const Form = styled.form`
  align-items: center;
  display: flex;
  justify-content: center;
  padding-right: 0.5rem;
  width: 100%;
`;

export const TextField = styled.input`
  border: none;
  border-radius: 4px;
  box-shadow: 0 0 2px gray;
  box-sizing: border-box;
  font-size: 16px;
  height: 32px;
  margin-right: 1rem;
  max-width: 250px;
  padding: 0.3rem 0.5rem;
  width: 100%;
`;

export const Wrapper = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;
  width: 100%;
`;
