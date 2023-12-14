import React, {useContext} from "react";
import "./Cell.css";
import {StateContext} from "./StateContext";

interface CellProps {
    children?: React.ReactNode;
    position: number[];//x,y coords of this cell on the board
}

const Cell = (props: CellProps) => {
    const {board, setBoard, isXTurn, setIsXTurn, isGameOver, setIsGameOver, setWinner} = useContext(StateContext);
    const localBoard = [...board];
    const x = props.position[0];
    const y = props.position[1];

    const checkValidPlacement = () => {
        if (isGameOver) return false;
        if (localBoard[x][y] !== "") {
            return false;
        }
        return true;
    };
    // const isWinner = () => {
    //     if (localBoard[0][0] === localBoard[1][1] && localBoard[1][1] === localBoard[2][2] && localBoard[0][0] !== "")
    //         return true;
    //     else if (localBoard[2][0] === localBoard[1][1] && localBoard[1][1] === localBoard[0][2] && localBoard[2][0] !== "")
    //         return true;
    //     else if (localBoard[0][0] === localBoard[1][0] && localBoard[1][0] === localBoard[2][0] && localBoard[0][0] !== "")
    //         return true;
    //     else if (localBoard[0][1] === localBoard[1][1] && localBoard[1][1] === localBoard[2][1] && localBoard[0][1] !== "")
    //         return true;
    //     else if (localBoard[0][2] === localBoard[1][2] && localBoard[1][2] === localBoard[2][2] && localBoard[0][2] !== "")
    //         return true;
    //     else if (localBoard[0][0] === localBoard[0][1] && localBoard[0][1] === localBoard[0][2] && localBoard[0][0] !== "")
    //         return true;
    //     else if (localBoard[1][0] === localBoard[1][1] && localBoard[1][1] === localBoard[1][2] && localBoard[1][0] !== "")
    //         return true;
    //     else return localBoard[2][0] === localBoard[2][1] && localBoard[2][1] === localBoard[2][2] && localBoard[2][0] !== "";
    // };
    const isWinner = () => {
        return(
            (localBoard[0][0] === localBoard[1][1] && localBoard[1][1] === localBoard[2][2] && localBoard[0][0] !== "") ||
            (localBoard[2][0] === localBoard[1][1] && localBoard[1][1] === localBoard[0][2] && localBoard[2][0] !== "") ||
            (localBoard[0][0] === localBoard[1][0] && localBoard[1][0] === localBoard[2][0] && localBoard[0][0] !== "") ||
            (localBoard[0][1] === localBoard[1][1] && localBoard[1][1] === localBoard[2][1] && localBoard[0][1] !== "") ||
            (localBoard[0][2] === localBoard[1][2] && localBoard[1][2] === localBoard[2][2] && localBoard[0][2] !== "") ||
            (localBoard[0][0] === localBoard[0][1] && localBoard[0][1] === localBoard[0][2] && localBoard[0][0] !== "") ||
            (localBoard[1][0] === localBoard[1][1] && localBoard[1][1] === localBoard[1][2] && localBoard[1][0] !== "") ||
            (localBoard[2][0] === localBoard[2][1] && localBoard[2][1] === localBoard[2][2] && localBoard[2][0] !== ""));
    };

    const isBoardFull =  () => {
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                const cellVal = board[i][j];
                if(cellVal === ""){
                    return false;
                }
            }
        }
        return true;
    }


    const handleClick = (e: React.MouseEvent<HTMLSpanElement>) => {
        if(isGameOver) return;
        if (checkValidPlacement()) {
            const player = isXTurn ? "X" : "O";
            console.log("setting move");
            localBoard[x][y] = player;
            setBoard([...localBoard]);
            if (isWinner()) {
                setIsGameOver(true);
                console.log(`${player} wins!`);
                setWinner(`${player} wins!`);
            }else if (isBoardFull()){
                console.log("Game ends in a tie!");
                setWinner("Game ends in a tie!");
                setIsGameOver(true);
            }
            setIsXTurn(!isXTurn);
        }
    };

    return (
        <span className="cell" onClick={handleClick}>
            {props.children}

        </span>
    );
};

export default Cell;
