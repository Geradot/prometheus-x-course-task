import React from 'react'
import { UserProvider } from './UserContext';
import { BooksProvider } from './BooksContext';


export default function CombinedContextProvider({ children }) {
    return (
        <UserProvider>
            <BooksProvider>
                {children}
            </BooksProvider>
        </UserProvider>
    );
}
