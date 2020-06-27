import React from 'react'
import Paint from './components/Paint'
import ColoursState from './context/colours/ColoursState';
import CanvasState from './context/canvas/CanvasState';

export default function App() {

    return (
        <ColoursState>
            <CanvasState>
                <Paint />
            </CanvasState>
        </ColoursState>

    );
}