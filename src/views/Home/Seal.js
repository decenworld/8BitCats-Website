import React, { useEffect, useState } from 'react';
import { useWallet } from 'use-wallet';
import { Route, Switch, useRouteMatch } from 'react-router-dom';

import Bank from '../Bank';

import { Box, Grid, LinearProgress, Button } from '@material-ui/core';
import { withStyles, makeStyles } from '@material-ui/styles';

import Page from '../../components/Page';
import { createGlobalStyle } from 'styled-components';

//import useBanks from '../../hooks/useBanks';
import useTombFinance from '../../hooks/useTombFinance';

import PitImage from './background.png';
import Frontlogo from '../../assets/img/frontlogo.svg';

import Nav from '../../components/Nav/Nav';

import Penguinimage from '../../assets/img/penguinimage.png';

// Import custom css
import "./style.css";
import "./tailwind.css"
import { BorderLeft } from '@material-ui/icons';

const BackgroundImage = createGlobalStyle`
  body {
      background-color: rgb(49, 49, 94) !important;


    background-size: cover !important;
  }
`;


const GameBanner = createGlobalStyle`
.body {
      padding-left: 10;
    padding-right: 10;
  @media screen and (max-width: 600px) {
    padding-left: 0;
    padding-right: 0;
  }
}
`;

const BorderLinearProgress = withStyles((theme) => ({
  root: {
    height: 10,
    borderRadius: 5,
  },
  colorPrimary: {
    backgroundColor: theme.palette.grey[theme.palette.type === 'light' ? 200 : 700],
  },
  bar: {
    borderRadius: 5,
    backgroundColor: '#1a90ff',
  },
}))(LinearProgress);

const useStyles = makeStyles((theme) => ({
  stakeButtons: {
    marginRight: '1rem',
  }
}));

const Fantomllama = () => {
//  const [banks] = useBanks();
  const { path } = useRouteMatch();
  const { account, /*ethereum*/ } = useWallet();
//  const activeBanks = banks.filter((bank) => !bank.finished);
  const classes = useStyles();
  const tombFinance = useTombFinance();
  const [nftsInWallet, setNftsInWallet] = useState([]);
  const [nftsStaked, setNftsStaked] = useState([]);
  const [nftTotalSupply, setNftTotalSupply] = useState(1);
  const [nftStakedTotalSupply, setNftStakedTotalSupply] = useState(0);
  const [indexOfSelectedNft, setIndexOfselectedNft] = useState(-1);
  const [indexOfSelectedNftInWallet, setIndexOfselectedNftInWallet] = useState(-1);
  const [reward, setReward] = useState(0);
// Minting process
const [mintAmount, setMintAmount] = useState(3);

  const reloadNfts = async () => {
    if (account) {
      let nftsInWalletWithJSON = await tombFinance.getNFTsInWallet(account, 'sealNFT');
      setNftsInWallet(await Promise.all(
        nftsInWalletWithJSON.map(async nft => {
          return {
            tokenId: nft.tokenId,
            ...await getImageFromJSON(nft.metaDataJson)
          }
        })
      ));

      let nftsStakedWithJSON = await tombFinance.getNFTsStaked(account, 'sealNFT', 'sealStakingNFT');
      setNftsStaked(await Promise.all(
        nftsStakedWithJSON.map(async nft => {
          return {
            tokenId: nft.tokenId,
            ...await getImageFromJSON(nft.metaDataJson)
          }
        })
      ));

      setNftTotalSupply(await tombFinance.nftTotalSupply('sealNFT'));
      setNftStakedTotalSupply(await tombFinance.nftStakedTotalSupply('sealNFT', 'sealStakingNFT'));
    }
  }

  useEffect(() => {
    reloadNfts();
  }, [tombFinance, account]);

  
  const getImageFromJSON = async (json) => {
    try {
      const { image, name} = await (await fetch('https://artion3.mypinata.cloud/ipfs/' + json.replace('ipfs://', ''))).json();
      return {
        image: 'https://artion3.mypinata.cloud/ipfs/' + image.replace('ipfs://', ''),
        name,
      };
    } catch(e) {
      return await getImageFromJSON(json);
    }
  }

  const selectNftStaked = async (index) => {
    setIndexOfselectedNft(index);
    setIndexOfselectedNftInWallet(-1);
    setReward(await tombFinance.calculateRewards(account, [nftsStaked[index].tokenId], 'sealStakingNFT'));
  }

  const selectNftInWallet = async (index) => {
    setIndexOfselectedNftInWallet(index);
    setIndexOfselectedNft(-1);
  }

  const stake = async () => {
    await tombFinance.stakeNfts([nftsInWallet[indexOfSelectedNftInWallet].tokenId], 'sealStakingNFT');
    reloadNfts();
  }

    const stakeAll = async () => {
    let nftsInWalletWithJSON = await tombFinance.getNFTsInWallet(account, 'sealNFT');
      for (const nft of nftsInWalletWithJSON){
        await tombFinance.stakeNfts([nft.tokenId], 'sealStakingNFT');
      }
    console.log(nftsInWalletWithJSON)
    reloadNfts();
  }

  const unStake = async () => {
    await tombFinance.unStake(nftsStaked[indexOfSelectedNft].tokenId, 'sealStakingNFT');
    reloadNfts();
  }

  const claim = async () => {
    await tombFinance.claim(nftsStaked[indexOfSelectedNft].tokenId, 'sealStakingNFT');
    setReward(await tombFinance.calculateRewards(account, [nftsStaked[indexOfSelectedNft].tokenId], 'sealStakingNFT'));
  }

  const approve = async () => {
    await tombFinance.approve('sealNFT', 'sealStakingNFT');
  }

  const mint = async (amount) => {
    console.log(account);
    await tombFinance.mintSeal(account, amount);


}

  const decrementMintAmount = () => {
    let newMintAmount = mintAmount - 1;
    if (newMintAmount < 1) {
      newMintAmount = 1;
    }
    setMintAmount(newMintAmount);
  };

  const incrementMintAmount = () => {
    let newMintAmount = mintAmount + 1;
    if (newMintAmount > 50) {
      newMintAmount = 50;
    }
    setMintAmount(newMintAmount);
  };

  const images = [
    require('../../assets/img/1.jpg'),
    require('../../assets/img/2.jpg'),
    require('../../assets/img/3.jpg'),
    require('../../assets/img/4.jpg'),
    require('../../assets/img/5.jpg'),
    require('../../assets/img/6.jpg'),
    require('../../assets/img/7.jpg'),
    require('../../assets/img/8.jpg'),
    require('../../assets/img/9.jpg'),
    require('../../assets/img/10.jpg'),
    require('../../assets/img/11.jpg'),
    require('../../assets/img/12.jpg'),
    require('../../assets/img/13.jpg'),
    require('../../assets/img/14.jpg'),
    require('../../assets/img/15.jpg'),
    require('../../assets/img/16.jpg'),
  ];

  const imageRows = [];
  for (let i = 0; i < images.length; i += 8) {
    imageRows.push(images.slice(i, i + 8));
  };

  
  return (
    <Switch>
      <Page>
        <Route exact path={path}>
          <BackgroundImage />
          <Nav></Nav>
<div  style={{display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column"}}>
  <img className="welcome" style={{width: '30%', height:'auto'}} src={require('../../assets/img/frontlogo.png')} />
    <style>{`
  .welcome {
  width: 30% !important;
}

    @media screen and (max-width: 800px) {
      .welcome {
  width: 100% !important;

      }
    }
  `}</style>
  <div style={{textAlign: "center", fontSize: "1.125rem", lineHeight: "1.75rem", color: "rgb(163 163 183)", gap: "1rem", paddingBottom: "1rem"}}>
    A fun and playful world.<br />Built on good vibes and driven by the community.
  </div>
</div>

<div className="GameBanner" style={{align: "center",  paddingBottom: "5rem", position: "relative"}}>
  <img style={{width: '100%', height:'auto', imageRendering: 'pixelated'}} src={require('../../assets/img/gameimg2.png')} />
  <div  style={{position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)"}}>

    <a className="buttonn" class="inline-block text-white font-bold bg-purple-primary p-4 px-8 rounded shadow-[0.5rem_0.5rem_#372B79] shadow-dark hover:bg-purple-hover" href="https://8bitcats.com/game" target="_blank" rel="noreferrer">Explore </a>
       <style>{`


    @media screen and (max-width: 800px) {
      .buttonn {
        height: 10px !important;
       
      }
    }
  `}</style>
  </div>

  <style>{`
  .GameBanner {
  padding-left: 10rem !important;
  padding-right: 10rem !important;
}

    @media screen and (max-width: 800px) {
      .GameBanner {
        padding-left: 0 !important;
        padding-right: 0 !important;
      }
    }
  `}</style>
</div>



<div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
  <div className="Sealimg" style={{ paddingLeft: '20rem', paddingRight: '5rem', minWidth: '300px' }}>
    <div style={{ width: 'auto' }}>
      <span style={{
        boxSizing: 'border-box',
        display: 'inline-block',
        overflow: 'hidden',
        width: 'initial',
        height: 'initial',
        background: 'none',
        opacity: 1,
        border: 0,
        margin: 0,
        padding: 0,
        position: 'relative',
        maxWidth: '100%'
      }}>
        <img style={{ width: '100%', height: 'auto' }} src={require('../../assets/img/11.jpg')} />
      </span>
      <div style={{ paddingTop: '1rem', paddingLeft: '2.5rem', paddingRight: '2.5rem' }}>
        <div style={{ marginLeft: '5rem' }} className='3xl:ml-20'></div>
        <div style={{ paddingBottom: '2rem' }} className='2xl:pb-20'></div>
        <div style={{ width: '530px' }} className='2xl:w-[530px]'>
        </div>
      </div>
    </div>
      <style>{`
  .Sealimg {
  padding-left: 20rem !important;
  padding-right: 5rem !important;
}

    @media screen and (max-width: 800px) {
      .Sealimg {
        padding-left: 0 !important;
        padding-right: 0 !important;
      }
    }
  `}</style>
  </div>
  <div className="Sealtop" style={{ paddingLeft: '2.5rem', paddingRight: '2.5rem', minWidth: '300px' }}>
    <div style={{ width: 'auto' }}>
      <span style={{
        boxSizing: 'border-box',
        display: 'inline-block',
        overflow: 'hidden',
        width: 'initial',
        height: 'initial',
        background: 'none',
        opacity: 1,
        border: 0,
        margin: 0,
        padding: 0,
        position: 'relative',
        maxWidth: '70%',
        marginLeft: 'auto',
        marginRight: 'auto'
      }}>
        <div className="Sealtext" style={{paddingLeft: "10rem"}}>
          <div style={{fontSize:"3.75rem", lineHeight: "1", color: "rgb(255 255 255)", paddingBottom: "1rem"}}>Seals</div>
          <div style={{fontSize:"1.25rem", lineHeight: "1.75rem", color: "rgb(118 118 148)"}}>In the game of Bitverse, there's Seals.<br></br>
            Seals are the main animal in the game. You can stake seal and earn of in game currency MEOWCOIN. <br></br>Bitverse is a metaverse built for a strong community, good vibes, and an endless source of MMMMMMEOW.
          </div>
          <div class="flex flex-col gap-x-5 xl:flex-row"><a href="https://8bitcats.com/seal" target="_blank" rel="noreferrer" class="text-2xl text-white text-center font-rubik font-bold bg-purple-primary py-4 px-7 rounded-[4px] mt-5 xl:mt-12 whitespace-nowrap active:shadow-purple-active hover:bg-purple-hover transition-all">Become Seal</a></div>
        </div>
      </span>
    </div>
          <style>{`
  .Sealtext {
  padding-left: 10rem !important;
}

    @media screen and (max-width: 800px) {
      .Sealtext {
        padding-left: 0 !important;
        padding-right: 0 !important;
      }
    }
  `}</style>
  </div>
            <style>{`
  .Sealtop {
  padding-left: 2.5rem !important;
    padding-left: 2.5rem !important;

}

    @media screen and (max-width: 800px) {
      .Sealtop {
        padding-left: 2 !important;
        padding-right: 0 !important;
      }
    }
  `}</style>
</div>



  <div>
  {imageRows.map((row, index) => (
    <div key={index} style={{ display: 'flex', flexDirection: 'row' }}>
      {row.map((image, index) => (
        <img
          key={index}
          style={{ width: '30%', height: 'auto', marginRight: '0px' }}
          src={image}
          alt={`Image ${index + 1}`}
          className={index >= 3 ? 'hidden sm:block' : ''}
        />
      ))}
                  <style>{`

      /* CSS */
@media (max-width: 900px) {
  .hidden {
    display: none;
  }
}
  `}</style>

    </div>
  ))}
</div>


<div style={{ paddingTop: "2rem", justifyContent: "center", alignItems: "center", paddingBottom: "10rem"}}>

<div style={{display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column"}}>

  <h1 class="w-max mb-12 text-white uppercase font-rubik font-bold p-5 bg-gray-primary mx-auto shadow-dark-sharp 3xl:mx-0 sm:mb-20 xs:text-2xl text-4xl md:text-5.5xl">MINT STATION</h1>

 <div style={{display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'center', alignItems: 'center'}}>
  <div>
    <button disabled="" class="flex items-center w-full px-5 py-6 bg-gray-primary shadow-[13px_13px_0px_rgba(11,0,0,0.25)]">
            <a href="https://www.8bitcats.com/seal">

      <div class="ax-w-sm mr-auto sm:max-w-none flex justify-center items-center">
        <div class="font-rubik mr-auto text-left flex flex-row">
          <div class="text-xl font-bold mb-2 text-gray-light" style={{paddingTop: "1rem", paddingRight: "1rem"}}>
            Seals<div style={{fontSize: "1rem"}}>Stake and earn meowcoin</div>
          </div>
          <div class="ml-auto"><img style={{ width: '85px', height: 'auto' }} src={require('../../assets/img/11.jpg')} /></div>
        </div>
      </div>
      </a>
    </button>
  </div>
  <div>
    <button disabled="" class="flex items-center w-full px-5 py-6 bg-gray-primary shadow-[13px_13px_0px_rgba(11,0,0,0.25)]">
            <a href="https://www.8bitcats.com/catstatue">

      <div class="ax-w-sm mr-auto sm:max-w-none flex justify-center items-center">
        <div class="font-rubik mr-auto text-left flex flex-row">
          <div class="text-xl font-bold mb-2 text-gray-light" style={{paddingTop: "1rem", paddingRight: "1rem"}}>
            Cat Statue<div style={{fontSize: "1rem"}}>High Reward</div>
          </div>
          <div class="ml-auto"><img style={{ width: '50px', height: 'auto', imageRendering: "pixelated"}} src={require('../../assets/img/catstatue.png')} /></div>
        </div>
      </div>
      </a>
    </button>
  </div>
  <div>
    
    <button disabled="" class="flex items-center w-full px-5 py-6 bg-gray-primary shadow-[13px_13px_0px_rgba(11,0,0,0.25)]">
      <a href="https://www.8bitcats.com/diamondstone">
      <div class="ax-w-sm mr-auto sm:max-w-none flex justify-center items-center">
        <div class="font-rubik mr-auto text-left flex flex-row">
          <div class="text-xl font-bold mb-2 text-gray-light" style={{paddingTop: "1rem", paddingRight: "1rem"}}>
            Diamond Stone<div style={{fontSize: "1rem"}}>Best Reward</div>
          </div>
          <div class="ml-auto"><img style={{ width: '50px', height: 'auto', imageRendering: "pixelated" }} src={require('../../assets/img/diamondstone.png')} /></div>
        </div>
      </div>
      </a>
    </button>
  </div>
  <div>
    <button disabled="" class="flex items-center w-full px-5 py-6 bg-gray-primary shadow-[13px_13px_0px_rgba(11,0,0,0.25)]">
      <div class="ax-w-sm mr-auto sm:max-w-none flex justify-center items-center">
        <div class="font-rubik mr-auto text-left flex flex-row">
          <div class="text-xl font-bold mb-2 text-gray-light" style={{paddingTop: "1rem", paddingRight: "1rem"}}>
            Worlds
<div style={{fontSize: "1rem"}}>Coming Soon
          </div>
        </div>    <div class="ml-auto"><img style={{ width: '85px', height: 'auto' }} src={require('../../assets/img/11.jpg')} /></div>
  </div>
</div>
 </button>
</div></div>

</div>
</div>
        
          
                


          {/* {!!account ? (
            <Container maxWidth="lg">
              <h2 style={{ textAlign: 'center', fontSize: '80px' }}>NFT Staking</h2>

              <Box mt={5}>
                <div hidden={activeBanks.filter((bank) => bank.sectionInUI === 2).length === 0}>
                  <Typography color="textPrimary" variant="h4" gutterBottom>
                    MvSHARE Rewards Pools
                  </Typography>

                  <Grid container spacing={3} style={{ marginTop: '20px' }}>
                    {activeBanks
                      .filter((bank) => bank.sectionInUI === 2)
                      .map((bank) => (
                        <React.Fragment key={bank.name}>
                          <CemeteryCard bank={bank} />
                        </React.Fragment>
                      ))}
                  </Grid>
                </div>

                <div hidden={activeBanks.filter((bank) => bank.sectionInUI === 0).length === 0}>
                  <Typography color="textPrimary" variant="h4" gutterBottom style={{ marginTop: '20px' }}>
                    Genesis Pools
                  </Typography>
                  <Alert variant="filled" severity="warning">
                    Genesis Pools start soon.
                  </Alert>
                  <Grid container spacing={3} style={{ marginTop: '20px' }}>
                    {activeBanks
                      .filter((bank) => bank.sectionInUI === 0)
                      .map((bank) => (
                        <React.Fragment key={bank.name}>
                          <CemeteryCard bank={bank} />
                        </React.Fragment>
                      ))}
                  </Grid>
                </div>
              </Box>
            </Container>
          ) : (
            <UnlockWallet />
          )} */}
        </Route>
  
      </Page>
    </Switch>
  );
};

export default Fantomllama;
