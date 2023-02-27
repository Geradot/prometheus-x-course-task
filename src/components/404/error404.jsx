import classes from './Error404.module.css';
import clsx from "clsx";

function Error404() {
    return (
        <div className="container">
            <p className={clsx(classes[`heading`], "display-3")}>
                Error 404
            </p>
            <p className="alert alert-danger d-inline-block">
                This page is not found. Please, edit the request and try again.
            </p>
        </div>
    )
}
export default Error404;