import { useSelector } from "react-redux";
import CartItem from "./CartItem";

const CartTable = () => {
  const CartItems = useSelector((state) => state.cart.cartItems); 
  
  return (
    <table className="shop-table">
      <thead>
        <tr>
          <th className="product-thumbnail">&nbsp;</th>
          <th className="product-thumbnail">&nbsp;</th>
          <th className="product-name">Product</th>
          <th className="product-price">Price</th>
          <th className="product-quantity">Quantity</th>
          <th className="product-subtotal">Subtotal</th>
        </tr>
      </thead>
      <tbody className="cart-wrapper">
        {CartItems.map((item) => (
          <CartItem key={item.id} item={item} />
        ))}
      </tbody>
    </table>
  );
};

export default CartTable;
