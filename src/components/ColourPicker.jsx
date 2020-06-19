import React from 'react'


export default function ColourPicker({ colours = [], activeColour, setActiveColour }) {
    if (!colours.length) return null
    return (
        <fieldset className="colour-picker">
            {colours.map((colour, i) => (
                <label key={i}>
                    <input
                        name="colour"
                        type="radio"
                        value={colour}
                        checked={activeColour === colour}
                        onChange={() => setActiveColour(colour)}
                    />
                    <span style={{ background: colour }} />
                </label>
            ))}
        </fieldset>
    )
}
