const gameInfo = document.querySelector(".game-info");
const boxes = document.querySelectorAll(".box");
const newGamebtn = document.querySelector(".btn");

let CurrentPlayer;
let gameGrid; // this stores all the data of the game
const winningPositions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]

//lets initialise the game
initialiseGame();

function initialiseGame() {
    CurrentPlayer = "X";
    gameGrid = ["", "", "", "", "", "", "", "", ""]; // yeh game ke logic me empty kar dia 
    gameInfo.innerText = `Current-Player-${CurrentPlayer}`;
    // ab UI par saare boxes ko empty karna hai
    boxes.forEach((box, index) => {
        box.innerText = ""; // yeh Ui me empty kar dia 
        // ab cursor ko display karaana hia waapis
        boxes[index].style.pointerEvents = "all";
        // ab agar koi pehle jeet gaya tha to waapis se default css properties set karni hai
        boxes.forEach((box,index)=>{
            box.classList=`box box${index+1}`;

        })
    })

    newGamebtn.classList.remove("active");

}

// ab saare boxes par event listener lagaana padega

boxes.forEach((box, index) => {
    box.addEventListener("click", () => {
        handleClick(index);
    });
})

function handleClick(index) {
    if (gameGrid[index] === "") {
        boxes[index].innerText = CurrentPlayer;
        boxes[index].style.pointerEvents = "none";
        gameGrid[index] = CurrentPlayer;
        swapTurn();
        // ab check karna hai ki koi jeeta to nahi
        checkGameOver();

    }

}

function checkGameOver() {
    let winner = "";
    winningPositions.forEach((position) => {

        if( (gameGrid[position[0]] !== "" || gameGrid[position[1]] !== "" || gameGrid[position[2]] !== "") 
        && (gameGrid[position[0]] === gameGrid[position[1]] ) && (gameGrid[position[1]] === gameGrid[position[2]])) {
            // ab iske andar aane ka matlab winner mil gaya hai
            if (gameGrid[position[0]] === "X") {
                winner = "X";

            }
            else {

                winner = "0";
            }

   
            // Ab winner milne ke baad hame koi bhi box ko clickable nahi banaana hai 
            //disable pointer events
            boxes.forEach((box) => {
                box.style.pointerEvents = "none";
            })
            // now green color diplay karaana hai 
            boxes[position[0]].classList.add("win");
            boxes[position[1]].classList.add("win");
            boxes[position[2]].classList.add("win");

        }

    });
    if(winner !== "")
    {
        gameInfo.innerText = `Winner-${winner}`;
        console.log("AB NEW BTN SHOULD BE PRINTED");
        newGamebtn.classList.add("active");
        return;

    }
      let cnt=0;
    // ab we know ki no winnner has been found till now,now we need to check if tie hua to nahi
    boxes.forEach((box)=>{
        if(box.innerText!=="")
        {
            cnt++;
        }
    })

    if(cnt===9)
    {
        gameInfo.innerText = `Game Tied`;
        newGamebtn.classList.add("active");

    }


}


function swapTurn() {
    if (CurrentPlayer === "X") {
        CurrentPlayer = "0";
        console.log("now game info must be updated");
        gameInfo.innerText = `Current-Player-${CurrentPlayer}`;
    }
    else {

        CurrentPlayer = "X";
        gameInfo.innerText = `Current-Player-${CurrentPlayer}`;
        

    }
}

newGamebtn.classList.add("active");
newGamebtn.addEventListener("click", initialiseGame);



