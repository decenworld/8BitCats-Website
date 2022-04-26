import React, { useMemo } from 'react';
import Page from '../../components/Page';

import CashImage from '../../assets/img/MV.png';
import Image from 'material-ui-image';
import styled from 'styled-components';
import { Alert } from '@material-ui/lab';
import { createGlobalStyle } from 'styled-components';
import CountUp from 'react-countup';
import CardIcon from '../../components/CardIcon';
import TokenSymbol from '../../components/TokenSymbol';
import useTombStats from '../../hooks/useTombStats';
import useLpStats from '../../hooks/useLpStats';
import useModal from '../../hooks/useModal';
import useZap from '../../hooks/useZap';
import useBondStats from '../../hooks/useBondStats';
import usetShareStats from '../../hooks/usetShareStats';
import useBurned2SHARES from '../../hooks/useBurned2SHARES.js';
import useTotalValueLocked from '../../hooks/useTotalValueLocked';
import { tomb as tombProd, tShare as tShareProd } from '../../tomb-finance/deployments/deployments.mainnet.json';
import kyc from '../../assets/img/kyc.png';
import audit from '../../assets/img/audit.jpg';
import MetamaskFox from '../../assets/img/metamask-fox.svg';
import PitImage from '../../assets/img/background.png';
import { Box, Button, Card, CardContent, Grid, Paper } from '@material-ui/core';
import ZapModal from '../Bank/components/ZapModal';

import { makeStyles } from '@material-ui/core/styles';
import useTombFinance from '../../hooks/useTombFinance';

// Import custom css
import "./style.css";

const BackgroundImage = createGlobalStyle`
  body {
    background: url(${PitImage}) no-repeat !important;
    background-size: cover !important;
  }
`;

const useStyles = makeStyles((theme) => ({
  button: {
    [theme.breakpoints.down('415')]: {
      marginTop: '10px',
    },
  },
  card: {
    borderRadius: 0,
    backgroundColor: '#2c3e50',
    color: theme.palette.primary.contrastText,
    boxShadow: 'none',
  },
}));

const New = () => {
  const classes = useStyles();
  const TVL = useTotalValueLocked();
  const tombFtmLpStats = useLpStats('MVDOLLAR-USDC-LP');
  const tShareFtmLpStats = useLpStats('MSHARE-USDC-LP');
  const tombStats = useTombStats();
  const tShareStats = usetShareStats();
  const tBondStats = useBondStats();
  const tombFinance = useTombFinance();
  //const { balance } = useBurned2SHARES();

  let tomb;
  let tShare;
 
  tomb = tombProd;
  tShare = tShareProd;
  

  const buyTombAddress = 'https://spookyswap.finance/swap?outputCurrency=0x7a6e4e3cc2ac9924605dca4ba31d1831c84b44ae'
  const buyTShareAddress = 'https://spookyswap.finance/swap?outputCurrency=' + tShare.address;

  const tombLPStats = useMemo(() => (tombFtmLpStats ? tombFtmLpStats : null), [tombFtmLpStats]);

  const tshareLPStats = useMemo(() => (tShareFtmLpStats ? tShareFtmLpStats : null), [tShareFtmLpStats]);
  const tombPriceInDollars = useMemo(
    () => (tombStats ? Number(tombStats.priceInDollars).toFixed(2) : null),
    [tombStats],
  );
  const tombPriceInFTM = useMemo(() => (tombStats ? Number(tombStats.tokenInFtm).toFixed(4) : null), [tombStats]);
  const tombCirculatingSupply = useMemo(() => (tombStats ? String(tombStats.circulatingSupply) : null), [tombStats]);
  const tombTotalSupply = useMemo(() => (tombStats ? String(tombStats.totalSupply) : null), [tombStats]);

  const tSharePriceInDollars = useMemo(
    () => (tShareStats ? Number(tShareStats.priceInDollars).toFixed(2) : null),
    [tShareStats],
  );
  const tSharePriceInFTM = useMemo(
    () => (tShareStats ? Number(tShareStats.tokenInFtm).toFixed(4) : null),
    [tShareStats],
  );
  const tShareCirculatingSupply = useMemo(
    () => (tShareStats ? String(tShareStats.circulatingSupply) : null),
    [tShareStats],
  );
  const tShareTotalSupply = useMemo(() => (tShareStats ? String(tShareStats.totalSupply) : null), [tShareStats]);

  const tBondPriceInDollars = useMemo(
    () => (tBondStats ? Number(tBondStats.priceInDollars).toFixed(2) : null),
    [tBondStats],
  );
  const tBondPriceInFTM = useMemo(() => (tBondStats ? Number(tBondStats.tokenInFtm).toFixed(4) : null), [tBondStats]);
  const tBondCirculatingSupply = useMemo(
    () => (tBondStats ? String(tBondStats.circulatingSupply) : null),
    [tBondStats],
  );
  const tBondTotalSupply = useMemo(() => (tBondStats ? String(tBondStats.totalSupply) : null), [tBondStats]);

  const tombLpZap = useZap({ depositTokenName: '2OMB-FTM-LP' });
  const tshareLpZap = useZap({ depositTokenName: '2SHARE-FTM-LP' });

  const StyledLink = styled.a`
    font-weight: 700;
    text-decoration: none;
  `;

  const [onPresentTombZap, onDissmissTombZap] = useModal(
    <ZapModal
      decimals={18}
      onConfirm={(zappingToken, tokenName, amount) => {
        if (Number(amount) <= 0 || isNaN(Number(amount))) return;
        tombLpZap.onZap(zappingToken, tokenName, amount);
        onDissmissTombZap();
      }}
      tokenName={'2OMB-FTM-LP'}
    />,
  );

  const [onPresentTshareZap, onDissmissTshareZap] = useModal(
    <ZapModal
      decimals={18}
      onConfirm={(zappingToken, tokenName, amount) => {
        if (Number(amount) <= 0 || isNaN(Number(amount))) return;
        tshareLpZap.onZap(zappingToken, tokenName, amount);
        onDissmissTshareZap();
      }}
      tokenName={'2SHARE-FTM-LP'}
    />,
  );

  return (
    <Page>
      <BackgroundImage />
      <Grid container spacing={3}>
        {/* Logo */}
        <Grid
          item
          xs={12}
          sm={4}
          style={{display: 'flex', justifyContent: 'center', verticalAlign: 'middle', overflow: 'hidden'}}
        >
          <img src={CashImage} style={{maxHeight: '250px', marginTop: '40px'}} />
        </Grid>
        {/* Explanation text */}
        <Grid item xs={12} sm={8}>
          <Paper>
            <Box p={4} style={{textAlign: 'center'}}>
            <h2>Welcome to 8-Bit Cats</h2>
              <p style={{fontSize: '17px'}}>
                <b>CATCOIN is an algorithmic stable coin designed to maintain a 1:1 peg to USDC</b>
              </p>
              <p style={{fontSize: '17px'}}>
              The protocol incentivizes the peg through high daily yields normally only found with volatile risk assets but with CATCOIN you get this by staking a USD pegged coin instead! Through utilizing CATCOIN in our NFT GameFi, holders will be able to earn rewards/prizes, breed the next generation, and much more!

              </p>
              <p>
                Join our{' '}
                <a href="https://discord.com/invite/gXZq9TsrGx" rel="noopener noreferrer" target="_blank" style={{color: '#BBA14F'}}>
                  Discord
                </a>{' '}
              
              </p>
            </Box>
          </Paper>



        </Grid>

        {/*<Grid container justify="center">
            <Box mt={3} style={{ width: '1000px' }}>
            <Alert variant="filled" severity="warning">
                Do your own research before investing. Investing is risky and may result in monetary loss. MiniVerse is beta software and may contain bugs. By using MiniVerse, you agree that the MiniVerse team is not responsible for any financial losses from investing in MiniVerse.
            </Alert>
            </Box>
  </Grid>*/}

        {/* TVL */}
        <Grid item xs={12} sm={4}>
          <Card style={{paddingBottom: '20px' }}>
            <CardContent align="center">
              <h2 style={{marginTop: '10px' }}>Total Value Locked</h2>
             
              <CountUp style={{ fontSize: '25px'}} end={TVL} separator="," prefix="$" />
            </CardContent>
          </Card>
        </Grid>

        {/* Wallet */}
        <Grid item xs={12} sm={8}>
          <Card style={{ height: '100%' }}>
            <CardContent align="center" style={{ }}>   
              <Button color="primary" href="/farms" variant="contained" className={'shinyButton ' + classes.button} style={{ margin: '0px' }}>
                Farm
              </Button>
              <Button color="primary" href="/boardroom" variant="contained" className={'shinyButton ' + classes.button} style={{ margin: '10px' }}>
                Stake
              </Button>
              {/*
              <Button
                color="primary"
                target="_blank"
                href="https://spookyswap.finance/swap?outputCurrency=0x57976c467608983513c9355238dc6de1B1aBbcCA&inputCurrency=0x04068da6c83afcfa0e13ba15a6696662335d5b75"
                variant="contained"
                style={{ marginRight: '10px' }}
                className={'shinyButton ' + classes.button}
              >
                Buy MvDOLLAR
              </Button>
    
              <Button color="primary" target="_blank" href="https://spookyswap.finance/swap?outputCurrency=0x04068da6c83afcfa0e13ba15a6696662335d5b75&inputCurrency=0xb011EC534d9175cD7a69aFBfc1bcc9990862c462" variant="contained" className={'shinyButton ' + classes.button} style={{ marginRight: '10px' }}>
                Buy MSHARE
              </Button>
              <Button color="primary" target="_blank" href="https://dexscreener.com/fantom/0x35bed1e2f3033395a05cd0b1b5900209ece42774" variant="contained" className={'shinyButton ' + classes.button} style={{ marginRight: '5px', fontSize: '1px !important' }}>
              MvDOLLAR Chart
              </Button>
              <Button color="primary" target="_blank" href="https://dexscreener.com/fantom/0x92a7b2a9ca7d70573e3a0b0bf9e5232c70db8a89" variant="contained" className={'shinyButton ' + classes.button} style={{ marginRight: '5px' }}>
              MSHARE Chart
            </Button>
            <Button color="primary" target="_blank" href="https://linktr.ee/miniverseclub3" variant="contained" className={'shinyButton ' + classes.button} style={{ marginRight: '5px' }}>
              Buy NFT's
            </Button>
*/}
            </CardContent>
          </Card>
        </Grid>

        {/* TOMB */}
        <Grid item xs={12} sm={4}>
          <Card>
            <CardContent align="center" style={{ position: 'relative' }}>
              <h2>CATCOIN</h2>
              <Box mt={2}>
                <CardIcon>
                  <TokenSymbol symbol="MvDOLLAR" />
                </CardIcon>

                <span style={{ fontSize: '30px', color: '#BBA14F' }}>
                  ${tombPriceInDollars ? tombPriceInDollars : '-.--'}
                </span>
              </Box>
              <span style={{ fontSize: '17px' }}>
                Market Cap: ${(tombCirculatingSupply * tombPriceInDollars).toFixed(2)} <br />
                Circulating Supply: {tombCirculatingSupply} <br />
                Total Supply: {tombTotalSupply}
              </span>
            </CardContent>
          </Card>
        </Grid>

        {/* <Grid item xs={12} sm={3}>
          <Card>
            <CardContent align="center" style={{ position: 'relative' }}>
              <h2>2OMBp</h2>
              <Box mt={2}>
                <CardIcon>
                  <TokenSymbol symbol="TOMB" />
                </CardIcon>
              </Box>
              Current Price
              <Box>
                <span style={{ fontSize: '30px' }}>{tombPriceInFTM ? tombPriceInFTM : '-.----'} FTM</span>
              </Box>
              <Box>
                <span style={{ fontSize: '16px', alignContent: 'flex-start' }}>
                  ${tombPriceInDollars ? tombPriceInDollars : '-.--'}
                </span>
              </Box>
              <span style={{ fontSize: '12px' }}>
                Market Cap: ${(tombCirculatingSupply * tombPriceInDollars).toFixed(2)} <br />
                Circulating Supply: {tombCirculatingSupply} <br />
                Total Supply: {tombTotalSupply-140000}
              </span>
            </CardContent>
          </Card>
        </Grid> */}

        {/* TSHARE */}
        <Grid item xs={12} sm={4}>
          <Card>
            <CardContent align="center" style={{ position: 'relative' }}>
              <h2>CATSHARE</h2>
              <Box mt={2}>
                <CardIcon>
                  <TokenSymbol symbol="MSHARE" />
                </CardIcon>

                <span style={{ fontSize: '30px', color: '#BBA14F' }}>${tSharePriceInDollars ? tSharePriceInDollars : '-.--'}</span>
              </Box>
              <span style={{ fontSize: '17px' }}>
                Market Cap: ${(tShareCirculatingSupply * tSharePriceInDollars).toFixed(2)} <br />
                Circulating Supply: {tShareCirculatingSupply} <br />
                Total Supply: {tShareTotalSupply} 
      </span>
            </CardContent>
          </Card>
        </Grid>

        {/* TBOND */}
       
         <Grid item xs={12} sm={4}>
          <Card>
            <CardContent align="center" style={{ position: 'relative' }}>
              <h2>CATBOND</h2>
              <Box mt={2}>
                <CardIcon>
                  <TokenSymbol symbol="MvBOND" />
                </CardIcon>
  
   
                <span style={{ fontSize: '30px', color: '#BBA14F' }}>${tBondPriceInDollars ? tBondPriceInDollars : '-.--'}</span>
              </Box>
              <span style={{ fontSize: '17px' }}>
              Market Cap: ${/*(tBondCirculatingSupply * tBondPriceInDollars).toFixed(2)*/} 0<br />
                Circulating Supply: {/*tBondCirculatingSupply*/} 0<br />
                Total Supply: {/*tBondTotalSupply*/}0
              </span>

            </CardContent>
          </Card>
        </Grid>
      
        <Grid item xs={12} sm={6}>
          <Card>
            <CardContent align="center">
              <h2>CATCOIN-USDC LP</h2>
              <Box mt={2}>
                <CardIcon>
                  <TokenSymbol symbol="MVDOLLAR-USDC-LP" />
                </CardIcon>
              </Box>
             {/* <Box mt={2}>
                <Button color="primary" disabled={false} onClick={onPresentTombZap} variant="contained">
                  Zap In!
                </Button>
            </Box>*/}
            {/*
              <Box mt={2}>
                <span style={{ fontSize: '26px', color: '#BBA14F'  }}>
                  {tombLPStats?.tokenAmount ? tombLPStats?.tokenAmount : '-.--'} CATCOIN /{' '}
                  {tombLPStats?.ftmAmount ? tombLPStats?.ftmAmount : '-.--'} USDC
                </span>
              </Box>
               <Box>${tombLPStats?.priceOfOne ? tombLPStats.priceOfOne : '-.--'}</Box>
                        */}

              <span style={{ fontSize: '17px' }}>
                Liquidity: ${tombLPStats?.totalLiquidity ? tombLPStats.totalLiquidity : '-.--'} <br />
                Total supply: {tombLPStats?.totalSupply ? tombLPStats.totalSupply : '-.--'}
              </span>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Card>
            <CardContent align="center">
              <h2>CATSHARE-USDC LP</h2>
              <Box mt={2}>
                <CardIcon>
                  <TokenSymbol symbol="MSHARE-USDC-LP" />
                </CardIcon>
              </Box>
             {/* <Box mt={2}>
                <Button color="primary" onClick={onPresentTshareZap} variant="contained">
                  Zap In!
                </Button>
          </Box>*/}
                      {/*

              <Box mt={2}>
                <span style={{ fontSize: '26px', color: '#BBA14F'  }}>
                  {tshareLPStats?.tokenAmount ? tshareLPStats?.tokenAmount : '-.--'} CATSHARE /{' '}
                  {tshareLPStats?.ftmAmount ? tshareLPStats?.ftmAmount : '-.--'} USDC
                </span>
              </Box>
              <Box>${tshareLPStats?.priceOfOne ? tshareLPStats.priceOfOne : '-.--'}</Box>
        */}
              <span style={{ fontSize: '17px' }}>
                Liquidity: ${tshareLPStats?.totalLiquidity ? tshareLPStats.totalLiquidity : '-.--'}
                <br />
                Total supply: {tshareLPStats?.totalSupply ? tshareLPStats.totalSupply : '-.--'}
              </span>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Page>
  );
};

export default New;
