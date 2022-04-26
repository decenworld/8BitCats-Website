import React, { useEffect } from 'react';
import styled from 'styled-components';

import { useParams } from 'react-router-dom';
import { useWallet } from 'use-wallet';
import { makeStyles } from '@material-ui/core/styles';

import { Box, Button, Card, CardContent, Typography, Grid } from '@material-ui/core';

import PageHeader from '../../components/PageHeader';
import Spacer from '../../components/Spacer';
import UnlockWallet from '../../components/UnlockWallet';
import Harvest from './components/Harvest';
import Stake from './components/Stake';
import useBank from '../../hooks/useBank';
import useStatsForPool from '../../hooks/useStatsForPool';
import useRedeem from '../../hooks/useRedeem';
import { Bank as BankEntity } from '../../tomb-finance';
import useTombFinance from '../../hooks/useTombFinance';

import { Alert } from '@material-ui/lab';

const useStyles = makeStyles((theme) => ({
  gridItem: {
    height: '100%',
    [theme.breakpoints.up('md')]: {
      height: '90px',
    },
  },
}));

const Bank: React.FC = () => {
  useEffect(() => window.scrollTo(0, 0));
  const classes = useStyles();
  const { bankId } = useParams();
  const bank = useBank(bankId);

  const { account } = useWallet();
  const { onRedeem } = useRedeem(bank);
  const statsOnPool = useStatsForPool(bank);

  return account && bank ? (
    <>
      <PageHeader
        icon="🏦"
        // subtitle={`Deposit ${bank?.depositTokenName} and earn ${bank?.earnTokenName}`}
        title={bank?.name}
      />
      <Box>
      {bank.genesisFinished ? 
          <Alert variant="filled" severity="warning" style={{ maxWidth: "600px", marginBottom: "50px", marginLeft: "auto", marginRight: "auto" }}>
            Genesis Pools have ENDED. Please withdraw your funds.
          </Alert> : <></>}
        <Grid container justify="center" spacing={3} style={{ marginBottom: '50px' }}>
          <Grid item xs={12} md={2} lg={2} className={classes.gridItem}>
            <Card className={classes.gridItem}>
              <CardContent style={{ textAlign: 'center' }}>
                <Typography>APR</Typography>
                <Typography>{bank.closedForStaking || bank.genesisFinished ? '0.00' : statsOnPool?.yearlyAPR}%</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={2} lg={2} className={classes.gridItem}>
            <Card className={classes.gridItem}>
              <CardContent style={{ textAlign: 'center' }}>
                <Typography>Daily APR</Typography>
                <Typography>{bank.closedForStaking || bank.genesisFinished ? '0.00' : statsOnPool?.dailyAPR}%</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={2} lg={2} className={classes.gridItem}>
            <Card className={classes.gridItem}>
              <CardContent style={{ textAlign: 'center' }}>
                <Typography>TVL</Typography>
                <Typography>${statsOnPool?.TVL}</Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
      <Box mt={5}>
        <StyledBank>
          <StyledCardsWrapper>
            <StyledCardWrapper>
              <Harvest bank={bank} />
            </StyledCardWrapper>
            <Spacer />
            <StyledCardWrapper>{<Stake bank={bank} />}</StyledCardWrapper>
          </StyledCardsWrapper>
          <Spacer size="lg" />
          {bank.depositTokenName.includes('LP') && <LPTokenHelpText bank={bank} />}
          <Spacer size="lg" />
          <div>
            <Button onClick={onRedeem} color="primary" variant="contained">
              Claim & Withdraw
            </Button>
          </div>
          <Spacer size="lg" />
        </StyledBank>
      </Box>
    </>
  ) : !bank ? (
    <BankNotFound />
  ) : (
    <UnlockWallet />
  );
};

const LPTokenHelpText: React.FC<{ bank: BankEntity }> = ({ bank }) => {
  const tombFinance = useTombFinance();
  const tombAddr = tombFinance.TOMB.address;
  const tshareAddr = tombFinance.TSHARE.address;

  let pairName: string;
  let uniswapUrl: string;
  if (bank.depositTokenName.startsWith("MVDOLLAR-USDC")) {
    pairName = 'CATCOIN-USDC pair';
    uniswapUrl = 'https://spookyswap.finance/add/0x04068da6c83afcfa0e13ba15a6696662335d5b75/0x8CcD162E5997363Dc2101371B3B09f316D012306';
  } else if (bank.depositTokenName.startsWith("MSHARE-USDC")) {
    pairName = 'CATSHARE-USDC pair';
    uniswapUrl = 'https://spookyswap.finance/add/0x04068da6c83afcfa0e13ba15a6696662335d5b75/0x6E88D9A9D326bAC2AdE987b9Cd49c571Ec8a8A9e';
  } else {
    pairName = "MVDOLLAR-MSHARE pair";
    uniswapUrl = 'https://spookyswap.finance/add/0x57976c467608983513c9355238dc6de1B1aBbcCA/0xb011EC534d9175cD7a69aFBfc1bcc9990862c462';
  }
 
  return (
    <Card>
      <CardContent>
        <StyledLink href={uniswapUrl} target="_blank">
          {`Provide or remove liquidity for ${pairName} on SpookySwap`}
        </StyledLink>
      </CardContent>
    </Card>
  );
};

const BankNotFound = () => {
  return (
    <Center>
      <PageHeader icon="🏚" title="Not Found" subtitle="You've hit a bank just robbed by unicorns." />
    </Center>
  );
};

const StyledBank = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  @media (max-width: 768px) {
    width: 100%;
  }
`;

const StyledLink = styled.a`
  font-weight: 700;
  text-decoration: none;
  color: #fff;
`;

const StyledCardsWrapper = styled.div`
  display: flex;
  width: 600px;
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

const Center = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export default Bank;
