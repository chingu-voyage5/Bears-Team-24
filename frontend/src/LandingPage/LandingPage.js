import React from 'react';

// Material UI components
import Grid from '@material-ui/core/Grid';

import { Heading1, Heading2, Heading3, P, Paper, Wrapper } from './styled';

const LandingPage = () => (
  <Wrapper>
    <Heading1>Welcome to chingu CMS</Heading1>
    <Heading2>Features</Heading2>
    <Grid spacing={16} container>
      <Grid item xs={12} sm={6}>
        <Paper>
          <Heading3>Manage Content</Heading3>
          <P>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sin aliud
            quid voles, postea. Lorem ipsum dolor sit amet, consectetur
            adipiscing elit. Sin aliud quid voles, postea.
          </P>
        </Paper>
      </Grid>
      <Grid item xs={12} sm={6}>
        <Paper>
          <Heading3>Search Content</Heading3>
          <P>
            Certe nihil nisi quod possit ipsum propter se iure laudari. Mihi
            vero, inquit, placet agi subtilius et, ut ipse dixisti, pressius.
          </P>
        </Paper>
      </Grid>
      <Grid item xs={12} sm={6}>
        <Paper>
          <Heading3>Some Feature</Heading3>
          <P>
            Omnes enim iucundum motum, quo sensus hilaretur. Duo Reges:
            constructio interrete. Itaque haec cum illis est dissensio, cum
            Peripateticis nulla sane. Quis suae urbis conservatorem Codrum, quis
            Erechthei filias non maxime laudat?
          </P>
        </Paper>
      </Grid>
      <Grid item xs={12} sm={6}>
        <Paper>
          <Heading3>Track Changes</Heading3>
          <P>
            Sit, inquam, tam facilis, quam vultis, comparatio voluptatis, quid
            de dolore dicemus? Non est igitur summum malum dolor.
          </P>
        </Paper>
      </Grid>
    </Grid>
  </Wrapper>
);

export default LandingPage;
