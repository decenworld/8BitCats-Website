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
    fontSize: '14px',
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
              <a rel="noopener noreferrer" href="https://8bitcats.com" className={classes.link}>
                <img alt="MiniVerse" src={mvLogo} height="50px" style={{ marginTop: '15px' }} />
              </a>
            </Typography>
            <AccountButton text="Connect" />
            <Box mr={5}>
              <Link color="textPrimary" to="/" className={classes.link}>
                Home
              </Link>
              <Link color="textPrimary" to="/boardroom" className={classes.link}>
                Boardroom
              </Link>
              <Link color="textPrimary" to="/farms" className={classes.link}>
                Farms
              </Link>
              <Link color="textPrimary" to="/catstatue" className={classes.link}>
                Golden Statue
              </Link>
              <Link color="textPrimary" to="/diamondstone" className={classes.link}>
                Diamond Stone
              </Link>
              <Link color="textPrimary" to="/3dcat" className={classes.link}>
                3D Cats
              </Link>
              <Link color="textPrimary" to="/seal" className={classes.link}>
                Seals
              </Link>
              <Link color="textPrimary" to="/penguin" className={classes.link}>
                Penguins
              </Link>
              <Link color="textPrimary" to="/owl" className={classes.link}>
                Owls
              </Link>
              <Link color="textPrimary" to="/trippycat" className={classes.link}>
                Trippycat
              </Link>
              <Link color="textPrimary" to="/cats" className={classes.link}>
                8-Bit Cats
              </Link>
              <Link color="textPrimary" to="/cryptoman" className={classes.link}>
                Cryptoman
              </Link>
              <Link color="textPrimary" to="/fantomllama" className={classes.link}>
                Fantom Llama
              </Link>
              <Link color="textPrimary" to="/catland" className={classes.link}>
                CatLand
              </Link>
              <Link color="textPrimary" to="/info" className={classes.link}>
                Info
              </Link>
              <Link color="textPrimary" to={{ pathname: `https://8bitcats.gitbook.io/whitepaper/` }} target="_blank" className={classes.link}>
                Whitepaper
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

            </Box>
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
              <a rel="noopener noreferrer" href="https://8bitcats.com/" className={classes.link}>
                8-Bit Cats
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
                <ListItem style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <AccountButton text="Connect" />
                </ListItem>
                <ListItemLink primary="HOME" to="/" />
                <ListItemLink primary="BOARDROOM" to="/boardroom" />
                <ListItemLink primary="FARMS" to="/farms" />
                <ListItemLink primary="DIAMOND STONE" to="/diamondstone" />
                <ListItemLink primary="CAT STATUE" to="/catstatue" />
                <ListItemLink primary="3D CAT" to="/3dcat" />
                <ListItemLink primary="SEALS" to="/seal" />
                <ListItemLink primary="TRIPPY CAT" to="/trippycat" />
                <ListItemLink primary="PENGUINS" to="/penguin" />
                <ListItemLink primary="OWLS" to="/owl" />
                <ListItemLink primary="8-BIT CATS" to="/cats" />
                <ListItemLink primary="CRYPTOMAN" to="/cryptoman" />
                <ListItemLink primary="FANTOM LLAMA" to="/fantomllama" />
                <ListItemLink primary="CAT LAND" to="/catland" />
                <ListItemLink primary="INFO" to="/info" />
                <ListItem button component="a" href="https://8bitcats.gitbook.io/whitepaper/">
                  <ListItemText primary="WHITEPAPER" />
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
