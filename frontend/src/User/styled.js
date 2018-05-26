import styled from 'styled-components';
import AvatarMUI from '@material-ui/core/Avatar';
import Paper from '@material-ui/core/Paper';

export const Avatar = styled(AvatarMUI)`
  && {
    height: 150px;
    width: 150px;
  }
`;

export const AvatarWrapper = styled.div`
  display: flex;
  justify-content: center;
  padding-top: 1rem;
`;

export const Buttons = styled.div`
  margin-top: 2rem;
`;

export const Label = styled.div`
  font-weight: bold;
  min-width: 20%;

  @media (max-width: 768px) {
    min-width: 25%;
  }
`;

export const TableWrapper = styled(Paper)`
  overflow-x: auto;
`;

export const Wrapper = styled.div`
  margin: 1rem auto;
  max-width: 960px;
  width: 100%;
`;
