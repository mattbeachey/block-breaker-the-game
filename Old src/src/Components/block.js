import React from "react";

export default function Brick ( { top, left} ) {



    return (
        <div style={{
            top: `${top}px`,
            left: `${left}px`,
            position: "absolute",
            backgroundColor: "red",
            width: "100px",
            height: "25px",

        }} />
    )
}