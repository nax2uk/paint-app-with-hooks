import { useState, useEffect } from 'react';

export default function useWindowSize(cb) {
    const [[windowWidth, windowHeight], setWindowDim] = useState([window.innerWidth, window.innerHeight]);

    useEffect(() => {

        const handleResize = () => {
            cb();
            setWindowDim([window.innerWidth, window.innerHeight]);
        }
        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize);
    }, [cb])

    return ([windowWidth, windowHeight]);
};