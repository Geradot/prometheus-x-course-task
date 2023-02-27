import React from 'react'
import classes from "./Loader.module.css";
import clsx from 'clsx';

export default function Loader() {
  return (
    <div className={clsx(classes[`loader`], "mt-5")}></div>
  )
}
