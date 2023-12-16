import React, {useContext, useEffect, useState} from "react";
import "./Board.css";
import {StateContext} from "./StateContext";
import Cell from "./Cell";
import {findBestMove, findDifficultyRatedMove} from "./utils/minimax";

interface BoardProps {

}

const Board = (props: BoardProps) => {
    const {
        board,
        isXTurn,
        setIsXTurn,
        setBoard,
        isGameOver,
        setIsGameOver,
        setWinner,
        winner,
        resetGame
    } = useContext(StateContext);
    const [impossible, setImpossible] = useState(false);


    const handleClick = (e: React.MouseEvent<HTMLSpanElement>) => {
        console.log(e.target);
    };

    const refresh = () => {
        window.location.reload();
    };

    const isWinner = (localBoard: string[][]) => {
        const out = {winner: "", isWinner: false};
        if ((localBoard[0][0] === localBoard[1][1] && localBoard[1][1] === localBoard[2][2] && localBoard[0][0] !== "")) {
            out.winner = localBoard[0][0];
            out.isWinner = true;
        } else if ((localBoard[2][0] === localBoard[1][1] && localBoard[1][1] === localBoard[0][2] && localBoard[2][0] !== "")) {
            out.winner = localBoard[2][0];
            out.isWinner = true;
        } else if ((localBoard[0][0] === localBoard[1][0] && localBoard[1][0] === localBoard[2][0] && localBoard[0][0] !== "")) {
            out.winner = localBoard[0][0];
            out.isWinner = true;
        } else if ((localBoard[0][1] === localBoard[1][1] && localBoard[1][1] === localBoard[2][1] && localBoard[0][1] !== "")) {
            out.winner = localBoard[0][1];
            out.isWinner = true;
        } else if ((localBoard[0][2] === localBoard[1][2] && localBoard[1][2] === localBoard[2][2] && localBoard[0][2] !== "")) {
            out.winner = localBoard[0][2];
            out.isWinner = true;
        } else if ((localBoard[0][0] === localBoard[0][1] && localBoard[0][1] === localBoard[0][2] && localBoard[0][0] !== "")) {
            out.winner = localBoard[0][0];
            out.isWinner = true;
        } else if ((localBoard[1][0] === localBoard[1][1] && localBoard[1][1] === localBoard[1][2] && localBoard[1][0] !== "")) {
            out.winner = localBoard[1][0];
            out.isWinner = true;
        } else if ((localBoard[2][0] === localBoard[2][1] && localBoard[2][1] === localBoard[2][2] && localBoard[2][0] !== "")) {
            out.winner = localBoard[2][0];
            out.isWinner = true;
        }

        return out;
    };

    useEffect(() => {
        // console.log("board changed to ", JSON.stringify(board));
        // }, [board]);
        if (!isXTurn && !isWinner(board).winner) {
            console.log("should call minimax now and set is x turn back to true!");
            let x, y;
            if(impossible){
                const bestMove = findBestMove(board);
                x = bestMove.x;
                y = bestMove.y;
            } else{
                const move = findDifficultyRatedMove(board, {level: "easy"});
                x = move.x;
                y = move.y;
            }
            console.log("Best move is", x, y, JSON.stringify(board));
            const localBoard = [...board];
            localBoard[x][y] = "O";
            console.log("new board :", localBoard);
            setBoard([...localBoard]);
            setIsXTurn(true);
            const winnerFound = isWinner(localBoard);
            if (winnerFound.isWinner) {
                console.log("who we found:", winnerFound);
                setIsGameOver(true);
                console.log(`${winnerFound.winner} wins!`);
                setWinner(`${winnerFound.winner} wins!`);
            }
        }
    }, [isXTurn]);


    return (
        <div className="board" onClick={handleClick}>
            <div className="cells">
                {
                    board.map((row, x) => {
                        return row.map((column, y) => {
                            return <Cell key={[x, y].toString()} position={[x, y]}>
                                {column}
                            </Cell>;
                        });
                    })
                }
            </div>
            <div className="controls">
                {isGameOver &&
                    <>
                        <div className="winner">{winner}</div>
                        <button className={"restart"} onClick={resetGame}>restart!</button>
                    </>
                }
                <button onClick={refresh}>Refresh</button>
                <div className="diffContainer">
                    <label htmlFor="difficulty">impossible:</label>
                    <input id={"difficulty"} type="checkbox" checked={impossible} onChange={() => {
                        setImpossible((impossible) => {
                                return !impossible;
                            }
                        );
                    }
                    }/>
                </div>

            </div>
        </div>
    );
};

export default Board;
