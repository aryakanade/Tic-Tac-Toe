const boxes = document.querySelectorAll(".box");
const gameInfo = document.querySelector(".game-info");
const newGameBtn = document.querySelector(".btn");

let currentPlayer;
let gameGrid;

const winningPositions = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

//lets create the function that initialises the game
function initGame() {
    currentPlayer = "X";
    gameGrid = ["","","","","","","","",""];
    // UI pr bhi empty karna padega
    boxes.forEach((box,index) => {
        box.innerText = "";
        boxes[index].style.pointerEvents = "all";
        //initialise box with default css properties again
        box.classList = `box box${index+1}`;
    });
    newGameBtn.classList.remove("active");
    gameInfo.innerText = `Current Player - ${currentPlayer}`;
}

initGame();

function swapTurn(){
    if(currentPlayer === 'X'){
        currentPlayer = 'O';
    }
    else{
        currentPlayer = 'X'
    }
    // update in UI
    gameInfo.innerText = `Current Player = ${currentPlayer}`;
}

function checkGameOver()
{
    let answer = "";
    winningPositions.forEach((position) => {
        // all three boxes should be non-empty and same in value
        if((gameGrid[position[0]] !== "" || gameGrid[position[1]] !== "" || gameGrid[position[2]] !== "")
           && (gameGrid[position[0]] === gameGrid[position[1]]) && (gameGrid[position[1]] === gameGrid[position[2]]))
        {
            //check if winner is X
            if(gameGrid[position[0]] === 'X')
            {
                answer = "X";
            }
            else{
                answer = "O";
            
            }
            //disable pointer events
            boxes.forEach((box) => {
                box.style.pointerEvents = "none";
            })

            //now we know winner is X/O
            boxes[position[0]].classList.add("win");
            boxes[position[1]].classList.add("win");
            boxes[position[2]].classList.add("win");
        }
    });

    //it means we have a winner
    if(answer !== "")
    {
        gameInfo.innerText = `Winner Player - ${answer}`;
        newGameBtn.classList.add("active");
        return;
    }

    //lets check if there is a tie
    let fillCount = 0;
    gameGrid.forEach((box) => {
        if(box !== "")
        {
            fillCount++;
        }
    });

    //if board is filled then game is tie
    
    if(fillCount === 9)
    {
        gameInfo.innerText = "Game Tied!";
        newGameBtn.classList.add("active");
    }
    

}

function handleClick(index){
    if(gameGrid[index] === "")
    {
        boxes[index].innerText = currentPlayer; //changes in UI
        gameGrid[index] = currentPlayer;  //changes in Javascipt code
        boxes[index].style.pointerEvents = 'none';
        // swap karo current player ki turn ko
        swapTurn();
        // check koi jeet to nahi gaya
        checkGameOver();
    }
}


boxes.forEach((box,index) => {
    box.addEventListener("click",() => {
        handleClick(index);
    })
});

newGameBtn.addEventListener("click",initGame);

