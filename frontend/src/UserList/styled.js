import styled from 'styled-components';
import AvatarMUI from 'material-ui/Avatar';

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
export const Wrapper = styled.div`
  margin: 1rem auto;
  max-width: 960px;
  width: 100%;
`;
