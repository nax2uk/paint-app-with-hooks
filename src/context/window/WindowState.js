import React, { useReducer, useRef } from 'react';
import useWindowSize from '../../components/WindowSize';
import WindowContext from './windowContext';
import WindowReducer from './windowReducer';

import {
    SET_VISIBLE
}
    from '../types';

const CanvasState = props => {
    const initialState = {
        visible: false
    }
    const [state, dispatch] = useReducer(WindowReducer, initialState);
    let timeoutID = useRef();

    const [windowWidth, windowHeight] = useWindowSize(() => {
        dispatch({ type: SET_VISIBLE, visible: true })
        clearTimeout(timeoutID.current);
        timeoutID.current = setTimeout(() => dispatch({ type: SET_VISIBLE, visible: false }), 500);

    });

    return (
        <WindowContext.Provider
            value={{
                visible: state.visible,
                windowWidth: windowWidth,
                windowHeight: windowHeight
            }}
        >
            {props.children}
        </WindowContext.Provider>
    );
}

export default CanvasState;

