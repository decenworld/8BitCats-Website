import React from 'react';
import { Container } from '@material-ui/core';
import useEagerConnect from '../../hooks/useEagerConnect';

import Footer from '../Footer';
import Nav from '../Nav';

const Page: React.FC = ({ children }) => {
  useEagerConnect();
  return (
    <div style={{ position: 'relative', minHeight: '100vh' }}>
       <Container maxWidth={false} style={{ paddingRight: '0rem', paddingLeft: '0rem' }}>
        {children}
      </Container>
    </div>
  );
};

export default Page;
