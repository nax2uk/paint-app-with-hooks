import React, { useContext } from 'react';
import GetMoreColoursButton from './GetMoreColoursButton';
import ClearScreenButton from './ClearScreenButton';
import EraseButton from './EraseButton';
import ColourPicker from './ColourPicker';
import PaintContext from '../context/paint/paintContext';
import Name from './Name';

export default function Menu({ headerRef, clearScreen }) {

    const paintContext = useContext(PaintContext);

    return (
        <header ref={headerRef} style={{ borderTop: `10px solid ${paintContext.activeColour}` }}>
            <Name />
            <div style={{ marginTop: 10 }}>
                <div className="paint-options">
                    <EraseButton />
                    <GetMoreColoursButton />
                    <ClearScreenButton cb={clearScreen} />
                </div>
                <div className="colour-options">
                    <ColourPicker />
                </div>
            </div>
        </header>
    );
};

