import React from 'react'

export default React.memo(({ cb }) => {
    return <button className="button-options" onClick={cb} title="clear screen"><i class="fas fa-redo-alt"></i></button>
})