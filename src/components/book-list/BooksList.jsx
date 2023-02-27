import React from "react";
import clsx from "clsx";
import classes from "./BooksList.module.css";
import { useState, useEffect, useMemo } from "react";
import BookCard from "./BookCard";
import BooksFilter from "./BooksFilter";
import Loader from "../UI/Loader/Loader";
import { BooksContext } from "../BooksContext";

export default function BooksList() {
    const [isBooksLoading, setIsBooksLoading] = useState(true);

    const books = React.useContext(BooksContext);

    useEffect(() => {
        if (books)
            setIsBooksLoading(false);
    }, [books])

    const [filter, setFilter] = useState({ price: '', query: '' })

    // Сортуємо книжки
    const sortedBooks =
        useMemo(() => {
            if (!books) return [];
            switch (filter.price) {
                case "0-15":
                    return [...books].filter(book => (book.price > 0 && book.price < 15))
                case "15-30":
                    return [...books].filter(book => (book.price > 15 && book.price < 30))
                case "30+":
                    return [...books].filter(book => (book.price > 30))
                default:
                    return books;
            }
        }, [filter.price, books]);

    // Шукаємо книжки на основі фільтрів (завжди)
    const filteredAndSearchedBooks = useMemo(() => {
        return sortedBooks.filter(book => book.title.toLowerCase().includes((filter.query).toLowerCase()))
    }, [filter.query, sortedBooks])

    return (
        <main className={clsx("d-flex flex-column container x2-gap justify-content-start", classes[`booklist`])}>
            <BooksFilter
                filter={filter}
                setFilter={setFilter}
            />
            <section className={clsx("d-flex flex-wrap justify-content-center x2-gap")}>
                {isBooksLoading
                    ? <Loader />
                    :
                    filteredAndSearchedBooks.length
                        ? filteredAndSearchedBooks.map((book) => (
                            <BookCard book={book} key={book.id} />
                        ))
                        : <p className="display-6">Книги не знайдені...</p>
                }
            </section>
        </main >
    )
}
