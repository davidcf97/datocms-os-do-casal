import React from 'react';
import Layout from '../layouts/index';
import Img from 'gatsby-image';
import { graphql } from 'gatsby';

const Product = ({ location, data }) => {
  
  const dataFromLink = location.state && location.state.siteData;
  const dataFromQuery  = data;
  const dataFinal = dataFromLink || dataFromQuery;
  console.log(dataFinal);

  const productFromLink = location.state && location.state.productData;
  const productFromQuery = data.datoCmsProduct;
  const product  = productFromLink || productFromQuery;


  return(
    <Layout
      site={dataFinal.site}
      seo={{ ...dataFinal.site.globalSeo, ...dataFinal.site.faviconMetaTags }}
    >
      <div className="Catalogue__item" key={product.id}>
          <div className="Product__image">
            <Img fluid={product.image.fluid} loading="lazy" />
          </div>
          <div className="Product__details">
            <div className="Product__name">
              {product.name}
              <div className="Product__price">{product.price}€</div>
            </div>
            <span className="Product__buy">Buy now</span>
          </div>
      </div>
    </Layout>
  )
};

export const query = graphql`
  query($productId: String!) {
    datoCmsProduct(id: { eq: $productId }) {
      id
      name
      price
      image {
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