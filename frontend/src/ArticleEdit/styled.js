import styled from 'styled-components';

const contentStyleMixin = () => `
  background-color: #fff;
  border: 0 solid rgb(169, 169, 169);
  border-top: none;
  box-shadow: 0 0 2px black;
  box-sizing: border-box;
  grid-area: content;
  height: 100%;
  max-height: 100%;
  padding: 1rem;
  width: 100%;
`;

export const Button = styled.button`
  background-color: #15df89;
  border: none;
  border-radius: 12px;
  box-shadow: 0 1px 2px #aaa;
  color: #fff;
  cursor: pointer;
  display: block;
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

export const Editor = styled.div`
  display: grid;
  flex: 1;
  grid-template-areas: 'markdown preview .' 'content content content';
  grid-template-columns: 1fr 1fr 2fr;
  grid-template-rows: 50px auto;
  height: 100%;
  margin: auto;
  position: relative;
  width: 100%;
`;

Editor.displayName = 'Editor';

export const Heading1 = styled.h1`
  font-size: 2rem;
  margin-bottom: 2rem;
  text-align: center;
`;

Heading1.displayName = 'Heading1';

export const Preview = styled.div`
  ${contentStyleMixin()};
  overflow: auto;
  position: absolute;
`;

Preview.displayName = 'Preview';

export const Textarea = styled.textarea`
  ${contentStyleMixin()};
`;

Textarea.displayName = 'Textarea';

export const Wrapper = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  height: calc(100vh - 60px);
  justify-content: space-between;
  margin: auto;
  max-height: calc(100vh - 60px);
  max-width: 60rem;
`;

export const Message = styled.div`
  visibility: ${props => (props.show ? 'visible' : 'hidden')};
  color: ${props => (props.error ? 'tomato' : 'gold')};
`;
