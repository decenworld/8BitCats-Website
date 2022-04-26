import React, { useMemo, useContext } from 'react';
import styled from 'styled-components';

// import Button from '../../../components/Button';
import { Button, Card, CardContent } from '@material-ui/core';
// import Card from '../../../components/Card';
// import CardContent from '../../../components/CardContent';
import CardIcon from '../../../components/CardIcon';
import { AddIcon, RemoveIcon } from '../../../components/icons';
import FlashOnIcon from '@material-ui/icons/FlashOn';
import IconButton from '../../../components/IconButton';
import Label from '../../../components/Label';
import Value from '../../../components/Value';
import { ThemeContext } from 'styled-components';

import useApprove, { ApprovalState } from '../../../hooks/useApprove';
import useModal from '../../../hooks/useModal';
import useStake from '../../../hooks/useStake';
import useZap from '../../../hooks/useZap';
import useStakedBalance from '../../../hooks/useStakedBalance';
import useStakedTokenPriceInDollars from '../../../hooks/useStakedTokenPriceInDollars';
import useTokenBalance from '../../../hooks/useTokenBalance';
import useWithdraw from '../../../hooks/useWithdraw';
import { getDisplayBalance1 } from '../../../utils/formatBalance1';
import { getDisplayBalance } from '../../../utils/formatBalance';

import DepositModal from './DepositModal';
import WithdrawModal from './WithdrawModal';
import ZapModal from './ZapModal';
import TokenSymbol from '../../../components/TokenSymbol';
import { Bank } from '../../../tomb-finance';

interface StakeProps {
  bank: Bank;
}

const Stake: React.FC<StakeProps> = ({ bank }) => {
  const [approveStatus, approve] = useApprove(bank.depositToken, bank.address);
  console.log(bank);
  const { color: themeColor } = useContext(ThemeContext);
  const tokenBalance = useTokenBalance(bank.depositToken);
  const stakedBalance = useStakedBalance(bank.contract, bank.poolId);
  const stakedTokenPriceInDollars = useStakedTokenPriceInDollars(bank.depositTokenName, bank.depositToken);
  const tokenPriceInDollars = useMemo(
    () => (stakedTokenPriceInDollars ? stakedTokenPriceInDollars : null),
    [stakedTokenPriceInDollars],
  );
  const earnedInDollars = (
    Number(tokenPriceInDollars) * Number(stakedBalance)
  ).toFixed(2);


  const { onStake } = useStake(bank);
  const { onZap } = useZap(bank);
  const { onWithdraw } = useWithdraw(bank);

  const [onPresentDeposit, onDismissDeposit] = useModal(
    <DepositModal
      max={tokenBalance}
      decimals={bank.depositToken.decimal}
      onConfirm={(amount) => {
        if (Number(amount) <= 0 || isNaN(Number(amount))) return;
        onStake(amount);
        onDismissDeposit();
      }}
      tokenName={bank.depositTokenName}
    />,
  );

  const [onPresentZap, onDissmissZap] = useModal(
    <ZapModal
      decimals={bank.depositToken.decimal}
      onConfirm={(zappingToken, tokenName, amount) => {
        if (Number(amount) <= 0 || isNaN(Number(amount))) return;
        onZap(zappingToken, tokenName, amount);
        onDissmissZap();
      }}
      tokenName={bank.depositTokenName}
    />,
  );

  const [onPresentWithdraw, onDismissWithdraw] = useModal(
    <WithdrawModal
      max={stakedBalance}
      decimals={bank.depositToken.decimal}
      onConfirm={(amount) => {
        if (Number(amount) <= 0 || isNaN(Number(amount))) return;
        onWithdraw(amount);
        onDismissWithdraw();
      }}
      tokenName={bank.depositTokenName}
    />,
  );

  return (
    <Card>
      <CardContent>
        <StyledCardContentInner>
          <StyledCardHeader>
            <CardIcon>
              <TokenSymbol symbol={bank.depositToken.symbol} size={54} />
            </CardIcon>
           {bank.depositTokenName === 'MVDOLLAR-USDC-LP'|| bank.depositTokenName === 'MSHARE-USDC-LP' || bank.depositTokenName === 'MDOLLAR-MSHARE-LP' ? <Value value={getDisplayBalance1(stakedBalance, bank.depositToken.decimal)} /> : <Value value={getDisplayBalance(stakedBalance, bank.depositToken.decimal)} />}
           {bank.depositTokenName === 'USDC' ?<Label text={`≈ $${(Number(earnedInDollars)/1e6).toFixed(2)}`} /> : <Label text={`≈ $${(Number(earnedInDollars)/1e18).toFixed(2)}`} />}
            <Label text={`${bank.name} Staked`} />
          </StyledCardHeader>
          <StyledCardActions>
            {approveStatus !== ApprovalState.APPROVED ? (
              <Button
                disabled={
                  bank.closedForStaking ||
                  approveStatus === ApprovalState.PENDING ||
                  approveStatus === ApprovalState.UNKNOWN 
                }
                onClick={approve}
                color="primary"
                variant="contained"
                style={{ marginTop: '20px' }}
              >
                {`Approve ${bank.name}`}
              </Button>
            ) : (
              <>
                <IconButton onClick={onPresentWithdraw}>
                  <RemoveIcon />
                </IconButton>
                <StyledActionSpacer />
 
                <IconButton
                  disabled={bank.closedForStaking}
                  onClick={() => (bank.closedForStaking ? null : onPresentDeposit())}
                >
                  <AddIcon />
                </IconButton>
              </>
            )}
          </StyledCardActions>
        </StyledCardContentInner>
      </CardContent>
    </Card>
  );
};

const StyledCardHeader = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
`;
const StyledCardActions = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 28px;
  width: 100%;
`;

const StyledActionSpacer = styled.div`
  height: ${(props) => props.theme.spacing[4]}px;
  width: ${(props) => props.theme.spacing[4]}px;
`;

const StyledCardContentInner = styled.div`
  align-items: center;
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: space-between;
`;

export default Stake;
