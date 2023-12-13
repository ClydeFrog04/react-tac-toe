import React, {useContext, useEffect} from "react";
import "./Board.css";
import {StateContext} from "./StateContext";
import Cell from "./Cell";

interface BoardProps {

}

const Board = (props: BoardProps) => {
    const {board,} = useContext(StateContext);

    const handleClick = (e: React.MouseEvent<HTMLSpanElement>) => {
        console.log(e.target);
    };




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
