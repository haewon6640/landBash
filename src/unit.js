class Unit {
    constructor(attack, hp) {
        this.attack = attack;
        this.hp = hp;
    }
    drawUnit() {
        alert("Invalid");
    }
}

export class Warrior extends Unit {
    constructor() {
        super(5,20);
    }

    drawUnit(ctx, centerX, centerY, radius) {
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
        ctx.fillStyle = 'lightgreen';
        ctx.fill();
        ctx.lineWidth = 1;
        ctx.strokeStyle = 'clear';
        ctx.stroke();
    }
}