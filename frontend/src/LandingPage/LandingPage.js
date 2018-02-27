import React from 'react';
import { Article, Content, Heading1, Heading2, Heading3, Section } from './styled';

const LandingPage = () => (
  <div>
    <Heading1>Welcome to chingu CMS</Heading1>
    <Article>
      <Heading2>Features</Heading2>
      <Content>
        <Section>
          <Heading3>Manage Content</Heading3>
          <p>Loren lipsum</p>
        </Section>
        <Section>
          <Heading3>Search Content</Heading3>
          <p>Loren lipsum</p>
        </Section>
        <Section>
          <Heading3>Some Feature</Heading3>
          <p>Loren lipsum</p>
        </Section>
        <Section>
          <Heading3>Track Changes</Heading3>
          <p>Loren lipsum</p>
        </Section>
      </Content>
    </Article>
  </div>
);

export default LandingPage;
