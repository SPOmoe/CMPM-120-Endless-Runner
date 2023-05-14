class Penguin_Eats_Fish extends Phaser.Scene {
    constructor() {
        super("penguinEatsFishScene");
    }

    preload() {
        this.load.image('penguin_end', './assests/penguin_end.png');
    }

    create() {
        this.penguin_end = this.add.tileSprite(0, 0, 960, 720, 'penguin_end').setOrigin(0, 0);
        let end_config = {
            fontSize: 20,
            color: '#1c70c2',
            align: 'center'
        }
        this.add.text(game.config.width / 15, game.config.height / 8, "You died from the penguin\nClick on the screen to restart", end_config);
    }

    update() {
        this.input.on('pointerup', () => {this.scene.start('playScene')});
    }
}