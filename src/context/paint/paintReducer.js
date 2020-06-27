import {
    GET_COLOURS,
    SET_ACTIVE_COLOUR
}
    from '../types';

export default (state, action) => {
    switch (action.type) {
        case GET_COLOURS:
            return {
                activeColour: action.activeColour,
                colours: action.colours
            }
        case SET_ACTIVE_COLOUR:
            return {
                ...state,
                activeColour: action.activeColour
            }
        default: return state;
    }
}