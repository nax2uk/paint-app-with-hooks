import React from 'react'

export default React.memo(({ cb }) => {
    return <button className="button-options" onClick={cb}><i class="fas fa-eraser"></i></button >
});