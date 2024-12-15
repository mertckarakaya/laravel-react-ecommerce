import { useDispatch } from "react-redux";
import { deleteFromCart } from "../../redux/cartSlice";
import PropTypes from "prop-types";

const CartItem = ({ item }) => {
  const { name, price, img, quantity } = item;
  const dispatch = useDispatch();
  const handleDelete = () => {
    dispatch(deleteFromCart(item));
  };
  return (
    <tr className="cart-item">
      <td></td>
      <td className="cart-image">
        <img src={img.singleImage} alt="" />
        <i className="bi bi-x delete-cart" onClick={handleDelete}></i>
      </td>
      <td>{name}</td>
      <td>${price.newPrice}</td>
      <td className="product-quantity">{quantity}</td>
      <td className="product-subtotal">${price.totalPrice}</td>
    </tr>
  );
};

export default CartItem;

CartItem.propTypes = {
  item: PropTypes.object,
};
