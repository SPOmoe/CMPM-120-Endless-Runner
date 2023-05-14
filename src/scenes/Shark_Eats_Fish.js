class Shark_Eats_Fish extends Phaser.Scene {
    constructor() {
        super("sharkEatsFishScene");
    }

    create() {
        this.add.text(game.config.width / 2, game.config.height / 2, "you died from the shark");
    }

    update() {
        this.input.on('pointerup', () => {this.scene.start('playScene')});
    }
}