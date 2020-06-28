import React from 'react'
import Paint from './components/Paint'
import ColoursState from './context/colours/ColoursState';
import CanvasState from './context/canvas/CanvasState';
import WindowState from './context/window/WindowState';

export default function App() {

    return (
        <ColoursState>
            <CanvasState>
                <WindowState>
                    <Paint />
                </WindowState>
            </CanvasState>
        </ColoursState>
    );
}