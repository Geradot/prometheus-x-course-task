import React, { useState } from "react";

const CartContext = React.createContext();

function CartProvider(props) {
    const [cartBooks, setCartBooks] = useState([]);

    function addToCart(book) {
        const bookIndex = cartBooks.findIndex((item) => item.id === book.id);

        if (bookIndex !== -1) {
            const updatedCartBooks = [...cartBooks];
            updatedCartBooks[bookIndex].quantity += 1;
            setCartBooks(updatedCartBooks);
        } else {
            setCartBooks([...cartBooks, { ...book, quantity: 1 }]);
        }
    }

    function removeFromCart(book) {
        setCartBooks((prevCartBooks) => prevCartBooks.filter((item) => item.id !== book.id));
    }

    function isFoundInCart(bookId) {
        return cartBooks.find(b => b.id === bookId)
    }

    return (
        <CartContext.Provider value={{ cartBooks, isFoundInCart, addToCart, removeFromCart }}>
            {props.children}
        </CartContext.Provider>
    );
}

export { CartContext, CartProvider };