require('dotenv').config();

module.exports = {
  siteMetadata: {
    siteName: 'OS DO CASAL',
  },
  plugins: [
    'gatsby-plugin-sass',
    {
      resolve: `gatsby-source-datocms`,
      options: {
        apiToken:
          process.env.DATO_READONLY_API_KEY || '247a6999ec7f2bcfaef8e2e1d9a15b',
      },
    },
    {
      resolve: 'gatsby-plugin-snipcart-advanced',
      options: {
        publicApiKey:
          process.env.SNIPCART_PUBLIC_API_KEY ||
          'OWE3MmZmMjQtNTk3Yi00OThhLWEwMmUtZDY4ZWM4NzIwYzZiNjM2NjM0Mzc1NzE0MTUwNzI1',
        autopop: true,
      },
    },
  ],
};
