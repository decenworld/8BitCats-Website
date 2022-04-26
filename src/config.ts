// import { ChainId } from '@pancakeswap-libs/sdk';
import { ChainId } from '@spookyswap/sdk';
import { Configuration } from './tomb-finance/config';
import { BankInfo } from './tomb-finance';

const configurations: { [env: string]: Configuration } = {

  production: {
    chainId: ChainId.MAINNET,
    networkName: 'Fantom Opera Mainnet',
    ftmscanUrl: 'https://ftmscan.com',
    defaultProvider: 'https://rpc.ftm.tools/',
    deployments: require('./tomb-finance/deployments/deployments.mainnet.json'),
    externalTokens: {
      WFTM: ['0x21be370d5312f44cb42ce377bc9b8a0cef1a4c83', 18],
      FUSDT: ['0x04068DA6C83AFCFA0e13ba15A6696662335D5B75', 6], // This is actually usdc on mainnet not fusdt
      WETH: ['0x74b23882a30290451A17c44f4F05243b6b58C76d', 18], // BOO: 0x841FAD6EAe12c286d1Fd18d1d525DFfA75C7EFFE 18
      TOMB: ['0x6c021ae822bea943b2e66552bde1d2696a53fbb7', 18], // ZOO: 0x09e145a1d53c0045f41aeef25d8ff982ae74dd56 0
      USDC: ['0x04068da6c83afcfa0e13ba15a6696662335d5b75', 6], // SHIBA: 0x9ba3e4f84a34df4e08c112e1a0ff148b81655615 9
      FANG: ['0x49894fcc07233957c35462cfc3418ef0cc26129f', 18],
      MvDOLLAR: ['0x8CcD162E5997363Dc2101371B3B09f316D012306', 18],
      'USDT-FTM-LP': ['0x2b4C76d0dc16BE1C31D4C1DC53bF9B45987Fc75c', 18],
      'MVDOLLAR-USDC-LP': ['0x20f1F2F12ca4F4B241aB9745EE61745ECC97c60a', 18],
      'MSHARE-USDC-LP': ['0xAE3439d64f1fC15188F660Fa35cfb16d7257c0eb', 18],
      'MVDOLLAR-MSHARE-LP': ['0x85E8DcBc11eF5C5F98277B20A041C8ab90E0e2f7', 18]
    },
    baseLaunchDate: new Date('2021-06-02 13:00:00Z'),
    bondLaunchesAt: new Date('2020-12-03T15:00:00Z'),
    masonryLaunchesAt: new Date('2020-12-11T00:00:00Z'),
    refreshInterval: 10000,
  },
};



export const bankDefinitions: { [contractName: string]: BankInfo } = {
  /*
  Explanation:
  name: description of the card
  poolId: the poolId assigned in the contract
  sectionInUI: way to distinguish in which of the 3 pool groups it should be listed
        - 0 = Single asset stake pools
        - 1 = LP asset staking rewarding TOMB
        - 2 = LP asset staking rewarding TSHARE
  contract: the contract name which will be loaded from the deployment.environmnet.json
  depositTokenName : the name of the token to be deposited
  earnTokenName: the rewarded token
  finished: will disable the pool on the UI if set to true
  sort: the order of the pool
  */
 /*
  TombFtmRewardPool: {
    name: 'Stake WFTM, earn MvDOLLAR',
    poolId: 1,
    sectionInUI: 0,
    contract: 'TombFtmRewardPool',
    depositTokenName: 'WFTM',
    earnTokenName: 'MvDOLLAR',
    multiplier: "100x",
    finished: false,
    sort: 1,
    closedForStaking: true,
  },
  USDCRewardPool: {
    name: 'Stake USDC, earn MvDOLLAR',
    poolId: 0,
    sectionInUI: 0,
    contract: 'USDCRewardPool',
    depositTokenName: 'USDC',
    earnTokenName: 'MvDOLLAR',
    multiplier: "50x",
    finished: false,
    sort: 2,
    closedForStaking: true,
  },
  FANGRewardPool: {
    name: 'Stake FANG, earn MvDOLLAR',
    poolId: 2,
    sectionInUI: 0,
    contract: 'FANGRewardPool',
    depositTokenName: 'FANG',
    earnTokenName: 'MvDOLLAR',
    multiplier: "25x",
    finished: false,
    sort: 3,
    closedForStaking: true,
  },
  LPRewardPool: {
    name: 'Stake MvDOLLAR-USDC LP, earn MvDOLLAR',
    poolId: 3,
    sectionInUI: 0,
    contract: 'LPRewardPool',
    depositTokenName: 'MVDOLLAR-USDC-LP',
    earnTokenName: 'MvDOLLAR',
    multiplier: "100x",
    finished: false,
    sort: 4,
    closedForStaking: true,
  },
*/
  /*shares*/
  LPRewardPool1ShareRewardPool: {
    name: 'CATCOINS-USDC LP',
    poolId: 1,
    sectionInUI: 2,
    contract: 'LPRewardPool1ShareRewardPool',
    depositTokenName: 'MVDOLLAR-USDC-LP',
    earnTokenName: 'MSHARE',
    earnTokenName2: 'CATSHARE',
    multiplier: "100x",
    finished: false,
    sort: 1,
    closedForStaking: false,
  },
  LPRewardPool2ShareRewardPool: {
    name: 'CATSHARE-USDC LP',
    poolId: 0,
    sectionInUI: 2,
    contract: 'LPRewardPool2ShareRewardPool',
    depositTokenName: 'MSHARE-USDC-LP',
    earnTokenName: 'MSHARE',
    earnTokenName2: 'CATSHARE',
    multiplier: "100x",
    finished: false,
    sort: 2,
    closedForStaking: false,
  },
  LPRewardPool3ShareRewardPool: {
    name: 'Stake MvDOLLAR-MSHARE LP, earn MSHARE',
    poolId: 3,
    sectionInUI: 2,
    contract: 'LPRewardPool3ShareRewardPool',
    depositTokenName: 'MVDOLLAR-MSHARE-LP',
    earnTokenName: 'MSHARE',
    earnTokenName2: 'CATSHARE',
    multiplier: "100x",
    finished: true,
    sort: 3,
    closedForStaking: false,
  },
  mvdollarShareRewardPool: {
    name: 'CATCOINS',
    poolId: 2,
    sectionInUI: 2,
    contract: 'mvdollarShareRewardPool',
    depositTokenName: 'MvDOLLAR',
    earnTokenName: 'MSHARE',
    earnTokenName2: 'CATSHARE',
    multiplier: "100x",
    finished: false,
    sort: 3,
    closedForStaking: false,
  },


};

export default configurations['production'];
