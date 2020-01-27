import React, { useEffect, useState } from "react";
import "./ball.css";

export default function Ball({ pos }) {


    return <div 
    className="ball"
    style={{
        left: `${pos.x}px`,
        top: `${pos.y}px`
    }}
     />
}