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
      background: '#e0e3bd',
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
    textBar: {
      flex: "1 1 0%",
      width: "0",
      justifyContent: "flex-start",
    alignItems: "center",
    display: "flex",
    },
  hide: {
    display: 'none',
  },
  toolbar: {
      paddingTop: "1rem",
      paddingBottom: "1.25rem",
  //    marginLeft: "auto",
      marginRight: "auto",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      maxWidth: "1460px",
  },
  toolbarTitle: {
    fontFamily: 'monospace',
    fontSize: '30px',
    flexGrow: 1,
  },
    connectWallet: {
    boxShadow: 'var(--tw-ring-offset-shadow,0 0 #0000),var(--tw-ring-shadow,0 0 #0000),var(--tw-shadow)',
    '--tw-shadow': '0px 1px 2px rgba(16,24,40,.05)',
    '--tw-shadow-color': 'var(--color-black)',
    '--tw-text-opacity': 1,
    color: 'rgb(243 232 255/var(--tw-text-opacity))',
    fontWeight: 700,
    fontSize: '1.5rem',
    lineHeight: '2rem',
    fontFamily: 'Rubik',
    paddingLeft: '28px',
    paddingRight: '28px',
    '--tw-bg-opacity': 1,
    backgroundColor: 'rgb(125 80 230/var(--tw-bg-opacity))',
    borderRadius: '4px',
    width: '100%',
    height: '100%',
    cursor: 'pointer',
    WebkitAppearance: 'button',
    textTransform: 'none',
    margin: 0,
    padding: 0,
  },
  link: {
    transitionProperty: 'color,background-color,border-color,text-decoration-color,fill,stroke,-webkit-text-decoration-color',
    transitionTimingFunction: 'cubic-bezier(.4,0,.2,1)',
    transitionDuration: '.15s',
    '--tw-text-opacity': 1,
    color: 'rgb(243 232 255/var(--tw-text-opacity))',
    marginRight: '1rem',
    fontWeight: 700,
    fontSize: '2rem',
    paddingLeft: '1.5rem',
    lineHeight: '2rem',
    whiteSpace: 'nowrap',
    cursor: 'pointer',
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
              <img alt="MiniVerse" src={mvLogo} height="50px" width="350px" style={{display: 'inherit', paddingLeft: '7rem', marginTop: '5px'}} />
              </a> 
            </Typography>
          
       
            <Box className={classes.textBar} style={{paddingLeft: "7rem"}} >
              <Link color="textPrimary" to="/" className={classes.link}>
                Home
              </Link>
                                <Link color="textPrimary" to="/game" className={classes.link}>
                Game
              </Link>
                                <Link color="textPrimary" to="/seal" className={classes.link}>
                Mint
              </Link>
                                            <Link color="textPrimary" to="/catstatue" className={classes.link}>
                Golden Statue
              </Link>
                                    <Link color="textPrimary" to="/diamondstone" className={classes.link}>
                Diamond Stone
              </Link>
        
           
            
       
                  
              <div style={{paddingLeft: "25rem"}}>
   <AccountButton text="Connect" />
   </div>



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
                                <ListItemLink primary="GAME" to="/game" />
                <ListItemLink primary="MINT" to="/seal" />
                <ListItemLink primary="DIAMOND STONE" to="/diamondstone" />
                <ListItemLink primary="CAT STATUE" to="/catstatue" />
            




                
              </List>

            </Drawer>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Nav;
