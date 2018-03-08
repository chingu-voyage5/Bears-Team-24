import styled from 'styled-components';

export const Article = styled.article`
  margin: 0 auto auto;
  max-width: 60rem;
  padding: 3em 2rem;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
`;

export const Heading1 = styled.h1`
  text-align: center;
`;

export const Heading2 = styled.h2`
  color: #ff5a5f;
  font-size: 2rem;
  font-weight: 400;
  text-align: center;
  width: 100%;
`;

export const Heading3 = styled.h3`
  align-items: center;
  color: #7d93aa;
  display: flex;
  font-size: 1.4em;
  font-weight: 400;
  margin-bottom: 0.75rem;
  margin-top: 1rem;
`;

export const Section = styled.section`
  font-size: 1.1rem;
  width: calc(50% - 2rem);
`;
