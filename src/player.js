export default class Player {
    constructor(land) {
        this.gold = 120;
        this.lands = [land];
        this.color = [parseInt(Math.random() * 255),parseInt(Math.random() * 255), parseInt(Math.random() * 255)]
        this.colorStr = 'rgb(' + this.color[0] + ',' + this.color[1] + ',' + this.color[2] + ')';
    }

    annex(land) {
        this.lands.push(land);
    }

    addGold() {
        this.gold += (this.lands.length*30);
    }

    takeTurn() {
        this.addGold();
        if (this.dead()) {
            alert("you've died");
        }
    }

    dead() {
        return this.lands.length === 0;
    }

    drawTurn(ctx, dimensions) {
        ctx.save();
        ctx.translate(450,30);
        ctx.fillStyle = "black";
        ctx.font = "25px Lato";
        ctx.fillText(`Gold: ${this.gold}`, 0, 0);
        ctx.strokeStyle = "black";
        ctx.strokeRect(0, 130, 100, 20);
        // ctx.
        ctx.restore();
    
    } 

}

export class ComputerPlayer extends Player{
    constructor() {
        super([arguments])
    }

    takeTurn(ctx, dimensions) {
        super.takeTurn();
        this.drawTurn(ctx,dimensions);
    }

    // greedy algorithm for spending all the gold
}

export class HumanPlayer extends Player{
    constructor() {
        super([arguments])
    }
    
    takeTurn(ctx, dimensions) {
        console.log("dfs")
        super.takeTurn();
        this.drawTurn(ctx, dimensions);
    }
    
}
