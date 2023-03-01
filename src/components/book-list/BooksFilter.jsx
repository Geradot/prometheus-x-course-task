import React from 'react';
import MySelect from '../UI/select/MySelect';
import clsx from 'clsx';
import classes from './BooksList.module.css';

export default function BooksFilter({ filter, setFilter }) {
    return (
        <div className={clsx("container d-flex x2-gap justify-content-center", classes[`top-fields`])}>
            <input
                value={filter.query}
                onChange={e => setFilter({ ...filter, query: e.target.value })}
                style={{ width: "auto" }}
                className="form-control"
                type="search"
                name="book-name"
                placeholder="Search by book name"
            />
            <MySelect
                value={filter.price}
                onChange={selectedPrice => setFilter({ ...filter, price: selectedPrice })}
                defaultValue="Choose price"
                options={[
                    { value: 'all', name: "All prices" },
                    { value: '0-15', name: "0 < price < 15" },
                    { value: '15-30', name: "15 < price < 30" },
                    { value: '30+', name: "price 30+" },
                ]}
            />
        </div>
    )
}