import React from 'react'
import classes from "./SpecificBook.module.css";
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import clsx from 'clsx';
import { getObject } from '../../App';
import Loader from '../UI/Loader/Loader';
import { BooksContext } from '../BooksContext';
import MyButton from '../UI/button/MyButton';
import { setUserCart } from '../../App';
import { removeBookFromCart } from '../../App';
const BUTTON_TITLES = {
    "add": "Add to Cart",
    "update": "Change count"
}
export default function SpecificBook() {
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

    useEffect(() => {
        if (isNaN(count))
            setCount(1);
        else
            if (parseInt(count) < 43 && parseInt(count) > 0) {
                setIsOutOfRange(false);
                setTotal((count * book.price).toFixed(2));
                setIsDisabled(false);
            } else {
                if (parseInt(count) > 42)
                    setCount(42);
                if (parseInt(count) < 1)
                    setCount(1);
                setIsOutOfRange(true);
                setTotal('');
                setIsDisabled(true);
            }
    }, [count]);

    useEffect(() => {
        setButtonTitle(isInCart ? BUTTON_TITLES['update'] : BUTTON_TITLES['add'])
    }, [isInCart])

    useEffect(() => {
        const user = getObject();
        if (user['cart'][id]) {
            setIsInCart(true);
            setBooksInCart(` (in cart: ${user['cart'][id]['count']})`);
        } else {
            setBooksInCart('');
        }
    }, [id])

    const addOrUpdateBookInCart = () => {
        let user = getObject();
        // Створюємо у кошику об'єкт з ключем ID книги
        user['cart'][book.id] = {
            ...book,
            'count': parseInt(count),
            'totalPrice': parseFloat(total)
        }
        setUserCart(user);
        setIsInCart(true);
        setBooksInCart(` (in cart: ${user['cart'][book.id]['count']})`);
    }

    const deleteFromCart = () => {
        removeBookFromCart(book.id);
        setIsInCart(false);
        setBooksInCart('');
    }

    const increment = () => {
        setCount(count + 1);
    }

    const decrement = () => {
        setCount(count - 1);
    }

    return (
        <>
            {!isLoaded
                ?
                <main className="container d-flex justify-content-center"><Loader /></main>
                :
                <main data-testid="specific-book-details" className={clsx("container", classes[`specific-book`])}>
                    <section className={clsx(classes[`book-cover`], "base-padding")}>
                        <img src={book.image || '/img/img-not-found.png'} alt={book.title} />
                    </section>
                    <section className={clsx(classes[`book-info`], "base-padding")}>
                        <h1 data-testid='book-title' className={clsx(classes[`book-name`], "h3")}>{book.title}</h1>
                        <p className={classes[`book-author`]}>{book.author}</p>
                    </section>
                    <section className={clsx(classes[`book-price`], "base-padding")}>
                        <div className={classes[`good-price`]}>
                            <span className={classes[`text`]}>Price, $</span>
                            <span
                                data-testid="start-price"
                                className={classes[`value`]}
                                data-price={book.price}
                            >{book.price}</span>
                        </div>
                        <div className={classes[`count`]}>
                            <label htmlFor="count__value" className={classes[`text`]}>Count
                                <span className={classes[`count-in-cart`]}>{booksInCart}</span>
                            </label>
                            <div className={classes[`input__count`]}>

                                <button
                                    type="button"
                                    disabled={count <= 1}
                                    className='btn btn-secondary'
                                    data-testid="decrement"
                                    onClick={decrement}
                                >-</button>
                                <input
                                    type="text"
                                    id="count__value"
                                    value={count}
                                    onChange={e => setCount(e.target.value)}
                                    className={classes[`value`]}
                                    data-value={count}
                                />
                                <button
                                    type="button"
                                    disabled={count >= 42}
                                    className='btn btn-secondary'
                                    data-testid="increment"
                                    onClick={increment}
                                >+</button>
                            </div>
                        </div>
                        {isOutOfRange &&
                            <p className="alert alert-danger">
                                Кількість має бути більше 0 та менше 43
                            </p>
                        }
                        <div className={classes[`total-price`]}>
                            <span className={classes[`text`]}>Total price</span>
                            <span
                                data-testid="total-price"
                                className={classes[`value`]}
                            >{total}</span>
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
                            >{buttonTitle}</MyButton>
                        </div>
                    </section>

                    <p className={classes[`book-description`]}>{book.description}</p>

                </main>

            }
        </>
    )
}

