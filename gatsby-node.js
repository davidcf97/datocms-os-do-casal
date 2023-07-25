const path = require('path');

exports.createPages = async ({ graphql, actions, createNodeId, createContentDigest }) => {
  const { createPage, createNode } = actions;

  // Consulta para obtener todos los productos
  const resultProduct = await graphql(`
    query AllProductsQuery {
      allDatoCmsProduct {
        edges {
          node {
            id
            seourl
            name
            price
            locale
            image {
              url
            }
          }
        }
      }
    }
  `);

  // Consulta para obtener todas las categorias con sus productos
  const resultCategory = await graphql(`
    query AllCategoryQuery {
      allDatoCmsCategory {
        edges {
          node {
            id
            identifier
            locale
            name
            seourl
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
    }
  `);

  // Verifica si la consulta tiene datos válidos
  if (resultProduct.errors) {
    throw new Error(resultProduct.errors);
  }

   // Verifica si la consulta tiene datos válidos
   if (resultCategory.errors) {
    throw new Error(resultCategory.errors);
  }

  // Crear las páginas de producto
  resultProduct.data.allDatoCmsProduct.edges.forEach(({ node: product }) => {
    createNode({
      ...product.image,
      id: createNodeId(`remote-image-${product.id}`),
      parent: null,
      children: [],
      internal: {
        type: 'RemoteImage',
        mediaType: 'image/jpeg',
        contentDigest: createContentDigest(product.image.url),
      },
    });
  });

  resultProduct.data.allDatoCmsProduct.edges.forEach(({ node: product }) => {
    createPage({
      path: `${product.locale}/product/${product.seourl}`,
      component: path.resolve('./src/pages/product.js'),
      context: {
        productId: product.id,
        locale: product.locale,
      },
    }); 
  });

  // Crear las páginas de categoria
  resultCategory.data.allDatoCmsCategory.edges.forEach(({ node: category }) => {
    createNode({
      ...category,
      id: createNodeId(`${category.id}`),
      parent: null,
      children: [],
      internal: {
        type: "Category",
        contentDigest: createContentDigest(category),
      },
    });
  });

  resultCategory.data.allDatoCmsCategory.edges.forEach(({ node: category }) => {
    createPage({
      path: `${category.locale}/${category.seourl}`,
      component: path.resolve('./src/pages/category.js'),
      context: {
        categoryId: category.id,
        locale: category.locale,
      },
    }); 
  });
};