import React from 'react';
import { Link } from 'gatsby';
import { graphql, useStaticQuery } from 'gatsby';

const DropdownMenu = () => {
  // Consulta GraphQL para obtener las categorías mediante useStaticQuery
  const data = useStaticQuery(graphql`
    query {
      allDatoCmsCategory {
        edges {
          node {
            id
            name
            seourl
            locale
          }
        }
      }
    }
  `);

  const categories = data.allDatoCmsCategory.edges.map(edge => edge.node);

  return (
    <div className="DropdownMenu">
      {categories.map((category) => (
        <Link key={category.id} to={`${category.locale}/${category.seourl}`}>
          {category.name}
        </Link>
      ))}
    </div>
  );
};

export default DropdownMenu;
