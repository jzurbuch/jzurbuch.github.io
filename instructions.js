const loadPage = function(){
    $root[0].appendChild(renderHead());
    $root[0].appendChild(renderInst());

    //listeners for movement 
    
}

const renderHead = function(){
    //renders the head and menu 
    //need to spruce up title 
    let header = document.createElement('div');
    header.className = 'header';
    let menu = document.createElement('div');
    menu.className = 'menu';
    menu.innerHTML = `<a href="./money.html">Crypto Check</a>
    <a href="./howto.html">How To Play</a>
    <a class="active" href="./index.html" id='mplay'>Play</a>`
    header.append(menu);
    let title = document.createElement('div');
    title.className = 'title';
    title.innerHTML = `<h1>Survival of the Slickest</h1>`;
    header.append(title);

    return header;
}
const renderInst = function(){
    let inst = document.createElement('div');
    inst.className = 'inst';
    inst.innerHTML = `
    <h2 class= 'ititle'>How to play Surival of the Slickest</h2>
    <p>Use the arrow keys to navigate the black block around the board.</p>
    <p>When you are ready to start the game, click the Start the Survival button to release the enemy blocks.</p>
    <p>Move around to avoid the falling red blocks. (Hint: The edges wrap around) </p>
    <p>If you run into a red block, the game is over. </p>
    <p>Your score will increase for every line of enemy blocks that leaves the board.</p>
    <p>Click the PLAY button in the menu to start your survival challenge.</p>
    <p>Also check out the Crypto menu option for your crypto price updates.</p>
    `
    return inst;

}


let $root = $('#root');
$(function() {
    loadPage();
});