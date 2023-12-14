import React, {useContext, useEffect} from "react";
import "./App.css";
import Board from "./Board";
import {StateContext} from "./StateContext";

function App() {
    const {resetGame, isGameOver, board, winner} = useContext(StateContext);

    useEffect( () => {
        console.log("re-rendering game with board:", board);
    },[]);



    return (
        <div className="App">
            <Board/>
        </div>
    );
}

export default App;
