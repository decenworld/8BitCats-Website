import React, {useCallback, useMemo, useEffect} from 'react';
import Page from '../../components/Page';
import {createGlobalStyle} from 'styled-components';
import {Route, Switch, useRouteMatch} from 'react-router-dom';
import {useWallet} from 'use-wallet';
import UnlockWallet from '../../components/UnlockWallet';
import PageHeader from '../../components/PageHeader';
import styled from 'styled-components';
import Spacer from '../../components/Spacer';
import strat from '../../assets/img/1.png';
import strat2 from '../../assets/img/2.png';
import strat3 from '../../assets/img/3.png';
import strat4 from '../../assets/img/4.png';
import strat5 from '../../assets/img/5.png';
import { Grid , Box, Container, Button } from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import PitImage from '../../assets/img/background.png';

const BackgroundImage = createGlobalStyle`
  body {
    background: url(${PitImage}) no-repeat !important;
    background-size: cover !important;
  }
`;

const useStyles = makeStyles((theme) => ({
  footer: {
    position: 'absolute',
    bottom: '0',
    paddingTop: '15px',
    paddingBottom: '15px',
    width: '100%',
    color: '#fff',
    backgroundColor: 'rgba(0,0,0,0)',
    textAlign: 'center',
    height: '1.3rem',
    fontFamily: 'superstar',
      [theme.breakpoints.down('xs')]: {
      display: 'none',
    },
  },
  link: {
    width: '24px',
    height: '24px',
    display: 'inline',
    marginLeft: '20px',
  },

  img: {
    width: '24px',
    height: '24px',
  },
}));

const Bond: React.FC = () => {
  const {path} = useRouteMatch();
  const {account} = useWallet();
  const classes = useStyles();
  

  return (   
<Switch>
<Page>
  <BackgroundImage />  
     
                  <h2 style={{ fontSize: '80px', textAlign:'center', marginBottom: '40px' }}>Strategy</h2>   
                  
                  <Grid container justify="center" spacing={0} style={{marginTop: '40px', marginBottom: '40px'}}>
                    
                      <Button color="primary" href="https://miniversefinance.gitbook.io/docs/protocol/strategies-and-guides" target="_blank" variant="contained" className={'shinyButton '} style={{}}>
                            View Full Strategy Guides
                      </Button>
                    
                    </Grid>    
                  <img src={strat} width={'100%'} />     
                  <img src={strat2} width={'100%'} />   
                  <img src={strat3} width={'100%'} />   
                  <img src={strat4} width={'100%'} />   
                  <img src={strat5} width={'100%'} />   
              
             
</Page>
</Switch>
  );
};

const StyledBond = styled.div`
  display: flex;
  @media (max-width: 768px) {
    width: 100%;
    flex-flow: column nowrap;
    align-items: center;
  }
`;

const StyledCardWrapper = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  @media (max-width: 768px) {
    width: 80%;
  }
`;

const StyledStatsWrapper = styled.div`
  display: flex;
  flex: 0.8;
  margin: 0 20px;
  flex-direction: column;

  @media (max-width: 768px) {
    width: 80%;
    margin: 16px 0;
  }
`;

export default Bond;
