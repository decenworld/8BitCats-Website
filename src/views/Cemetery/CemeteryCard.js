import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import { Box, Button, Card, CardActions, CardContent, Typography, Grid } from '@material-ui/core';

import TokenSymbol from '../../components/TokenSymbol';
import useStatsForPool from '../../hooks/useStatsForPool';
import AprModal from './AprModal';
import SwapVerticalCircleIcon from '@material-ui/icons/SwapVerticalCircle';


const CemeteryCard = ({ bank }) => {
  const statsOnPool = useStatsForPool(bank);
  const [modalOpen, setModalOpen] = useState(false);

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleOpenModal = () => {
    setModalOpen(true);
  };
  return (
    <Grid item xs={12} md={4} lg={4}>
      <Card variant="outlined">
        <CardContent>
       <AprModal
            open={modalOpen}
            handleClose={handleCloseModal}
            statsOnPool={statsOnPool}
            coin={bank.depositTokenName}
       />
          <Box style={{ position: 'relative' }}>
          <Box
              style={{
                position: 'absolute',
                right: '5px',
                top: '-5px',
                height: '48px',
                width: '48px',
                borderRadius: '40px',
                backgroundColor: 'rgba(255,255,255,0.6)',
                alignItems: 'center',
                display: 'flex',
                justifyContent: 'center',
              }}
            >
              <TokenSymbol size={32} symbol={bank.depositTokenName} />
            </Box>
            <Typography variant="h5" component="h2">
              {/* changed to bank name */}
              {bank.name}
            </Typography>
            <Typography color="textSecondary">
              {/* {bank.name} */}
              Earn {bank.earnTokenName2}
            </Typography>
            <Typography color="textSecondary">
            <b>Daily APR:</b> {bank.closedForStaking ? '0.00' : statsOnPool?.dailyAPR}%<br></br>
            <b>Yearly APR:</b> {bank.closedForStaking ? '0.00' : statsOnPool?.yearlyAPR}%
            </Typography>
           <Box
              onClick={handleOpenModal}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '5px',
                cursor: 'pointer',
              }}
            >
              <Typography><b><u>APR Calc</u></b></Typography> <SwapVerticalCircleIcon />
            </Box>
          </Box>
        </CardContent>
        <CardActions style={{ justifyContent: 'flex-end' }}>
          <Button color="primary" size="small" variant="contained" component={Link} to={`/farms/${bank.contract}`}>
            Stake
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
};

export default CemeteryCard;
