import './App.css';
import BooksList from './components/book-list/BooksList';
import Error404 from './components/404/error404';
import Cart from './components/cart/Cart';
import Layout from './components/Layout';
import { BrowserRouter, HashRouter, Route, Routes } from 'react-router-dom';
import SpecificBook from './components/specific-book/SpecificBook';
import Signin from './components/signin/Signin';
import React from 'react';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import { BooksProvider } from './components/BooksContext';

// Беремо об'єкт з ЛС чи створюємо порожній.
export function getObject() {
  let authorizedUser = JSON.parse(localStorage.getItem('authorized_user'));
  let users = JSON.parse(localStorage.getItem('users'));
  return users[authorizedUser];
}

export function setUserCart(cart) {
  let users = JSON.parse(localStorage.getItem('users'));
  Object.assign(users[JSON.parse(localStorage.getItem('authorized_user'))], cart);
  localStorage.setItem('users', JSON.stringify(users));
}

export function removeBookFromCart(bookID) {
  let authorizedUser = JSON.parse(localStorage.getItem('authorized_user'));
  let users = JSON.parse(localStorage.getItem('users'));

  delete users[authorizedUser]['cart'][bookID];

  localStorage.setItem('users', JSON.stringify(users));
}

export function clearCart() {
  let users = JSON.parse(localStorage.getItem('users'));
  let authorizedUser = JSON.parse(localStorage.getItem('authorized_user'));
  users[authorizedUser]['cart'] = {};
  localStorage.setItem('users', JSON.stringify(users));
}

export async function getBooks() {
  const response = await fetch('/books.json');
  const res = await response.json();
  return res;
}


function App() {

  return (
    <BooksProvider>
      <HashRouter>
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
      </HashRouter>
    </BooksProvider>
  );
}

export default App;
