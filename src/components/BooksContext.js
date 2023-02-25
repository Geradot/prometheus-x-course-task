import React from "react";
import { getBooks } from "../App";
export const BooksContext = React.createContext();


export const BooksProvider = ({ children }) => {
    const [books, setBooks] = React.useState()
    React.useEffect(() => {
        getBooks().then(data => {
            setBooks(data['books']);
        })
    }, [])
    return (
        <BooksContext.Provider value={books}>
            {children}
        </BooksContext.Provider>
    )
}