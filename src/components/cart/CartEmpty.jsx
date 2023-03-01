import clsx from 'clsx';
import classes from './Cart.module.css';
import img_cart from '../../img/header/cart.svg';

function CartEmpty() {
    return (
        <div className={clsx("d-flex flex-column justify-content-center align-items-center", classes[`empty`])}>
            <img src={img_cart} alt="Cart" className={classes[`cart-icon`]} />
            <p className="display-6">Your cart is empty</p>
        </div>
    )
}

export default CartEmpty;