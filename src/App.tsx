import React, { Suspense, lazy } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ThemeProvider as TP } from '@material-ui/core/styles';
import { ThemeProvider as TP1 } from 'styled-components';
import { UseWalletProvider } from 'use-wallet';
import usePromptNetwork from './hooks/useNetworkPrompt';
import BanksProvider from './contexts/Banks';
import TombFinanceProvider from './contexts/TombFinanceProvider';
import ModalsProvider from './contexts/Modals';
import store from './state';
import theme from './theme';
import newTheme from './newTheme';
import config from './config';
import Updaters from './state/Updaters';
import Loader from './components/Loader';
import Popups from './components/Popups';
import Regulations from './views/Regulations/Regulations';
import { RefreshContextProvider } from './contexts/RefreshContext';

const Home = lazy(() => import('./views/Home'));
const Cemetery = lazy(() => import('./views/Cemetery'));
const Masonry = lazy(() => import('./views/Masonry'));
const Pit = lazy(() => import('./views/Pit'));
const SBS = lazy(() => import('./views/Sbs'));
const Strategies = lazy(() => import('./views/Strategies'));
const Raffle = lazy(() => import('./views/Raffle'));
const Minichilla = lazy(() => import('./views/Minichilla'));
const Miniguinea = lazy(() => import('./views/Miniguinea'));
const Miniland = lazy(() => import('./views/Miniland'));
const Catland = lazy(() => import('./views/Catland'));
const Cryptoman = lazy(() => import('./views/Cryptoman'));
const New = lazy(() => import('./views/New'));
const Cats = lazy(() => import('./views/Cats'));
const Feeple = lazy(() => import('./views/Feeple'));
const Cryptowormz = lazy(() => import('./views/Cryptowormz'));
const Cryptowormzhd = lazy(() => import('./views/Cryptowormzhd'));
const Coolpenguin = lazy(() => import('./views/Coolpenguin'));
const Catstatue = lazy(() => import('./views/Catstatue'));
const Fantomllama = lazy(() => import('./views/Fantomllama'));
const Diamondstone = lazy(() => import('./views/Diamondstone'));
const Stone = lazy(() => import('./views/Stone'));
const Owl = lazy(() => import('./views/Owl'));
const Penguin = lazy(() => import('./views/Penguin'));
const Seal = lazy(() => import('./views/Seal'));
const Trippycat = lazy(() => import('./views/Trippycat'));
const DCat = lazy(() => import('./views/3dcat'));


const Info = lazy(() => import('./views/Info'));





const NoMatch = () => (
  <h3 style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
    URL Not Found. <a href="/">Go back home.</a>
  </h3>
);

const App: React.FC = () => {
  // Clear localStorage for mobile users
  if (typeof localStorage.version_app === 'undefined' || localStorage.version_app !== '1.1') {
    localStorage.clear();
    localStorage.setItem('connectorId', '');
    localStorage.setItem('version_app', '1.1');
  }

  usePromptNetwork();

  return (
    <Providers>
      <Router>
        <Suspense fallback={<Loader />}>
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/farms">
              <Cemetery />
            </Route>
            <Route path="/minichilla">
              <Minichilla />
            </Route>
            <Route path="/miniguinea">
              <Miniguinea />
            </Route>
            <Route path="/miniland">
              <Miniland />
            </Route>
              <Route path="/catland">
              <Catland />
            </Route>
            <Route path="/boardroom">
              <Masonry />
            </Route>
            <Route path="/bonds">
              <Pit />
            </Route>
            <Route path="/fantomllama">
              <Fantomllama />
            </Route>
            <Route path="/raffle">
              <Raffle />
            </Route>
            <Route path="/strategies">
              <Strategies />
            </Route>
             <Route path="/cryptoman">
              <Cryptoman />
            </Route>
                          <Route path="/catstatue">
              <Catstatue />
            </Route>
            <Route path="/new">
              <New />
            </Route>
              <Route path="/cats">
              <Cats />
            </Route>

              <Route path="/cryptowormz">
              <Cryptowormz />
            </Route>
                          <Route path="/cryptowormzhd">
              <Cryptowormzhd />
            </Route>
                          <Route path="/coolpenguin">
              <Coolpenguin />
            </Route>
            <Route path="/diamondstone">
              <Diamondstone />
            </Route>
            <Route path="/stone">
              <Stone />
            </Route>

            <Route path="/owl">
              <Owl />
            </Route>
                        <Route path="/trippycat">
              <Trippycat />
            </Route>
                        <Route path="/feeple">
              <Feeple />
            </Route>
            <Route path="/penguin">
              <Penguin />
            </Route>
                     <Route path="/seal">
              <Seal />
            </Route>
                              <Route path="/info">
              <Info />
            </Route>
                                    <Route path="/3dcat">
              <DCat />
            </Route>
            <Route path="*">
              <NoMatch />
            </Route>
          </Switch>
        </Suspense>
      </Router>
    </Providers>
  );
};

const Providers: React.FC = ({ children }) => {
  return (
    <TP1 theme={theme}>
      <TP theme={newTheme}>
        <UseWalletProvider
          chainId={config.chainId}
          connectors={{
            walletconnect: { rpcUrl: config.defaultProvider },
            walletlink: {
              url: config.defaultProvider,
              appName: '2omb Finance',
              appLogoUrl: 'https://github.com/tombfinance/tombfinance-assets/blob/master/logo_tomb_NoBG.png',
            },
          }}
        >
          <Provider store={store}>
            <Updaters />
              <TombFinanceProvider>
                <ModalsProvider>
                  <BanksProvider>
                    <>
                      <Popups />
                      {children}
                    </>
                  </BanksProvider>
                </ModalsProvider>
              </TombFinanceProvider>
          </Provider>
        </UseWalletProvider>
      </TP>
    </TP1>
  );
};

export default App;
