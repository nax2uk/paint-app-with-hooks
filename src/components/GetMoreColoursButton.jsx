import React, { useContext } from 'react'
import ColoursContext from '../context/colours/coloursContext';

export default React.memo(() => {

    const coloursContext = useContext(ColoursContext);

    return <button className="button-options" onClick={coloursContext.getColours} title="get more colours"><i class="fas fa-palette"></i></button>
});