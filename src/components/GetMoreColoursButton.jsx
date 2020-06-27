import React, { useContext } from 'react'
import PaintContext from '../context/paint/paintContext';

export default React.memo(({ cb }) => {

    const paintContext = useContext(PaintContext);

    return <button className="button-options" onClick={paintContext.getColours} title="get more colours"><i class="fas fa-palette"></i></button>
});