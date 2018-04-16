import styled from 'styled-components';
import Button from 'material-ui/Button';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';

export const Fields = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  min-height: 14rem;
  min-width: 100%;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const GithubButton = styled(Button).attrs({
  variant: 'raised',
})`
  && {
    background-color: #666;
    color: #fff;
  }

  &&:hover {
    background-color: #555;
  }
`;

export const Heading2 = styled(Typography).attrs({
  variant: 'display1',
})`
  text-align: center;
`;
Heading2.displayName = 'Heading2';

export const Register = styled(Typography).attrs({
  variant: 'body2',
})`
  cursor: pointer;
  text-align: center;
`;
Register.displayName = 'Register';

export const Spacer = styled.div`
  height: 1rem;
`;

export const Wrapper = styled(Paper)`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  margin: auto;
  margin-top: 2rem;
  max-width: 25rem;
  padding: 2rem;
  width: 100%;
`;
