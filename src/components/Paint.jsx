import React, { useState, useEffect, useRef, useCallback } from 'react';
import Name from './Name';
import ColourPicker from './ColourPicker';
import useWindowSize from './WindowSize';
import randomColor from 'randomcolor';
import Canvas from './Canvas';
import GetMoreColoursButton from './GetMoreColoursButton';
import ClearScreenButton from './ClearScreenButton';
import EraseButton from './EraseButton';

export default function Paint() {
    const [activeColour, setActiveColour] = useState(randomColor());
    const [colours, setColours] = useState([]);

    const getColours = useCallback(() => {
        const baseColour = randomColor().slice(1);
        fetch(`https://www.thecolorapi.com/scheme?hex=${baseColour}&mode=monochrome`)
            .then(res => res.json())
            .then(res => {
                setColours(res.colors.map(colour => colour.hex.value));
                setActiveColour(res.colors[0].hex.value);
            })
    }, []);

    const headerRef = useRef({ offsetHeight: 0 });

    const [visible, setVisible] = useState(false);
    let timeoutID = useRef();
    const [windowWidth, windowHeight] = useWindowSize(() => {
        setVisible(true);
        clearTimeout(timeoutID.current);
        timeoutID.current = setTimeout(() => setVisible(false), 500);

    });

    useEffect(getColours, []);

    return (
        <div className="app">
            <header ref={headerRef} style={{ borderTop: `10px solid ${activeColour}` }}>
                <Name />
                <div style={{ marginTop: 10 }}>
                    <div className="paint-options">
                        <EraseButton />
                        <GetMoreColoursButton cb={getColours} />
                        <ClearScreenButton />
                    </div>
                    <div className="colour-options">
                        <ColourPicker
                            colours={colours}
                            activeColour={activeColour}
                            setActiveColour={setActiveColour}
                        />
                    </div>
                </div>
            </header>
            {activeColour && (
                <Canvas
                    color={activeColour}
                    height={window.innerHeight - headerRef.current.offsetHeight}
                    width={window.innerWidth}
                />
            )}
            {<div className={`window-size ${visible ? '' : 'hidden'}`} >
                {windowWidth} x {windowHeight}
            </div >}
        </div>
    )
}
