import styled from 'styled-components';
import Paper from '@material-ui/core/Paper';

export const Card = styled(Paper)`
  cursor: pointer;
  margin: 0.5rem 1rem;
  padding: 0 1rem;

  &:hover {
    background-color: #fbfbfb;
  }
`;

export const Highlight = styled.span`
  background-color: ${p => (p.bgColor ? p.bgColor : 'yellow')};
  color: ${p => (p.color ? p.color : '#000')};
  font-weight: ${p => (p.bold ? 600 : 'auto')};
  padding: 0.25rem 0;
`;

export const Path = styled.p`
  font-size: 14px;
  margin: 0;
`;

export const Snippet = styled.p`
  font-size: 14px;
  margin: 0.5rem auto;
`;

export const Title = styled.p`
  font-weight: 600;
  margin: 0.5rem auto;
`;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;
