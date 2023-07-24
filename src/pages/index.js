import React from 'react';
import { StaticQuery, graphql, Link } from 'gatsby';
import Layout from '../layouts/index';
import Img from 'gatsby-image';

const Home = () => (
  <StaticQuery
    query={graphql`
      query CatalogueQuery {
        products: allDatoCmsProduct {
          edges {
            node {
              id
              name
              price
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
    `}
    render={data => (
      <Layout
        site={data.site}
        seo={{ ...data.seo, ...data.site.faviconMetaTags }}
      >
        <div className="Catalogue">
          {data.products.edges.map(({ node: product }) => (
            <div className="Catalogue__item" key={product.id}>
              <Link to={`/product/${product.id}`} >
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
    )}
  />
);

export default Home;