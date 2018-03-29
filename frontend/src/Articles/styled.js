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

export const RowWrapper = styled.a`
  align-items: center;
  box-shadow: 0 1px 1px -1px #333;
  color: #000;
  display: flex;
  font-size: 1rem;
  height: 3rem;
  line-height: 1rem;
  padding-left: 1rem;
  text-decoration: none;

  &:hover {
    background-color: #e2e2e2;
    text-decoration: none;
  }
`;

RowWrapper.displayName = 'RowWrapper';

export const Separator = styled.hr`
  border-color: #aaa;
  width: 100%;
`;

Separator.displayName = 'Separator';

export const TitleRowWrapper = styled.div`
  display: flex;
  font-size: 1.25rem;
  font-weight: bold;
  margin-top: 1rem;
  padding-left: 1rem;
`;

TitleRowWrapper.displayName = 'TitleRowWrapper';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: auto;
  max-width: 60rem;
`;

Wrapper.displayName = 'Wrapper';
