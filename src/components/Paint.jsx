import React, { useState, useEffect, useRef, useCallback } from 'react';
import useWindowSize from './WindowSize';
import Menu from './Menu';
import randomColor from 'randomcolor';

export default function Paint() {

    /*** HEADER ***/
    const headerRef = useRef({ offsetHeight: 0 });
    /*** COLOURS  ***/
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

    useEffect(getColours, []);

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
        canvasRef.current.getContext('2d').strokeStyle = activeColour;
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
                colours={colours}
                activeColour={activeColour}
                setActiveColour={setActiveColour}
                getColours={getColours}
                clearScreen={clearScreen} />
            {activeColour && (
                <canvas
                    ref={canvasRef}
                    width={window.innerWidth}
                    height={window.innerHeight - headerRef.current.offsetHeight}
                    onMouseDown={startDrawing}
                    onMouseUp={stopDrawing}
                    onMouseOut={stopDrawing}
                    onMouseMove={handleMouseMove}
                />)}
            {/*<Canvas
                    colour={activeColour}
                    height={window.innerHeight - headerRef.current.offsetHeight}
                    width={window.innerWidth}
                />*/}

            <div className={`window-size ${visible ? '' : 'hidden'}`} >
                {windowWidth} x {windowHeight}
            </div >
        </div>
    )
}
