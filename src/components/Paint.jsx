import React, { useEffect, useRef, useContext } from 'react';

import Menu from './Menu';
import ColoursContext from '../context/colours/coloursContext';
import CanvasContext from '../context/canvas/canvasContext';
import WindowContext from '../context/window/windowContext';

export default function Paint() {

    /*** HEADER ***/
    const headerRef = useRef({ offsetHeight: 0 });

    /*** COLOURS ***/
    const coloursContext = useContext(ColoursContext);
    useEffect(coloursContext.getColours, []);

    /*** CANVAS ***/
    const canvasContext = useContext(CanvasContext);

    /*** WINDOW SIZE ***/
    const windowContext = useContext(WindowContext);


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

            <div className={`window-size ${windowContext.visible ? '' : 'hidden'}`} >
                {windowContext.windowWidth} x {windowContext.windowHeight}
            </div >
        </div>
    )
}
