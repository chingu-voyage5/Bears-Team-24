import styled from 'styled-components';

export const InputField = styled.input`
  flex: 1;
  font-size: 1.1rem;
  height: 100%;
  margin-left: 2rem;
  margin-right: 30%;
  max-width: 50%;
  padding-left: 0.5rem;
`;

InputField.displayName = 'InputField';

export const Label = styled.label`
  align-items: center;
  display: flex;
  font-weight: bold;
  height: 2rem;
  justify-content: flex-end;
  margin-bottom: 2rem;
`;

Label.displayName = 'Label';
