
function gamestart()
{

    

//Lehetseges hibak kezelese
let hiba=[];
if(playername === "")
{
    hiba.push("Nincs megadva jatekosnev!");
} 
if(gamestate === null)
{
    hiba.push("Nincs kivalasztva nehezseg!");
}

if (hiba.length > 0) {
    let s = ""; 

    hiba.forEach(element => {
        console.log(element);
        s += element + "<br>"; 
    });
    document.querySelector('#errors').innerHTML = s;
}
 else
{
    
    changename();

    document.querySelector('#menu').hidden = true;
    document.querySelector('#game').hidden = false;
    startTimer();
    generateBoard();

}
}

function changename()
{
    let ujnev = document.querySelector('#writtenname').value;
    document.querySelector('#jatekosname').textContent = ujnev;
    playername = ujnev;
};




function changegamestate(set)
{
    gamestate = set;
}




function init()
{

document.querySelector("#endgame").hidden = true;
document.querySelector('#Manual').hidden = true;
document.querySelector('#game').hidden = true;

document.querySelector('#writtenname').addEventListener("input", changename, false);
document.querySelector('#start').addEventListener('click',gamestart,false);
document.querySelector('#easy').addEventListener('click', function() { changegamestate(5); }, false);
document.querySelector('#hard').addEventListener('click', function() { changegamestate(7); }, false);
document.querySelector('#manual').addEventListener('click',() => {
    document.querySelector('#menu').hidden = true;
    document.querySelector('#Manual').hidden = false;
},false);
document.querySelector('#backscoreboard').addEventListener('click',() => {
    document.querySelector('#toplista').hidden = true;
    document.querySelector('#menu').hidden = false;
},false);
document.querySelector('#backmanual').addEventListener('click', () => {
    document.querySelector('#Manual').hidden = true;
    document.querySelector('#menu').hidden = false;
}, false);

loadScores();

}




let matrix;
let playername = "";
let gamestate = null;
window.onload = init;

let elapsedTime = 0;
let timerInterval;
let starttime;

function startTimer() {
    starttime = new Date();
    timerInterval = setInterval(() => {
        const elapsedTime = new Date() - starttime; 
        const minutes = Math.floor(elapsedTime / 60000); 
        const seconds = Math.floor((elapsedTime % 60000) / 1000); 

        
        document.querySelector("#time").textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    }, 1000); 
}


function stopTimer() {
    clearInterval(timerInterval);
}


function updateBoard() {
    const boardcontainer = document.querySelector("#gameBoard");
    boardcontainer.innerHTML = ""; 

    matrix.forEach((row, rowindex) => {
        let rowElement = document.createElement("tr"); 

        row.forEach((cell, colindex) => {
            const cellElement = document.createElement("td"); 
            cellElement.style.backgroundImage = `url('images/${cell.imageSrc}')`; 
            cellElement.style.backgroundSize = "cover"; 
            cellElement.setAttribute("data-attribute", cell.attribute); 
            cellElement.classList.add("cell"); 
            
            
            let angle = 0;
            switch (parseInt(cell.attribute)) {
                case 1:
                    angle = 90;
                    break;
                case 2:
                    angle = 180;
                    break;
                case 3:
                    angle = 270;
                    break;
                default:
                    angle = 0;
                    break;
            }
            cellElement.style.transform = `rotate(${angle}deg)`;

            
            cellElement.addEventListener("click", (event) => Clickcell(rowindex, colindex, cell.imageSrc, cell.attribute, event));

            
            cellElement.addEventListener("contextmenu", (event) => {
                event.preventDefault(); 
                Clickcell(rowindex, colindex, cell.imageSrc, cell.attribute, event); 
            });

            rowElement.appendChild(cellElement); 
        });

        boardcontainer.appendChild(rowElement); 
    });
    Wincheck();
}

function Clickcell(row, col, type, attribute,event) {

    if(event.button == 0)
    {

    switch(type) {
        case "empty.png":
            matrix[row][col].imageSrc = "straight_rail.png";
            matrix[row][col].attribute = "0"; 
            
            break;
        case "straight_rail.png":
            matrix[row][col].imageSrc = "curve_rail.png";
            matrix[row][col].attribute = (parseInt(attribute)+1) % 4;
            break;
        case "mountain.png":
            
                matrix[row][col].imageSrc="mountain_rail.png";
                matrix[row][col].attribute = parseInt(attribute) % 4;
            break;
        case "bridge.png":
            matrix[row][col].imageSrc="bridge_rail.png";
            matrix[row][col].attribute = parseInt(attribute) % 2;

        break;
        case "curve_rail.png":

        matrix[row][col].imageSrc = "straight_rail.png";
        matrix[row][col].attribute = (parseInt(attribute)) % 4;

        break;
    }
} else if(event.button == 2)
{
    switch(type)
    {
        case "straight_rail.png":
            matrix[row][col].imageSrc = "empty.png";
            matrix[row][col].attribute = "0";
        break;
        case "curve_rail.png":
            matrix[row][col].imageSrc = "empty.png";
            matrix[row][col].attribute = "0";

        break;
        case "bridge_rail.png":
            matrix[row][col].imageSrc = "bridge.png";
            
        break;
        case "mountain_rail.png":
            matrix[row][col].imageSrc = "mountain.png";
        break;


    }
}
    updateBoard();
    
}



function addscore(playerName, time) {
    const newscore = { name: playerName, time: time };

    if (gamestate === 5) {
        scores.push(newscore);
        
    } else if (gamestate === 7) {
        scores2.push(newscore);
    }

    localStorage.setItem("leaderboard", JSON.stringify(scores));
    localStorage.setItem("leaderboard2", JSON.stringify(scores2));
}



function loadScores() {
    const storedscores = localStorage.getItem("leaderboard");
    const storedscores2 = localStorage.getItem("leaderboard2");
    if (storedscores) {
        scores = JSON.parse(storedscores);
    } else {
        scores = [];
    }

    if (storedscores2) {
        scores2 = JSON.parse(storedscores2);
    } else {
        scores2 = []; 
    }
}





let scores = [];
let scores2 = [];


function scoreboard() {
    const toplistadiv = document.querySelector("#toplista");
    const listadiv = document.querySelector("#lista");
    const listadiv2 = document.querySelector("#listahard");

    toplistadiv.hidden = false;
    document.querySelector("#endgame").hidden = true;

    listadiv.innerHTML = ""; 
    listadiv2.innerHTML = ""; 
    
    


    
    scores.forEach(player => {
        const playerItem = document.createElement("div");
        playerItem.textContent = `${player.name}: ${player.time} idő`;
        listadiv.appendChild(playerItem);
    });
    scores2.forEach(player => {
        const playerItem = document.createElement("div");
        playerItem.textContent = `${player.name}: ${player.time} idő`;
        listadiv2.appendChild(playerItem);
    });
    
}

function gameEnd()
{
    document.querySelector("#game").hidden = true;
    document.querySelector("#endgame").hidden = false;
    const finishedtime = document.querySelector("#time").textContent;
    document.querySelector("#finishedtime").textContent = `Játékot ${finishedtime} idő alatt teljesítetted.`;
    document.querySelector('#toscoreboard').addEventListener('click',scoreboard,false);
    
}

function Wincheck()
{
    let isoccupied = true;


    
    for (let row = 0; row < matrix.length; row++) {
        for (let col = 0; col < matrix[row].length; col++) {
            const cell = matrix[row][col];
            
            
            if(cell.imageSrc != "oasis.png")
            {
            if(ifrail(cell))
            {
                
                isoccupied = false;
                
            }
        }
        }
        
    }
    

    
    if (isoccupied) {
        
        
       
        stopTimer();
        timedone = document.querySelector('#time').textContent
        addscore(playername,timedone);
        console.log(scores);
        gameEnd();

    } 



}


function ifrail(cell)
{
    if(cell.imageSrc != "bridge.png" && cell.imageSrc != "empty.png" && cell.imageSrc != "mountain.png")
    {
        
        return !checkconnections(cell);
    }
    
    return true;
    
}




function checkconnections(cell) {
    let ways = wheretoconnect(cell); 
    
    if(ways.length == 2)
    {
    let way1 = ways[0];
    let way2 = ways[1];




    return isConnectedToAdjacent(cell, way1) && isConnectedToAdjacent(cell, way2);
    }

  

    return true;
}

function wheretoconnect(cell) {
    
    
    switch (cell.imageSrc) {
        case "bridge_rail.png":
            return parseInt(cell.attribute) % 2 === 0 ? ["UP", "DOWN"] : ["LEFT", "RIGHT"];

        case "curve_rail.png":
            switch (parseInt(cell.attribute) % 4) {
                case 0: return ["DOWN", "RIGHT"];
                case 1: return ["LEFT", "DOWN"];
                case 2: return ["LEFT", "UP"];
                case 3: return ["UP", "RIGHT"];
            }
        case "straight_rail.png":
            switch (parseInt(cell.attribute) % 2) {
                case 0: return ["UP", "DOWN"];
                case 1: return ["LEFT", "RIGHT"];
                
            }
        case "mountain_rail.png":
            switch (parseInt(cell.attribute) % 4) {
                case 0: return ["DOWN", "RIGHT"];
                case 1: return ["LEFT", "DOWN"];
                case 2: return ["LEFT", "UP"];
                case 3: return ["UP", "RIGHT"];
            }
        default:
            return [];
    }
}

function isConnectedToAdjacent(cell, direction) {
    let adjacentCell = null;


    switch (direction) {
        case "UP":
            if(cell.row > 0)
            {
            adjacentCell = matrix[cell.row - 1][cell.col];
            }
            break;
        case "DOWN":
            if (cell.row < matrix.length - 1)
            {
            adjacentCell = matrix[cell.row + 1][cell.col];
            }
            break;
        case "LEFT":
            if (cell.col > 0)
            {
            adjacentCell = matrix[cell.row][cell.col - 1];
            }
            break;
        case "RIGHT":
            if(cell.col < matrix[0].length - 1)
            {
            adjacentCell = matrix[cell.row][cell.col + 1];
            }
            break;
    }

    if (adjacentCell) {
        


        return wheretoconnect(adjacentCell).includes(oppositeDirection(direction));
    } else {
        console.log("No adjacent cell!");
        return false; 
    }
}

function oppositeDirection(direction) {
    switch (direction) {
        case "UP": return "DOWN";
        case "DOWN": return "UP";
        case "LEFT": return "RIGHT";
        case "RIGHT": return "LEFT";
    }
}



function generateBoard() {

    let random = Math.floor(Math.random() * 5) + 1;
    let key = gamestate === 5 ? `5x5_${random}` : `7x7_${random}`;
    let selectedmap = maps.table[key];
    const boardContainer = document.querySelector("#gameBoard"); 
    boardContainer.innerHTML = ""; 

    matrix = []; 

    
    selectedmap.forEach((row, rowindex) => {
        let tableRow = []; 

        row.forEach((cell, colindex) => {
            
            const [imageSrc, attribute] = cell.split(",");
            tableRow.push({ imageSrc, attribute,row:rowindex,col:colindex }); 
        });

        matrix.push(tableRow); 

        

    });

    
    console.log(matrix);
    updateBoard();
}
















//Kulonbozo palyak:
const maps = {
    "table": {
        "5x5_1": [
            ["empty.png,0", "mountain.png,1", "empty.png,0", "empty.png,0", "oasis.png,0"],
            ["empty.png,0", "empty.png,0", "empty.png,0", "bridge.png,0", "oasis.png,0"],
            ["bridge.png,0", "empty.png,0", "mountain.png,2", "empty.png,0", "empty.png,0"],
            ["empty.png,0", "empty.png,0", "empty.png,0", "oasis.png,0", "empty.png,0"],
            ["empty.png,0", "empty.png,0", "mountain.png,3", "empty.png,0", "empty.png,0"]
        ],
        "5x5_2": [
            ["oasis.png,0", "empty.png,0", "bridge.png,1", "empty.png,0", "empty.png,0"],
            ["empty.png,0", "mountain.png,2", "empty.png,0", "empty.png,0", "mountain.png,2"],
            ["bridge.png,0", "oasis.png,0", "mountain.png,3", "empty.png,0", "empty.png,0"],
            ["empty.png,0", "empty.png,0", "empty.png,0", "oasis.png,0", "empty.png,0"],
            ["empty.png,0", "empty.png,0", "empty.png,0", "empty.png,0", "empty.png,0"]
        ],
        "5x5_3": [
            ["empty.png,0", "empty.png,0", "bridge.png,1", "empty.png,0", "empty.png,0"],
            ["empty.png,0", "empty.png,0", "empty.png,0", "empty.png,0", "bridge.png,0"],
            ["empty.png,0", "mountain.png,2", "bridge.png,0", "empty.png,0", "empty.png,0"],
            ["empty.png,0", "oasis.png,0", "empty.png,0", "empty.png,0", "empty.png,0"],
            ["empty.png,0", "bridge.png,1", "empty.png,0", "empty.png,0", "mountain.png,2"]
        ],
        "5x5_4": [
            ["empty.png,0", "empty.png,0", "empty.png,0", "bridge.png,1", "empty.png,0"],
            ["empty.png,0", "empty.png,0", "empty.png,0", "empty.png,0", "empty.png,0"],
            ["bridge.png,0", "empty.png,0", "mountain.png,1", "empty.png,0", "mountain.png,1"],
            ["empty.png,0", "empty.png,0", "empty.png,0", "empty.png,0", "empty.png,0"],
            ["empty.png,0", "empty.png,0", "oasis.png,0", "mountain.png,3", "empty.png,0"]
        ],
        "5x5_5": [
            ["empty.png,0", "empty.png,0", "bridge.png,1", "empty.png,0", "empty.png,0"],
            ["empty.png,0", "mountain.png,0", "empty.png,0", "empty.png,0", "empty.png,0"],
            ["bridge.png,0", "empty.png,0", "empty.png,0", "mountain.png,3", "empty.png,0"],
            ["empty.png,0", "empty.png,0", "bridge.png,0", "oasis.png,0", "empty.png,0"],
            ["empty.png,0", "mountain.png,2", "empty.png,0", "empty.png,0", "empty.png,0"]
        ],
        "7x7_1": [
            ["empty.png,0", "mountain.png,1", "oasis.png,0", "oasis.png,0", "empty.png,0", "bridge.png,1", "empty.png,0"],
            ["bridge.png,0", "empty.png,0", "empty.png,0", "empty.png,0", "empty.png,0", "empty.png,0", "empty.png,0"],
            ["empty.png,0", "empty.png,0", "bridge.png,0", "empty.png,0", "empty.png,0", "empty.png,0", "empty.png,0"],
            ["empty.png,0", "empty.png,0", "empty.png,0", "mountain.png,3", "empty.png,0", "empty.png,0", "empty.png,0"],
            ["mountain.png,3", "empty.png,0", "mountain.png,1", "empty.png,0", "bridge.png,1", "empty.png,0", "oasis.png,0"],
            ["empty.png,0", "empty.png,0", "empty.png,0", "empty.png,0", "empty.png,0", "empty.png,0", "empty.png,0"],
            ["empty.png,0", "empty.png,0", "empty.png,0", "bridge.png,1", "empty.png,0", "empty.png,0", "empty.png,0"]
        ],
        "7x7_2": [
            ["empty.png,0", "empty.png,0", "oasis.png,0", "empty.png,0", "empty.png,0", "empty.png,0", "empty.png,0"],
            ["bridge.png,0", "empty.png,0", "bridge.png,1", "empty.png,0", "empty.png,0", "mountain.png,2", "empty.png,0"],
            ["empty.png,0", "empty.png,0", "bridge.png,1", "empty.png,0", "empty.png,0", "empty.png,0", "bridge.png,0"],
            ["mountain.png,0", "empty.png,0", "empty.png,0", "empty.png,0", "empty.png,0", "empty.png,0", "empty.png,0"],
            ["empty.png,0", "oasis.png,0", "empty.png,0", "mountain.png,1", "empty.png,0", "empty.png,0", "empty.png,0"],
            ["empty.png,0", "mountain.png,0", "empty.png,0", "empty.png,0", "empty.png,0", "empty.png,0", "empty.png,0"],
            ["empty.png,0", "empty.png,0", "oasis.png,0", "empty.png,0", "empty.png,0", "empty.png,0", "empty.png,0"]
        ],
        "7x7_3": [
            ["empty.png,0", "empty.png,0", "bridge.png,1", "empty.png,0", "empty.png,0", "empty.png,0", "empty.png,0"],
            ["empty.png,0", "empty.png,0", "empty.png,0", "empty.png,0", "empty.png,0", "empty.png,0", "bridge.png,0"],
            ["oasis.png,0", "empty.png,0", "mountain.png,3", "empty.png,0", "empty.png,0", "empty.png,0", "empty.png,0"],
            ["empty.png,0", "empty.png,0", "empty.png,0", "empty.png,0", "empty.png,0", "empty.png,0", "empty.png,0"],
            ["empty.png,0", "oasis.png,0", "mountain.png,3", "empty.png,0", "bridge.png,1", "empty.png,0", "empty.png,0"],
            ["bridge.png,0", "empty.png,0", "empty.png,0", "empty.png,0", "empty.png,0", "mountain.png,1", "empty.png,0"],
            ["empty.png,0", "empty.png,0", "oasis.png,0", "mountain.png,3", "empty.png,0", "empty.png,0", "empty.png,0"]
        ],
        "7x7_4": [
            ["empty.png,0", "empty.png,0", "empty.png,0", "empty.png,0", "empty.png,0", "empty.png,0", "empty.png,0"],
            ["empty.png,0", "empty.png,0", "empty.png,0", "bridge.png,0", "empty.png,0", "mountain.png,2", "empty.png,0"],
            ["empty.png,0", "empty.png,0", "mountain.png,3", "empty.png,0", "empty.png,0", "empty.png,0", "empty.png,0"],
            ["empty.png,0", "bridge.png,1", "empty.png,0", "oasis.png,0", "empty.png,0", "bridge.png,1", "empty.png,0"],
            ["empty.png,0", "empty.png,0", "mountain.png,2", "empty.png,0", "mountain.png,1", "empty.png,0", "empty.png,0"],
            ["bridge.png,0", "empty.png,0", "empty.png,0", "empty.png,0", "empty.png,0", "mountain.png,3", "empty.png,0"],
            ["empty.png,0", "empty.png,0", "empty.png,0", "empty.png,0", "empty.png,0", "empty.png,0", "empty.png,0"]
        ],
        "7x7_5": [
            ["empty.png,0", "empty.png,0", "empty.png,0", "empty.png,0", "empty.png,0", "empty.png,0", "empty.png,0"],
            ["empty.png,0", "empty.png,0", "empty.png,0", "empty.png,0", "empty.png,0", "mountain.png,0", "empty.png,0"],
            ["empty.png,0", "bridge.png,1", "bridge.png,1", "empty.png,0", "mountain.png,1", "empty.png,0", "empty.png,0"],
            ["empty.png,0", "empty.png,0", "empty.png,0", "empty.png,0", "empty.png,0", "empty.png,0", "empty.png,0"],
            ["empty.png,0", "empty.png,0", "mountain.png,0", "empty.png,0", "oasis.png,0", "empty.png,0", "empty.png,0"],
            ["empty.png,0", "mountain.png,2", "empty.png,0", "bridge.png,0", "empty.png,0", "empty.png,0", "empty.png,0"],
            ["empty.png,0", "empty.png,0", "empty.png,0", "empty.png,0", "empty.png,0", "empty.png,0", "empty.png,0"]
        ]
    }
};