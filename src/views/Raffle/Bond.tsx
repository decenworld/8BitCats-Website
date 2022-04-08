import React, {useCallback, useMemo, useEffect} from 'react';
import Page from '../../components/Page';
import {createGlobalStyle} from 'styled-components';
import {Route, Switch, useRouteMatch} from 'react-router-dom';
import {useWallet} from 'use-wallet';
import UnlockWallet from '../../components/UnlockWallet';
import PageHeader from '../../components/PageHeader';
import ExchangeCard from './components/ExchangeCard';
import styled from 'styled-components';

import useRaffleStats from '../../hooks/useRaffleBalance';
import useTombFinance from '../../hooks/useTombFinance';

import {useTransactionAdder} from '../../state/transactions/hooks';
import ExchangeStat from './components/ExchangeStat';
import useBondsPurchasable from '../../hooks/useBondsPurchasable';
import {getDisplayBalance} from '../../utils/formatBalance';
import { Alert } from '@material-ui/lab';
import {ReactComponent as IconTelegram} from '../../assets/img/telegram.svg';
import {ReactComponent as IconDiscord} from '../../assets/img/discord.svg';
import HomeImage from '../../assets/img/background.jpg';
import { Box, Container, Card, CardContent, Typography, Grid } from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import { Stats } from 'fs';
import LaunchCountdown from '../../components/LaunchCountdown';
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
  gridItem: {
    height: '100%',
    [theme.breakpoints.up('md')]: {
      height: '90px',
    }},
}));

const Bond: React.FC = () => {

  const startDate = new Date('2022-4-7 11:30:00Z');
  const endDate = new Date('2022-4-10 11:30:00Z');
  const raffleAddress = '0xBEd0C6d6EEB41D0368A1904e6D81d34749cD3745';

  const {path} = useRouteMatch();
  const {account} = useWallet();
  const classes = useStyles();
  const tombFinance = useTombFinance();
  const addTransaction = useTransactionAdder();
  const raffleStats = useRaffleStats(account, raffleAddress);

  const startTime = Number(startDate); 
  const endTime = Number(endDate); 

  const grapePrice = useMemo(
    () => (raffleStats ? Number(raffleStats.tokenInFtm).toFixed(2) : null),
    [raffleStats],
  );
  
  const raffleBals = useMemo(
    () => (raffleStats ? Number(raffleStats.totalSupply).toFixed(0) : null),
    [raffleStats],
  );

  const userBals = useMemo(
    () => (raffleStats ? Number(raffleStats.priceInDollars).toFixed(0) : null),
    [raffleStats],
  );

  const handleBuyBonds = useCallback( 
    async (amount: string) => { 
      const tx = await tombFinance.sendDollar(amount, raffleAddress);
        addTransaction(tx, {
          summary: `Send ${Number(amount).toFixed(2)} MvDOLLAR to the raffle ${amount} `,
        });
    
    },
    [tombFinance, addTransaction],
  );

  return (   
<Switch>
<Page>
  <BackgroundImage />
  {!!account ? (
    <>
    
     <Grid item xs={12} md={12} lg={12} >     
        <h2 style={{ fontSize: '80px', textAlign:'center' }}>Weekly MSHARE Raffle</h2>   
        <p style={{ fontSize: '20px', textAlign:'center', color: '#fff' }}>Every week we'll run a raffle for our community where you have the chance to win MSHARE just by sending in your freely earned MvDOLLAR.<br></br> <br></br> 1 MvDOLLAR =  1 entry, unlimited entries per address, the more MvDOLLAR you send the more chance you have to win. The winner will be chosen at random.</p>                
        <p style={{fontSize: '20px', textAlign:'center', color: '#fff' }}>Raffle address: {raffleAddress}</p>
      </Grid>
      {Date.now() > endTime ? <h2 style={{ fontSize: '60px', textAlign:'center' }}>Raffle Closed</h2> : <h2 style={{ fontSize: '60px', textAlign:'center' }}>Raffle Open</h2>}
      {Date.now() < startTime ? <LaunchCountdown deadline={startDate} description={'Raffle Starts In'} descriptionLink={''}></LaunchCountdown> : <LaunchCountdown deadline={endDate} description={'Raffle Closes In'} descriptionLink={''}></LaunchCountdown>}
     
    <Grid container justify="center" spacing={3} style={{marginTop: '10px'}}>
        <Grid item xs={12} sm={12} lg={6}>  
            <Card>
              <h2 style={{textAlign:'center', marginTop: '10px' }}>Raffle Stats</h2>
              <p style={{textAlign:'center'}}>Win 1 MSHARE this raffle</p>           
              <p style={{textAlign:'center'}}>Total MvDOLLAR Entered: {raffleBals}</p>         
              <p style={{textAlign:'center'}}>Your entries: {userBals}</p>
              <p style={{textAlign:'center'}}>Your account: {account}</p>
            </Card>
          </Grid>
        <Grid item xs={12} sm={12} lg={6}>  
        <StyledBond>
          <StyledCardWrapper>
            <ExchangeCard
              action="Enter Raffle"
              fromToken={tombFinance.TOMB}
              fromTokenName="MvDOLLAR"
              toToken={tombFinance.TBOND}
              toTokenName="MvBOND"
              priceDesc={
                Date.now() < endTime && Date.now() > startTime
                  ? 'Raffle is open! 1 MvDOLLAR = 1 Entry'
                  : 'Raffle is currently closed'
              }
              disabled={Date.now() < endTime && Date.now() > startTime ? false : true}
              onExchange={handleBuyBonds}
            />
          </StyledCardWrapper>
        </StyledBond>
        </Grid>
      </Grid>

    </>
  ) : (
    <UnlockWallet />
  )}
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
