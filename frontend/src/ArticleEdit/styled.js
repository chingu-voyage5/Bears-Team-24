import styled from 'styled-components';
import PaperMUI from '@material-ui/core/Paper';
import TextFieldMUI from '@material-ui/core/TextField';
import AppBarMUI from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';

export const AppBar = styled(AppBarMUI)`
  && {
    background-color: transparent;
    color: #333;
  }
  max-width: 320px;

  @media (max-width: 960px) and (min-width: 401px) {
    max-width: 187px;
  }

  @media (max-width: 400px) {
    max-width: 100%;
  }
`;

export const ContentWrapper = styled.div`
  margin-top: 2rem;
`;

export const EditorWrapper = styled(PaperMUI)`
  margin-bottom: 1rem;
`;

export const Heading1 = styled(Typography).attrs({
  variant: 'display1',
})`
  text-align: center;
`;
Heading1.displayName = 'Heading1';

export const Label = styled.div`
  min-width: 20%;
`;
Label.displayName = 'Label';

export const Preview = styled(PaperMUI)`
  padding: 1rem;
`;
Preview.displayName = 'Preview';

export const Textarea = styled(TextFieldMUI)`
  && {
    padding: 1rem;
  }
  width: calc(100% - 2rem);
`;
Textarea.displayName = 'Textarea';

export const Wrapper = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin: auto;
  max-width: 60rem;
  padding: ${p => (p.mobile ? 0 : '1rem')};
  padding-top: 1rem;
`;
