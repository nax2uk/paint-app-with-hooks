import React from 'react'

export default React.memo(({ cb }) => {
    return <button className="button-options" onClick={cb} title="get more colours"><i class="fas fa-palette"></i></button>
});