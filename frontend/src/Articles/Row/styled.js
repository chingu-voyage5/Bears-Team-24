import styled from 'styled-components';

export const Title = styled.div`
  align-items: center;
  cursor: pointer;
  display: flex;
  height: 100%;
  margin-right: 2rem;
  overflow: hidden;
  white-space: nowrap;
  width: 60%;
`;

Title.displayName = 'Title';

export const Creator = styled.div`
  align-items: left;
  flex: 1;

  &:hover {
    text-decoration: underline;
  }
`;

Creator.displayName = 'Creator';
