import React from "react";
import "./styles.css";
import Paddle from "./Components/Paddle";
import Ball from "./Components/Ball"

export default function App() {
  
  return (
    <div className="gameboard">
      <Paddle />
      <Ball />
      <h1>Breakblox</h1>
    </div>
  );
}
