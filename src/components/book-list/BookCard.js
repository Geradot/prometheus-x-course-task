import React from 'react'
import clsx from 'clsx';
import classes from "./BooksList.module.css";
import { Link } from 'react-router-dom';
export default function BookCard(props) {
    if (!props.book.image) props.book.image = '/img/img-not-found.png';
    return (
        <div className={clsx("card", classes[`card-width`])}>
            <img className="card-img-top" src={props.book.image} alt={props.book.title} />
            <div className="card-body base-gap base-padding">
                <p className="h6 card-title">
                    {props.book.title.length > 24
                        ? props.book.title.substring(0, 21) + "..."
                        : props.book.title}</p>
                <p className="text-muted card-subtitle">{props.book.author}</p>
            </div>
            <div className="d-flex base-gap justify-content-between align-items-center card-footer">
                <p className="margin-vertical-center">${props.book.price}</p>
                {/* 
                TODO: quick adding and removing books on cards.
                */ }
                <Link
                    className="btn btn-primary"
                    to={{ pathname: `/book/${props.book.id}` }}
                    state={props.book}
                >View</Link>
            </div>
        </div>
    )
}
