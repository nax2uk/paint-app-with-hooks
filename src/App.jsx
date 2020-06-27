import React from 'react'
import Paint from './components/Paint'
import PaintState from './context/paint/PaintState';

export default function App() {

    return (
        <PaintState>
            <Paint />
        </PaintState>
    );
}