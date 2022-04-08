import React from 'react';

//Graveyard ecosystem logos
import tombLogo from '../../assets/img/MvDOLLAR.png';
import tShareLogo from '../../assets/img/MvSHARE.png';
import tShareLogoPNG from '../../assets/img/MvSHARE.png';
import tBondLogo from '../../assets/img/MvBOND.png';

import tombFtmLpLogo from '../../assets/img/Mv-USDC.png';
import tshareFtmLpLogo from '../../assets/img/MvS-USDC.png';
import mvsmvd from '../../assets/img/MvD-MvS.png';
import wftmLogo from '../../assets/img/ftm_logo_blue.svg';
import wethLogo from '../../assets/img/weth.png';
import shibaLogo from '../../assets/img/mimlogo.png';
import fang from '../../assets/img/FANG.png';
import usdc from '../../assets/img/USDC.png';

const logosBySymbol: { [title: string]: string } = {
  //Real tokens
  //=====================
  TOMB: tombLogo,
  '2OMB': tombLogo,
  '2SHARES': tShareLogoPNG,
  MvBOND: tBondLogo,
  MvDOLLAR: tombLogo,
  TOMBPNG: tombLogo,
  TSHAREPNG: tShareLogoPNG,
  TSHARE: tShareLogo,
  MSHARE: tShareLogoPNG,
  TBOND: tBondLogo,
  WFTM: wftmLogo,
  WETH: wethLogo,
  MIM: shibaLogo,
  FANG: fang,
  
  'MVDOLLAR-USDC-LP': tombFtmLpLogo,
  'MSHARE-USDC-LP': tshareFtmLpLogo,
  'MVDOLLAR-MSHARE-LP': mvsmvd,
  'USDC': usdc,
};

type LogoProps = {
  symbol: string;
  size?: number;
};

const TokenSymbol: React.FC<LogoProps> = ({ symbol, size = 75 }) => {

  if(symbol === 'TOMB' || symbol === 'TOMBPNG' || symbol === '2SHARES'){
    return <img src={logosBySymbol[symbol]} alt={`${symbol} Logo`} width={75} height={55} />;
  }else{
    return <img src={logosBySymbol[symbol]} alt={`${symbol} Logo`} width={size} height={size} />;
  }


  
};

export default TokenSymbol;
