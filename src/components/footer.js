import React from 'react';
import { Info, Email, Link } from '@mui/icons-material';

const Footer = () => {
    return (
      <footer className="Footer">
        <div className="container">
          <div className="row">
            <div className="col-md-4">
              <h3>
                <Info /> About Us
              </h3>
              {/* Rest of the content */}
            </div>
            <div className="col-md-4">
              <h3>
                <Email /> Contact Us
              </h3>
              {/* Rest of the content */}
            </div>
            <div className="col-md-4">
              <h3>
                <Link /> Stay Connected
              </h3>
              {/* Rest of the content */}
            </div>
          </div>
          {/* Rest of the content */}
        </div>
      </footer>
    );
};  

export default Footer;