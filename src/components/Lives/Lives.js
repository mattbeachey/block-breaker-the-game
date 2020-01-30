import React, { useContext } from "react";

import "./lives.css";
import { GameContext } from "../../state/context";

export default function Lives() {
  const { state } = useContext(GameContext);
  return <div className="lives">Lives: {state.lives}</div>;
}