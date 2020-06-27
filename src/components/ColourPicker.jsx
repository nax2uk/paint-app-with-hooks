import React, { useContext } from 'react';
import PaintContext from '../context/paint/paintContext';


export default function ColourPicker() {
    const paintContext = useContext(PaintContext);
    if (!paintContext.colours.length) return null
    return (
        <fieldset className="colour-picker">
            {paintContext.colours.map((colour, i) => (
                <label key={i}>
                    <input
                        name="colour"
                        type="radio"
                        value={colour}
                        checked={paintContext.activeColour === colour}
                        onChange={() => paintContext.setActiveColour(colour)}
                    />
                    <span style={{ background: colour }} />
                </label>
            ))}
        </fieldset>
    )
}
