import Land from "./land";

export default class Board {
    constructor(size) {
        this.size = size;
        this.board = [];
        for (let i = 0; i < size; i++) {
            this.board.push(new Land(i));
        }
        this.prevDraw = {
        }
    }

    get(index) {
        return this.board[index];
    }

    draw(currLocationId=this.prevDraw.currLocationId,ctx=this.prevDraw.ctx, dimensions=this.prevDraw.dimensions) {
        this.prevDraw.currLocationId = currLocationId;
        this.prevDraw.ctx = ctx;
        this.prevDraw.dimensions = dimensions;
        let start = 0;
        for (let i = currLocationId; i < currLocationId+3; i++) {
            let index = (i+this.size) % this.size;
            this.board[index].draw(ctx, 200, start, dimensions.width, start + dimensions.height/this.size);
            start += dimensions.height/this.size;
        }
    }

    game_over() {
        let firstOwner = this.get(0).owner;
        for (let i = 1; i < this.size; i++) {
            if (this.get(i).owner != firstOwner) {
                return false;
            }
        }
        return true;
    }
}