import React from 'react'

export default React.memo(({ cb }) => {
    console.log("render");
    return <button className="button-refresh-colors" onClick={cb}>&#8634;</button>
});