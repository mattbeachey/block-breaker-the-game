import React from "react";
import "./paddle.css";

export default function Paddle( {paddleX}) {

  // const [paddleX, setPaddleX] = useState(0);
  // function handleMouse(e) {
  //   console.log(e.x);
  //   let boundedX;
  //   const offset = (window.innerWidth - 300) / 2;
  //   if (e.x - offset < 0) {
  //     boundedX = 0;
  //   } else if (e.x - offset > 400) {
  //     boundedX = 400;
  //   } else {
  //     boundedX = e.x - offset;
  //   }
  //   setPaddleX(boundedX);
  // }

  // useEffect(() => {
  //   window.addEventListener("mousemove", handleMouse)
  // }, [])

  return <div className="paddle"
    style={{
      left: `${paddleX}px`

    }} />;
}
