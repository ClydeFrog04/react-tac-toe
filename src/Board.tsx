import React, {useContext, useEffect} from "react";
import "./Board.css";
import {StateContext} from "./StateContext";
import Cell from "./Cell";
import {findBestMove} from "./utils/minimax";

interface BoardProps {

}

const Board = (props: BoardProps) => {
    const {board, isXTurn, setIsXTurn, setBoard, isGameOver, setIsGameOver, setWinner} = useContext(StateContext);

    const handleClick = (e: React.MouseEvent<HTMLSpanElement>) => {
        console.log(e.target);
    };

    const isWinner = (localBoard: string[][]) => {
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

    useEffect(() => {
        // console.log("board changed to ", JSON.stringify(board));
    // }, [board]);
        if(!isXTurn){
            console.log("should call minimax now and set is x turn back to true!");
            const {x, y} = findBestMove(board);
            console.log("Best move is", x, y, JSON.stringify(board));
            const localBoard = [...board];
            localBoard[x][y] = "O";
            console.log("new board :", localBoard);
            setBoard([...localBoard]);
            setIsXTurn(true);
            if(isWinner(localBoard)){
                setIsGameOver(true);
                console.log("O wins!");
                setWinner("O wins!");
            }
        }
    }, [isXTurn]);


    return (
        <div className="board" onClick={handleClick}>
            {
                board.map( (row, x) => {
                    return row.map( (column, y) => {
                        return <Cell key={[x,y].toString()} position={[x,y]}>
                            {column}
                        </Cell>
                    })
                })
            }
        </div>
    );
};

export default Board;
