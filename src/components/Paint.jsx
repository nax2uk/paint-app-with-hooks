import React, { useState, useEffect } from 'react'
import Name from './Name'
import ColourPicker from './ColourPicker'
import randomColor from 'randomcolor'

export default function Paint() {
    const [activeColour, setActiveColour] = useState(null);
    const [colours, setColours] = useState([]);

    const getColours = () => {
        const baseColour = randomColor().slice(1);
        fetch(`https://www.thecolorapi.com/scheme?hex=${baseColour}&mode=monochrome`)
            .then(res => res.json())
            .then(res => {
                setColours(res.colors.map(colour => colour.hex.value));
                setActiveColour(res.colors[0].hex.value);
            })
    }

    useEffect(getColours, []);
    return (
        <header style={{ borderTop: `10px solid ${activeColour}` }}>
            <div className="app">
                <Name />
            </div>
            <div style={{ marginTop: 10 }}>
                <ColourPicker
                    colours={colours}
                    activeColour={activeColour}
                    setActiveColour={setActiveColour}
                />
            </div>
        </header>
    )
}
