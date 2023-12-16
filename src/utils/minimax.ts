/**
 * this class will define functions needed for computer minimax ai!
 * this is a port from a java project i made years ago!
 */

// const currentPlayer = "X";
const blankSpace = "";

export function findBestMove(board: string[][]) {
    console.log("board passed in was", JSON.stringify(board));
    let bestVal = -1000;
    const bestMove:{x: number, y: number} = {x: 0, y:0};//new Position(0, 0);

    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {

            if (board[i][j] === blankSpace) {
                board[i][j] = "O";
                let moveVal = minimax(board, 0, false);
                board[i][j] = blankSpace;

                if (moveVal > bestVal) {
                    console.log("Reseting best cal");
                    // bestMove.setPos(i, j);
                    bestMove.x = i;
                    bestMove.y = j;
                    bestVal = moveVal;
                }
            }
        }
    }
    return bestMove;
}

export function findDifficultyRatedMove(board: string[][], difficulty: {level: "easy"|"impossible"}) {
    // console.log("board passed in was", JSON.stringify(board));
    let bestVal = -1000;
    const bestMove:{x: number, y: number} = {x: 0, y:0};//new Position(0, 0);

    if(difficulty.level === "impossible") {
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {

                if (board[i][j] === blankSpace) {
                    board[i][j] = "O";

                    const moveVal = minimax(board, 0, false);
                    board[i][j] = blankSpace;

                    if (moveVal > bestVal) {
                        console.log("Reseting best cal");
                        // bestMove.setPos(i, j);
                        bestMove.x = i;
                        bestMove.y = j;
                        bestVal = moveVal;
                    }
                }
            }
        }
    } else {
        const rand = getRandomOpenPosition(board);
        if(rand !== undefined){
            bestMove.x = rand.x;
            bestMove.y = rand.y;
        }
    }
    return bestMove;
}

function getRandomOpenPosition(board: string[][]){
    const openSpots:{x: number, y: number}[] = [];

    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            const cell = board[i][j];
            if(cell === blankSpace){
                openSpots.push({x: i, y: j});
            }
        }
    }

    const limit = openSpots.length - 1;
    //Math.floor(Math.random() * (max - min + 1) + min)
    const ind = Math.floor(Math.random() * (limit + 1));
    console.log("rand picked was", ind, openSpots[ind]);
    return openSpots[ind];
}

function evaluateScore(board: string[][]){

    //check rows
    for(let row = 0; row < 3; row++){//3 hardcoded because tic-tac-toe board
        if(board[row][0] === board[row][1] && board[row][1] === board[row][2]){
            if(board[row][0] === "O"){
                return 10;
            } else if(board[row][0] === "X"){
                return -10;
            }
        }
    }

    //check columns
    for(let col = 0; col < 3; col++){//3 hardcoded because tic-tac-toe board
        if(board[0][col] === board[1][col] && board[1][col] === board[2][col]){
            if(board[0][col] === "O"){
                return 10;
            } else if(board[0][col] === "X"){
                return -10;
            }
        }
    }

    //check diagonals
    if (board[0][0] === board[1][1] && board[1][1] === board[2][2]) {
        if (board[0][0] === "O") return +10;
        else if (board[0][0] === "X") return -10;
    }

    if (board[0][2] === board[1][1] && board[1][1] === board[2][0]) {
        if (board[0][2] === "O") return +10;
        else if (board[0][2] === "X") return -10;
    }

    return 0;
}

function isMovesLeft(board: string[][]) {
    for (let i = 0; i < 3; i++){
        for (let j = 0; j < 3; j++){
            if (board[i][j] === blankSpace){
                return true;
            }
        }
    }
    return false;
}

function minimax(board: string[][], depth: number, isMax: boolean){//probably need our board passed in too!
    const score = evaluateScore(board);
    // console.log("yes");
    if(score === 10 || score === -10) return score;
    if(!isMovesLeft(board)) return 0;
    // if(score === -10) return score;

    if (isMax) {
        let best = -1000;
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (board[i][j] === blankSpace) {
                    board[i][j] = "O";
                    best = Math.max(best, minimax(board, depth + 1, !isMax));
                    // Random rng = new Random();
                    // best = rng.nextInt(1000) % difficulty == 0 ? best = -1000 : best;
                    board[i][j] = blankSpace;
                }
            }
        }
        return best;
    } else {
        let best = 1000;

        // Traverse all cells
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                // Check if cell is empty
                if (board[i][j] === blankSpace) {
                    // Make the move
                    board[i][j] = "X";

                    // Call minimax recursively and choose
                    // the minimum value
                    best = Math.min(best, minimax(board, depth + 1, !isMax));
                    // Undo the move
                    board[i][j] = blankSpace;
                }
            }
        }
        return best;
    }
}
