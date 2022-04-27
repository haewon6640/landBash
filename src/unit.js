class Unit {
    constructor(attack, hp, color) {
        this.attack = attack;
        this.hp = hp;
        this.color = color;
    }
    drawUnit(ctx, centerX, centerY, radius) {
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.lineWidth = 1;
        ctx.strokeStyle = 'clear';
        ctx.stroke();
        ctx.strokeStyle = 'black';
        this.drawFace(ctx, centerX, centerY);
        this.drawWeapon(ctx, centerX, centerY);
    }
    drawFace(ctx, centerX, centerY) {
        ctx.beginPath();
        ctx.arc(centerX-5, centerY-4, 1.5, 0, 2 * Math.PI, false);
        ctx.strokeStyle = "black";
        ctx.fillStyle = "black";
        ctx.stroke();
        ctx.fill();
        ctx.beginPath();
        ctx.arc(centerX+5, centerY-4, 1.5, 0, 2 * Math.PI, false);

        ctx.stroke();
        ctx.fill();
    }
}

export class Warrior extends Unit {
    constructor() {
        super(5,20,"skyblue");
    }

    drawUnit(ctx, centerX, centerY, radius) {
        super.drawUnit(ctx, centerX, centerY,radius);
    }
    drawWeapon(ctx, centerX, centerY) {
        var img = new Image();
        img.src = "./src/assets/woodBat.png";
        img.onload = function() {
            ctx.drawImage(img, centerX+2,centerY-10, 20, 20)
        }
    }
}

export class Ninja extends Unit {
    constructor() {
        super(5,20,"skyblue");
    }

    drawUnit(ctx, centerX, centerY, radius) {
        super.drawUnit(ctx, centerX, centerY,radius);
    }
    drawWeapon(ctx, centerX, centerY) {
        var img = new Image();
        img.src = "./src/assets/woodBat.png";
        img.onload = function() {
            ctx.drawImage(img, centerX+2,centerY-10, 20, 20)
        }
    }
}

export class Wizard extends Unit {
    constructor() {
        super(5,20,"lightblue");
    }

    drawUnit(ctx, centerX, centerY, radius) {
        super.drawUnit(ctx, centerX, centerY,radius);
    }
    drawWeapon(ctx, centerX, centerY) {
        var img = new Image();
        img.src = "./src/assets/woodBat.png";
        img.onload = function() {
            ctx.drawImage(img, centerX+2,centerY-10, 20, 20)
        }
    }
}

export class Supersoldier extends Unit {
    constructor() {
        super(5,20,"purple");
    }

    drawUnit(ctx, centerX, centerY, radius) {
        super.drawUnit(ctx, centerX, centerY,radius);
    }
    drawWeapon(ctx, centerX, centerY) {
        var img = new Image();
        img.src = "./src/assets/woodBat.png";
        img.onload = function() {
            ctx.drawImage(img, centerX+2,centerY-10, 20, 20)
        }
    }
}
