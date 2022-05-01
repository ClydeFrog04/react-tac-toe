import React, {useContext} from "react";
import "./Board.css";
import {StateContext} from "./StateContext";
import Cell from "./Cell";

interface BoardProps {

}

const Board = (props: BoardProps) => {
    const {board} = useContext(StateContext);


    return (
        <div className="board">
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
