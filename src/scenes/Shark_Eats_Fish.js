class Shark_Eats_Fish extends Phaser.Scene {
    constructor() {
        super("sharkEatsFishScene");
    }

    preload() {
        this.load.image('shark_end', './assests/shark_end.png');
    }


    create() {
        this.dolphin_end = this.add.tileSprite(0, 0, 960, 720, 'shark_end').setOrigin(0, 0);
        let end_config = {
            fontSize: 20,
            color: '#1c70c2',
            align: 'center'
        }
        this.add.text(game.config.width / 15, game.config.height / 8, "You died from the shark\nClick on the screen to restart", end_config);
    }


    update() {
        this.input.on('pointerup', () => {this.scene.start('playScene')});
    }
}