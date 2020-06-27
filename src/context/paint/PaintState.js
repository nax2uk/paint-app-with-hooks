import React, { useReducer, useCallback } from 'react';
import PaintContext from './paintContext';
import PaintReducer from './paintReducer';
import randomColor from 'randomcolor';
import {
    GET_COLOURS,
    SET_ACTIVE_COLOUR
}
    from '../types';

const PaintState = props => {
    const initialState = {
        /*** COLOURS  ***/
        activeColour: randomColor(),
        colours: []
    }
    const [state, dispatch] = useReducer(PaintReducer, initialState);

    const getColours = useCallback(() => {
        const baseColour = randomColor().slice(1);
        fetch(`https://www.thecolorapi.com/scheme?hex=${baseColour}&mode=monochrome`)
            .then(res => res.json())
            .then(res => {
                dispatch({
                    type: GET_COLOURS,
                    colours: res.colors.map(colour => colour.hex.value),
                    activeColour: (res.colors[0].hex.value)
                });
            })
    }, []);

    const setActiveColour = (activeColour) => dispatch({ type: SET_ACTIVE_COLOUR, activeColour: activeColour });
    return (
        <PaintContext.Provider
            value={{
                activeColour: state.activeColour,
                colours: state.colours,
                getColours,
                setActiveColour
            }}
        >
            {props.children}
        </PaintContext.Provider>
    );
}

export default PaintState;

