import React from 'react';
import Layout from '../layouts/index';
import Img from 'gatsby-image';
import { graphql } from 'gatsby';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const Product = ({ data }) => {
  const product = data.datoCmsProduct;

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    prevArrow: <ArrowBackIosIcon />,
    nextArrow: <ArrowForwardIosIcon />,
    responsive: [
      {
        breakpoint: 768, // Change this to the desired breakpoint for mobile
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: true, // Show arrows on mobile
        },
      },
    ],
  };

  return (
    <Layout
      site={data.site}
      seo={{ ...data.site.globalSeo, ...data.site.faviconMetaTags }}
    >
      <div className="product-display__item" key={product.id}>
        <Slider {...settings}>
          {product.imagegalery.map((image, index) => (
            <div key={index} className="carousel-image">
              <Img fluid={image.fluid} loading="lazy" />
            </div>
          ))}
        </Slider>
        <div className="Product snipcart-add-item" data-item-id={product.id} data-item-price={product.price} data-item-image={product.image.url} data-item-name={product.name} data-item-url={`/product/${product.seourl}`}>
          <div className="Product__details">
            <div className="Product__name">
              {product.name}
              <div className="Product__price">{product.price}€</div>
            </div>
            <span className="Product__buy">Buy now</span>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export const query = graphql`
  query($productId: String) {
    datoCmsProduct(id: { eq: $productId }) {
      id
      seourl
      name
      price
      locale
      image {
        fluid(maxWidth: 300, imgixParams: { fm: "jpg" }) {
          ...GatsbyDatoCmsFluid
        }
      }
      imagegalery {
        fluid(maxWidth: 300, imgixParams: { fm: "jpg" }) {
          ...GatsbyDatoCmsFluid
        }
      }
    }
    site: datoCmsSite {
      faviconMetaTags {
        tags
      }
      globalSeo {
        siteName
      }
    }
  }
`;

export default Product;