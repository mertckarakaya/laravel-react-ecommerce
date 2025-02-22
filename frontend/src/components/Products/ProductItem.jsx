import { useDispatch } from 'react-redux';
import { addToCart } from '../../redux/cartSlice';
import { Link } from 'react-router-dom';
import PropTypes from "prop-types";
import "./ProductItem.css";

const ProductItem = ({ productItem }) => {
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(addToCart(productItem));
  }
  return (
    <div className="product-item glide__slide glide__slide--active">
      <div className="product-image">
        <a href={`/product/${productItem.id}`}>
          <img src={productItem.img.singleImage} alt="" className="img1" />
          <img src={productItem.img.thumbs[2]} alt="" className="img2" />
        </a>
      </div>
      <div className="product-info">
        <a href={`/product/${productItem.id}`} className="product-title">
          {productItem.name}
        </a>
        <ul className="product-star">
          <li>
            <i className="bi bi-star-fill"></i>
          </li>
          <li>
            <i className="bi bi-star-fill"></i>
          </li>
          <li>
            <i className="bi bi-star-fill"></i>
          </li>
          <li>
            <i className="bi bi-star-fill"></i>
          </li>
          <li>
            <i className="bi bi-star-half"></i>
          </li>
        </ul>
        <div className="product-prices">
          <strong className="new-price">
            ${productItem.price.newPrice.toFixed(2)}
          </strong>
          <span className="old-price">
            ${productItem.price.oldPrice.toFixed(2)}
          </span>
        </div>
        <span className="product-discount">-{productItem.discount}%</span>
        <div className="product-links">
          <button
            className="add-to-cart"
            onClick={() => handleAddToCart(productItem)}
          >
            <i className="bi bi-basket-fill"></i>
          </button>
          <button>
            <i className="bi bi-heart-fill"></i>
          </button>
          <Link to={`/product/${productItem.id}`} className="product-link">
            <i className="bi bi-eye-fill"></i>
          </Link>
          <a href="#">
            <i className="bi bi-share-fill"></i>
          </a>
        </div>
      </div>
    </div>
  );
};

export default ProductItem;

ProductItem.propTypes = {
  productItem: PropTypes.object,
  setCartItems: PropTypes.func,
};


