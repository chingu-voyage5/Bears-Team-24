import styled from 'styled-components';

export const Field = styled.input`
  border: none;
  border-bottom: 1px solid #a9a9a9;
  font-size: 1.3rem;
  height: 2rem;
  margin-top: 0.5rem;
  outline: none;

  &:active,
  &:focus {
    border-bottom: 2px solid #15df89;
  }

  &[type='submit'] {
    background-color: #15df89;
    border-radius: 2px;
    color: #fff;
    cursor: pointer;
    font-size: 1.2rem;
    height: auto;
    padding: 0.5rem 1.2rem;

    &:disabled {
      background-color: #aaa;
      cursor: not-allowed;
    }
  }
`;

export const Label = styled.label`
  display: flex;
  flex-direction: column;
  font-size: 14px;
  height: 3rem;
  margin-top: 1rem;
  width: 100%;
`;
