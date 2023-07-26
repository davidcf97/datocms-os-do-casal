import React from 'react';
import PropTypes from 'prop-types';
import '../style/index.scss';
import { HelmetDatoCms } from 'gatsby-source-datocms';
import Footer from '../components/footer';
import Header from '../components/header';

const Layout = ({ children, site, seo}) => {
  return (
    <>
      <script async src="https://cdn.snipcart.com/themes/v3.2.1/default/snipcart.js"></script>
      <div hidden id="snipcart" data-api-key="OWE3MmZmMjQtNTk3Yi00OThhLWEwMmUtZDY4ZWM4NzIwYzZiNjM2NjM0Mzc1NzE0MTUwNzI1"></div>
      <HelmetDatoCms seo={seo} />
      <div className="Container">
        <Header site={site} seo={seo} />
        <div className="Wrap">{children}</div>
        <div className="Wrap">
          <Footer />
        </div>
      </div>
    </>
  );
};

Layout.propTypes = {
  children: PropTypes.node,
};

export default Layout;