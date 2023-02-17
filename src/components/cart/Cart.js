import { getObjectOrBlank } from '../../App';
import CartEmpty from './CartEmpty';
import { useState, useEffect } from 'react';
import MyButton from '../UI/button/MyButton';
import { Link } from 'react-router-dom';
import React from 'react';

function Cart() {
    const [cart, setCart] = useState(getObjectOrBlank());

    const [cartKeys, setCartKeys] = useState(Object.keys(cart));

    const [totalPrice, setTotalPrice] = useState(0);

    const [isCartEmpty, setIsCartEmpty] = useState(null);

    useEffect(() => {
        if (cartKeys.length)
            setTotalPrice(cartKeys.reduce((total, key) => total + cart[key]['totalPrice'], 0).toFixed(2));
        setIsCartEmpty(cartKeys.length > 0)
    }, [cartKeys]);

    useEffect(() => {
        setCartKeys(Object.keys(cart));
    }, [cart])

    const deleteFromCart = (e) => {
        let temp = getObjectOrBlank();
        let id = e.target.dataset.id;
        delete temp[id];
        localStorage.setItem('cart', JSON.stringify(temp));
        setCart(temp);
        setCartKeys(Object.keys(temp));
    };

    const clearLS = () => {
        localStorage.removeItem('cart');
        setCartKeys(Object.keys(getObjectOrBlank()))
    }

    return (
        <main className="container d-flex flex-column col-xl-6 col-lg-7 col-md-9 col-sm-12 gap-3">
            <MyButton
                disabled={!isCartEmpty}
                className={"btn btn-success align-self-end"}
                onClick={clearLS}
            >Purchase</MyButton>

            {!isCartEmpty
                ?
                <CartEmpty />
                :
                <div className="table-responsive">
                    <table className="table border">
                        <thead>
                            <tr>
                                <th scope="col">Title</th>
                                <th scope="col" className='text-start'>Price</th>
                                <th scope="col" className='text-center'>Count</th>
                                <th scope="col" className='text-end'>Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cartKeys.map(key => (
                                <tr className="" key={key}>
                                    <td
                                        scope="row"
                                        className="d-flex gap-3 align-items-center justify-content-between"
                                    >
                                        <span>
                                            {cart[key]['title']}
                                        </span>
                                        <Link
                                            className="link-danger align-self-baseline"
                                            data-id={key}
                                            onClick={deleteFromCart}
                                        >Remove</Link>
                                    </td>
                                    <td className="text-start">
                                        ${cart[key]['price']}
                                    </td>
                                    <td className="text-center">
                                        {cart[key]['count']}
                                    </td>
                                    <td className="text-end">
                                        ${cart[key]['totalPrice']}
                                    </td>
                                </tr>
                            ))}
                            <tr>
                                <td colSpan={2}></td>
                                <td className="fw-bold">Total:</td>
                                <td className="fw-bold text-end">${totalPrice}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            }
        </main>
    )
}

export default Cart;