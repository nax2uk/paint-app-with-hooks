import React from 'react'

export default function EraseButton({ setActiveColour, activeColour }) {
    return <label>
        <input
            name="colour"
            type="radio"
            value="#ffffffå"
            checked={activeColour === "#ffffff"}
            onChange={() => setActiveColour("#ffffff")}
        />
        <span><i class="fas fa-eraser"></i></span>
    </label>
};