import React from "react";
import "./styles.css";
import Paddle from "./Components/Paddle";

export default function App() {
  return (
    <div className="gameboard">
      <Paddle />
      <h1>Breakblox</h1>
    </div>
  );
}
