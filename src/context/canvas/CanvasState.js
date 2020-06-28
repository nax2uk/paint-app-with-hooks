import React, { useReducer, useRef, useContext } from 'react';
import CanvasContext from './canvasContext';
import CanvasReducer from './canvasReducer';
import ColoursContext from '../colours/coloursContext';

import {
    SET_DRAWING
}
    from '../types';

const CanvasState = props => {
    const initialState = {
        drawing: false
    }
    const [state, dispatch] = useReducer(CanvasReducer, initialState);
    const coloursContext = useContext(ColoursContext);
    const canvasRef = useRef();

    function handleMouseMove(e) {
        // actual coordinates
        const coords = [
            e.clientX - canvasRef.current.offsetLeft,
            e.clientY - canvasRef.current.offsetTop
        ]
        if (state.drawing) {
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
        canvasRef.current.getContext('2d').strokeStyle = coloursContext.activeColour;
        canvasRef.current.getContext('2d').beginPath();
        // actual coordinates
        canvasRef.current.getContext('2d').moveTo(
            e.clientX - canvasRef.current.offsetLeft,
            e.clientY - canvasRef.current.offsetTop
        )
        dispatch({
            type: SET_DRAWING, drawing: true
        });
    }

    function stopDrawing() {
        canvasRef.current.getContext('2d').closePath();
        dispatch({
            type: SET_DRAWING, drawing: false
        });
    }

    const clearScreen = () => {
        canvasRef.current.getContext('2d').clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    }

    return (
        <CanvasContext.Provider
            value={{
                drawing: state.drawing,
                canvasRef,
                clearScreen,
                startDrawing,
                stopDrawing,
                handleMouseMove,
            }}
        >
            {props.children}
        </CanvasContext.Provider>
    );
}

export default CanvasState;

