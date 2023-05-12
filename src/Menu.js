class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }

    create() {
        this.add.text(game.config.width / 2, game.config.height / 2, "menu scene");
    }

    update() {
        this.input.on('pointerup', () => {this.scene.start('playScene')});
    }
}