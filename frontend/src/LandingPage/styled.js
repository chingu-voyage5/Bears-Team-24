import styled from 'styled-components';
import PaperMUI from 'material-ui/Paper';
import Typography from 'material-ui/Typography';

export const Heading1 = styled(Typography).attrs({
  variant: 'display2',
})`
  text-align: center;
`;

export const Heading2 = styled(Typography).attrs({
  variant: 'display1',
  color: 'secondary',
})`
  && {
    margin: 2rem;
  }
  text-align: center;
`;

export const Heading3 = styled(Typography).attrs({
  variant: 'headline',
})`
  && {
    color: #7d93aa;
  }
  align-items: center;
  margin-bottom: 0.75rem;
  margin-top: 1rem;
`;

export const P = styled(Typography).attrs({
  gutterBottom: true,
})`
  && {
    font-size: 15px;
    margin-top: 0.8rem;
  }
`;

export const Paper = styled(PaperMUI)`
  padding: 1rem;
`;

export const Wrapper = styled.div`
  margin: auto;
  margin-top: 2rem;
  max-width: 60rem;
  padding: 0 1rem;
`;
