import Land from "./land";
export default class Board {
    constructor(size) {
        this.size = size;
        this.board = [];
        for (let i = 0; i < size; i++) {
            this.board.push(new Land(i));
        }
    }

    get(index) {
        return this.board[index];
    }

    drawBoard(ctx, dimensions) {
        let start = 0;
        for (let i = 0; i < this.size; i++) {
            this.board[i].draw(ctx, 200, start, dimensions.width, start + dimensions.height/this.size);
            start += dimensions.height/this.size;
        }
    }
}