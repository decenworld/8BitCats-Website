import React from 'react';

import styled from 'styled-components';

interface ValueProps {
  value: string;
}

const Value: React.FC<ValueProps> = ({ value }) => {
  return <StyledValue>{value}</StyledValue>;
};

const StyledValue = styled.div`
  font-size: 36px;
  font-weight: 700;
  @media screen and (max-width: 600px) {

   font-size: 22px;
  
}
`;

export default Value;
