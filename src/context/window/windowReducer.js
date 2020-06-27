import {
    SET_VISIBLE
}
    from '../types';

export default (state, action) => {
    switch (action.type) {

        case SET_VISIBLE:
            return {
                visible: action.visible
            }
        default: return state;
    }
}