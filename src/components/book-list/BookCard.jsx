import React from 'react'
import clsx from 'clsx';
import classes from "./BooksList.module.css";
import { Link, useLocation } from 'react-router-dom';
import img_book from '../../img/img-not-found.png';

export default function BookCard(props) {
    const location = useLocation();
    return (
        <div className={clsx("card", classes[`card-width`])}>
            <Link
                to={{ pathname: `/books/${props.book.id}` }}
                state={{'book': props.book, 'username': location.state?.username}}
            ><img 
                className="card-img-top" 
                src={props.book.image || img_book} 
                alt={props.book.title} /></Link>
                
            <div className="card-body base-gap base-padding">
                <p className="h6 card-title">
                    {props.book.title.length > 24
                        ? props.book.title.substring(0, 21) + "..."
                        : props.book.title}</p>
                <p className="text-muted card-subtitle">{props.book.author}</p>
            </div>
            <div className="d-flex base-gap justify-content-between align-items-center card-footer">
                <p className="margin-vertical-center">${props.book.price}</p>
                <Link
                    className="btn btn-outline-secondary"
                    to={{ pathname: `/books/${props.book.id}` }}
                    state={{'book': props.book, 'username': location.state?.username}}
                >View</Link>
            </div>
        </div>
    )
}
