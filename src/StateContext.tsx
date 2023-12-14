import React, {createContext, Dispatch, SetStateAction, useEffect, useState} from "react";

interface stateProps {
    children?: React.ReactNode;
}

//define our default state
const defaultState = {
    board: [
        ["", "", ""],
        ["", "", ""],
        ["", "", ""],
    ],
    setBoard: () => {
    },
    isXTurn: true,
    setIsXTurn: () => {
    },
    isGameOver: false,
    setIsGameOver: () => {

    },
    resetGame: () => {
    },
    winner: "",
    setWinner: () =>{}
};

//interface is used so the provider knows what to expect. This allows type safety later one when consuming our context
interface IStateContext {
    board: string[][];
    setBoard: Dispatch<SetStateAction<string[][]>>;
    isXTurn: boolean;
    setIsXTurn: Dispatch<SetStateAction<boolean>>;
    isGameOver: boolean;
    setIsGameOver: Dispatch<SetStateAction<boolean>>;
    resetGame: () => void;
    winner: string;
    setWinner: Dispatch<SetStateAction<string>>;
}

//the actual context object
export const StateContext = createContext<IStateContext>(defaultState as IStateContext);

//and finally the provider for the context
export const StateContextProvider: React.FC = (props: stateProps) => {
    const [board, setBoard] = useState(defaultState.board);
    const [isXTurn, setIsXTurn] = useState(defaultState.isXTurn);
    const [isGameOver, setIsGameOver] = useState(defaultState.isGameOver);
    const [winner, setWinner] = useState("");



    const resetGame = () => {
        setBoard([
            ["", "", ""],
            ["", "", ""],
            ["", "", ""],
        ]);//not using the default state since it's memory location value has been modified.
        setIsXTurn(defaultState.isXTurn);
        setIsGameOver(defaultState.isGameOver);
        setWinner("");
        console.log("Resetting things", defaultState.isXTurn, defaultState.isGameOver);
    };


    useEffect(() => {
    }, []);


    return (
        <StateContext.Provider
            value={{
                board,
                setBoard,
                isXTurn,
                setIsXTurn,
                isGameOver,
                setIsGameOver,
                resetGame,
                winner,
                setWinner
            }}>
            {props.children}
        </StateContext.Provider>
    );
};
