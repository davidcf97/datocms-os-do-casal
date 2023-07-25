import React from 'react';
import Layout from '../layouts/index';
import Img from 'gatsby-image';
import { graphql } from 'gatsby';

const Product = ({ data }) => {

  const product = data.datoCmsProduct;

  return(
    <Layout
      site={data.site}
      seo={{ ...data.site.globalSeo, ...data.site.faviconMetaTags }}
    >
      <div className="product-display__item" key={product.id}>
        <div
                className="Product snipcart-add-item"
                data-item-id={product.id}
                data-item-price={product.price}
                data-item-image={product.image.url}
                data-item-name={product.name}
                data-item-url={`/product/${product.seourl}`}
              >
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
      </div>
    </Layout>
  )
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