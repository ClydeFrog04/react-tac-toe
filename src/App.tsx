import React, {useContext, useEffect} from "react";
import "./App.css";
import Board from "./Board";
import {StateContext} from "./StateContext";

function App() {
    const {resetGame, isGameOver, board, winner} = useContext(StateContext);

    useEffect( () => {
        console.log("re-rendering game with board:", board);
    },[]);

    const refresh =  () => {
        window.location.reload();
    }

    return (
        <div className="App">
            <Board/>
            {isGameOver &&
                <>
                    <div className="winner">{winner}</div>
                    <button className={"restart"} onClick={resetGame}>restart!</button>
                </>
            }
            <button onClick={refresh}>Refresh</button>
        </div>
    );
}

export default App;
