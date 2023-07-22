import React from 'react';
import PropTypes from 'prop-types';
import '../style/index.scss';
import { HelmetDatoCms } from 'gatsby-source-datocms';
import Footer from '../components/footer';
import Header from '../components/header';

const Layout = ({ children, site, seo }) => {
  return (
    <>
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