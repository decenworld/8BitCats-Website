import React from 'react';
import { Container } from '@material-ui/core';
import useEagerConnect from '../../hooks/useEagerConnect';

import Footer from '../Footer';


const Page: React.FC = ({ children }) => {
  useEagerConnect();
  return (
    <div style={{ backgroundColor: 'rgba(52, 52, 52, alpha)', position: 'relative', minHeight: '100vh', marginTop: '30px' }}>

      <Container maxWidth="lg" style={{ paddingBottom: '5rem' }}>
        {children}
      </Container>
      <Footer />
    </div>
  );
};

export default Page;
