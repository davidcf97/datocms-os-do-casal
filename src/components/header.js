import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { HelmetDatoCms } from 'gatsby-source-datocms';
import Link from 'gatsby-link';
import ShoppingCartRoundedIcon from '@mui/icons-material/ShoppingCartRounded';
import DropdownMenu from '../components/dropdown';

const Header = ({ site, seo }) => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const handleDropdownToggle = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  return (
    <>
      <HelmetDatoCms seo={seo} />
      <script async src="https://cdn.snipcart.com/themes/v3.2.1/default/snipcart.js"></script>
      <div hidden id="snipcart" data-api-key="OWE3MmZmMjQtNTk3Yi00OThhLWEwMmUtZDY4ZWM4NzIwYzZiNjM2NjM0Mzc1NzE0MTUwNzI1"></div>
      <div className="Header">
        <div className="Wrap">
          <div className="Header__body">
            <div className="Header__menu-icon" onClick={handleDropdownToggle}>
              <div className={`menu-icon__bar ${isDropdownOpen ? 'open' : ''}`}></div>
              <div className={`menu-icon__bar ${isDropdownOpen ? 'open' : ''}`}></div>
              <div className={`menu-icon__bar ${isDropdownOpen ? 'open' : ''}`}></div>
            </div>
            <h1 className="Header__title">
              <Link data-text={site.globalSeo.siteName} to="/">
                {site.globalSeo.siteName}
              </Link>
            </h1>
            <div className={`Header__summary snipcart-summary snipcart-checkout ${isDropdownOpen ? 'open' : ''}`}>
              <div className="Header__summary__title">
                <ShoppingCartRoundedIcon data-item-count className="cart-icon" />
                <span className="snipcart-items-count"></span>
              </div>
            </div>
          </div>
          {isDropdownOpen && <DropdownMenu/>}
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