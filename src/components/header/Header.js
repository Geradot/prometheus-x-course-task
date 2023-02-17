import classes from './Header.module.css';
import clsx from "clsx";
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Header() {
    const user = JSON.parse(localStorage.getItem('username'));
    const navigator = useNavigate();
    const signout = () => {
        localStorage.removeItem("username");
        navigator("/");
    }
    return (
        <header className={clsx(classes.main_header)}>
            <p><Link to="/"><span>X&#8209;course&nbsp;task</span></Link>
                {user &&
                    <>
                        <span>/</span > <span>Прізвище&nbsp;Ім'я</span>
                    </>
                }
            </p>

            <div className={clsx(classes[`right-block`])}>
                {user
                    ?
                    <>
                        <Link to="/cart"><img src="/img/header/cart.svg" alt="Cart" className={classes.cart} /></Link>
                        <button onClick={signout} className={clsx("btn btn-primary", classes[`sign-out`])}>Sign&#8209;Out</button>
                        <div className={classes.user}>
                            <img src="/img/header/user.svg" alt="User's Photo" className={classes[`user-photo`]} />
                            <span>{user}</span>
                        </div>
                    </>
                    :
                    <>
                        <button onClick={() => { navigator("/signin") }} className={clsx("btn btn-primary", classes[`sign-out`])}>Sign&#8209;In</button>
                    </>
                }
            </div>
        </header >
    )
}
export default Header