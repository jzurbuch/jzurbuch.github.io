
import Game from "./game.js";

const loadPage = function(){
    $root[0].appendChild(renderHead());
    $root[0].appendChild(startButton());
    $root[0].appendChild(renderBoard());

    //listeners for movement 
    $(document).on("keydown", (event) => handleKeyPress(event));
    $root.on("click", ".reset", (event) => handelResetButton(event));
    $root.on("click", ".joke", (event) => handleJokeButton(event));
    $root.on("click", ".dogbutton", (event) => handleDogButton(event));
    $root.on("click", ".catbutton", (event) => handleCatButton(event));
    $root.on("click", ".start", (event) => handleStartButton(event));

}

const renderHead = function(){
    let header = document.createElement('div');
    header.className = 'header';
   
    let menu = document.createElement('div');
    menu.className = 'menu';
    menu.innerHTML = `
    <a href="./money.html">Crypto Check</a>
    <a href="./howto.html">How To Play</a>
    <a class="active" href="./index.html" id='mplay'>Play</a>
    `
    header.append(menu);
    let title = document.createElement('div');
    title.className = 'title';
    title.innerHTML = `<h1>Survival of the Slickest</h1>`;
    header.append(title);
    return header;
    
}

const renderBoard = function(){
    let g = document.createElement('div');
    g.className = 'g';
    let board = document.createElement('table');
    board.className = 'board';
    board.innerHTML = ``;
    let tbody = document.createElement('tbody');
    tbody.className = 'tbody';
    board.appendChild(tbody);
    const vals = [];
    for(let i = 0; i < 150; i++){
        vals[i] = agame.getGameState().board[i];
    }
    for (let y = 0; y < 10; y++) { 
        let row = [];
        for(let j = 0; j < 15; j++){
            row[j] = vals.shift();
        }
        const tr = document.createElement('tr');
        tbody.appendChild(tr);
        for (let x = 0; x < 15; x++) {
          const cell = row[x];
          const td = document.createElement('td');
          switch(cell){
                case 0:
                    td.className = 'cell';
                    break
                case 1:
                    td.className = 'badcell';
                    break
                case 2:
                    td.className = 'player';
                    break
          }
          td.innerHTML = ``;
          tr.appendChild(td);
        }
      }
      g.appendChild(board)
      let score = document.createElement('div');
      score.className = 'score'
      score.innerHTML = `
      <h3>Score = ${agame.getGameState().score}</h3>
      `
      g.appendChild(score);
      
    return g; 
}

const startButton = function(){
    let button = document.createElement('div')
    button.className = 'startdiv';
    button.innerHTML = `<button class= "start" type="button">Start the Survival</button>`
    return button;

}

const startFall = function() {
    timer = setInterval(function() { 
        agame.updateBlocks();
    
        $('.start').empty()
        if(agame.getGameState().over === true){
            loser();
            clearInterval(timer) 
        }else{
            $(".g").replaceWith(renderBoard()) 
        }
        
    }, 1000);

}

//Lose function 
const loser = async function(){
    clearInterval(timer);
    let lose = document.createElement('div');
    lose.className = 'lose';
    lose.style.textAlign = 'center';
    lose.innerHTML = `
        <h1 class = 'lmessage' >Not that Slick. You have lost!</h1>
        <h2 class = 'fscore'>Final Score: ${agame.getGameState().score}</h2>
        <button class= "reset" type="button">Play Again</button><br>
        <button class= "joke" type="button">A joke to make you feel better?</button><br>
        <button class= "dogbutton" type="button">A Dog Picture to ease the pain?</button><br>
        <button class= "catbutton" type="button">A Cat Picture if you are into that</button>
    `
    $(".g").replaceWith(lose);
    
}

const handelResetButton = function(e){
    e.preventDefault();
    agame = new Game();
    $root.find(".startdiv").replaceWith(startButton())
    $root.find(".lose").replaceWith(renderBoard());
}
const handleJokeButton = async function(e){
    e.preventDefault();
    let j = await getJoke();
    let thejoke = document.createElement('div');
    thejoke.className = 'thejoke';
    thejoke.innerHTML = `
    <p>${j.setup}</p>
    <p>${j.punchline}</p>
    `;
    
    $root.find(".joke").replaceWith(thejoke);
}

const handleDogButton = async function(e){
    e.preventDefault();
    let pic = await getDogPic();
    let dog = document.createElement('div');
    dog.className = 'dogpic';
    dog.innerHTML = `
    <img class= 'pic' src= ${pic} alt = 'dog pic'>
    `;
    
    $root.find(".dogbutton").replaceWith(dog);
}

const handleCatButton = async function(e){
    e.preventDefault();
    let pic = await getCatPic();
    let cat = document.createElement('div');
    cat.className = 'catpic';
    cat.innerHTML = `
    <img src= ${pic} alt = 'cat pic'>
    `;
    
    $root.find(".catbutton").replaceWith(cat);
}

//handlers
const handleKeyPress = function(e){
    e.preventDefault(); 
        if (e.keyCode == '38') {
            agame.move('up'); 
        }
        else if (e.keyCode == '40') {
            agame.move('down');
        }
        else if (e.keyCode == '37') {
           agame.move('left');
        }
        else if (e.keyCode == '39') {
           agame.move('right');
        }

        $(".g").replaceWith(renderBoard(agame));
        
        if(agame.getGameState().over === true){
            loser();
            clearInterval(timer) 
        }
    }


const handleStartButton = function(e){
    e.preventDefault();
    startFall();
    
    $root.find(".start").remove();
}
    
async function getJoke(){
    const joke = await axios({
        method: 'get',
        url: 'https://official-joke-api.appspot.com/random_joke',
      });
    return joke.data
}

async function getDogPic(){
    const dog = await axios({
        method: 'get',
        url: 'https://dog.ceo/api/breeds/image/random',
      });
    
    return dog.data.message
}

async function getCatPic(){
    const cat = await axios({
        method: 'get',
        url: 'https://thatcopy.pw/catapi/rest/',
      });

    return cat.data.webpurl
}

let agame = new Game();
let $root = $('#root');
let timer; 

$(function() {
    loadPage();
});