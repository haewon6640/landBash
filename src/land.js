import { Warrior }  from "./unit";
const CONSTANTS = {
    MAX_POPULATION: 25,
    INITIAL_ARMY_SIZE: 3
}
export default class Land {
    constructor(id) {
        // this.adjTories = adjTories;
        // Later on
        this.trait;
        this.ability;
        this.id = id;
        this.owner;
        this.name = `Area ${this.id}`;
        // Could use hash map for faster lookup
        this.soldiers = [];
        for (let i = 0; i < CONSTANTS.INITIAL_ARMY_SIZE; i++) {
            this.soldiers.push(new Warrior())
        }
    }

    addUnit(unit) {
        this.soldiers.push(unit);
    }

    draw(ctx, x, y, width,height) {
        ctx.clearRect(ctx,x,y,width,height);
        ctx.beginPath();
        x = x + (width/2)-100;
        this.drawLand(ctx, x, y, width,height);
        this.drawUnits(ctx, x+45, y, width,height);
    }
    drawLand(ctx, x, y, width,height) {
        ctx.fillStyle = this.owner.colorStr;
        ctx.fillRect(x,y,200,height);
        let barrackX = x + 45;
        // Units
        ctx.fillStyle = 'rgb(' + this.owner.color[0]*0.75 + ',' + this.owner.color[1]*0.75 + ',' + this.owner.color[2]*0.75 + ')';
        ctx.fillRect(barrackX,y+35,110,110);
        // Trait
        ctx.fillStyle = 'rgb(' + this.owner.color[0]*0.75 + ',' + this.owner.color[1]*0.75 + ',' + this.owner.color[2]*0.75 + ')';
        ctx.fillRect(barrackX+5,y+155,35,35);
        // Ability
        ctx.fillStyle = 'rgb(' + this.owner.color[0]*0.75 + ',' + this.owner.color[1]*0.75 + ',' + this.owner.color[2]*0.75 + ')';
        ctx.fillRect(barrackX +70,y+155,35,35);
        ctx.font = "25px Lato";
        ctx.fillStyle = 'rgb(' + this.owner.color[0]*0.25 + ',' + this.owner.color[1]*0.25 + ',' + this.owner.color[2]*0.25 + ')';
        
        let textLength = Math.min(ctx.measureText(this.name).width,80);
        ctx.fillText(this.name, x+(width/2)-(textLength/2), y+27, 80);
    }

    drawUnits(ctx, x, y, width,height) {
        let prevX = x;
        // fit the 25 units 5 unit each row
        // 120 width / 5 units = 24px per unit
        for (let i = 0; i < CONSTANTS.MAX_POPULATION; i++) {
            // go next row every 5 units
            if (i % 5 === 0) {
                x = prevX;
                if (i != 0) {
                    y+=24;
                }
            }
            if (this.soldiers[i]) {
                this.soldiers[i].drawUnit(ctx,x+12,y+47, 12);
            } else {
                break;
            }
            x+=24;
        }
    }

    


}