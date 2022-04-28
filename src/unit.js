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
        ctx.strokeStyle = 'black';
        ctx.stroke();
        this.drawFace(ctx, centerX, centerY, radius);
    }
    drawFace(ctx, centerX, centerY, radius) {
        ctx.strokeStyle = "black";
        ctx.fillStyle = "black";

        ctx.beginPath();
        ctx.arc(centerX-(radius/3), centerY-(radius/3), 1.5, 0, 2 * Math.PI, false);
        ctx.stroke();
        ctx.fill();

        ctx.beginPath();
        ctx.arc(centerX+ (radius/3), centerY - (radius/3), 1.5, 0, 2 * Math.PI, false);
        ctx.stroke();
        ctx.fill();
    }
}

export class Warrior extends Unit {
    constructor() {
        super(5,20,"skyblue");
    }

    drawUnit(ctx, centerX, centerY, radius, ...opt) {
        super.drawUnit(ctx, centerX, centerY,radius);
        if (opt.length === 0) {
            this.drawWeapon(ctx, centerX, centerY, radius);
        }

    }
    drawWeapon(ctx, centerX, centerY, radius) {
        var img = new Image();
        img.src = "./src/assets/woodBat.png";
        img.onload = () => {
            ctx.drawImage(img, centerX,centerY-10, radius*2, radius*2)
        }
    }
}

export class Ninja extends Unit {
    constructor() {
        super(5,20,"black");
    }

    drawUnit(ctx, centerX, centerY, radius, ...opt) {
        super.drawUnit(ctx, centerX, centerY,radius);
        if (opt.length === 0) {
            this.drawWeapon(ctx, centerX, centerY, radius);
        }

    }
    drawWeapon(ctx, centerX, centerY, radius) {
        var img = new Image();
        img.src = "./src/assets/shuriken.png";
        img.onload = () => {
            ctx.drawImage(img, centerX,centerY-10, radius*2, radius*2)
        }
    }
}

export class Wizard extends Unit {
    constructor() {
        super(5,20,"red");
    }

    drawUnit(ctx, centerX, centerY, radius, ...opt) {
        super.drawUnit(ctx, centerX, centerY,radius);
        if (opt.length === 0) {
            this.drawWeapon(ctx, centerX, centerY, radius);
        }

    }
    drawWeapon(ctx, centerX, centerY, radius) {
        var img = new Image();
        img.src = "./src/assets/staff.png";
        img.onload = () => {
            ctx.drawImage(img, centerX,centerY-10, radius*2, radius*2)
        }
    }
}

export class Supersoldier extends Unit {
    constructor(ctx) {
        var grd = ctx.createLinearGradient(0, 0, 250, 0);
        grd.addColorStop(0, "rgb(152, 0, 224)");
        grd.addColorStop(1, "white");
        super(5,20,grd);
    }

    
    drawUnit(ctx, centerX, centerY, radius) {
        
        super.drawUnit(ctx, centerX, centerY,radius);
        this.drawWeapon(ctx, centerX, centerY);
    }
    drawWeapon(ctx, centerX, centerY) {
        // var img = new Image();
        // img.src = "./src/assets/woodBat.png";
        // img.onload = function() {
        //     ctx.drawImage(img, centerX+2,centerY-10, 20, 20)
        // }
    }
}
