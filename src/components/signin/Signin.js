import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import classes from "./Signin.module.css";
import clsx from 'clsx';

export default function Signin() {
    const navigator = useNavigate();
    const [username, setUsername] = useState('');
    const [isDisabled, setIsDisabled] = useState(true);
    const [isClicked, setIsClicked] = useState(false);

    useEffect(() => {
        setIsDisabled(!(username.length >= 4 && username.length <= 16));
    }, [username])

    useEffect(() => {
        if (localStorage.getItem('username'))
            navigator("/")
    }, [])

    useEffect(() => {
        if (isClicked)
            if (!localStorage.getItem('username')) {
                localStorage.setItem('username', JSON.stringify(username));
                navigator("/");
            }
    }, [isClicked]);

    return (
        <>
            <main className="d-flex flex-column justify-content-center align-items-center container x2-gap">
                <img
                    className={classes[`user_photo`]}
                    src="/img/header/user.svg"
                    alt="User's photo"
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
                        onClick={() => setIsClicked(true)}
                        disabled={isDisabled}
                        className="btn btn-primary"
                    >Sign-In</button>
                </form>
            </main>
        </>
    )
}
