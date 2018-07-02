var currentPlayer = "X";
var nextPlayer = "O";
var playerXSelections = new Array();
var playerOSelections = new Array();
const turn = document.getElementById('turn');
var score = {X:0,O:0,Tie:0};
winText();

const winningCombinations = [
    [1,2,3],
    [4,5,6],
    [7,8,9],
    [1,4,7],
    [2,5,8],
    [3,6,9],
    [1,5,9],
    [3,5,7]
]

handleClick = function(event) {
    var cell = event.target;
    var pXhas=playerXSelections.includes(parseInt(cell.id));
    var pOhas=playerOSelections.includes(parseInt(cell.id));
    if(!(pXhas||pOhas)){
        cell.innerHTML = currentPlayer;
        if(currentPlayer === "X" ) {
            playerSelections = playerXSelections;
            nextPlayer = "O";
            turn.textContent=nextPlayer;
        }else{
            playerSelections = playerOSelections;
            nextPlayer = "X";
            turn.textContent=nextPlayer;
        }
        playerSelections.push(parseInt(cell.id));
        if(checkWinner(playerSelections)) {
            alert("Player " + currentPlayer + " wins!")
            score[currentPlayer]++;
            resetGame();
        }
        if(checkDraw()) {
            alert("Draw!");
            score['Tie']++;
            resetGame();
        }
        currentPlayer = nextPlayer;
    }
}

var cells = document.querySelectorAll("td");
for(var i = 0; i < cells.length; i++) {
  cells[i].addEventListener('click', handleClick)
}

function checkWinner(){
    for(var i=0;i<winningCombinations.length;i++){
        matches=0;
        for(var j=0;j<winningCombinations[i].length;j++){
            if(playerSelections.includes(winningCombinations[i][j]))
                matches++;
            else break;

            if(matches===winningCombinations[0].length)
                return true;
            
        }
    }
    return false;
}

function checkDraw() {
    return playerOSelections.length + playerXSelections.length >= cells.length
}

function resetGame() {
    playerXSelections = new Array();
    playerOSelections = new Array();
    for(var i = 0; i < cells.length; i++) {
        cells[i].innerHTML = ""
    }
    winText();
}
function winText(){
    const scoreElement=document.getElementById('score');
    var text='<strong>Score</strong><br>';
    for(value in score){
        text+=value+': '+score[value]+'<br>';
    }
    scoreElement.innerHTML=text;
}

function rgb(r,g,b) {return 'rgb(' + [r,g,b].join(',') + ')';}

/*
var temp;

gradient('1');

function gradient(id){
    var ele=document.getElementById(id);
    temp=ele.backgroundColor;
    var r=ele.style.r;
    var g=ele.style.g;
    var b=ele.style.b;

    r+=30;
    g+=5;
    b+=17;

    if(r>255)r-=255;
    if(g>255)g-=255;
    if(b>255)b-=255;
    ele.style.backgroundColor=rgb(r,g,b);
}*/