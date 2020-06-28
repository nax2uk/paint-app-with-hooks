import React, { useContext } from 'react'
import CanvasContext from '../context/canvas/canvasContext';

export default React.memo(() => {
    const canvasContext = useContext(CanvasContext);
    return <button className="button-options"
        onClick={canvasContext.clearScreen}
        title="clear screen">
        <i class="fas fa-redo-alt"></i>
    </button>
})