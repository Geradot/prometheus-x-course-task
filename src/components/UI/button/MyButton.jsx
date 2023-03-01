import React from 'react';

export default function MyButton({children, ...props}) {
    return (
        <button {...props}>{children}</button>
    )
}