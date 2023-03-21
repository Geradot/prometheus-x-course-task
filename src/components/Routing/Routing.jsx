import { BrowserRouter, Route, Routes } from 'react-router-dom';
import BooksList from '../book-list/BooksList';
import Error404 from '../404/error404';
import Cart from '../cart/Cart';
import Layout from '../Layout/Layout';
import SpecificBook from '../specific-book/SpecificBook';
import Signin from '../signin/Signin';
import PrivateRoute from '../PrivateRoute/PrivateRoute';

export default function Routing() {
  return (
    <BrowserRouter basename="/prometheus-x-course-task">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route
            index
            element={
                <Signin />
            }
          />
          <Route
            path="cart"
            element={
              <PrivateRoute>
                <Cart />
              </PrivateRoute>
            }
          />
          <Route
            path="books"
            element={
              <PrivateRoute>
                <BooksList />
              </PrivateRoute>
            }
          />
          <Route
            path="books/:id"
            element={
              <PrivateRoute>
                <SpecificBook />
              </PrivateRoute>
            }
          />
          <Route
            path="*"
            element={
              <PrivateRoute>
                <Error404 />
              </PrivateRoute>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
