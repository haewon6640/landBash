import Board from "./board";
import Land from "./land";
import {HumanPlayer, ComputerPlayer} from "./player";

const CONSTANTS = {
    BOARD_SIZE: 9
}
export default class LandBash {
    constructor(canvas) {
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
        this.currPlayer = this.players[0];
        // this.registerEvents();
    }

    animate() {
        this.drawBackground();
        //draw board
        this.board.drawBoard(this.ctx,this.boardDim);
    }

    play() {
        this.animate();
        for (let i = 0; i < this.players.length; i++) {
            this.players[i].takeTurn(this.ctx, this.dimensions);
        }
    }

    // registerEvents() {
    //     this.registerArrow();
    // }

    // registerArrow() {
    //     this.bindedMove = this.move.bind(this);

    // }

    move(dir) {
        if (dir > 0) {

        }
    }
    drawBackground() {
        this.ctx.fillStyle = "skyblue";
        this.ctx.fillRect(0, 0, this.dimensions.width,this.dimensions.height);
        this.drawArrow();
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