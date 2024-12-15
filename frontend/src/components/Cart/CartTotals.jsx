import { useSelector } from "react-redux";
import { useState } from "react";
const CartTotals = () => {
  const cartPriceItem = useSelector((state) => state.cart.cartItems);
  const cartPriceTotal = cartPriceItem.reduce((acc, item) => acc + item.price.totalPrice, 0);
  const [fastCargoChecked, setFastCargoChecked] = useState(false);
  const fastCargoPrice = fastCargoChecked ? 15 : 0;
  return (
    <div className="cart-totals">
      <h2>Cart totals</h2>
      <table>
        <tbody>
          <tr className="cart-subtotal">
            <th>Subtotal</th>
            <td>
              <span id="subtotal">${cartPriceTotal.toFixed(2)}</span>
            </td>
          </tr>
          <tr>
            <th>Shipping</th>
            <td>
              <ul>
                <li>
                  <label>
                    Fast Cargo: $15.00
                    <input
                      type="checkbox"
                      id="fast-cargo"
                      checked={fastCargoChecked}
                      onChange={() => setFastCargoChecked(!fastCargoChecked)}
                    />
                  </label>
                </li>
                <li>
                  <a href="#">Change Address</a>
                </li>
              </ul>
            </td>
          </tr>
          <tr>
            <th>Total</th>
            <td>
              <strong id="cart-total">
                ${(cartPriceTotal + fastCargoPrice).toFixed(2)}
              </strong>
            </td>
          </tr>
        </tbody>
      </table>
      <div className="checkout">
        <button className="btn btn-lg">Proceed to checkout</button>
      </div>
    </div>
  );
};

export default CartTotals;
