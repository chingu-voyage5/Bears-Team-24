import React from 'react';

// Material UI components
import Button from 'material-ui/Button';
import Grid from 'material-ui/Grid';

import { Heading1, Heading2, Heading3, P, Paper, Wrapper } from './styled';

const test = () => {
  // TODO: remove example auth route and the button rendered  below
  fetch('/api/v1/test', {
    method: 'post',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    credentials: 'same-origin',
    body: JSON.stringify({ test: 'testing 1,2,3' }),
  })
    .then(res => res.json())
    .then(json => {
      // eslint-disable-next-line no-console
      console.log('test response:', json);
    })
    // eslint-disable-next-line
    .catch(err => console.log(err));
};

const LandingPage = () => (
  <Wrapper>
    <Heading1>Welcome to chingu CMS</Heading1>
    <Button variant="raised" color="default" onClick={test}>
      Test
    </Button>
    <Heading2>Features</Heading2>
    <Grid container>
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
