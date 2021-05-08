const loadPage =  async function(){
    $root[0].appendChild(renderHead());
    $root[0].appendChild(renderText());
    $root[0].appendChild(await renderMoney());
    //runner();

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
const renderText = function(){
    //change calssanem and css 
    let minfo = document.createElement('div');
    minfo.className = 'minfo';
    minfo.innerHTML = `
    <h2 class= 'ititle'>Make that Money<h2>
    <p>We at Survival of the Slickest know that money > everything. We wanted to support our crypto gamers by providing real time access to crypto prices so
     while you game you can boost your ego by checking up on your crypto investments without leaving the site. </p>
    `
    return minfo;
}

async function renderMoney(){
    let bit = await getBit();
    let eth = await getEth();
    let doge = await getDoge();
    let money = document.createElement('div');
    money.className = 'money';
    money.innerHTML = `
    <h3>Bitcoin:</h3>
    <p class= "prices">Bitcoin price: ${bit.rate}</p>
    <p class= 'desc'>Powered by <a href="https://www.coindesk.com/price/bitcoin">CoinDesk</a>.</p>
    <h3>Ethereum:</h3>
    <p class = "prices">Ethereum price: ${eth[0].price_usd}</p>
    <p class = "prices">Ethereum percent change 1h: ${eth[0].percent_change_1h}</p>
    <p class = "prices">Ethereum percent change 24h: ${eth[0].percent_change_24h}</p>
    <p class = "prices">Ethereum percent change 7d: ${eth[0].percent_change_7d}</p>
    <h3>Dogecoin:</h3>
    <p class = "prices">Doge price: ${doge[0].price_usd}</p>
    <p class = "prices">Doge percent change 1h: ${doge[0].percent_change_1h}</p>
    <p class = "prices">Doge percent change 24h: ${doge[0].percent_change_24h}</p>
    <p class = "prices">Doge percent change 7d: ${doge[0].percent_change_7d}</p>
    `;

    return money
    
}


const runner = async function() {
    timer = setInterval(function() { 
        
    }, 5000);

}

async function getBit(){
    const price = await axios({
        method: 'get',
        url: 'https://api.coindesk.com/v1/bpi/currentprice.json',
      });
   

    return price.data.bpi.USD;
}
async function getEth(){
    const price = await axios({
        method: 'get',
        url: 'https://api.coinlore.net/api/ticker/?id=80',
      });

    return price.data;
}

async function getDoge(){
    const price = await axios({
        method: 'get',
        url: 'https://api.coinlore.net/api/ticker/?id=2',
      });


    return price.data;
}

let timer;


let $root = $('#root');
$(function() {
    loadPage();
});