import React, { useState } from 'react';
import Layout from '../layouts/index';
import Img from 'gatsby-image';
import { graphql } from 'gatsby';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const Product = ({ data }) => {
  const product = data.datoCmsProduct;
  const [loupePosition, setLoupePosition] = useState({ x: 0, y: 0 });
  const [showLoupe, setShowLoupe] = useState(false);

  const SlickButtonFix = ({currentSlide, slideCount, children, ...props}) => (
    <span {...props}>{children}</span>
  );

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    prevArrow: (
        <SlickButtonFix>
            <ArrowBackIosIcon />
        </SlickButtonFix>
    ),
    nextArrow: (
      <SlickButtonFix>
          <ArrowForwardIosIcon />
      </SlickButtonFix>
  ),
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: true,
        },
      },
    ],
  };

  const handleMouseEnter = () => {
    setShowLoupe(true);
  };

  const handleMouseMove = (e) => {
    const { left, top, width, height } = e.target.getBoundingClientRect();
    const { clientX, clientY } = e;

    // Calculamos la posición de la lupa respecto a la imagen
    const x = (clientX - left);
    const y = (clientY - top);

    // Ajustamos la posición de la lupa para que el cursor esté centrado
    const backgroundPositionX = -x * 8 - 400; // 75 es la mitad del tamaño de la lupa
    const backgroundPositionY = -y * 8 - 400; // 75 es la mitad del tamaño de la lupa

    setLoupePosition({ x, y, backgroundPositionX, backgroundPositionY });
  };

  const handleTouchMove = (e) => {
    const { left, top, width, height } = e.target.getBoundingClientRect();
    const { touches } = e;

    if (touches.length > 0) {
      const { clientX, clientY } = touches[0];

      const x = (clientX - left);
      const y = (clientY - top);

      const backgroundPositionX = -x * 8 - 400;
      const backgroundPositionY = -y * 8 - 400;

      setLoupePosition({ x, y, backgroundPositionX, backgroundPositionY });
    }
  };

  const handleMouseLeave = () => {
    setShowLoupe(false);
  };

  return (
    <Layout
      site={data.site}
      seo={{ ...data.site.globalSeo, ...data.site.faviconMetaTags }}
    >
      <div className="product-display__item" 
      key={product.id}
      style={{ touchAction: 'none' }} // Deshabilitar el desplazamiento táctil predeterminado
      >
        <Slider {...settings}>
          {product.imagegalery.map((image, index) => (
            <div
              key={index}
              className="carousel-image"
              onMouseEnter={handleMouseEnter}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              onTouchMove={handleTouchMove}
            >
              <Img fluid={image.fluid} loading="lazy" />
              {showLoupe && (
                <div
                  className="loupe"
                  style={{
                    backgroundImage: `url(${image.fluid.src})`,
                    backgroundPosition: `-${loupePosition.x}px -${loupePosition.y}px`,
                    left: loupePosition.x,
                    top: loupePosition.y,
                  }}
                />
              )}
            </div>
          ))}
        </Slider>
        <div
          className="Product snipcart-add-item"
          data-item-id={product.id}
          data-item-price={product.price}
          data-item-image={product.image.url}
          data-item-name={product.name}
          data-item-url={`/product/${product.seourl}`}
        >
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
  );
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
      imagegalery {
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