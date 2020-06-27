import React, { useContext } from 'react'
import PaintContext from '../context/paint/paintContext';

export default function EraseButton() {
    const paintContext = useContext(PaintContext);
    return <label title="eraser">
        <input
            name="colour"
            type="radio"
            value="#ffffffå"
            checked={paintContext.activeColour === "#ffffff"}
            onChange={() => paintContext.setActiveColour("#ffffff")}
        />
        <span><i class="fas fa-eraser"></i></span>
    </label>
};