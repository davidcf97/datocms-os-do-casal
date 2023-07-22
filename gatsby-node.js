const path = require('path');

exports.createPages = async ({ graphql, actions, createNodeId, createContentDigest }) => {
  const { createPage, createNode } = actions;

  // Consulta para obtener todos los productos
  const result = await graphql(`
    query AllProductsQuery {
      allDatoCmsProduct {
        edges {
          node {
            id
            name
            price
            image {
              url
            }
          }
        }
      }
    }
  `);

  // Log the query result to check the data
  console.log(JSON.stringify(result, null, 2));

  // Verifica si la consulta tiene datos válidos
  if (result.errors) {
    throw new Error(result.errors);
  }

  // Crear las páginas de producto
  result.data.allDatoCmsProduct.edges.forEach(({ node: product }) => {
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
  
    createPage({
      path: `product/${product.id}`,
      component: path.resolve('./src/pages/product.js'),
      context: {
        productId: product.id,
      },
    });    
  });  
};