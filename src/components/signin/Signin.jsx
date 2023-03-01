import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import classes from "./Signin.module.css";
import clsx from 'clsx';
import img_user from "../../img/header/user.png";

export default function Signin() {
    const navigator = useNavigate();
    const [username, setUsername] = useState('');
    const [isDisabled, setIsDisabled] = useState(true);

    const [possibleUser, setPossibleUser] = useState(null);

    useEffect(() => {
        setIsDisabled(!(username.length >= 4 && username.length <= 16));
    }, [username])

    useEffect(() => {
        if (localStorage.getItem('authorized_user'))
            navigator("/")
    }, [])

    useEffect(() => {
        if (possibleUser) {
            let users = JSON.parse(localStorage.getItem('users'));

            if (users !== null) {
                let existingUser = Object.keys(users).find(u => u === username)
                if (!existingUser) {
                    const user = { [username]: { 'cart': {} } }
                    users = Object.assign(users, user)
                    localStorage.setItem('users', JSON.stringify(users))
                }
            } else {
                const user = { [username]: { 'cart': {} } }
                users = user;
                localStorage.setItem('users', JSON.stringify(users))
            }

            localStorage.setItem('authorized_user', JSON.stringify(possibleUser))
            navigator("/");
        }
    }, [possibleUser])
    
    return (
        <>
            <main className="d-flex flex-column justify-content-center align-items-center container x2-gap">
                <img
                    className={classes[`user_photo`]}
                    src={img_user}
                    alt="Avatar"
                />
                <form
                    className={
                        clsx(
                            classes[`formAuth`],
                            "d-flex flex-column base-gap"
                        )
                    }>
                    <label
                        htmlFor="user_name"
                        className="fw-bold text-center"
                    >Username</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="base-padding"
                        placeholder="type Username"
                        id="user_name"
                    />
                    <button
                        onClick={(e) => {
                            e.preventDefault();
                            setPossibleUser(username)
                        }}
                        disabled={isDisabled}
                        className="btn btn-primary"
                    >Sign-In</button>
                </form>
            </main>
        </>
    )
}
