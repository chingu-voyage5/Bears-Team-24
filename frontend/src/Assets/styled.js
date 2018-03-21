import styled from 'styled-components';

export const Button = styled.button`
  background-color: #15df89;
  border: none;
  border-radius: 12px;
  box-shadow: 0 1px 2px #aaa;
  color: #fff;
  cursor: pointer;
  font-size: 1.2rem;
  font-weight: bold;
  height: auto;
  margin: 1rem;
  max-width: 10rem;
  padding: 0.5rem 1.2rem;
  position: relative;

  &:hover {
    background-color: #08d27c;
  }

  &:active {
    box-shadow: none;
    top: 1px;
  }
`;

Button.displayName = 'Button';

export const Wrapper = styled.div`
  cursor: default;
  max-width: 60rem;
  margin: auto;
`;
