import React from 'react'
import classes from "./SpecificBook.module.css";
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import clsx from 'clsx';
import { getObjectOrBlank } from '../../App';
import Loader from '../UI/Loader/Loader';
import { BooksContext } from '../BooksContext';
import MyButton from '../UI/button/MyButton';
import { Toast, ToastContainer } from 'react-bootstrap';

export default function SpecificBook() {
    const BUTTON_TITLES = {
        "add": "Add to Cart",
        "update": "Change count"
    }
    const allBooks = React.useContext(BooksContext);
    const { id } = useParams();
    const [isLoaded, setIsLoaded] = useState(false);
    const [count, setCount] = useState(1);
    const [total, setTotal] = useState(null);
    const [book, setBook] = useState({});
    const [buttonTitle, setButtonTitle] = useState('');
    useEffect(() => {
        if (allBooks && allBooks.length) {
            const selectedBook = allBooks.find(b => b.id === parseInt(id));
            if (selectedBook) {
                setBook(selectedBook);
                setTotal((count * selectedBook.price).toFixed(2));
                setIsLoaded(true);
            }
        }
    }, [allBooks, id])

    useEffect(() => {
        if (book) {
            if (!book.image) book.image = '/img/img-not-found.png';
            setTotal((count * book.price).toFixed(2));
            setButtonTitle(isInCart ? BUTTON_TITLES['update'] : BUTTON_TITLES['add']);
        }
    }, [book])

    // Перевірка на вихід за ренж кількості книг
    const [isOutOfRange, setIsOutOfRange] = useState(false);
    // Перевірка на блокування додавання до кошику
    const [isDisabled, setIsDisabled] = useState(false);
    // Перевірка на знаходження книги у кошику
    const [isInCart, setIsInCart] = useState()
    // Текст про кількість поточних книг у кошику
    const [booksInCart, setBooksInCart] = useState('');

    const [showToast, setShowToast] = useState(false);

    const handleShowToast = () => setShowToast(true);

    useEffect(() => {
        if (count > 42 || count < 1) {
            setIsOutOfRange(true);
            setTotal('');
            setIsDisabled(true);
        } else {
            setIsOutOfRange(false);
            setTotal((count * book.price).toFixed(2));
            setIsDisabled(false);
        }
    }, [count]);

    useEffect(() => {
        setButtonTitle(isInCart ? BUTTON_TITLES['update'] : BUTTON_TITLES['add'])
    }, [isInCart])

    useEffect(() => {
        const cart = getObjectOrBlank();
        if (cart && cart[id]) {
            setIsInCart(true);
            setBooksInCart(` (now in cart: ${cart[id]['count']})`);
        } else {
            setBooksInCart('');
        }
    }, [id])

    const addOrUpdateBookInCart = () => {
        let cart = getObjectOrBlank();
        cart[book.id] = {
            'title': book.title,
            'price': book.price,
            'count': parseInt(count),
            'totalPrice': parseFloat(total)
        }
        setShow(true);
        setIsInCart(true);
        localStorage.setItem('cart', JSON.stringify(cart));
        setBooksInCart(` (now in cart: ${cart[book.id]['count']})`);
    }

    const deleteFromCart = () => {
        let cart = getObjectOrBlank();
        delete cart[book.id];
        localStorage.setItem('cart', JSON.stringify(cart));
        setIsInCart(false);
        setCount(1);
        setBooksInCart('');
    }

    const [show, setShow] = useState(false);

    return (
        <>
            {!isLoaded
                ?
                <main className="container d-flex justify-content-center"><Loader /></main>
                :
                <main className={clsx("container", classes[`specific-book`])}>
                    <section className={clsx(classes[`book-cover`], "base-padding")}>
                        <img src={book.image} alt={book.title} />
                    </section>
                    <section className={clsx(classes[`book-info`], "base-padding")}>
                        <h1 className={clsx(classes[`book-name`], "h3")}>{book.title}</h1>
                        <p className={classes[`book-author`]}>{book.author}</p>
                    </section>
                    <section className={clsx(classes[`book-price`], "base-padding")}>
                        <div className={classes[`good-price`]}>
                            <span className={classes[`text`]}>Price, $</span>
                            <span className={classes[`value`]} data-price={book.price}>{book.price}</span>
                        </div>
                        <div className={classes[`count`]}>
                            <label htmlFor="count__value" className={classes[`text`]}>Count
                                <span className={classes[`count-in-cart`]}>{booksInCart}</span>
                            </label>
                            <input
                                type="number"
                                id="count__value"
                                value={count}
                                onChange={e => setCount(e.target.value)}
                                className={classes[`value`]}
                                min="1"
                                max="42" />
                        </div>
                        {isOutOfRange &&
                            <p className="alert alert-danger">Кількість повинна бути більше 0 та менше 43</p>
                        }
                        <div className={classes[`total-price`]}>
                            <span className={classes[`text`]}>Total price</span>
                            <span className={classes[`value`]}>{total}</span>
                        </div>
                        <div className={clsx("gap-3", classes[`buttons`])}>
                            {isInCart &&
                                <button
                                    onClick={deleteFromCart}
                                    className="btn btn-outline-danger"
                                >Remove from Cart</button>
                            }
                            <MyButton
                                disabled={isDisabled}
                                onClick={() => {
                                    addOrUpdateBookInCart();
                                }}
                                data-title={
                                    isInCart
                                        ? Object.keys(BUTTON_TITLES)[1]
                                        : Object.keys(BUTTON_TITLES)[0]
                                }
                                className={clsx(classes[`add-to-cart`], "btn btn-success")}
                                id="liveToastBtn"
                            >{buttonTitle}</MyButton>
                        </div>
                    </section>

                    <p className={classes[`book-description`]}>{book.description}</p>

                </main>

            }
            <ToastContainer className={classes[`toast-container`]}>
                <Toast bg="success" onClose={() => setShow(false)} show={show} delay={3000} autohide>
                    <Toast.Header>
                        <strong className="me-auto">Success!</strong>
                    </Toast.Header>
                    <Toast.Body className="text-light h6">Added to Cart</Toast.Body>
                </Toast>
            </ToastContainer>
        </>
    )
}

