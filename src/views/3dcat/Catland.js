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

import PitImage from '../../assets/img/background.png';
import Nav from '../../components/Nav/Nav';

// Import custom css
import "./style.css";
import { BorderLeft } from '@material-ui/icons';

const Web3 = require('web3')
const web3 = new Web3("https://rpc.ftm.tools/")

const abi = [{"inputs":[{"internalType":"string","name":"_name","type":"string"},{"internalType":"string","name":"_symbol","type":"string"},{"internalType":"address","name":"_erc20Address","type":"address"},{"internalType":"address","name":"_treasuryAddress","type":"address"},{"internalType":"string","name":"_baseURIBronze","type":"string"},{"internalType":"string","name":"_baseURISilver","type":"string"},{"internalType":"string","name":"_baseURIGold","type":"string"},{"internalType":"string","name":"_baseURIDiamond","type":"string"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"approved","type":"address"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"operator","type":"address"},{"indexed":false,"internalType":"bool","name":"approved","type":"bool"}],"name":"ApprovalForAll","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"Transfer","type":"event"},{"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"approve","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"baseExtension","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"baseURIBronze","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"baseURIDiamond","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"baseURIGold","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"baseURISilver","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"bronzePrice","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"deedCheck","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"deedType","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"diamondPrice","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"erc20Address","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address[]","name":"_users","type":"address[]"}],"name":"exploiters","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"getApproved","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"goldPrice","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"operator","type":"address"}],"name":"isApprovedForAll","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"limit","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"maxMintAmount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"maxMintBronze","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"maxMintDiamond","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"maxMintGold","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"maxMintSilver","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"maxSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_mintAmount","type":"uint256"}],"name":"mintDiamond","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_mintAmount","type":"uint256"}],"name":"mintGold","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_mintAmount","type":"uint256"}],"name":"mintNFT","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_mintAmount","type":"uint256"}],"name":"mintSilver","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"onlyWhitelisted","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"ownerOf","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bool","name":"_state","type":"bool"}],"name":"pause","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"paused","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"safeTransferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"},{"internalType":"bytes","name":"_data","type":"bytes"}],"name":"safeTransferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"operator","type":"address"},{"internalType":"bool","name":"approved","type":"bool"}],"name":"setApprovalForAll","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"string","name":"_newBaseExtension","type":"string"}],"name":"setBaseExtension","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"string","name":"_newBaseURI","type":"string"}],"name":"setBaseURIBronze","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"string","name":"_newBaseURI","type":"string"}],"name":"setBaseURIDiamond","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"string","name":"_newBaseURI","type":"string"}],"name":"setBaseURIGold","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"string","name":"_newBaseURI","type":"string"}],"name":"setBaseURISilver","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256[]","name":"_prices","type":"uint256[]"}],"name":"setMintPrice","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bool","name":"_state","type":"bool"}],"name":"setOnlyWhitelisted","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_newmaxMintAmount","type":"uint256"}],"name":"setmaxMintAmount","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"silverPrice","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes4","name":"interfaceId","type":"bytes4"}],"name":"supportsInterface","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"index","type":"uint256"}],"name":"tokenByIndex","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"uint256","name":"index","type":"uint256"}],"name":"tokenOfOwnerByIndex","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"tokenURI","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"transferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"treasuryAddress","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_owner","type":"address"}],"name":"walletOfOwner","outputs":[{"internalType":"uint256[]","name":"","type":"uint256[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address[]","name":"_users","type":"address[]"},{"internalType":"uint256[]","name":"_amount","type":"uint256[]"}],"name":"whitelistUsers","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"whitelistedAddresses","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"withdraw","outputs":[],"stateMutability":"payable","type":"function"}]


var minters = [];
var Token_id = [];


const address = "0xCF1167f041294dF1DfF8CA8d73373BC588F1188C"

const contract = new web3.eth.Contract(abi, address)


 

const BackgroundImage = createGlobalStyle`
  body {
    background: url(${PitImage}) no-repeat !important;
    background-size: cover !important;
           @media screen and (max-width: 600px) {
      font-weight: 500;

    }
  .content {
  flex-wrap: nowrap;
             @media screen and (max-width: 600px) {
  flex-wrap: wrap;

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

const Cemetery = () => {
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
  const [newminters, setminters] = useState(0);


const all_events = async () => {
const events = contract.getPastEvents('AllEvents',
{ 
  fromBlock: 50568164,
  toBlock: 'latest'
 }).then(function (events) {
    if (events.length) {
        for (var i = 0, len = events.length; i < len; i+=1) {
            if (events[i].returnValues.from == "0x0000000000000000000000000000000000000000") {
                
                const send_to = events[i].returnValues.to
                minters.push(send_to)
               // console.log(testt)
                const token_id = events[i].returnValues.tokenId
                // console.log(token_id)
                Token_id.push(token_id)

            } else {
            };
        }
                    console.log(minters[(minters.length -1).toString()])

                    return[setminters(minters), Token_id]

    }
 })};

  // Minting process
const [mintAmount, setMintAmount] = useState(1);

  const reloadNfts = async () => {
    if (account) {
      let nftsInWalletWithJSON = await tombFinance.getNFTsInWallet(account, 'DCatNFT');
      setNftsInWallet(await Promise.all(
        nftsInWalletWithJSON.map(async nft => {
          return {
            tokenId: nft.tokenId,
            ...await getImageFromJSON(nft.metaDataJson)
          }
        })
      ));

      let nftsStakedWithJSON = await tombFinance.getNFTsStaked(account, 'DCatNFT', 'DCatStakingNFT');
      setNftsStaked(await Promise.all(
        nftsStakedWithJSON.map(async nft => {
          return {
            tokenId: nft.tokenId,
            ...await getImageFromJSON(nft.metaDataJson)
          }
        })
      ));

      setNftTotalSupply(await tombFinance.nftTotalSupply('DCatNFT'));
      setNftStakedTotalSupply(await tombFinance.nftStakedTotalSupply('DCatNFT', 'DCatStakingNFT'));
    }
  }

  useEffect(() => {
    reloadNfts();
    all_events();
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
    setReward(await tombFinance.calculateRewards(account, [nftsStaked[index].tokenId], 'DCatStakingNFT'));
  }

  const selectNftInWallet = async (index) => {
    setIndexOfselectedNftInWallet(index);
    setIndexOfselectedNft(-1);
  }

  const stake = async () => {
    await tombFinance.stakeNfts([nftsInWallet[indexOfSelectedNftInWallet].tokenId], 'DCatStakingNFT');
    reloadNfts();
  }

  const unStake = async () => {
    await tombFinance.unStake(nftsStaked[indexOfSelectedNft].tokenId, 'DCatStakingNFT');
    reloadNfts();
  }

  const claim = async () => {
    await tombFinance.claim(nftsStaked[indexOfSelectedNft].tokenId, 'DCatStakingNFT');
    setReward(await tombFinance.calculateRewards(account, [nftsStaked[indexOfSelectedNft].tokenId], 'DCatStakingNFT'));
  }

  const approve = async () => {
    await tombFinance.approve('DCatNFT', 'DCatStakingNFT');
  }

  const mint = async (amount) => {
    console.log(account);
    await tombFinance.mintDCat(account, amount);


}

  const mintSilver = async (amount) => {
    console.log(account);
    await tombFinance.mintSilverLandNFT(account, amount);


}

  const mintGold = async (amount) => {
    console.log(account);
    await tombFinance.mintGoldLandNFT(account, amount);


}

  const mintDiamond = async (amount) => {
    console.log(account);
    await tombFinance.mintDiamondLandNFT(account, amount);


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




  return (
    <Switch>
      <Page>
                <Nav></Nav>

        <Route exact path={path}>
          <BackgroundImage />
          <div style={{ textAlign: 'center', color: 'white' }}>
          <h2 style={{ textAlign:'center', marginBottom: '5px'  }}>3DCAT</h2>
          <Grid container className='content' justify="center" spacing={0} style={{marginTop: '10px', marginBottom: '10px'}}>
                                      
            <span>
             <span style={{fontSize: '20px'}}>Total Minted
             </span>
               <br></br>{nftTotalSupply}/820
             </span>



                 </Grid>

                     <Grid container className='content' justify="center" spacing={0} style={{marginTop: '10px', marginBottom: '10px'
                    
                    
                    }}>


                     <Grid container  justify="center" spacing={0} style={{marginTop: '10px', marginBottom: '10px'}}>
                     <img style={{width: '200px', height:'200px', border: '0px black solid'}} src={require('./example.gif')} />
          <Grid container justify="center" spacing={0} style={{marginTop: '10px', marginBottom: '10px'}}>

                      <h4 style={{ textAlign:'center', marginBottom: '2px'  }}>1 3D CAT <p><br></br></p>MINT PRICE: 10 CATCOINS</h4>
                  </Grid>

              <span>
                
                      <circleButton
                        style={{ lineHeight: 0.4 }}
                        onClick={(e) => {
                          e.preventDefault();
                          decrementMintAmount();
                        }}
                      >
                        -
                      </circleButton>
                  
                        &nbsp;{mintAmount}&nbsp; 
           
                      <circleButtonleft
                        onClick={(e) => {
                          e.preventDefault();
                          incrementMintAmount();
                        }}
                      >
                        +
                      </circleButtonleft>
                      <br></br>

                      <mintButton style={{marginTop: '10px', marginBottom: '10px' }}
    
                        onClick={(e) => {
                          console.log("mintamount", {mintAmount})
                       
                          mint(Object.values({mintAmount}))
                    

                        }}
                      >
                        Mint
                      </mintButton>

                    <br></br>
                    </span>

</Grid>




               

                </Grid>
                            <div style={{ fontSize: '10px', marginBottom: '8px'}}>
                              
         <p></p>
              <Button color="primary" href="https://spooky.fi/#/swap?outputCurrency=0x8CcD162E5997363Dc2101371B3B09f316D012306&inputCurrency=0x04068da6c83afcfa0e13ba15a6696662335d5b75" variant="contained" className={'shinyButton ' + classes.button} style={{ margin: '0px' }}>
                <h3>Buy CATCOIN</h3>
              </Button>
              <br></br>

</div>
<br></br>
          <p></p>
            <span style={{ fontSize: '36px' }}>
              { parseInt(nftStakedTotalSupply * 100 / nftTotalSupply) } % 3D CATS STAKED
            </span>
            <BorderLinearProgress variant="determinate" value={nftStakedTotalSupply * 100 / nftTotalSupply} />
            <br/>
            <Grid container spacing={2}>
              <Grid xs={6} item>
                <Box style={{
                  background: 'gray',
                  minHeight: '500px',
                  padding: '1rem',
                  borderRadius: '4px',
                  borderTop: '6px black solid',
                  borderBottom: '6px black solid',
                  borderRight: '6px black solid',
                  borderLeft: '6px black solid',
                  boxShadow: 'inset -4px -4px 0px 0px #292929',
                }}>
                  <p>
                    {nftsInWallet.length} NFT(s) in your wallet
                  </p>
                  <Box style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                  }}>
                    {
                      nftsInWallet.map(({image, name}, index) => 
                        <Box style={{
                          marginRight: '1rem',
                        }}>
                          <img
                            src={image} 
                            style={{
                              border: index === indexOfSelectedNftInWallet ? '2px solid blue' : '',
                              width: '150px',
                              height: '200px',
                            }}
                            onClick={() => selectNftInWallet(index)}
                            alt="NFT"
                          />
                          <p> { name } </p>
                        </Box>
                      )
                    }
                  </Box>
                </Box>
              </Grid>
              <Grid xs={6} item>
                <Box style={{
                  background: 'gray',
                  padding: '1rem',
                  borderRadius: '4px',
                  visibility: indexOfSelectedNft === -1 && indexOfSelectedNftInWallet === -1 ? 'hidden' : 'visible',
                  height: '100px',
                  borderTop: '6px black solid',
                  borderBottom: '6px black solid',
                  borderRight: '6px black solid',
                  borderLeft: '6px black solid',
                  display: 'inline-block',
                  boxShadow: 'inset -4px -4px 0px 0px #292929',
                  boxSizing: 'content-box',
                  position: 'relative',
                }}>
                  {
                    indexOfSelectedNft > -1 && <>
                      <p style={{fontSize: '18px', fontWeight: 'bold'}}>
                        { nftsStaked[indexOfSelectedNft].name }
                      </p>
                      <Box style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between'
                      }}>
                        <div>
                          <Button
                            variant='contained' 
                            color="primary" 
                            classes={{
                              root: classes.stakeButtons,
                            }}
                            onClick={unStake}
                          >
                            Unstake
                          </Button>
                          <Button
                            variant='contained'
                            color="primary"
                            onClick={claim}
                          >
                            Claim
                          </Button>
                        </div>
                        <p style={{maxWidth: '50%'}}>Claimable: { reward / 1e18 } CAT SHARES</p>
                      </Box>
                    </>
                  }
                  {
                    indexOfSelectedNftInWallet > -1 && <>
                     <p style={{fontSize: '18px', fontWeight: 'bold'}}>
                        { nftsInWallet[indexOfSelectedNftInWallet].name }
                      </p>
                      <Box style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between'
                        
                      }}>
                        <div>
                        <Button
                            variant='contained' 
                            color="primary" 
                            onClick={approve}
                            classes={{
                              root: classes.stakeButtons,
                            }}
                          >
                            Approve
                          </Button>
                          <Button
                            variant='contained' 
                            color="primary" 
                            classes={{
                              root: classes.stakeButtons,
                            }}
                            onClick={stake}
                          >
                            Stake
                          </Button>
                        </div>
                      </Box>
                    </>
                  }
                </Box>
                <Box style={{
                  background: 'gray',
                  minHeight: '300px',
                  padding: '1rem',
                  borderRadius: '4px',
                  marginTop: '2rem',
                  borderTop: '6px black solid',
                  borderBottom: '6px black solid',
                  borderRight: '6px black solid',
                  borderLeft: '6px black solid',
                  boxShadow: 'inset -4px -4px 0px 0px #292929',
                  boxSizing: 'content-box',
                  position: 'relative',
                }}>
                  <p>
                    { nftsStaked.length } NFT(s) staked
                  </p>
                  <Box style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                  }}>
                    {
                      nftsStaked.map(({image, name}, index) => 
                        <Box style={{
                          marginRight: '1rem',
                        }}>
                          <img 
                            src={image}
                            width="150"
                            style={{
                              border: index === indexOfSelectedNft ? '2px solid blue' : '',
                              width: '150px',
                              height: '200px',
                            }}
                            onClick={() => selectNftStaked(index)}
                            alt="NFT"
                          />
                          <p> { name } </p>
                        </Box>
                      )
                    }

                    
                  </Box>
                </Box>
              </Grid>
            </Grid>
       <center>

                 <Box style={{
                 //* visibility: nftTotalSupply === +1 && nftTotalSupply === 1 ? 'hidden' : 'visible',
                  background: 'gray',
                  minHeight: '300px',
                  maxWidth: '900px',
                  padding: '1rem',
                  borderRadius: '4px',
                  marginTop: '2rem',
                  borderTop: '6px black solid',
                  borderBottom: '6px black solid',
                  borderRight: '6px black solid',
                  borderLeft: '6px black solid',
                  boxShadow: 'inset -4px -4px 0px 0px #292929',
                  boxSizing: 'content-box',
                  position: 'relative',
                }}>
            <h3 style={{fontWeight: '700', fontSize: '2rem'}}>Recently Minted</h3>
                            <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>

          <img  style={{width: '70px', height:'100px', border: '0px black solid', borderRadius: '9999px', overflow: 'hidden'}} src={'https://artion3.mypinata.cloud/ipfs/QmdLoJKtozS5r3L2FSxfDQVRUPCuw7QLwyiLixtc1DRrg7/'+Token_id[(Token_id.length -1).toString()]+'.png'} />
 <toplist> {newminters[(newminters.length -1).toString()]} </toplist>
</div>
                            <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>

           <img  style={{width: '70px', height:'100px', border: '0px black solid', borderRadius: '9999px', overflow: 'hidden'}} src={'https://artion3.mypinata.cloud/ipfs/QmdLoJKtozS5r3L2FSxfDQVRUPCuw7QLwyiLixtc1DRrg7/'+Token_id[(Token_id.length -2).toString()] +'.png'} />
 <toplist>{minters[(minters.length -2).toString()]}  </toplist>
</div>
                            <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>

           <img  style={{width: '70px', height:'100px', border: '0px black solid', borderRadius: '9999px', overflow: 'hidden'}} src={'https://artion3.mypinata.cloud/ipfs/QmdLoJKtozS5r3L2FSxfDQVRUPCuw7QLwyiLixtc1DRrg7/'+Token_id[(Token_id.length -3).toString()] +'.png'} />
 <toplist> {minters[(minters.length -3).toString()]}  </toplist>
</div>
                            <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>

           <img  style={{width: '70px', height:'100px', border: '0px black solid', borderRadius: '9999px', overflow: 'hidden'}} src={'https://artion3.mypinata.cloud/ipfs/QmdLoJKtozS5r3L2FSxfDQVRUPCuw7QLwyiLixtc1DRrg7/'+Token_id[(Token_id.length -4).toString()] +'.png'} />
 <toplist> {minters[(minters.length -4).toString()]}  </toplist>
</div>
                            <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>

           <img  style={{width: '70px', height:'100px', border: '0px black solid', borderRadius: '9999px', overflow: 'hidden'}} src={'https://artion3.mypinata.cloud/ipfs/QmdLoJKtozS5r3L2FSxfDQVRUPCuw7QLwyiLixtc1DRrg7/'+Token_id[(Token_id.length -5).toString()] +'.png'} />
<toplist>{minters[(minters.length -5).toString()]}  </toplist>
 
 </div>
 </Box>
 </center>
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
        <Route path={`${path}/:bankId`}>
          <BackgroundImage />
          <Bank />
        </Route>
      </Page>
    </Switch>
  );
};

export default Cemetery;
