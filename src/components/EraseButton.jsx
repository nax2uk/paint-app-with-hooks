import React, { useContext } from 'react'
import ColoursContext from '../context/colours/coloursContext';

export default function EraseButton() {
    const coloursContext = useContext(ColoursContext);
    return <label title="eraser">
        <input
            name="colour"
            type="radio"
            value="#ffffffå"
            checked={coloursContext.activeColour === "#ffffff"}
            onChange={() => coloursContext.setActiveColour("#ffffff")}
        />
        <span><i class="fas fa-eraser"></i></span>
    </label>
};