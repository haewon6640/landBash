import Board from "./board";
import {HumanPlayer, ComputerPlayer} from "./player";

const CONSTANTS = {
    BOARD_SIZE: 9
}

export default class LandBash {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d");
        this.boardDim = { width: canvas.width/3, height: canvas.height };
        this.dimensions = { width: canvas.width, height: canvas.height };
        this.board = new Board(CONSTANTS.BOARD_SIZE);
        this.players = [new HumanPlayer(this.board.get(0))];
        // label each land with players
        this.board.get(0).owner = this.players[0];
        for (let i = 1; i < CONSTANTS.BOARD_SIZE; i++) {
            this.players.push(new ComputerPlayer(this.board.get(i)));
            this.board.get(i).owner = this.players[i];
        }

        // Start with the human player
        this.currPlayerId = 0;
        // show the player's first land
        this.currLocationId = 0;
        this.registerEvents();
    }

    animate() {
        this.drawBackground();
        this.drawArrow();
        //draw board
        this.board.draw(this.currLocationId, this.ctx,this.boardDim);
    }

    startingSequence() {
        const game = document.querySelector(".game");
        this.drawBackground();
        this.ctx.fillStyle = "purple"
        this.ctx.font = "bold 40px Arial";
        this.ctx.fillText("LandBash", 200, 200);
        this.ctx.fillStyle = "blue"
        this.ctx.font = "bold 40px Arial";
        this.ctx.fillText("Click anywhere to start", 75, 300);
        var promise = new Promise((resolve, reject) => {
            this.canvas.addEventListener('click', (event) => {
                resolve(this);
            });
        });
        return promise;
    }
    async play() {
        console.log(`current Player is ${this.currPlayerId}`)
        await this.startingSequence()
            .then((value)=>{
                console.log(value)
                this.animate();
                this.players[this.currPlayerId]
                .takeTurn(this.canvas,this.ctx,this.dimensions, this.board) 
                .then((value)=> {
                    this.switchPlayer();
                    this.play();
                })
            })
        if (this.board.game_over()) {
            this.play();
            alert("game over!")
        }
    }

    switchPlayer() {
        this.currPlayerId = (this.currPlayerId+1+CONSTANTS.BOARD_SIZE) % CONSTANTS.BOARD_SIZE;
    }

    registerEvents() {
        this.registerArrow();
    }

    /**
     * Arrow Location
     * top: (30,80), (80,80), (30,30),(80,30)
     * bottom: (30, 520), (80,520), (30, 570), (80,570)
     */
    registerArrow() {
        this.bindedMove = this.move.bind(this);
        this.canvas.addEventListener('click',(event) => {
            let x = event.pageX;
            let y = event.pageY+this.canvas.offsetTop;

            //Check if arrows have been clicked.
            if (x >= 27 && x <= 83) {
                if (y >= 27 && y <= 83) {
                    this.move(1);
                }
                if (y >= 517 && y <= 573) {
                    this.move(-1);
                }
            }
        });
    }
    // Takes in +1 or -1 as argument for up or down
    move(dir) {
        this.currLocationId = (this.currLocationId-dir+CONSTANTS.BOARD_SIZE)%CONSTANTS.BOARD_SIZE;
        this.board.draw(this.currLocationId, this.ctx, this.boardDim);
    }
    drawBackground() {
        this.ctx.fillStyle = "skyblue";
        this.ctx.fillRect(0, 0, this.dimensions.width,this.dimensions.height);
    }

    drawArrow() {
        this.ctx.save();
        this.ctx.lineWidth = 10;
        this.ctx.fillStyle = "blue";
        this.ctx.shadowColor = "#000";
        this.ctx.shadowBlur = 15;
        this.ctx.moveTo(30,80);
        this.ctx.lineTo(80,80);
        this.ctx.lineTo(55,30);
        this.ctx.fill();
        this.ctx.moveTo(30,520);
        this.ctx.lineTo(80,520);
        this.ctx.lineTo(55,570);
        this.ctx.fill();
        this.ctx.restore();
    }

}