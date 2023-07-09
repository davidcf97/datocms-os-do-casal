import React from 'react';
import PropTypes from 'prop-types';
import Link from 'gatsby-link';
import '../style/index.scss';
import { HelmetDatoCms } from 'gatsby-source-datocms';
import Footer from '../components/footer';

const Layout = ({ children, site, seo }) => {
  return (
    <>
      <HelmetDatoCms seo={seo} />
      <div className="Container">
        <div className="Header">
          <div className="Wrap">
            <div className="Header__body">
              <h1 className="Header__title">
                <Link data-text={site.globalSeo.siteName} to="/">
                  {site.globalSeo.siteName}
                </Link>
              </h1>
              <div className="Header__summary snipcart-summary snipcart-checkout">
                <div className="Header__summary__title">🛍 MY CART 🛍</div>
                <div className="Header__summary__line">
                  Number of items:{' '}
                  <span className="snipcart-total-items"></span>
                </div>
                <div className="Header__summary__line">
                  Total price: <span className="snipcart-total-price"></span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="Wrap">{children}</div>
        <div className="Wrap">
          <Footer />
        </div>
      </div>
    </>
  );
};

Layout.propTypes = {
  children: PropTypes.func,
};

export default Layout;
