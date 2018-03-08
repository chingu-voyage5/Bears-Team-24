import styled from 'styled-components';

const labelActiveMixin = () => `
  background-color: white;
  border-bottom-width: 0;
  box-shadow: 0 -1px 1px black;
  color: #333;
`;

const labelDefaultMixin = () => `
  background-color: #f2f2f2;
  border-bottom-width: 1px;
  box-shadow: inset 0 0 1px black;
  color: #666;
`;

export const Label = styled.label`
  ${p => (p.active ? labelActiveMixin() : labelDefaultMixin())};
  align-items: center;
  border: 0 solid gray;
  display: flex;
  font-size: 1.2rem;
  grid-area: ${p => p.gridArea};
  justify-content: center;
  z-index: 1;
`;

Label.displayName = 'Label';

export const Radio = styled.input.attrs({
  type: 'radio',
})`
  opacity: 0;
  position: absolute;
`;

Radio.displayName = 'Radio';
