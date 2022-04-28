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
        this.board.draw(this.currLocationId, this.ctx,this.boardDim);
        //draw board
        this.players[this.currPlayerId].drawTurn(this.ctx);
        if (this.board.game_over()) {
            return;
        } else {
            requestAnimationFrame(this.animate.bind(this));
        }
    }

    startingSequence() {
        const game = document.querySelector(".game");
        this.drawBackground();
        // Title
        this.ctx.fillStyle = "purple"
        this.ctx.font = "bold 40px Arial";
        this.ctx.fillText("LandBash", 200, 200);
        // // Instructions
        this.ctx.font = "30px Arial"
        this.ctx.fillText("What is the name of your kingdom?",70,250);
        // Start
        this.ctx.fillStyle = "purple"
        this.ctx.font = "bold 40px Arial";
        this.ctx.fillText("Press enter to start", 130, 500);


        var promise = new Promise((resolve, reject) => {
            let game = document.querySelector(".game");
            let form = document.getElementById("land-form");
            let input = document.getElementById("land-name");

            game.addEventListener('keydown',(event)=> {
                if (event.keyCode === 13) {
                    if (input.value.length === 0) {
                        setTimeout(()=>alert("You must select a name"),10)
                    } else {
                        // attempts to refresh if not
                        form.remove();
                        resolve(input.value);
                    }
                }
            });
        });
        return promise;
    }

    play() {
        this.startingSequence()
            .then((value)=>{
                // Set name of player's country
                this.players[0].lands[0].name = value;
                this.animate();
                this.playTurns();
            });

    }
    playTurns() {
        this.players[this.currPlayerId]
        .takeTurn(this.canvas,this.ctx,this.dimensions, this.board) 
        .then((value)=> {
            this.switchPlayer();
            this.playTurns();
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
        this.players[0].registerEvents(this.canvas, this.ctx, 450, 45, this.board, this);
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