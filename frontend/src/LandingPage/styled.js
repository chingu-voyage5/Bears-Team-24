import styled from 'styled-components';

export const Article = styled.article`
  margin: 0 auto auto;
  max-width: 60rem;
  padding: 3em 2rem;
`;

export const Content = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: center;
`;

export const Heading1 = styled.h1`
  text-align: center;
`;

export const Heading2 = styled.h2`
  width: 100%;
  text-align: center;
  font-weight: 400;
  font-size: 2rem;
  color: #ff5a5f;
`;

export const Heading3 = styled.h3`
  display: flex;
  align-items: center;
  color: #7d93aa;
  font-size: 1.4em;
  font-weight: 400;
  margin-bottom: .75rem;
  margin-top: 1rem;
`;

export const Section = styled.section`
  width: calc(50% - 2rem);
  font-size: 1.1rem;
`;
