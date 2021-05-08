
export default class Game {

    constructor(){
        this.gameState = {
            board: this.newBoard(),
            score: 0,
            won: false,
            over: false
         }

    }
    setupNewGame(){
        this.gameState = {
           board: this.newBoard(),
           score: 0,
           won: false,
           over: false
        }
    }
    newBoard(){
        let aboard = []
        //changed from 225
        for(let i = 0; i < 150; i++){
           aboard.push(0);
        }
        aboard[127] = 2;
        return aboard;
    }

    getGameState(){
        return this.gameState;
     }

    loadGame(gameState){
        this.gameState = gameState;
     }
    
    move(direction){
        switch(direction){
            case 'right':
                this.tryMoveRight();
                break;
            case 'left':
                this.tryMoveLeft();
                break;
            case 'up':
                this.tryMoveUp();
                break;
            case 'down':
                this.tryMoveDown();
                break; 
        }
        //lose conditoin 
        if(this.gameState.board.includes(3) === true){
            this.gameState.over = true;
            
        }
    }
    
    //On moves prolly gonna have to do error chrecking rather
    //than just returning the gameState.board
     tryMoveRight(){
        let b = [...this.gameState.board];
        let pos = (b.findIndex(x => x ===2))
        if(pos % 15 === 14){
            this.gameState.board[pos] = 0;
            this.gameState.board[pos - 14] += 2; 
        }else{
            this.gameState.board[pos] = 0;
            this.gameState.board[pos + 1] += 2;
        }  
     }

    tryMoveLeft(){
        let b = [...this.gameState.board];
        let pos = (b.findIndex(x => x ===2))
        if(pos % 15 == 0){
            this.gameState.board[pos] = 0;
            this.gameState.board[pos + 14] += 2; 
        }else{
            this.gameState.board[pos] = 0;
            this.gameState.board[pos - 1] += 2;
        } 
    }

    tryMoveUp(){
        let b = [...this.gameState.board];
        let pos = (b.findIndex(x => x ===2))
        if(pos > 29){
            this.gameState.board[pos] = 0;
            this.gameState.board[pos - 15] += 2;
        }
        
    }

    tryMoveDown(){
        let b = [...this.gameState.board];
        let pos = (b.findIndex(x => x ===2))
        if(pos < 135){
            this.gameState.board[pos] = 0;
            this.gameState.board[pos +15] += 2;
        }
        
    }
    
    //function that calls itself every couple seconds
    //this shit does not work 
    // startFall(){
    //    // this.updateBlocks()
    //    console.log('test');

    //    await setTimeout(this.startFall(), 5000);
    // }

    //Returns an new line with 1s for bad blocks
    badBlockArr(){
        console.log("in bad block arr");
        let arr = [];
        for(let i = 0; i < 15; i++){
            arr.push(0);
        }
        let pos = [];
        pos.push(this.randomNum(0,14));
        for(let i = 0; i < 3; i++){
            pos.includes
            let index = this.randomNum(0,14);
            while(pos.includes(index)){
                index = this.randomNum(0, 14);
            }
            pos.push(index);
        }
        for(let j = 0; j < pos.length; j++){
            arr[pos[j]] = 1;
        }
        return arr;
    }
    
    
    updateBlocks(){
        //might have to json this 
        let line = this.badBlockArr();
        let pos = (this.gameState.board.findIndex(x => x ===2))
        this.gameState.board[pos - 15] = this.gameState.board[pos] + this.gameState.board[pos - 15]
        this.gameState.board[pos] = 0
        //this needs cut back 
        let s = this.gameState.board.splice(135,149);
        if(s.includes(1)){
            this.gameState.score += 1;
        }
        for(let i = 0; i < 15; i++){
            this.gameState.board.unshift(line[i]);
        }
        if(this.gameState.board.includes(3) === true){
            this.gameState.over = true;
        }
        
    }

    randomNum(min, max) { 
        return Math.floor(Math.random() * (max - min + 1) + min);
     }


}
    
