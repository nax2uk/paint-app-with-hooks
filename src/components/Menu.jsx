import React from 'react';
import GetMoreColoursButton from './GetMoreColoursButton';
import ClearScreenButton from './ClearScreenButton';
import EraseButton from './EraseButton';
import ColourPicker from './ColourPicker';
import Name from './Name';

export default function Menu({ colours = [], activeColour, setActiveColour, getColours, headerRef, clearScreen }) {

    return (
        <header ref={headerRef} style={{ borderTop: `10px solid ${activeColour}` }}>
            <Name />
            <div style={{ marginTop: 10 }}>
                <div className="paint-options">
                    <EraseButton setActiveColour={setActiveColour} activeColour={activeColour} />
                    <GetMoreColoursButton cb={getColours} />
                    <ClearScreenButton cb={clearScreen} />
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
    );
};

