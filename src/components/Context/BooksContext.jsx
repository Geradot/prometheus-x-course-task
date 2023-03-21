import React from "react";
import booksJson from '../../misc/books.json';

export const BooksContext = React.createContext();


export const BooksProvider = ({ children }) => {
    const [books, setBooks] = React.useState()
    React.useEffect(() => {
            setBooks(booksJson['books'])
    }, [])
    return (
        <BooksContext.Provider value={books}>
            {children}
        </BooksContext.Provider>
    )
}