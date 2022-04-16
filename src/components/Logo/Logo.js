import React from 'react';
import styled from 'styled-components/macro';

import { WEIGHTS } from '../../constants';

const Logo = (props) => {
  return (
    <Wrapper {...props}>
      <Link href="/">Sole&amp;Ankle</Link>
    </Wrapper>
  );
};

const Link = styled.a`
  text-decoration: none;
  color: inherit;
`;

const Wrapper = styled.h1`
  font-size: 1.5rem;
  font-weight: ${WEIGHTS.bold};

  position: absolute;
  left: 32px;
`;

export default Logo;
