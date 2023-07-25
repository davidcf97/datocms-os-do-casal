import React from 'react';
import Layout from '../layouts/index';
import Img from 'gatsby-image';
import { graphql, Link } from 'gatsby';
import '../style/category.scss';

const Category = ({ category }) => {
  return (
    <div className="category-display__item" key={category.id}>
      <div className="Category">
        <div className="Category__details">
          <div className="Category__name">
            {category.name}
          </div>
        </div>
        <div className="Category__products">
          {Array.isArray(category.products) && category.products.map((product) => (
            <div className="Category__product" key={product.id}>
              <Link to={`/product/${product.seourl}`}>
                {product.name}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const CategoryPage = ({ data }) => {
  const categories = data.categories.edges;

  return (
    <Layout
        site={data.site}
        seo={{ ...data.site.globalSeo, ...data.site.faviconMetaTags }}
    >
      <div className="category-page">
        {categories.map((category) => (
          <Category key={category.node.id} category={category.node} />
        ))}
      </div>
    </Layout>
  );
};

export const query = graphql`
  query {
    categories: allDatoCmsCategory {
      edges {
        node {
          id
          identifier
          locale
          name
          products {
            id
            locale
            name
            seourl
            price
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

export default CategoryPage;