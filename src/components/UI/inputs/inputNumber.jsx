import { useState } from "react";

const InputNumber = ({ id, value, onChange, className, min, max }) => {
    const [count, setCount] = useState(value);


    const increment = () => {
        const newValue = parseInt(count) + 1;
        if (newValue <= max) {
            setCount(newValue);
            onChange(newValue);
        }
    };

    const decrement = () => {
        const newValue = parseInt(count) - 1;
        if (newValue >= min) {
            setCount(newValue);
            onChange(newValue);
        }
    };

    const handleInputChange = (event) => {
        const value = event.target.value;
        const newValue = parseInt(value);
        if (!isNaN(newValue) && newValue >= min && newValue <= max) {
            setCount(value);
            onChange(newValue);
        }

        return (
            <>
                <input
                    type="text"
                    id={id}
                    value={count}
                    onChange={handleInputChange}
                    className={className}
                    min={min}
                    max={max}
                />
                <div class="btn-group-vertical" role="group" aria-label="Vertical button group">
                    <button type="button" class="btn btn-light" onClick={increment}>+</button>
                    <button type="button" class="btn btn-light" onClick={decrement}>-</button>
                </div>
            </>
        );
    };
}

export default InputNumber;