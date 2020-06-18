import React, { useState, useEffect } from 'react';

export default function WindowSize() {
    const [[windowWidth, windowHeight], setWindowDim] = useState([window.innerWidth, window.innerHeight]);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        let timeoutID;
        const handleResize = () => {
            setWindowDim([window.innerWidth, window.innerHeight]);
            setVisible(true);
            clearTimeout(timeoutID);
            timeoutID = setTimeout(() => (setVisible(false), 500));
        }

        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize);
    }, [])

    return (
        <div className={`window-size ${visible ? '' : 'hidden'}`} >
            {windowWidth} x { windowHeight}
        </div >
    );
};