
export default class Player {
    constructor(land) {
        this.gold = 150;
        this.lands = [land]
        // manipulated to make country colors lighter
        this.color = [parseInt(Math.random() * 122)+123,parseInt(Math.random() * 122)+123, parseInt(Math.random() * 255)+123]
        this.colorStr = 'rgb(' + this.color[0] + ',' + this.color[1] + ',' + this.color[2] + ')';
        this.shop = {
            warrior: {
                price: 30,
                img: ""
            },
            ninja: {
                price: 50,
                img: ""
            },
            wizard: {
                price: 70,
                img: ""
            },
            supersoldier: {
                price: 100,
                img: ""
            },
        }
    }

    annex(land) {
        this.lands.push(land);
    }

    addGold() {
        this.gold += (this.lands.length*30);
    }

    takeTurn(canvas,ctx,dimensions) {
        this.drawTurn(ctx,dimensions);
        this.addGold();
        if (this.dead()) {
            alert("you've died");
        }
        // let isDrawing = false;
        // let dragStart = [0,0]
        // canvas.addEventListener("mousedown", (event) => {
        //     dragStart = [event.pageX, event.pageY];
        //     console.log(dragStart);
        //     isDrawing = true;
        // })
        // canvas.addEventListener("mousemove", (e) => {
        //     if (isDrawing) {
        //         ctx.strokeStyle = "gray";
        //         ctx.fillStyle = "rgb(150, 150, 150,0.5)";
        //         ctx.fillRect(dragStart[0],dragStart[1], e.pageX,e.pageY);
        //         ctx.strokeRect(dragStart[0],dragStart[1], e.pageX,e.pageY);
        //     }
        // })
        // canvas.addEventListener("mouseup", (event)=> {
        //     console.log(`from ${dragStart} to ${[event.pageX, event.pageY]}`)
        //     isDrawing = false;
        // })

    }

    dead() {
        return this.lands.length === 0;
    }

    drawTurn(ctx, dimensions) {
        ctx.save();
        ctx.translate(450,30);

        // Draw Current Gold
        ctx.fillStyle = "black";
        ctx.font = "25px Arial";
        ctx.fillText(`Gold: ${this.gold}`, 0, 0);
        ctx.strokeStyle = "black";
        ctx.strokeRect(0, 130, 120, 30);
        ctx.fillText("End Turn", 10, 155, 100);
        ctx.restore();
    } 

}

export class ComputerPlayer extends Player{
    constructor() {
        super(...arguments)
    }

    takeTurn(canvas,ctx, dimensions) {
        super.takeTurn(...arguments)
        return new Promise((resolve,reject)=> {
            resolve(this);
        })
    }

    // greedy algorithm for spending all the gold
}

export class HumanPlayer extends Player{
    constructor() {
        super(...arguments)
    }
    
    takeTurn(canvas, ctx, dimensions) {
        super.takeTurn(...arguments)
        // returns a promise that resolves on eventlistener
        var promise = new Promise((resolve, reject) => {
            canvas.addEventListener('click', (event) => {
                let x = event.pageX;
                let y = event.pageY;
                if (x >= 450 && x <= 570) {
                    if (y >= 160 && y <= 190) {
                        resolve(this);
                    }
                }
            },{once: true}); // remove event after run once
        });
        return promise;
    }
}