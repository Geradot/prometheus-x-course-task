import clsx from 'clsx';
import classes from './Cart.module.css';

function CartEmpty() {
    return (
        <div className={clsx("d-flex flex-column justify-content-center align-items-center", classes[`empty`])}>
            <img src="/img/header/cart.svg" alt="Cart" className={classes[`cart-icon`]} />
            <p className="display-6">Your cart is empty</p>
        </div>
    )
}

export default CartEmpty;