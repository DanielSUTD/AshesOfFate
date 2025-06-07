class Puzzle extends Boundary {
    constructor({ position, modalId, puzzleType }) {
        super({ position });
        this.modalId = modalId;
        this.puzzleType = puzzleType;
        this.isSolved = false;
    }

    draw() {
        c.fillStyle = 'rgba(255, 0, 0, 0)'
        c.fillRect(this.position.x, this.position.y, this.width, this.height);
    }
}