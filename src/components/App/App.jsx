import React from 'react';
import './App.css';
import { BooksProvider } from '../Context/BooksContext';
import Routing from '../Routing/Routing';
function App() {

  return (
    <BooksProvider>
      <Routing />
    </BooksProvider>
  );
}

export default App;
