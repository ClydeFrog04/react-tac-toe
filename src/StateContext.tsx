import React, {createContext, Dispatch, SetStateAction, useEffect, useState} from "react";

interface stateProps {
    children?: React.ReactNode;
}

//define our default state
const defaultState = {
    name: "",
    setName: () => {
    },
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

    }

};

//interface is used so the provider knows what to expect. This allows type safety later one when consuming our context
interface IStateContext {
    name: string;
    setName: Dispatch<SetStateAction<string>>;
    board: string[][];
    setBoard: Dispatch<SetStateAction<string[][]>>;
    isXTurn: boolean;
    setIsXTurn: Dispatch<SetStateAction<boolean>>;
    isGameOver: boolean;
    setIsGameOver: Dispatch<SetStateAction<boolean>>;
}

//the actual context object
export const StateContext = createContext<IStateContext>(defaultState);

//and finally the provider for the context
export const StateContextProvider: React.FC = (props: stateProps) => {
    const [name, setName] = useState(defaultState.name);
    const [board, setBoard] = useState(defaultState.board);
    const [isXTurn, setIsXTurn] = useState(defaultState.isXTurn);
    const [isGameOver, setIsGameOver] = useState(defaultState.isGameOver);



    useEffect(() => {
    }, []);


    return (
        <StateContext.Provider
            value={{
                name,
                setName,
                board,
                setBoard,
                isXTurn,
                setIsXTurn,
                isGameOver,
                setIsGameOver
            }}>
            {props.children}
        </StateContext.Provider>
    );
};
