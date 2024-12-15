import React from "react";
import CartProgress from "./CartProgress";
import CartTable from "./CartTable";
import CartCoupon from "./CartCoupon";
import CartTotals from "./CartTotals";
import "./Cart.css";

const Cart = () => {
  return (
    <React.Fragment>
      <section className="cart-page">
        <div className="container">
          <div className="cart-page-wrapper">
            <form className="cart-form">
              <CartProgress />
              <div className="shop-table-wrapper">
                <CartTable />
                <CartCoupon />
              </div>
            </form>
            <div className="cart-collaterals">
              <CartTotals />
            </div>
          </div>
        </div>
      </section>
    </React.Fragment>
  );
};

export default Cart;
