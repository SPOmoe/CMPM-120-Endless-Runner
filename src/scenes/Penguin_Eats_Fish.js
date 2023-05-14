class Penguin_Eats_Fish extends Phaser.Scene {
    constructor() {
        super("penguinEatsFishScene");
    }

    create() {
        this.add.text(game.config.width / 2, game.config.height / 2, "you died from the penguin");
    }

    update() {
        this.input.on('pointerup', () => {this.scene.start('playScene')});
    }
}