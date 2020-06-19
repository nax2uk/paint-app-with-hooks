import React, { useState, useEffect, useRef } from 'react';
import Name from './Name';
import ColourPicker from './ColourPicker';
import WindowSize from './WindowSize';
import randomColor from 'randomcolor';
import Canvas from './Canvas'
import RefreshButton from './RefreshButton'

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

    const headerRef = useRef({ offsetHeight: 0 });

    useEffect(getColours, []);
    return (
        <div className="app">
            <header ref={headerRef} style={{ borderTop: `10px solid ${activeColour}` }}>
                <Name />
                <div style={{ marginTop: 10 }}>
                    <ColourPicker
                        colours={colours}
                        activeColour={activeColour}
                        setActiveColour={setActiveColour}
                    />
                    <RefreshButton />
                </div>
            </header>
            {activeColour && (
                <Canvas
                    color={activeColour}
                    height={window.innerHeight}
                />
            )}
            <WindowSize />
        </div>
    )
}
