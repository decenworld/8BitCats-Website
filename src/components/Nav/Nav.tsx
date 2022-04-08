import React from 'react';
import clsx from 'clsx';
import { Link } from 'react-router-dom';
import {
  AppBar,
  Box,
  Drawer,
  IconButton,
  Toolbar,
  Typography,
  useMediaQuery,
  List,
  ListItem,
  ListItemText,
  Divider,
} from '@material-ui/core';

import ListItemLink from '../ListItemLink';
import mvLogo from '../../assets/img/MINIVERSELOGO.png';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import AccountButton from './AccountButton';

const useStyles = makeStyles((theme) => ({
  '@global': {
    ul: {
      margin: 0,
      padding: 0,
      listStyle: 'none',
    },
  },
  appBar: {
    color: '#e0e3bd',
    'background-color': 'rgba(44, 62, 80, 0.65)',
    borderBottom: '1px solid rgba(52, 152, 219, 0.65)',
    padding: '0',
    marginBottom: '3rem',
  },
  drawer: {
    width: 240,
    flexShrink: 0,
  },
  drawerPaper: {
    width: 240,
  },
  hide: {
    display: 'none',
  },
  toolbar: {
    flexWrap: 'wrap',
  },
  toolbarTitle: {
    fontFamily: 'monospace',
    fontSize: '30px',
    flexGrow: 1,
  },
  link: {
    textTransform: 'uppercase',
    color: '#fff',
    fontSize: '16px',
    margin: theme.spacing(1, 2),
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'none',
      color: '#BBA14F',
    },
  },
  brandLink: {
    textDecoration: 'none',
    color: '#e0e3bd',
    '&:hover': {
      textDecoration: 'none',
    },
  },
}));

const Nav = () => {
  const matches = useMediaQuery('(min-width:900px)');
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };



  return (
    <AppBar position="sticky" elevation={0} className={classes.appBar}>
      <Toolbar className={classes.toolbar}>
        {matches ? (
          <>
            <Typography variant="h6" color="inherit" noWrap className={classes.toolbarTitle}>     
            <a rel="noopener noreferrer" href="https://mvfinance.club/" className={classes.link}>
              <img alt="MiniVerse" src={mvLogo} height="50px" style={{marginTop: '15px'}} />
              </a> 
            </Typography>
            
            <Box mr={5}>
              <Link color="textPrimary" to="/" className={classes.link}>
                Home
              </Link>
              <Link color="textPrimary" to="/farms" className={classes.link}>
                Farms
              </Link>
              <Link color="textPrimary" to="/boardroom" className={classes.link}>
                Boardroom
              </Link>
              <a rel="noopener noreferrer" target='_blank' href="https://linktr.ee/miniverseclub2" className={classes.link}>
              Compounder
              </a>  
              <a rel="noopener noreferrer" target='_blank' href="https://slot.mvfinance.club/" className={classes.link}>
              Slots
              </a>  
              <div className={'dropdown'}>
                <button className={'dropbtn'}>NFT STAKING</button>
                  <div className={'dropdown-content'}>
                    <Link color="textPrimary" to="/minichilla" className={classes.link}>
                      Minichilla
                    </Link>
                    <Link color="textPrimary" to="/miniguinea" className={classes.link}>
                      Miniguinea
                    </Link>
                    <Link color="textPrimary" to="/miniland" className={classes.link}>
                      Miniland
                    </Link>
                  </div>
              </div>
              <Link color="textPrimary" to="/bonds" className={classes.link}>
                Bonds
              </Link>
              <Link color="textPrimary" to="/strategies" className={classes.link}>
                Strategy
              </Link>
              <Link color="textPrimary" to="/raffle" className={classes.link}>
                Raffle
              </Link>

              {/* <Link color="textPrimary" to="/dividends" className={classes.link}>
                Dividends
              </Link> */}
              {/* <Link color="textPrimary" to="/sbs" className={classes.link}>
                SBS
              </Link>
              <Link color="textPrimary" to="/liquidity" className={classes.link}>
                Liquidity
              </Link>
              <Link color="textPrimary" to="/regulations" className={classes.link}>
                Regulations
              </Link> */}
             
              {/* <a target="_blank" href="https://docs.2omb.finance/contracts/tokens" className={classes.link}>
                Contracts
              </a> */}
              <a target="_blank" href="https://miniversefinance.gitbook.io/docs/" className={classes.link}>
                Docs
              </a>

            </Box>
            <AccountButton text="Connect" />
          </>
        ) : (
          <>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              className={clsx(open && classes.hide)}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap>
            <a rel="noopener noreferrer" href="https://mvfinance.club/" className={classes.link}>
              Miniverse Finance
              </a>
            </Typography>

            <Drawer
              className={classes.drawer}
              onEscapeKeyDown={handleDrawerClose}
              onBackdropClick={handleDrawerClose}
              variant="temporary"
              anchor="left"
              open={open}
              classes={{
                paper: classes.drawerPaper,
              }}
            >
              <div>
                <IconButton onClick={handleDrawerClose}>
                  {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                </IconButton>
              </div>
              <Divider />
              <List>
                <ListItemLink primary="Home" to="/" />
                <ListItemLink primary="Farms" to="/farms" />
                <ListItemLink primary="Boardroom" to="/boardroom" />
                <ListItem button target='_blank' component="a" href="https://linktr.ee/miniverseclub2">
                  <ListItemText>Auto Compounder</ListItemText>
                </ListItem>  
                <ListItemLink primary="MiniChilla" to="/minichilla" />
                <ListItemLink primary="MiniGuinea" to="/miniguinea" />
                <ListItemLink primary="MiniLand" to="/miniland" />
                <ListItem button target='_blank' component="a" href="https://slot.mvfinance.club/">
                  <ListItemText>Slots</ListItemText>
                </ListItem> 
                <ListItemLink primary="Bonds" to="/bonds" />
                <ListItemLink primary="Strategy" to="/strategies" />
                <ListItemLink primary="Raffle" to="/raffle" />
               
                <ListItem button component="a" href="https://miniversefinance.gitbook.io/docs/">
                  <ListItemText>Docs</ListItemText>
                </ListItem>
                <ListItem style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <AccountButton text="Connect" />
                </ListItem>
              </List>
            </Drawer>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Nav;
