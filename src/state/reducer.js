import {
  MOVE_BALL,
  MOVE_PADDLE,
  ADD_SCORE,
  DIE,
  BRICK_COLLISION,
  PRESS_START,
  GAME_OVER,
  START_GAME
} from "./actions";
import createState from "./createState";
import levelOne from "../levels/one"
import axios from "axios";

export default function reducer(state, action) {
  switch (action.type) {
    case START_GAME:
      return createState(levelOne, {
        isPlaying: true,
      });
    case MOVE_PADDLE:
      return { ...state, paddle: action.payload };
    case ADD_SCORE:
      return {...state, score: state.score + action.payload}
    case DIE:
      return {...state, lives: state.lives -1, isPlaying: false}
    case MOVE_BALL:
      return { ...state, ball: { ...state.ball, ...action.payload } };
    case PRESS_START:
      return { ...state, ball: { ...state.ball, ...action.payload } };
    case GAME_OVER:
      // alert(state.score)
      const initials = prompt ("Your score was: " + state.score + ".n/ add initials for high score")
      alert(initials + ": " + state.score)
      axios.post("http://localhost:5000/api/v1/hiscores", {
        initials: initials, 
        score: state.score
      })
      // .then(function(){
      //   axios.get("http://localhost:5000/api/v1/hiscores")
      //   .then(function(res){
      //     console.log(res.data.hiScores)
      //   })
      // } )
      
      // return state;
      return createState(levelOne);
    case BRICK_COLLISION:
      const newBricks = state.bricks.reduce((bricks, brick) => {
        if (action.payload.bricks.find(b => b.id === brick.id)) {
          if (brick.type - 1 <= 0) {
            return [...bricks];
          }
          return [
            ...bricks,
            {
              ...brick,
              type: brick.type - 1
            }
          ];
        }
        return [...bricks, brick];
      }, []);

      return {
        ...state,
        bricks: newBricks
      };
    default:
      throw new Error("UNKOWN ACTION:", action.type);
  }
}
