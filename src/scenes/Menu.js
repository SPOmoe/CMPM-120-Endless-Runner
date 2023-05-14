class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }

    create() {
        let title_config = {
            fontSize: 40,
            align: 'center',
        }

        let menu_config = {
            fontSize: 20,
            align: 'center',
        }

        // title
        this.add.text(game.config.width / 2, game.config.height / 4, "Just Keep Swimming", title_config).setOrigin(0.5, 0.5)

        // game description and controls
        this.add.text(game.config.width / 2, game.config.height / 2, "Hoping to be free from the fish bowl, you pretending to be dead.\nFreedom awaits down the toilet, however many predators are hungry to eat you!\n\nNavigate with the arrow keys and avoid them as long as you can!\n\nClick the screen to start", menu_config).setOrigin(0.5, 0.5);

        // credits
        this.add.text(game.config.width / 2, game.config.height / 1.25, "Art: Marlene Inoue\nBackground music: https://orangefreesounds.com/wave-piano-synth-loop/", menu_config).setOrigin(0.5, 0.5);
    }

    update() {
        this.input.on('pointerup', () => {this.scene.start('playScene')});
    }
}