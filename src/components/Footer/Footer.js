import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Container, Grid, Typography, Link } from '@material-ui/core';
import TwitterImage from '../../assets/img/twitter.svg';
import GithubImage from '../../assets/img/github.svg';
import TelegramImage from '../../assets/img/telegram.svg';
import DiscordImage from '../../assets/img/discord.svg';
import YoutubeImage from '../../assets/img/youtube.svg';

const useStyles = makeStyles((theme) => ({
  footer: {
    position: 'absolute',
    bottom: '0',
    paddingTop: '15px',
    paddingBottom: '15px',
    width: '100%',
    color: 'white',
    backgroundColor: 'rgba(0,0,0,0)',
    textAlign: 'center',
    height: '1.3rem',
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

const Footer = () => {
  const classes = useStyles();
  return (
    <footer className={classes.footer}>
      <Container maxWidth="lg">
        <Grid container>
          <Grid item xs={6}>
            <Typography variant="body2" color="textSecondary" align="left">
              <Link color="inherit" href="/">
                8-BitCats.com 2022
              </Link>
            </Typography>
          </Grid>
          <Grid item xs={6} style={{ textAlign: 'right' }}>
            <a
              href="https://twitter.com/8bitcatsftm"
              rel="noopener noreferrer"
              target="_blank"
              className={classes.link}
            >
              <img alt="twitter" src={TwitterImage} className={classes.img} />
            </a>
           
            <a
              href="https://github.com/decenworld"
              rel="noopener noreferrer"
              target="_blank"
              className={classes.link}
            >
              <img alt="github" src={GithubImage} className={classes.img} />
            </a>
        
          </Grid>
        </Grid>
      </Container>
    </footer>
  );
};

export default Footer;
