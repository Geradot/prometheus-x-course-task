import React from 'react';
import MySelect from './UI/select/MySelect';

export default function BooksFilter({ filter, setFilter }) {
    return (
        <div className="container d-flex x2-gap justify-content-center">
            <input
                value={filter.query}
                onChange={e => setFilter({ ...filter, query: e.target.value })}
                style={{width: "auto"}}
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
                    { value: '30+', name: "price > 30" },
                ]}
            />
            {/* <input
                className="form-control"
                type="number"
                name="book-price"
                placeholder="Price"
                style={{width: "100px"}}
            /> */}
            {/* <div className="hr-horizontal"></div> */}
            {/* <MySelect
                value={filter.sort}
                onChange={selectedSort => setFilter({ ...filter, sort: selectedSort })}
                defaultValue="Sorting"
                options={[
                    { value: '', name: "Don't sort" },
                    { value: 'title', name: "By name" },
                    { value: 'author', name: "By author" },
                ]}
            /> */}
        </div>
    )
}
