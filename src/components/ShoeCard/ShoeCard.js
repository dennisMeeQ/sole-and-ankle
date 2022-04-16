import React from 'react';
import styled from 'styled-components/macro';

import { COLORS, WEIGHTS } from '../../constants';
import { formatPrice, pluralize, isNewShoe } from '../../utils';
import Spacer from '../Spacer';

const DISRUPTOR_TEXTS = {
  'on-sale': 'Sale',
  'new-release': 'Just Released!',
};

const ShoeCard = ({
  slug,
  name,
  imageSrc,
  price,
  salePrice,
  releaseDate,
  numOfColors,
}) => {
  // There are 3 variants possible, based on the props:
  //   - new-release
  //   - on-sale
  //   - default
  //
  // Any shoe released in the last month will be considered
  // `new-release`. Any shoe with a `salePrice` will be
  // on-sale. In theory, it is possible for a shoe to be
  // both on-sale and new-release, but in this case, `on-sale`
  // will triumph and be the variant used.
  // prettier-ignore
  const isOnSale = typeof salePrice === 'number';
  const variant = isOnSale
    ? 'on-sale'
    : isNewShoe(releaseDate)
    ? 'new-release'
    : 'default';

  return (
    <Wrapper>
      <Link href={`/shoe/${slug}`}>
        <InnerWrapper>
          <ImageWrapper>
            <Image alt="" src={imageSrc} />
            {variant && variant !== 'default' && (
              <Disruptor variant={variant}>
                {DISRUPTOR_TEXTS?.[variant] ?? ''}
              </Disruptor>
            )}
          </ImageWrapper>
          <Spacer size={12} />
          <Row>
            <Name>{name}</Name>
            <Price isOnSale={isOnSale}>{formatPrice(price)}</Price>
          </Row>
          <Row>
            <ColorInfo>{pluralize('Color', numOfColors)}</ColorInfo>
            {salePrice && <SalePrice>{formatPrice(salePrice)}</SalePrice>}
          </Row>
        </InnerWrapper>
      </Link>
    </Wrapper>
  );
};

const Wrapper = styled.article`
  flex: 1 1 300px;

  :last-child {
    max-width: 400px;
  }
`;

const InnerWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const Link = styled.a`
  text-decoration: none;
  color: inherit;
`;

const ImageWrapper = styled.div`
  position: relative;
  width: 100%;
`;

const Image = styled.img`
  width: 100%;
  border-radius: 16px 16px 4px 4px;
`;

const Row = styled.div`
  font-size: 1rem;

  display: flex;
  justify-content: space-between;
`;

const Name = styled.h3`
  font-weight: ${WEIGHTS.medium};
  color: ${COLORS.gray[900]};
`;

const Price = styled.span`
  text-decoration: ${({ isOnSale }) => (isOnSale ? 'line-through' : '')};
`;

const ColorInfo = styled.p`
  color: ${COLORS.gray[700]};
`;

const SalePrice = styled.span`
  font-weight: ${WEIGHTS.medium};
  color: ${COLORS.primary};
`;

const Disruptor = styled.div`
  position: absolute;
  top: 12px;
  right: -4px;

  padding: 8px;
  border-radius: 2px;

  color: ${COLORS.white};
  background-color: ${({ variant }) =>
    variant === 'new-release' ? COLORS.secondary : COLORS.primary};
`;

export default ShoeCard;
