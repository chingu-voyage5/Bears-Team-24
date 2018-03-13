import React from 'react';
import {
  Article,
  Content,
  Heading1,
  Heading2,
  Heading3,
  Section,
} from './styled';

const LandingPage = () => (
  <React.Fragment>
    <Heading1>Welcome to chingu CMS</Heading1>
    <Article>
      <Heading2>Features</Heading2>
      <Content>
        <Section>
          <Heading3>Manage Content</Heading3>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sin aliud
            quid voles, postea.
          </p>
        </Section>
        <Section>
          <Heading3>Search Content</Heading3>
          <p>
            Certe nihil nisi quod possit ipsum propter se iure laudari. Mihi
            vero, inquit, placet agi subtilius et, ut ipse dixisti, pressius.
          </p>
        </Section>
        <Section>
          <Heading3>Some Feature</Heading3>
          <p>
            Omnes enim iucundum motum, quo sensus hilaretur. Duo Reges:
            constructio interrete. Itaque haec cum illis est dissensio, cum
            Peripateticis nulla sane. Quis suae urbis conservatorem Codrum, quis
            Erechthei filias non maxime laudat?
          </p>
        </Section>
        <Section>
          <Heading3>Track Changes</Heading3>
          <p>
            Sit, inquam, tam facilis, quam vultis, comparatio voluptatis, quid
            de dolore dicemus? Non est igitur summum malum dolor.
          </p>
        </Section>
      </Content>
    </Article>
  </React.Fragment>
);

export default LandingPage;
