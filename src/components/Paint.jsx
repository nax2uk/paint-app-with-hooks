import React, { useState, useEffect, useRef, useCallback, useContext } from 'react';
import useWindowSize from './WindowSize';
import Menu from './Menu';
import PaintContext from '../context/paint/paintContext';

export default function Paint() {

    /*** HEADER ***/
    const headerRef = useRef({ offsetHeight: 0 });

    const paintContext = useContext(PaintContext);

    useEffect(paintContext.getColours, []);

    /*** Canvas ***/
    const [drawing, setDrawing] = useState(false);
    const canvasRef = useRef();

    function handleMouseMove(e) {
        // actual coordinates
        const coords = [
            e.clientX - canvasRef.current.offsetLeft,
            e.clientY - canvasRef.current.offsetTop
        ]
        if (drawing) {
            canvasRef.current.getContext('2d').lineTo(...coords)
            canvasRef.current.getContext('2d').stroke()
        }
        // if (this.handleMouseMove) {
        //     this.handleMouseMove(...coords)
        // }
    }
    function startDrawing(e) {
        canvasRef.current.getContext('2d').lineJoin = 'round';
        canvasRef.current.getContext('2d').lineCap = 'round';
        canvasRef.current.getContext('2d').lineWidth = 10;
        canvasRef.current.getContext('2d').strokeStyle = paintContext.activeColour;
        canvasRef.current.getContext('2d').beginPath();
        // actual coordinates
        canvasRef.current.getContext('2d').moveTo(
            e.clientX - canvasRef.current.offsetLeft,
            e.clientY - canvasRef.current.offsetTop
        )
        setDrawing(true)
    }
    function stopDrawing() {
        canvasRef.current.getContext('2d').closePath();
        setDrawing(false);
    }

    const clearScreen = () => {
        canvasRef.current.getContext('2d').clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    }

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
                clearScreen={clearScreen} />
            {paintContext.activeColour && (
                <canvas
                    ref={canvasRef}
                    width={window.innerWidth}
                    height={window.innerHeight - headerRef.current.offsetHeight}
                    onMouseDown={startDrawing}
                    onMouseUp={stopDrawing}
                    onMouseOut={stopDrawing}
                    onMouseMove={handleMouseMove}
                />)}

            <div className={`window-size ${visible ? '' : 'hidden'}`} >
                {windowWidth} x {windowHeight}
            </div >
        </div>
    )
}
