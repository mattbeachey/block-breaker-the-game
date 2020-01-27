import React, { useReducer, useEffect } from "react";
import "./styles.css";
import Paddle from "./Components/Paddle";
import Ball from "./Components/Ball"
import Block from "./Components/block"
import Brick from "./Components/block";

const initialState = {
  paddle: {
    x: 0
  },
  ball: {
    x: 50,
    y: 50,
    dx: 5,
    dy: 5
  }
};

function reducer(state, action) {
  switch (action.type) {
    case "MOVE_PADDLE":
      return { ...state, paddle: action.payload };
    case "MOVE_BALL":
      return { ...state, ball: action.payload };
    default:
      throw new Error();
  }
}

export default function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  function handleMouse(e) {
    let boundedX;
    const offset = (window.innerWidth - 500) / 2;
    if (e.x - offset < 0) {
      boundedX = 0;
    } else if (e.x - offset > 400) {
      boundedX = 400;
    } else {
      boundedX = e.x - offset;
    }
    dispatch({
      type: "MOVE_PADDLE",
      payload: {
        x: boundedX
      }
    });
  }
  useEffect(() => {
    window.addEventListener("mousemove", handleMouse);
  }, []);

  function willCollide(rect1, rect2) {
    let x = false;
    let y = false;
    let xCurr = false;
    let yCurr = false;
    let collided = false;

    const rect1XNext = rect1.x + rect1.dx;
    const rect1YNext = rect1.y + rect1.dy;

    if (rect1.x < rect2.x + rect2.width && rect1.x + rect1.width > rect2.x) {
      xCurr = true;
    }
    if (rect1.y < rect2.y + rect2.height && rect1.y + rect1.height > rect2.y) {
      yCurr = true;
    }
    if (
      yCurr &&
      rect1XNext < rect2.x + rect2.width &&
      rect1XNext + rect1.width > rect2.x
    ) {
      x = true;
    }
    if (
      xCurr &&
      rect1YNext < rect2.y + rect2.height &&
      rect1YNext + rect1.height > rect2.y
    ) {
      y = true;
    }
    if (
      rect1XNext < rect2.x + rect2.width &&
      rect1XNext + rect1.width > rect2.x &&
      rect1YNext < rect2.y + rect2.height &&
      rect1YNext + rect1.height > rect2.y
    ) {
      collided = true;
    }
    return { x, y, collided };
  }

  useEffect(() => {
    const handle = setTimeout(() => {
      let x = state.ball.x;
      let y = state.ball.y;
      let dx = state.ball.dx;
      let dy = state.ball.dy;

      let paddleX = state.paddle.x;

      const leftCollide = willCollide(
        {
          x,
          dx,
          y,
          dy,
          width: 20,
          height: 20
        },
        {
          x: -100,
          y: 0,
          width: 100,
          height: 600
        }
      );

      const rightCollide = willCollide(
        {
          x,
          dx,
          y,
          dy,
          width: 20,
          height: 20
        },
        {
          x: 480,
          y: 0,
          width: 100,
          height: 600
        }
      );

      const topCollide = willCollide(
        {
          x,
          dx,
          y,
          dy,
          width: 20,
          height: 20
        },
        {
          x: 0,
          y: -50,
          width: 500,
          height: 100
        }
      );

      const bottomCollide = willCollide(
        {
          x,
          dx,
          y,
          dy,
          width: 20,
          height: 20
        },
        {
          x: 0,
          y: 580,
          width: 500,
          height: 100
        }
      );

      if (leftCollide.collided || rightCollide.collided) {
        dx = -dx;
      }

      if (topCollide.collided || bottomCollide.collided) {
        dy = -dy;
      }

      const paddleCollide = willCollide(
        {
          x,
          dx,
          y,
          dy,
          width: 20,
          height: 20
        },
        {
          x: paddleX,
          y: 540,
          width: 100,
          height: 25
        }
      );

      if (paddleCollide.y) {
        dy = -dy;
      }
      if (paddleCollide.x) {
        dx = -dx;
      }

      return dispatch({
        type: "MOVE_BALL",
        payload: {
          dx,
          dy,
          x: x + dx,
          y: y + dy
        }
      });
    }, 50);
    return () => clearTimeout(handle);
  }, [state.ball]);

  const blockArray = [{top: 50, left: 25}, {top: 50, left: 200}, {top: 50, left: 375}, {top: 150, left: 25}, {top: 150, left: 200}, {top: 150, left: 375}, ]
  
  return (
    <div className="gameboard">
        {blockArray.map((block) => (
        <Brick 
        top={block.top}
        left={block.left}
         />
        ))}
      <Paddle paddleX={state.paddle.x}/>  
      <Ball pos={state.ball}
      />
      <h1>Breakblox</h1>
    </div>
  );
}

