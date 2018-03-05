import styled from 'styled-components';

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

export const DropArea = styled.button`
  background-color: #e2e2e2;
  border: none;
  box-shadow: 0 0 2px #333;
  height: 30vh;
  margin: auto;
  padding: 0;
  padding-top: 1rem;
  position: relative;
  width: 40%;
`;

DropArea.displayName = 'DropArea';

export const Hint = styled.p`
  left: 0;
  position: absolute;
  right: 0;
  top: 0;
`;

export const ImgPreview = styled.img`
  height: 75%;
  transform: ${p => (p.scaled ? 'scale(2) translateY(25%)' : 'scale(1)')};
  transition: transform 0.15s ease;
`;

ImgPreview.displayName = 'ImgPreview';

export const InvisibleInput = styled.input.attrs({
  type: 'file',
})`
  display: none;
`;

InvisibleInput.displayName = 'InvisibleInput';

export const InputField = styled.p`
  align-items: center;
  background-color: #e2e2e2;
  border: 1px solid gray;
  display: flex;
  flex: 1;
  font-size: 1.1rem;
  font-weight: normal;
  height: 100%;
  line-height: 1.1rem;
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

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: auto;
  max-width: 75rem;
  padding: 2rem 0;
`;
