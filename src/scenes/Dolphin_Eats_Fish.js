class Dolphin_Eats_Fish extends Phaser.Scene {
    constructor() {
        super("dolphinEatsFishScene");
    }

    preload() {
        this.load.image('dolphin_end', './assests/dolphin_end.png');
    }


    create() {
        this.dolphin_end = this.add.tileSprite(0, 0, 960, 720, 'dolphin_end').setOrigin(0, 0);
        let end_config = {
            fontSize: 20,
            color: '#1c70c2',
            align: 'center'
        }
        this.add.text(game.config.width / 15, game.config.height / 8, "You died from the dolphin\nClick on the screen to restart", end_config);
    }

    update() {
        this.input.on('pointerup', () => {this.scene.start('playScene')});
    }
}