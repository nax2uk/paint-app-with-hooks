import React, { useContext } from 'react';
import GetMoreColoursButton from './GetMoreColoursButton';
import ClearScreenButton from './ClearScreenButton';
import EraseButton from './EraseButton';
import ColourPicker from './ColourPicker';
import ColoursContext from '../context/colours/coloursContext';
import Name from './Name';

export default function Menu({ headerRef }) {

    const coloursContext = useContext(ColoursContext);

    return (
        <header ref={headerRef} style={{ borderTop: `10px solid ${coloursContext.activeColour}` }}>
            <Name />
            <div style={{ marginTop: 10 }}>
                <div className="paint-options">
                    <EraseButton />
                    <GetMoreColoursButton />
                    <ClearScreenButton />
                </div>
                <div className="colour-options">
                    <ColourPicker />
                </div>
            </div>
        </header>
    );
};

