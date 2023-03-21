import { getObject, clearCart, removeBookFromCart } from "../../js/helpers";
import CartEmpty from "./CartEmpty";
import { useState, useEffect } from "react";
import MyButton from "../UI/button/MyButton";
import remove_icon from "../../img/trash.svg";
import classes from "./Cart.module.css";
import React from "react";

function Cart() {
  const [cart, setCart] = useState({});

  const [cartKeys, setCartKeys] = useState([]);

  const [totalPrice, setTotalPrice] = useState(0);

  const [isCartEmpty, setIsCartEmpty] = useState(null);

  useEffect(() => {
    let user = getObject() || {};
    if (Object.keys(user["cart"]).length > 0) {
      setCart(user["cart"]);
    }
    setIsCartEmpty(Object.keys(user["cart"]).length === 0);
  }, []);

  useEffect(() => {
    if (Object.keys(cart).length > 0) {
      setCartKeys(Object.keys(cart) || []);
      setIsCartEmpty(false);
    } else {
      setIsCartEmpty(true);
    }
  }, [cart]);

  useEffect(() => {
    if (cartKeys.length > 0)
      setTotalPrice(
        cartKeys
          .reduce((total, key) => total + cart[key]["totalPrice"], 0)
          .toFixed(2)
      );
  }, [cartKeys]);

  const deleteFromCart = (e) => {
    removeBookFromCart(e.target.dataset.id);
    let temp = getObject();
    setCart(temp["cart"]);
    setCartKeys(Object.keys(temp["cart"]));
    setIsCartEmpty(Object.keys(temp["cart"]).length === 0);
  };

  const clearLS = () => {
    clearCart();
    setCart({});
    setCartKeys([]);
    setIsCartEmpty(true);
  };

  return (
    <div className="container d-flex flex-column col-xl-7 col-lg-8 col-md-9 col-sm-12 gap-3">
      <MyButton
        disabled={isCartEmpty}
        className={"btn btn-success align-self-end"}
        onClick={clearLS}
      >
        Purchase
      </MyButton>

      {cartKeys.length === 0 ? (
        <CartEmpty />
      ) : (
        <div className="table-responsive">
          <table className="table border">
            <thead>
              <tr>
                <th scope="col">Title</th>
                <th scope="col" className="text-start">
                  Price
                </th>
                <th scope="col" className="text-center">
                  Count
                </th>
                <th scope="col" className="text-end">
                  Total
                </th>
              </tr>
            </thead>
            <tbody>
              {cartKeys.map((key) => (
                <tr className="" key={key}>
                  <td
                    scope="row"
                    className="d-flex gap-3 align-items-center justify-content-between"
                  >
                    <span>{cart[key]["title"]}</span>
                    <img
                      className={classes[`remove-icon`]}
                      src={remove_icon}
                      alt="remove"
                      role="button"
                      onClick={deleteFromCart}
                      data-id={key}
                    />
                  </td>
                  <td className="text-start">${cart[key]["price"]}</td>
                  <td className="text-center">{cart[key]["count"]}</td>
                  <td className="text-end">${cart[key]["totalPrice"]}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="fw-bold text-end" style={{ paddingRight: "8px" }}>
            Total: ${totalPrice}
          </p>
        </div>
      )}
    </div>
  );
}

export default Cart;
