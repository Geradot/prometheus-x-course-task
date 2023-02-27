import React from 'react'
export default function MySelect({ options, defaultValue, value, onChange }) {
    return (
        <select
            className="form-select"
            style={{ width: "auto" }}
            value={value}
            onChange={event => onChange(event.target.value)}
        >
            <option disabled value="">{defaultValue}</option>
            {options.map(option =>
                <option key={option.value} value={option.value}>
                    {option.name}
                </option>
            )}
        </select>
    )
}
