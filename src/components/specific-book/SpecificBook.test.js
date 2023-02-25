import { render, screen } from "@testing-library/react";
import SpecificBook from "./SpecificBook";
import { MemoryRouter, useParams } from "react-router-dom";
import { BooksContext } from "../BooksContext";
import React from "react";
import userEvent from "@testing-library/user-event";

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useParams: jest.fn()
}));

describe('SpecificBook компонент', () => {
    const books = [
        {
            "id": 1,
            "author": "David Flanagan",
            "price": 10.99,
            "image": "https://courses.prometheus.org.ua/asset-v1:Ciklum+FEB101+2022_T3+type@asset+block@javascript_the_definitive_guide.jpg",
            "title": "JavaScript: The Definitive Guide, 7th Edition",
            "shortDescription": "JavaScript is the programming language of the web and is used by more software developers today than any other programming language.",
            "description": "JavaScript is the programming language of the web and is used by more software developers today than any other programming language. For nearly 25 years this best seller has been the go-to guide for JavaScript programmers. The seventh edition is fully updated to cover the 2020 version of JavaScript, and new chapters cover classes, modules, iterators, generators, Promises, async/await, and metaprogramming. You’ll find illuminating and engaging example code throughout. This book is for programmers who want to learn JavaScript and for web developers who want to take their understanding and mastery to the next level. It begins by explaining the JavaScript language itself, in detail, from the bottom up. It then builds on that foundation to cover the web platform and Node.js."
        },
        {
            "id": 2,
            "author": "James Padolsey",
            "price": 31.99,
            "image": "",
            "title": "Clean Code in JavaScript",
            "shortDescription": "Building robust apps starts with creating clean code. In this book, you'll explore techniques for doing this by learning everything from the basics of JavaScript through to the practices of clean code. You'll write functional, intuitive, and maintainable code while also understanding how your code affects the end user and the wider community.",
            "description": "Building robust apps starts with creating clean code. In this book, you'll explore techniques for doing this by learning everything from the basics of JavaScript through to the practices of clean code. You'll write functional, intuitive, and maintainable code while also understanding how your code affects the end user and the wider community. The book starts with popular clean-coding principles such as SOLID, and the Law of Demeter (LoD), along with highlighting the enemies of writing clean code such as cargo culting and over-management. You'll then delve into JavaScript, understanding the more complex aspects of the language. Next, you'll create meaningful abstractions using design patterns, such as the Class Pattern and the Revealing Module Pattern. You'll explore real-world challenges such as DOM reconciliation, state management, dependency management, and security, both within browser and server environments. Later, you'll cover tooling and testing methodologies and the importance of documenting code. Finally, the book will focus on advocacy and good communication for improving code cleanliness within teams or workplaces, along with covering a case study for clean coding. By the end of this book, you'll be well-versed with JavaScript and have learned how to create clean abstractions, test them, and communicate about them via documentation."
        }
    ];

    const renderComp = (bookId = '1') => {
        const user = { 'anton': { 'cart': {} } }

        localStorage.setItem('users', JSON.stringify(user))
        localStorage.setItem('authorized_user', JSON.stringify('anton'));

        useParams.mockImplementation(() => ({ id: bookId }))

        return render(
            <BooksContext.Provider value={books}>
                <MemoryRouter initialEntries={[`/book/${bookId}`]}>
                    <SpecificBook />
                </MemoryRouter>
            </BooksContext.Provider>
        );
    }

    beforeEach(() => {
        localStorage.removeItem('users');
        localStorage.removeItem('authorized_user');
    })

    describe("Тести кількості/вартості книг", () => {
        it("Натискання «+» збільшує кількість книг на 1", () => {
            let { getByTestId, getByRole } = renderComp();
            const incrementButton = getByTestId("increment");
            const input = getByRole("textbox", { name: /count/i });
            const initialValue = input.value;
            userEvent.click(incrementButton);
            expect(input.value).toBe(String(Number(initialValue) + 1));
        })
        it("Натискання «-» зменшує кількість книг на 1", () => {
            let { getByTestId, getByRole } = renderComp();
            const incrementButton = getByTestId("increment");
            const decrementButton = getByTestId("decrement");
            const input = getByRole("textbox", { name: /count/i });
            const initialValue = input.value;
            userEvent.click(incrementButton);
            userEvent.click(incrementButton);
            userEvent.click(decrementButton);
            expect(input.value).toBe(String(Number(initialValue) + 1));
        })
        it("Загальна вартість змінюється при зміні кількості книг", () => {
            let { getByTestId, getByRole } = renderComp();
            const startPrice = getByTestId("start-price").textContent;
            const incrementButton = getByTestId("increment");
            const input = getByRole("textbox", { name: /count/i });
            userEvent.click(incrementButton);
            const initialValue = input.value;
            expect(parseFloat(getByTestId("total-price").textContent)).toEqual(parseFloat(startPrice) * initialValue)
        })
    })
});