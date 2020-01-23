import React, { useEffect, useState } from "react";
import "./ball.css";

export default function Ball() {

    const [pos, setPos] = useState({x: 0, y: 0});

    useEffect(() => {
        setTimeout(() => {
            setPos({ x: pos.x + 10, y: pos.y + 10})
        }, 50)
    }, [pos])

    return <div 
    className="ball"
    style={{
        left: `${pos.x}px`,
        top: `${pos.y}px`
    }}
     />
}