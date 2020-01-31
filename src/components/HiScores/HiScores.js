import React, { useState, useEffect } from "react";

import "./hiScores.css";
import Axios from "axios";



export default function HiScores() {

    const [hiScores, setHiScores] = useState([])
    const [modalClass, setModalClass] = useState("scoresModalHidden")

    useEffect(() => {
        Axios.get("http://localhost:5000/api/v1/hiscores")
        .then(function (scores) {
            const array = scores.data.hiScores
            const sortedArray = array.slice().sort((a, b) => {
                if (a.score < b.score) {
                    return 1
                } else {
                    return -1
                }
            })
            setHiScores(sortedArray)
        });
    }, [])

    function showScores (){
        setModalClass("scoresModal")
        return;
    }



    return (
        <div>
            <button className="hiScoresBtn" onClick={showScores}>
               Get High Scores
        </button>
            <div id="modal" className={modalClass}>
                <h1>High Scores</h1>
                <div className="scoresMap">
                    {hiScores.map(score => (
                    <p>{score.initials}: {score.score}</p>
                    ))}
                </div>
            </div>
        </div>
    );
}