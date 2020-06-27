import React, { useContext } from 'react';
import ColoursContext from '../context/colours/coloursContext';


export default function ColourPicker() {
    const coloursContext = useContext(ColoursContext);
    if (!coloursContext.colours.length) return null
    return (
        <fieldset className="colour-picker">
            {coloursContext.colours.map((colour, i) => (
                <label key={i}>
                    <input
                        name="colour"
                        type="radio"
                        value={colour}
                        checked={coloursContext.activeColour === colour}
                        onChange={() => coloursContext.setActiveColour(colour)}
                    />
                    <span style={{ background: colour }} />
                </label>
            ))}
        </fieldset>
    )
}
