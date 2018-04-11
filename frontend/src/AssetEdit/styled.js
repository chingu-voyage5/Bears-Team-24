import styled from 'styled-components';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';

export const ButtonWrapper = styled.div`
  margin-top: 1rem;
`;

export const DropArea = styled.button`
  background-color: #e2e2e2;
  border: none;
  box-shadow: 0 0 2px #333;
  height: 30vh;
  margin: auto;
  max-width: 400px;
  padding: 0;
  padding-top: 1rem;
  position: relative;
  width: 100%;
`;
DropArea.displayName = 'DropArea';

export const DropAreaWrapper = styled(Paper)`
  display: flex;
  justify-content: center;
  padding: 1rem;
`;

export const Hint = styled.p`
  left: 0;
  position: absolute;
  right: 0;
  top: 0;
`;

export const Heading1 = styled(Typography).attrs({
  variant: 'display1',
})`
  text-align: center;
`;
Heading1.displayName = 'Heading1';

export const ImgPreview = styled.img`
  height: 75%;
  transform: ${p => (p.scaled ? 'scale(2) translateY(25%)' : 'scale(1)')};
  transition: transform 0.15s ease;
`;
ImgPreview.displayName = 'ImgPreview';

export const InvisibleInput = styled.input.attrs({
  type: 'file',
})`
  display: none;
`;
InvisibleInput.displayName = 'InvisibleInput';

export const Label = styled.div`
  font-weight: bold;
  min-width: 20%;

  @media (max-width: 768px) {
    min-width: 25%;
  }
`;
Label.displayName = 'Label';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: auto;
  max-width: 60rem;
  padding: 2rem 0;
`;
