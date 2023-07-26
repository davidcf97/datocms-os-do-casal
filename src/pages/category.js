import React from 'react';
import Layout from '../layouts/index';
import Img from 'gatsby-image';
import { graphql, Link } from 'gatsby';

const Category = ({ category }) => {
  return (
    <div className="category-display__item" key={category.id}>
      <div className="Category">
        <div className="Category__details">
          <h1 className="Category__name">
            {category.name}
          </h1>
        </div>
        <div className="Catalogue">
          {Array.isArray(category.products) && category.products.map((product) => (
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
      </div>
    </div>
  );
};

const CategoryPage = ({ data }) => {
  return (
    <Layout
        site={data.site}
        seo={{ ...data.site.globalSeo, ...data.site.faviconMetaTags }}
    >
      <div className="category-page">
        <Category key={data.category.id} category={data.category} />
      </div>
    </Layout>
  );
};

export const query = graphql`
query($categoryId: String) {
  category: datoCmsCategory(id: { eq: $categoryId }) {
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
      image {
          url
          fluid(maxWidth: 300, imgixParams: { fm: "jpg" }) {
              ...GatsbyDatoCmsFluid
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