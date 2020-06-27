import {
    SET_DRAWING
}
    from '../types';

export default (state, action) => {
    switch (action.type) {

        case SET_DRAWING:
            return {
                ...state,
                drawing: action.drawing
            }
        default: return state;
    }
}