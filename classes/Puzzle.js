class Puzzle extends Boundary {
    constructor({ position, modalId, puzzleType, isFinalChest }) {
        super({ position });
        this.modalId = modalId;
        this.puzzleType = puzzleType;
        this.isFinalChest = false;
    }

    draw() {
        c.fillStyle = 'rgba(255, 0, 0, 0)'
        c.fillRect(this.position.x, this.position.y, this.width, this.height);
    }
}