import React, { useEffect, useState, useRef } from "react"


export default function Canvas(props) {

    const [drawing, setDrawing] = useState(false);

    const canvasRef = useRef();

    function handleMouseMove(e) {
        // actual coordinates
        const coords = [
            e.clientX - canvasRef.current.offsetLeft,
            e.clientY - canvasRef.current.offsetTop
        ]
        if (drawing) {
            canvasRef.current.getContext('2d').lineTo(...coords)
            canvasRef.current.getContext('2d').stroke()
        }
        if (props.handleMouseMove) {
            props.handleMouseMove(...coords)
        }
    }
    function startDrawing(e) {
        canvasRef.current.getContext('2d').lineJoin = 'round'
        canvasRef.current.getContext('2d').lineCap = 'round'
        canvasRef.current.getContext('2d').lineWidth = 10
        canvasRef.current.getContext('2d').strokeStyle = props.color
        canvasRef.current.getContext('2d').beginPath();
        // actual coordinates
        canvasRef.current.getContext('2d').moveTo(
            e.clientX - canvasRef.current.offsetLeft,
            e.clientY - canvasRef.current.offsetTop
        )
        setDrawing(true)
    }
    function stopDrawing() {
        canvasRef.current.getContext('2d').closePath()
        setDrawing(false)
    }

    return (
        <>
            <canvas
                ref={canvasRef}
                width={props.width}
                height={props.height}
                onMouseDown={startDrawing}
                onMouseUp={stopDrawing}
                onMouseOut={stopDrawing}
                onMouseMove={handleMouseMove}
            />
        </>
    )

}

// export default class Canvas extends React.Component {
//     constructor(props) {
//         super(props)
//         this.canvasRef = React.createRef()
//         this.handleMouseMove = this.handleMouseMove.bind(this)
//         this.handleResize = this.handleResize.bind(this)
//         this.startDrawing = this.startDrawing.bind(this)
//         this.stopDrawing = this.stopDrawing.bind(this)
//         this.state = {
//             drawing: false,
//             // width: window.innerWidth
//         }
//     }
//     componentDidMount() {
//         this.ctx = this.canvasRef.getContext('2d')
//         window.addEventListener('resize', this.handleResize);
//     }
//     componentWillUnmount() {
//         window.removeEventListener('resize', this.handleResize)
//     }
//     handleMouseMove(e) {
//         // actual coordinates
//         const coords = [
//             e.clientX - this.canvasRef.current.offsetLeft,
//             e.clientY - this.canvasRef.current.offsetTop
//         ]
//         if (this.state.drawing) {
//             this.canvasRef.current.getContext('2d').lineTo(...coords)
//             this.canvasRef.current.getContext('2d').stroke()
//         }
//         if (this.props.handleMouseMove) {
//             this.props.handleMouseMove(...coords)
//         }
//     }
//     handleResize() {
//         this.setState({ width: window.innerWidth, height: window.innerHeight })
//     }
//     startDrawing(e) {
//         this.canvasRef.current.getContext('2d').lineJoin = 'round'
//         this.canvasRef.current.getContext('2d').lineCap = 'round'
//         this.canvasRef.current.getContext('2d').lineWidth = 10
//         this.canvasRef.current.getContext('2d').strokeStyle = this.props.color
//         this.canvasRef.current.getContext('2d').beginPath();
//         // actual coordinates
//         this.canvasRef.current.getContext('2d').moveTo(
//             e.clientX - this.canvasRef.current.offsetLeft,
//             e.clientY - this.canvasRef.current.offsetTop
//         )
//         this.setState({ drawing: true })
//     }
//     stopDrawing() {
//         this.canvasRef.current.getContext('2d').closePath()
//         this.setState({ drawing: false })
//     }
//     render() {
//         return (
//             <>
//                 <canvas
//                     ref={this.canvasRef}
//                     width={this.props.width}
//                     height={this.props.height}
//                     onMouseDown={this.startDrawing}
//                     onMouseUp={this.stopDrawing}
//                     onMouseOut={this.stopDrawing}
//                     onMouseMove={this.handleMouseMove}
//                 />
//             </>
//         )
//     }
// }