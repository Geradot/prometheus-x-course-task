import classes from './Header.module.css';
import clsx from "clsx";
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import img_cart from "../../img/header/cart.svg";
import img_user from "../../img/header/user.png";

function Header() {
    const user = JSON.parse(localStorage.getItem('authorized_user'));
    const navigator = useNavigate();
    const signout = () => {
        localStorage.removeItem('authorized_user')
        navigator("/signin");
    }
    return (
        <header className={clsx(classes.main_header)}>
            <p>
                <Link to="/" className='text-light'>
                    <span>X&#8209;course&nbsp;task</span>
                </Link>
                <span>/</span > <span>Ryzhenko&nbsp;Anton</span>
            </p>

            <div className={clsx(classes[`right-block`])}>
                {user
                    ?
                    <>
                        <Link to="/cart">
                            <img
                                src={img_cart}
                                alt="Cart"
                                className={classes.cart}
                            />
                        </Link>
                        <button
                            onClick={signout}
                            className={
                                clsx("btn btn-light",
                                    classes[`sign-out`])
                            }
                        >Sign&#8209;Out</button>
                        <div className={classes.user}>
                            <img
                                src={img_user}
                                alt="Avatar"
                                className={classes[`user-photo`]}
                            />
                            <span>{user}</span>
                        </div>
                    </>
                    :
                    <>
                        <button 
                            onClick={() => { navigator("/signin") }} 
                            className={clsx("btn btn-primary", classes[`sign-out`])}
                        >Sign&#8209;In</button>
                    </>
                }
            </div>
        </header >
    )
}
export default Header