import React from 'react';
import { graphql, Link } from 'gatsby';
import Layout from '../layouts/index';
import Img from 'gatsby-image';

const Home = ({ data }) => {
  const products = data.products.edges;
  const { site } = data;

  return (
    <Layout
      site={site}
      seo={{ ...site.globalSeo, ...site.faviconMetaTags }}
    >
      <div className="Catalogue">
        {products.map(({ node: product }) => (
          <div className="Catalogue__item" key={product.id}>
            <Link to={`${product.locale}/product/${product.seourl}`}>
              <div className="Product__image">
                <Img fluid={product.image.fluid} loading="lazy" />
              </div>
              <div className="Product__details">
                <div className="Product__name">
                  {product.name}
                  <div className="Product__price">{product.price}€</div>
                </div>
              </div>
            </Link>
            <div
              className="Product snipcart-add-item"
              data-item-id={product.id}
              data-item-price={product.price}
              data-item-image={product.image.url}
              data-item-name={product.name}
              data-item-url={`/product/${product.id}`}
            >
              <span className="Product__buy">Buy now</span>
            </div>
          </div>
        ))}
      </div>
    </Layout>
  );
};

export const query = graphql`
  query CatalogueQuery {
    products: allDatoCmsProduct(filter: {locale: {eq: "es"}}) {
      edges {
        node {
          id
          seourl
          name
          price
          locale
          image {
            url
            fluid(maxWidth: 300, imgixParams: { fm: "jpg" }) {
              ...GatsbyDatoCmsFluid
            }
          }
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

export default Home;