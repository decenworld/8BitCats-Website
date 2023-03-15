import React, {useRef, useEffect, useMemo, Component } from 'react';
import Page from '../../components/Page';

import CashImage from '../../assets/img/example.gif';
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

// Images
import PitImage from '../../assets/img/map.png';
import House from '../../assets/img/house.png';
import HouseRed from '../../assets/img/housered.png';
import Boardroom from '../../assets/img/boardroom.png';
import Farm from '../../assets/img/farm.png';
import Cats from '../../assets/img/cats.gif';
import Cryptoman from '../../assets/img/cryptoman.gif';
import CatStatue from '../../assets/img/catstatue.png';
import DiamondStatue from '../../assets/img/diamondstone.png';
import Stone from '../../assets/img/stone.png';
import Owlimage from '../../assets/img/Owl.gif';
import Penguinimage from '../../assets/img/Penguin.gif';
import Sealsimage from '../../assets/img/seals.webp';
import Trippyimage from '../../assets/img/trippycat.gif';
import DCAT from '../../assets/img/3dcat.gif';


import GoblingAxe from '../../assets/img/goblings/spr_axe.gif';
import GoblingCarry from '../../assets/img/goblings/spr_carry.gif';
import GoblingDig from '../../assets/img/goblings/spr_dig.gif';
import GoblingHammer from '../../assets/img/goblings/spr_hammering.gif';

import { Box, Button, Card, CardContent, Grid, Paper } from '@material-ui/core';
import ZapModal from '../Bank/components/ZapModal';

import { makeStyles } from '@material-ui/core/styles';
import useTombFinance from '../../hooks/useTombFinance';
import ScrollContainer from 'react-indiana-drag-scroll';
import Npc from '../../assets/img/npc.gif';
import Man from '../../assets/img/man.gif';
import Sign from '../../assets/img/buildings/sign.png';
import Smoke from '../../assets/img/buildings/smoke.gif';
import Wallsign from '../../assets/img/wall-sign.png';


import { Section, useScrollIntoView } from "../../hooks/useScrollIntoView";

import mapMovement from "../../hooks/mapMovement";
import AccountButton from '../../components/Nav/AccountButton';
import AccountModal from '../../components/Nav/AccountModal';


//Menu
import { useDetectOutsideClick } from "./useDetectOutsideClick";


// Import custom css
import "./styless.css";


const BackgroundImage = createGlobalStyle`
  body {
    @import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap');
   font-family: "Press Start 2P", cursive;

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



const Home = () => {
  const classes = useStyles();
  const TVL = useTotalValueLocked();
  const tombFtmLpStats = useLpStats('MVDOLLAR-USDC-LP');
  const tShareFtmLpStats = useLpStats('MSHARE-USDC-LP');
  const tombStats = useTombStats();
  const tShareStats = usetShareStats();
  const tBondStats = useBondStats();
  const tombFinance = useTombFinance();
  //const { balance } = useBurned2SHARES();
  const container = useRef(null);
  const [scrollIntoView] = useScrollIntoView();

// Menu
  const dropdownRef = useRef(null);
  const [isActive, setIsActive] = useDetectOutsideClick(dropdownRef, false);
  const onClick = () => setIsActive(!isActive);




  let tomb;
  let tShare;
 
  tomb = tombProd;
  tShare = tShareProd;
  

    useEffect(() => {
    mapMovement.addListeners(container.current);
    return () => {
      mapMovement.removeListeners();
    };
  }, [container]);

    useEffect(() => {
    // Start with crops centered
    // if (showGame) {
    scrollIntoView(Section.Man, "auto");
    // }
  }, [scrollIntoView], []);

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
     @import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap');
   font-family: "Press Start 2P", cursive;
   a {

   }
.menu-container {

  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
}

.menu-trigger {

  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 4px 6px;
  border: none;
  vertical-align: middle;
  transition: box-shadow 0.4s ease;
  margin-left: auto; /* Strictly for positioning */
}

.menu-trigger:hover {
  box-shadow: 0 1px 8px rgba(0, 0, 0, 0.3);
}

.menu-trigger span {
  font-weight: 700;
  vertical-align: middle;
  font-size: 14px;
  margin: 0 10px;
}

.menu-trigger img {
  border-radius: 90px;
}

.menu {
  border: 3px solid;
    border-image: url("https://raw.githubusercontent.com/decenworld/gamingdemo/5f3cab580fc688ec00661ee94545dbb9f829a460/src/assets/img/wall-sign.png") 25% / 1 / 0 repeat;
image-rendering: pixelated;
border-color: currentcolor;
border-style: solid;
  background: #b0734a;
  border-radius: 8px;
  position: absolute;
  top: 50px;
  left: 30px;
  right: 0;
  width: 180px;
  box-shadow: 0 1px 8px rgba(0, 0, 0, 0.3);
  opacity: 0;
  visibility: hidden;
  transform: translateY(-20px);
  transition: opacity 0.4s ease, transform 0.4s ease, visibility 0.4s;
}

.menu.active {
  opacity: 1;
  visibility: visible;
  transform: translateY(0);
}

.menu ul {
  
  list-style: none;
  padding: 0;
  margin: 0;
}

.menu li {
  font-size: 10px;
  border-image: url("https://raw.githubusercontent.com/decenworld/gamingdemo/5f3cab580fc688ec00661ee94545dbb9f829a460/src/assets/img/wall-sign.png") 25% / 1 / 0 repeat;
image-rendering: pixelated;
border-color: currentcolor;
border-style: solid;
  border-bottom: 3px solid #000000;
}

.menu li a {
  
  text-decoration: none;
  color: #FFFFFF;
  padding: 10px 15px;
  display: block;
}
 


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
      <Grid container spacing={3}>

      <ScrollContainer
          style={{height:"1800px"}}
          vertical={true}
          horizontal={true}
          hideScrollbars={true}
          innerRef={container}
     
        >
                      <StyledLink>

          <div
            className="relative h-gameboard w-gameboard" 
            // TODO dynamic game board size based on tile dimensions
          >
        
            <img src={PitImage} className="absolute inset-0 w-full h-full" style={{imageRendering: "pixelated"}}/>
      <div className='w-5/12 sm:w-60 fixed top-2 left-2 z-50 shadow-lg'
              // Menu
              style={{position: 'fixed', width: "40px", height: "50px", marginTop:"50px"}}
              >


                














        <button onClick={onClick} className="menu-trigger">

                <div className='bg-brown-600 p-0.5 text-white shadow-lg' style={{border: 'solid', borderWidth: "6px", imageRendering: "pixelated", borderRadius: "20px", borderImage: 'url("https://raw.githubusercontent.com/decenworld/gamingdemo/5f3cab580fc688ec00661ee94545dbb9f829a460/src/assets/img/wall-sign.png") 25% / 1 / 0 repeat'}}>

                  <div className='flex justify-center p-1'>
                    MENU
                  </div>

                </div>
                </button>
        <nav
          ref={dropdownRef}
          className={`menu ${isActive ? "active" : "inactive"}`}
        >
          <ul>
            <li>
              <a href="/boardroom">Boardroom</a>
            </li>
            <li>
              <a href="/farms">Farms</a>
            </li>
                                <li>
              <a href="/catstatue">Golden Statue</a>
            </li>
                                               <li>
              <a href="/diamondstone">Diamond Stone</a>
            </li>

                                                 <li>
                                                                        <li>
                      
              <a href="/3dcat">3D Cats</a>
            </li>
              <a href="/seal">Seals</a>
            </li>
                                                              <li>
              <a href="/trippycat">Trippycat</a>
            </li>
                                               <li>
              <a href="/owl">Owls</a>
            </li>

                                                    <li>
              <a href="/penguin">Penguins</a>
            </li>

            <li>
              <a href="/cryptoman">Cryptoman</a>
            </li>
                    
                                          <li>
              <a href="/fantomllama">Fantom Llama</a>
            </li>
 
                        <li>
              <a href="/cats">8-Bit Cats</a>
            </li>
     
        
                                  <li>
              <a href="/info">Info</a>
            </li>
            <li>
              <a href="https://8bitcats.gitbook.io/whitepaper/">Whitepaper</a>
            </li>
          </ul>
        </nav>

              </div>
 <a href='https://spooky.fi/#/swap?outputCurrency=0x8CcD162E5997363Dc2101371B3B09f316D012306&inputCurrency=0x04068da6c83afcfa0e13ba15a6696662335d5b75'>
            <span className='bg-brown-200 p-1 fixed top-2 right-2 z-50 flex items-center shadow-lg cursor-pointer'
            style={{border: "solid", borderWidth: "3px", marginRight: "10px",  
            imageRendering: "pixelated", borderRadius: "10px", width: "140px", height: "50px"}}

            >

              <AccountModal>                       
</AccountModal>


            </span>
            </a>
                        <span className='bg-brown-200 p-1 fixed top-2 right-2 z-50 flex items-center shadow-lg cursor-pointer'
            style={{border: "solid", borderWidth: "3px", marginRight: "150px",  
            imageRendering: "pixelated", borderRadius: "10px"}}

            >
                          <AccountButton text="Connect" />
                          </span>



            <span id="house" className='house' style={{position: "absolute", top: "1450px", left: "1600px", imageRendering: "pixelated"}}>

                <img src={Sign} width="100" height="100" className="inset-0" style={{position: "absolute", top: "80px", left: "170px", imageRendering: "pixelated"}} />
                <img src={Penguinimage} width="50" height="50" className="inset-0" style={{position: "absolute", top: "90px", left: "195px"}} />
            <a href='./penguin'>
            <img src={House} width="134" height="165" className="inset-0"  />
                <img src={Smoke} width="30" height="50" className="inset-0" style={{position: "absolute", top: "21px", left: "5px"}} />
<div class="bg-brown-300 p-1 text-white text-shadow text-xs w-fit" style={{position: "absolute", width: "100px", borderStyle: "solid", borderWidth: "1px", imageRendering: "pixelated", borderRadius: "5px", top: "110px", left: "20px", borderImage: 'url("https://raw.githubusercontent.com/decenworld/gamingdemo/5f3cab580fc688ec00661ee94545dbb9f829a460/src/assets/img/wall-sign.png") 25% / 3 / 0 repeat'}}>
  <span style={{marginLeft: "3px"}}>STAKING</span></div>
            </a>
            </span>

             <span id="housetripcat" className='housetripcat' style={{position: "absolute", top: "1320px", left: "2430px", imageRendering: "pixelated"}}>

                <img src={Sign} width="100" height="100" className="inset-0" style={{position: "absolute", top: "80px", left: "170px", imageRendering: "pixelated"}} />
                <img src={Trippyimage} width="50" height="50" className="inset-0" style={{position: "absolute", top: "90px", left: "195px"}} />
            <a href='./trippycat'>
            <img src={House} width="134" height="165" className="inset-0"  />
                <img src={Smoke} width="30" height="50" className="inset-0" style={{position: "absolute", top: "21px", left: "5px"}} />
<div class="bg-brown-300 p-1 text-white text-shadow text-xs w-fit" style={{position: "absolute", width: "100px", borderStyle: "solid", borderWidth: "1px", imageRendering: "pixelated", borderRadius: "5px", top: "110px", left: "20px", borderImage: 'url("https://raw.githubusercontent.com/decenworld/gamingdemo/5f3cab580fc688ec00661ee94545dbb9f829a460/src/assets/img/wall-sign.png") 25% / 3 / 0 repeat'}}>
  <span style={{marginLeft: "3px"}}>STAKING</span></div>
            </a>
            </span>



                        <span id="house2" className='house2' style={{position: "absolute", top: "1150px", left: "1650px", imageRendering: "pixelated"}}>

                <img src={Sign} width="100" height="100" className="inset-0" style={{position: "absolute", top: "80px", left: "170px"}} />
                <img src={Owlimage} width="50" height="50 " className="inset-0" 

                style={{position: "absolute", top: "90px", left: "195px"
              }} />

  
            <a href='./owl'>
            <img src={House} width="134" height="165" className="inset-0"  />
<div class="bg-brown-300 p-1 text-white text-shadow text-xs w-fit" style={{position: "absolute", width: "100px", borderStyle: "solid", borderWidth: "1px", imageRendering: "pixelated", borderRadius: "5px", top: "110px", left: "20px", borderImage: 'url("https://raw.githubusercontent.com/decenworld/gamingdemo/5f3cab580fc688ec00661ee94545dbb9f829a460/src/assets/img/wall-sign.png") 25% / 3 / 0 repeat'}}>
  <span style={{marginLeft: "3px"}}>STAKING</span></div>
            </a>
            </span>

                <span id="house3" className='house3' style={{position: "absolute", top: "1150px", left: "1950px", imageRendering: "pixelated"}}>

                <img src={Sign} width="100" height="100" className="inset-0" style={{position: "absolute", top: "80px", left: "170px"}} />
             <img src={Sealsimage} width="50" height="50 " className="inset-0" style={{position: "absolute", top: "90px", left: "195px"}} />
            <a href='./seal'>

            <img src={House} width="134" height="165" className="inset-0"  />
                            <img src={Smoke} width="30" height="50" className="inset-0" style={{position: "absolute", top: "21px", left: "5px"}} />
<div class="bg-brown-300 p-1 text-white text-shadow text-xs w-fit" style={{position: "absolute", width: "100px", borderStyle: "solid", borderWidth: "1px", imageRendering: "pixelated", borderRadius: "5px", top: "110px", left: "20px", borderImage: 'url("https://raw.githubusercontent.com/decenworld/gamingdemo/5f3cab580fc688ec00661ee94545dbb9f829a460/src/assets/img/wall-sign.png") 25% / 3 / 0 repeat'}}>
  <span style={{marginLeft: "10px"}}>STAKING</span></div>
</a>

            </span>

                <span id="npc" className='npc' style={{position: "absolute", top: "1400px", left: "1890px", imageRendering: "pixelated"}}>
            <img src={Npc} width="50" height="64" className="inset-0"  />
            </span>    




                        <span id="llamahouse" className='llamahouse' style={{position: "absolute", top: "740px", left: "1700px", imageRendering: "pixelated"}}>

                <img src={Sign} width="100" height="100" className="inset-0" style={{position: "absolute", top: "80px", left: "170px"}} />
                <img src={"https://fantomllama.netlify.app/config/images/example.gif"} width="50" height="50" className="inset-0" style={{position: "absolute", top: "90px", left: "195px"}} />
            <a href='./fantomllama'>
            <img src={Farm} width="134" height="165" className="inset-0"  />
<div class="bg-brown-300 p-1 text-white text-shadow text-xs w-fit" style={{position: "absolute", width: "100px", borderStyle: "solid", borderWidth: "1px", imageRendering: "pixelated", borderRadius: "5px", top: "80px", left: "20px", borderImage: 'url("https://raw.githubusercontent.com/decenworld/gamingdemo/5f3cab580fc688ec00661ee94545dbb9f829a460/src/assets/img/wall-sign.png") 25% / 3 / 0 repeat'}}>
  <span style={{marginLeft: "3px"}}>STAKING</span></div>
            </a>
            </span>


<span id="housered" className='housered' style={{position: "absolute", top: "850px", left: "3100px", imageRendering: "pixelated"}}
// catcoin/red house starts here
>

                <img src={Sign} width="100" height="100" className="inset-0" style={{position: "absolute", top: "80px", left: "170px"}} />
                <img src={Cats} width="50" height="50" className="inset-0" style={{position: "absolute", top: "90px", left: "195px"}} />
            <a href='./cats'>
            <img src={HouseRed} width="134" height="165" className="inset-0"  />
                            <img src={Smoke} width="30" height="50" className="inset-0" style={{position: "absolute", top: "21px", left: "5px"}} />
<div class="bg-brown-300 p-1 text-white text-shadow text-xs w-fit" style={{position: "absolute", width: "100px", borderStyle: "solid", borderWidth: "1px", imageRendering: "pixelated", borderRadius: "5px", top: "110px", left: "20px", borderImage: 'url("https://raw.githubusercontent.com/decenworld/gamingdemo/5f3cab580fc688ec00661ee94545dbb9f829a460/src/assets/img/wall-sign.png") 25% / 3 / 0 repeat'}}>
  <span style={{marginLeft: "3px"}}>STAKING</span></div>
            </a>
            </span>


          <span id="housered" className='housered' style={{position: "absolute", top: "850px", left: "3400px", imageRendering: "pixelated"}}
// catcoin/red house starts here
>

                <img src={Sign} width="100" height="100" className="inset-0" style={{position: "absolute", top: "80px", left: "170px"}} />
                <img src={Cryptoman} width="50" height="50" className="inset-0" style={{position: "absolute", top: "90px", left: "195px"}} />
            <a href='./cryptoman'>
            <img src={HouseRed} width="134" height="165" className="inset-0"  />
                            <img src={Smoke} width="30" height="50" className="inset-0" style={{position: "absolute", top: "21px", left: "5px"}} />
<div class="bg-brown-300 p-1 text-white text-shadow text-xs w-fit" style={{position: "absolute", width: "100px", borderStyle: "solid", borderWidth: "1px", imageRendering: "pixelated", borderRadius: "5px", top: "110px", left: "20px", borderImage: 'url("https://raw.githubusercontent.com/decenworld/gamingdemo/5f3cab580fc688ec00661ee94545dbb9f829a460/src/assets/img/wall-sign.png") 25% / 3 / 0 repeat'}}>
  <span style={{marginLeft: "3px"}}>STAKING</span></div>
            </a>
            </span>

                     <span id="housered" className='housered' style={{position: "absolute", top: "1210px", left: "3400px", imageRendering: "pixelated"}}
// 3d cat - catcoin/red house starts here
>

                <img src={Sign} width="100" height="100" className="inset-0" style={{position: "absolute", top: "80px", left: "170px"}} />
                <img src={DCAT} width="50" height="50" className="inset-0" style={{position: "absolute", top: "90px", left: "195px"}} />
            <a href='./3dcat'>
            <img src={HouseRed} width="134" height="165" className="inset-0"  />
                            <img src={Smoke} width="30" height="50" className="inset-0" style={{position: "absolute", top: "21px", left: "5px"}} />
<div class="bg-brown-300 p-1 text-white text-shadow text-xs w-fit" style={{position: "absolute", width: "100px", borderStyle: "solid", borderWidth: "1px", imageRendering: "pixelated", borderRadius: "5px", top: "110px", left: "20px", borderImage: 'url("https://raw.githubusercontent.com/decenworld/gamingdemo/5f3cab580fc688ec00661ee94545dbb9f829a460/src/assets/img/wall-sign.png") 25% / 3 / 0 repeat'}}>
  <span style={{marginLeft: "3px"}}>STAKING</span></div>
            </a>
            </span>

                      <span id="boardroom" className='boardroom' style={{position: "absolute", top: "1010px", left: "3145px", imageRendering: "pixelated"}}
// catcoin/red house starts here
>

            <a href='./boardroom'>
            <img src={Boardroom} width="190" height="165" className="inset-0"  />
<div class="bg-brown-300 p-1 text-white text-shadow text-xs w-fit" style={{position: "absolute", width: "122px", borderStyle: "solid", borderWidth: "1px", imageRendering: "pixelated", borderRadius: "5px", top: "80px", left: "35px", borderImage: 'url("https://raw.githubusercontent.com/decenworld/gamingdemo/5f3cab580fc688ec00661ee94545dbb9f829a460/src/assets/img/wall-sign.png") 25% / 3 / 0 repeat'}}>
  <span style={{marginLeft: "3px"}}>BOARDROOM</span></div>
            </a>
            </span>
                      <span id="farm" className='farm' style={{position: "absolute", top: "1190px", left: "3100px", imageRendering: "pixelated"}}
// catcoin/red house starts here
>

            <a href='./farms'>
            <img src={Farm} width="134" height="165" className="inset-0"  />
<div class="bg-brown-300 p-1 text-white text-shadow text-xs w-fit" style={{position: "absolute", width: "75px", borderStyle: "solid", borderWidth: "1px", imageRendering: "pixelated", borderRadius: "5px", top: "60px", left: "30px", borderImage: 'url("https://raw.githubusercontent.com/decenworld/gamingdemo/5f3cab580fc688ec00661ee94545dbb9f829a460/src/assets/img/wall-sign.png") 25% / 3 / 0 repeat'}}>
  <span style={{marginLeft: "3px"}}>FARMS</span></div>
            </a>
            </span>


              <span id="man" className='man' style={{position: "absolute", top: "1500px", left: "3200px", imageRendering: "pixelated"}}>
              
            <img src={Man} width="40" height="44" className="inset-0"  />

            </span> 
                       <a href='./catstatue'>

      <span id="catstatue" className='catstatue' style={{position: "absolute", top: "1599px", left: "3192px", imageRendering: "pixelated"}}>
              
            <img src={CatStatue} width="92" height="150" className="inset-0"  />
            <div class="bg-brown-300 p-1 text-white text-shadow text-xs w-fit" style={{position: "absolute", width: "110px", borderStyle: "solid", borderWidth: "1px", imageRendering: "pixelated", borderRadius: "5px", top: "130px", left: "-10px", borderImage: 'url("https://raw.githubusercontent.com/decenworld/gamingdemo/5f3cab580fc688ec00661ee94545dbb9f829a460/src/assets/img/wall-sign.png") 25% / 3 / 0 repeat'}}>
  <span style={{marginLeft: "3px"}}>MINT NOW</span></div>
            </span> 
                        </a>

                <a href='./diamondstone'>

      <span id="catstatue" className='catstatue' style={{position: "absolute", top: "1599px", left: "3392px", imageRendering: "pixelated"}}>
              
            <img src={DiamondStatue} width="92" height="150" className="inset-0"  />
            <div class="bg-brown-300 p-1 text-white text-shadow text-xs w-fit" style={{position: "absolute", width: "110px", borderStyle: "solid", borderWidth: "1px", imageRendering: "pixelated", borderRadius: "5px", top: "130px", left: "-10px", borderImage: 'url("https://raw.githubusercontent.com/decenworld/gamingdemo/5f3cab580fc688ec00661ee94545dbb9f829a460/src/assets/img/wall-sign.png") 25% / 3 / 0 repeat'}}>
  <span style={{marginLeft: "3px"}}>MINT NOW</span></div>
            </span> 
                        </a>

                <a href='./stone'>

      <span id="catstatue" className='catstatue' style={{position: "absolute", top: "1599px", left: "3592px", imageRendering: "pixelated"}}>
              
            <img src={Stone} width="92" height="150" className="inset-0"  />
            <div class="bg-brown-300 p-1 text-white text-shadow text-xs w-fit" style={{position: "absolute", width: "75px", borderStyle: "solid", borderWidth: "1px", imageRendering: "pixelated", borderRadius: "5px", top: "130px", left: "7px", borderImage: 'url("https://raw.githubusercontent.com/decenworld/gamingdemo/5f3cab580fc688ec00661ee94545dbb9f829a460/src/assets/img/wall-sign.png") 25% / 3 / 0 repeat'}}>
  <span style={{marginLeft: "3px"}}>STAKE</span></div>
            </span> 
                        </a>



                                  <span id="npc" className='npc' style={{position: "absolute", top: "1510px", left: "1750px", imageRendering: "pixelated", transform: "scaleX(-1)"}}>
            <img src={GoblingAxe} width="250" height="64" className="inset-0"  />
            </span>    
              
                      <span id="npc" className='npc' style={{position: "absolute", top: "1300px", left: "1820px", imageRendering: "pixelated"}}>
            <img src={GoblingDig} width="250" height="64" className="inset-0"  />
            </span>    
                      <span id="npc" className='npc' style={{position: "absolute", top: "1200px", left: "2120px", imageRendering: "pixelated", transform: "scaleX(-1)"}}>
            <img src={GoblingHammer} width="250" height="64" className="inset-0"  />
            </span>    

          </div>
          

                      </StyledLink>

        </ScrollContainer>

      </Grid>

    </Page>
    
  );
  
};

export default Home;
