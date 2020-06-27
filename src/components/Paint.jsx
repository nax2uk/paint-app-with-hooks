import React, { useState, useEffect, useRef, useContext } from 'react';
import useWindowSize from './WindowSize';
import Menu from './Menu';
import ColoursContext from '../context/colours/coloursContext';
import CanvasContext from '../context/canvas/canvasContext';

export default function Paint() {

    /*** HEADER ***/
    const headerRef = useRef({ offsetHeight: 0 });

    /*** COLOURS ***/
    const coloursContext = useContext(ColoursContext);

    useEffect(coloursContext.getColours, []);

    /*** Canvas ***/
    const canvasContext = useContext(CanvasContext);

    /*** WINDOW SIZE ***/
    const [visible, setVisible] = useState(false);
    let timeoutID = useRef();
    const [windowWidth, windowHeight] = useWindowSize(() => {
        setVisible(true);
        clearTimeout(timeoutID.current);
        timeoutID.current = setTimeout(() => setVisible(false), 500);

    });

    return (
        <div className="app">
            <Menu
                headerRef={headerRef}
            />
            {coloursContext.activeColour && (
                <canvas
                    ref={canvasContext.canvasRef}
                    width={window.innerWidth}
                    height={window.innerHeight - headerRef.current.offsetHeight}
                    onMouseDown={canvasContext.startDrawing}
                    onMouseUp={canvasContext.stopDrawing}
                    onMouseOut={canvasContext.stopDrawing}
                    onMouseMove={canvasContext.handleMouseMove}
                />)}

            <div className={`window-size ${visible ? '' : 'hidden'}`} >
                {windowWidth} x {windowHeight}
            </div >
        </div>
    )
}
