import styled, {keyframes} from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  padding-top: 10px;
`;

const spin = keyframes`
  0% {transform: rotate(0deg)}
  100%{transform: rotate(360deg)}
`;

export const LoadingPic = styled.div`
	background-image: url('./images/wait.png');
	background-size: auto 40px;
	background-repeat: no-repeat;
	background-position: center;
	flex-basis: 100px;
	width:100vw;
	animation: ${spin} .5s infinite;
`;

export default Wrapper;
