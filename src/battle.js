export default class Battle {
    constructor(land1, land2) {
        this.army1 = land1.soldiers;
        this.army2 = land2.soldiers;

    }

    attack(army) {
        let sum = 0;
        for (let i = 0; i < army.length ;i++) {
            sum += army[i].attack;
        }
        return sum;
    }

    defense(army) {
        let sum = 0; 
        for (let i = 0; i < army.length; i++) {
            sum += army[i].attack;
        }
        return sum;
    }

    won() {
        if (this.attack(this.army1) >= this.defense(this.army2)) {
            return true;
        } 
        return false;
    }
}