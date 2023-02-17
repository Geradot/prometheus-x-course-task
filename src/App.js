import './App.css';
import BooksList from './components/book-list/BooksList';
import Error404 from './components/404/error404';
import Cart from './components/cart/Cart';
import Layout from './components/Layout';
import { Route, Routes } from 'react-router-dom';
import SpecificBook from './components/specific-book/SpecificBook';
import Signin from './components/signin/Signin';
import React from 'react';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import { BooksContext, BooksProvider } from './components/BooksContext';
import { useState, useEffect } from 'react';

// Беремо об'єкт з ЛС чи створюємо порожній.
export function getObjectOrBlank() {
  return JSON.parse(localStorage.getItem('cart')) || {};
}

export async function getBooks() {
  const response = await fetch('/books.json');
  const res = await response.json();
  return res;
}

function App() {

  const [books, setBooks] = useState([]);
  useEffect(() => {
    getBooks().then(data => {
      setBooks(data.books);
    })
  }, [])

  return (
    <>
      <BooksContext.Provider value={books}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={
              <PrivateRoute>
                <BooksList />
              </PrivateRoute>
            } />
            <Route path="cart" element={
              <PrivateRoute>
                <Cart />
              </PrivateRoute>
            } />
            <Route path="book/:id" element={
              <PrivateRoute>
                <SpecificBook />
              </PrivateRoute>
            } />
            <Route path="signin" element={<Signin />} />
            <Route path="*" element={
              <PrivateRoute>
                <Error404 />
              </PrivateRoute>
            } />
          </Route>
        </Routes>
      </BooksContext.Provider>
    </>
  );
}

export default App;
