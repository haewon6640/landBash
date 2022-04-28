import {Warrior, Ninja, Wizard, Supersoldier} from "./unit";
import Battle from "./battle";
export default class Player {
    constructor(land) {
        this.gold = 120;
        this.lands = [land]
        // manipulated to make country colors lighter
        this.color = [parseInt(Math.random() * 122)+123,parseInt(Math.random() * 122)+123, parseInt(Math.random() * 255)+123]
        this.colorStr = 'rgb(' + this.color[0] + ',' + this.color[1] + ',' + this.color[2] + ')';
        this.shop = {
            warrior: {
                price: 30,
                instance: Warrior,
                unlocked: true
            },
            ninja: {
                price: 50,
                instance: Ninja,
                unlocked: false
            },
            wizard: {
                price: 70,
                instance: Wizard,
                unlocked: false
            },
            supersoldier: {
                price: 100,
                instance: Supersoldier,
                unlocked: false
            },
        }
    }

    annex(land) {
        this.lands.push(land);
    }

    addGold() {
        this.gold += (this.lands.length*30);
        console.log(`current gold: ${this.gold}`)

    }

    handlePurchase(board,landNumber,unit,ctx) {
        let land = board.get((board.prevDraw.currLocationId + landNumber)%9);
        
        if (!Object.is(land.owner,this)) {
            alert("You can't spawn units on land that you don't own!");
            return;
        }
        if (this.shop[unit].price > this.gold) {
            setTimeout(()=>alert(`Need: ${this.shop[unit].price}, Current Gold: ${this.gold}`),50);
            return;
        }
        this.gold -= this.shop[unit].price;
        land.addUnit(new this.shop[unit].instance(ctx));
    }
    handleBattleOutcome(board, landNo1, landNo2, ctx) {
        let land1 = board.get((board.prevDraw.currLocationId + landNo1)%9)     
        let land2 = board.get((board.prevDraw.currLocationId + landNo2)%9) 
        if (!Object.is(land1.owner,this)) {
            setTimeout(()=> {
                alert("You can't attack from land that you don't own!");
            },5);
            return;
        }
        let battle = new Battle(land1,land2);
        if (battle.won()) {
            console.log("you've won")
            this.handleWin(land2);
        } else {
            this.handleLoss(land2);
        }
    }
    handleWin(opposingLand) {
        opposingLand.owner = this;
        opposingLand.name = this.lands[0].name;
        this.lands.push(opposingLand);
        let i = 0;
        let enemy = opposingLand.owner;
        while ( i <  enemy.lands.length) {
            if (opposingLand.id == enemy.lands[i]) {
                enemy.lands = enemy.lands.splice(i)
                break;
            } else {
                i++
            }
        }

    }

    handleLoss(land) {
        setTimeout(()=> {
            alert(`You've lost!`);
        },5)
    }
    takeTurn(canvas,ctx,dimensions) {
        this.addGold();
        this.drawTurn(ctx,dimensions);
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
        ctx.font = "25px Arial";
        ctx.fillStyle = "skyblue"
        ctx.fillRect(0,-25,120,25);
        ctx.fillStyle = "black";
        ctx.fillText(`Gold: ${this.gold}`, 0, 0);
        // Draw the shop
        this.drawShop(ctx);

        ctx.strokeStyle = "black";
        ctx.strokeRect(-10, 130, 120, 30);
        ctx.fillText("End Turn", 0, 155, 100);
        ctx.restore();
    } 

    drawShop(ctx) {
        ctx.strokeStyle = "black";
        let width = 100/2, height = 100/2;
        ctx.strokeRect(0,15,width,height);
        
        let warrior = new Warrior();
        warrior.drawUnit(ctx,width / 2 , 15 + height / 2, 23 , 1)
        warrior.drawWeapon(ctx, 450 + (width/2), 30+height/2, 23);
        ctx.strokeRect(width,15,width,height);
        
        let ninja = new Ninja();
        ninja.drawUnit(ctx,3*width/2,15+height/2,23,1)
        ninja.drawWeapon(ctx, 450+(3*width/2), 30+height/2, 23);
        ctx.strokeRect(0,15+height,width,height);

        let wizard = new Wizard();
        wizard.drawUnit(ctx,width/2,15+(3*height/2),23,1)
        wizard.drawWeapon(ctx, 450+(width/2), 30+(3*height/2), 25);
        
        let ss = new Supersoldier(ctx);
        ss.drawUnit(ctx,3*width/2,15+(3*height/2),23,1)
        ctx.strokeRect(width,15+height,width,height);
        // Warrior.drawUnit(ctx,width/2, height/2,25);
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
    
    takeTurn(canvas, ctx, dimensions, board) {
        super.takeTurn(...arguments);
        this.hoverShop(canvas,ctx,450, 45);

        // End Turn Button
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
            }); // remove event after run once
        });
        return promise;
    }
    
    registerEvents(canvas, ctx, x, y,board,game) {
        let isDragging = false;
        let dragStart = [];
        let draggedUnit;
        
        let battleDrag = false;
        let lands = [0,0];
        //create a new canvas
        // var newCanvas = document.createElement('canvas');
        // var context = newCanvas.getContext('2d');
        // //set dimensions
        // newCanvas.width = canvas.width;
        // newCanvas.height = canvas.height;
        // //apply the old canvas to the new one
        // context.drawImage(canvas, 0, 0);
        // newCanvas.style.zIndex = -1;

        const mousedown = (event)=> {
            // tell the browser we're handling this mouse event
            event.preventDefault();
            event.stopPropagation();
            let pX = event.pageX;
            let pY = event.pageY;
            if (pX >= x && pX <= x+100 && 
                pY >= y && pY <= y+100) {
                isDragging = true;
                dragStart = [pX,pY];
                pX -= 450;
                pY -= 45;
                // Player clicked warrior
                if (pX >= 0 && pX <= 50 && pY >= 0 && pY <= 50) {
                    draggedUnit = "warrior";
                }
                // Player clicked ninja
                if (pX >= 50 && pX <= 100 && pY >= 0 && pY <= 50) {
                    draggedUnit = "ninja";
                }
                // Player clicked wizard
                if (pX >= 0 && pX <= 50 && pY >= 50 && pY <= 100) {
                    draggedUnit = "wizard";
                }
                // Player clicked supersoldier
                if (pX >= 50 && pX <= 100 && pY >= 50 && pY <= 100) {
                    draggedUnit = "supersoldier";
                }
            }

            // If starting battle
            if (pX >= 200 && pX <= 400 && pY >= 0 && pY <= 600) {
                battleDrag = true;
                pY = pY/600;
                lands[0] = 0;
                if (pY >= 0.333 && pY <= 0.666) {
                    lands[0] = 1;
                }
                if (pY >= 0.333 && pY <= 0.666) {
                    lands[0] = 2;
                }
            }
        }
        const mousemove = (event) => {
            if (isDragging) {
                let pX = event.pageX;
                let pY = event.pageY;
                new this.shop[draggedUnit].instance(ctx).drawUnit(ctx, pX+23, pY+23, 23,1);
                new this.shop[draggedUnit].instance(ctx).drawWeapon(ctx, pX+23, pY+23, 23);   
            }
        }
        

        const mouseup = (event) => {
            event.preventDefault();
            event.stopPropagation();
            let pX = event.pageX;
            let pY = event.pageY;
            if (isDragging) {
                isDragging = false;
                // dropped onto a land
                if (pX >= 200 && pX <= 400 && pY >= 0 && pY <= 600) {
                    pY = pY/600;
                    let landNumber = 0;
                    if (pY >= 0.333 && pY <= 0.666) {
                        landNumber = 1;
                    }
                    if (pY >= 0.333 && pY <= 0.666) {
                        landNumber = 2;
                    }
                    this.handlePurchase(board,landNumber,draggedUnit,ctx);
                }
            }
            if (battleDrag) {
                battleDrag = false;
                if (pX >= 200 && pX <= 400 && pY >= 0 && pY <= 600) {
                    pY = pY/600;
                    lands[1] = 0;
                    if (pY >= 0.333 && pY <= 0.666) {
                        lands[1] = 1;
                    }
                    if (pY >= 0.333 && pY <= 0.666) {
                        lands[1] = 2;
                    }
                    this.handleBattleOutcome(board,lands[0],lands[1], ctx);
                }
            }
        }
        canvas.addEventListener('mousedown', mousedown);

        canvas.addEventListener('mousemove', mousemove);

        canvas.addEventListener('mouseup',mouseup);
    }



    hoverShop(canvas,ctx,x,y) {
        // canvas.addEventListener("mousemove",(event)=> {
        //     let pageX = event.pageX;
        //     let pageY = event.pageY;
        //     function
            // if (pageX >= x && pageX <= x+50 && pageY >= y && pageY <= y+50) {

            // }
            // if (pageX >= x && pageX <= x+50 && pageY >= y && pageY <= y+50) {
            //     ctx.hoverShopAnimation(ctx)
            // }
        // })
    }

    hoverShopAnimation(ctx, x, y) {

        // var imageData = ctx.getImageData(x, y, 50, 50);
        // var data = imageData.data;
        
        // for(var i = 0; i < data.length; i += 4) {
        //     var brightness = 0.34 * data[i] + 0.5 * data[i + 1] + 0.16 * data[i + 2];
        //     // red
        //     data[i] = brightness;
        //     // green
        //     data[i + 1] = brightness;
        //     // blue
        //     data[i + 2] = brightness;
        // }
    
        // // overwrite original image
        // ctx.putImageData(imageData, x, y);
        // return ctx;
    }
    
}