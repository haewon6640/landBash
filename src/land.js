import { Warrior }  from "./unit";
const CONSTANTS = {
    MAX_POPULATION: 25
}
export default class Land {
    
    constructor(id) {
        // this.adjTories = adjTories;
        // Later on
        this.trait;
        this.ability;
        this.id = id;
        this.owner;
        this.starting_count = 3;
        // Could use hash map for faster lookup
        this.soldiers = [];
        for (let i = 0; i < this.starting_count; i++) {
            this.soldiers.push(new Warrior())
        } 
    }

    draw(ctx, x, y, width,height) {
        x = x + (width/2)-100;
        this.drawLand(ctx, x, y, width,height);
        this.drawUnits(ctx, x+40, y, width,height);
    }
    drawLand(ctx, x, y, width,height) {
        ctx.fillStyle = this.owner.colorStr;
        ctx.fillRect(x,y,200,height);
        let barrackX = x + 40;
        // Units
        ctx.fillStyle = 'rgb(' + this.owner.color[0]*0.75 + ',' + this.owner.color[1]*0.75 + ',' + this.owner.color[2]*0.75 + ')';
        ctx.fillRect(barrackX,y+25,120,120);
        // Trait
        ctx.fillStyle = 'rgb(' + this.owner.color[0]*0.75 + ',' + this.owner.color[1]*0.75 + ',' + this.owner.color[2]*0.75 + ')';
        ctx.fillRect(barrackX+10,y+155,30,30);
        // Ability
        ctx.fillStyle = 'rgb(' + this.owner.color[0]*0.75 + ',' + this.owner.color[1]*0.75 + ',' + this.owner.color[2]*0.75 + ')';
        ctx.fillRect(barrackX + 80,y+155,30,30);
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
                this.soldiers[i].drawUnit(ctx,x+12,y+37, 12);
            } else {
                break;
            }
            x+=24;
        }
    }

    


}