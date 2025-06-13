class BattleZone extends Boundary {
    constructor({ position, id, completed = false }) {
        super({ position });
        this.id = id;
        this.completed = completed;
    }
}