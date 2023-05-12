class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

    preload() {
//        this.load.image('fish', './assests/fish_anim.png');
        this.load.spritesheet('fish_anim', './assests/fish_anim.png', {frameWidth: 32, frameHeight: 32, startFrame: 0, endFrame: 2});
    }

    create() {
        this.add.text(game.config.width / 2, game.config.height / 3, "play scene");
        this.fish = new Fish(this, game.config.width / 2, game.config.height / 2, 'fish_anim');

        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        keyDOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);

        this.anims.create({
            key: 'fish_swim',
            frames: this.anims.generateFrameNumbers('fish_anim', {start: 0, end: 2, first: 0}),
            frameRate: 4,
            repeat: -1
        });

        this.fish.play('fish_swim');
    }

    update() {
        this.input.on('pointerup', () => {this.scene.start('menuScene');});

        this.fish.update();
    }
}