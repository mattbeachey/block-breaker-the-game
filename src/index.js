import React from "react";
import ReactDOM from "react-dom";


import App from "./App";
import axios from "axios";

// Health Check 
axios.get("http://localhost:5000/ping").then(() => {
    console.log("should be working")
}).catch(()=> {
    console.log("what happened")
})

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
