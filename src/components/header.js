import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { HelmetDatoCms } from 'gatsby-source-datocms';
import Link from 'gatsby-link';
import { graphql, useStaticQuery } from 'gatsby';
import Img from 'gatsby-image';
import ShoppingCartRoundedIcon from '@mui/icons-material/ShoppingCartRounded';
import DropdownMenu from '../components/dropdown';

const Header = ({ site, seo }) => {
  const data = useStaticQuery(graphql`
    query {
      datoCmsAsset(filename: { eq: "logo.png" }) {
        fluid(maxWidth: 300, imgixParams: { fm: "png" }) {
          ...GatsbyDatoCmsFluid
        }
      }
    }
  `);

  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const handleDropdownToggle = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  return (
    <>
      <HelmetDatoCms seo={seo} />
      <div className="Header">
        <div className="Wrap">
          <div className="Header__body">
            <div className="Header__menu-icon" onClick={handleDropdownToggle}>
              <div className={`menu-icon__bar ${isDropdownOpen ? 'open' : ''}`}></div>
              <div className={`menu-icon__bar ${isDropdownOpen ? 'open' : ''}`}></div>
              <div className={`menu-icon__bar ${isDropdownOpen ? 'open' : ''}`}></div>
            </div>
            <div className="Header__title">
              <Link data-text={site.globalSeo.siteName} to="/">
                <Img fluid={data.datoCmsAsset.fluid} loading="lazy" />
              </Link>
            </div>
            <div className={`Header__summary snipcart-summary snipcart-checkout ${isDropdownOpen ? 'open' : ''}`}>
              <div className="Header__summary__title">
                <ShoppingCartRoundedIcon data-item-count className="cart-icon" />
                <span className="snipcart-items-count"></span>
              </div>
            </div>
          </div>
          {isDropdownOpen && <DropdownMenu />}
        </div>
      </div>
    </>
  );
};

Header.propTypes = {
  site: PropTypes.object.isRequired,
  seo: PropTypes.object.isRequired,
};

export default Header;