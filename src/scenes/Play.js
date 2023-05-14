class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

    preload() {
        this.load.atlas('fish_anim', './assests/fish_anim.png', './assests/fish_anim.json');
        this.load.atlas('dolphin_anim', './assests/dolphin_anim.png', './assests/dolphin_anim.json');
        //this.load.spritesheet('fish_anim', './assests/fish_anim.png', {frameWidth: 32, frameHeight: 32, startFrame: 0, endFrame: 2});
        //this.load.spritesheet('dolphin_sheet', './assests/dolphin_sheet.png', {frameWidth: 84, frameHeight: 32, startFrame: 0, endFrame: 3});
    }

    create() {
        this.add.text(game.config.width / 2, game.config.height / 3, "play scene");

        this.anims.create({
            key: 'dolphin',
            frames: this.anims.generateFrameNames('dolphin_anim', {prefix: 'dolphin ', end: 3, suffix: '.png'}),
            frameRate: 5,
            repeat: -1
        });

        this.anims.create({
            key: 'fish',
            frames: this.anims.generateFrameNames('fish_anim', {prefix: 'fish', end: 2, suffix: ''}),
            frameRate: 4,
            repeat: -1
        });


        this.fish = this.physics.add.sprite(game.config.width / 2, game.config.height / 2, 'fish_anim');
        this.fish.body.onOverlap = true;

        this.dolphin = this.physics.add.sprite(game.config.width + 42, Phaser.Math.Between(0 + 64, game.config.height - 64), 'dolphin_anim');
        this.dolphin.body.onOverlap = true;
        this.dolphin.setScale(3);

        this.fish.play('fish');
        this.dolphin.play('dolphin');

        cursor = this.input.keyboard.createCursorKeys();
    }

    update() {
        this.input.on('pointerup', () => {this.scene.start('menuScene');});

        this.physics.add.overlap(this.fish, this.dolphin, null, this.dolphinEnd(this.fish, this.dolphin), this);
        this.physics.overlap(this.fish, this.dolphin);

        // FIXME: (?) can't move physics sprites unless put movement in scene
//        this.fish.update();
//        this.dolphin.update();
        this.move_fish(this.fish);
        this.move_dolphin(this.dolphin);

    }

    move_fish(fish) {
        this.direction = new Phaser.Math.Vector2(0);
        this.velocity = 200;

        // TODO: diagonal movement
        if (cursor.left.isDown) {
            this.direction.x = -1;
        } else if (cursor.right.isDown) {
            this.direction.x = 1;
        } else if (cursor.up.isDown) {
            this.direction.y = -1;
        } else if (cursor.down.isDown) {
            this.direction.y = 1;
        }

        this.direction.normalize();
        fish.setVelocityX(this.direction.x * this.velocity);
        fish.setVelocityY(this.direction.y * this.velocity);
 
    }

    move_dolphin(dolphin) {
        dolphin.x -= 8;

        // reset the position when reached left end of screen
        if (dolphin.x + dolphin.width <= 0) {
            dolphin.x = game.config.width + 64;
            dolphin.y = Phaser.Math.Between(0 + 64, game.config.height - 64);
        }

    }

    dolphinEnd(fish, dolphin) {
        if (fish.x > dolphin.x - dolphin.width - fish.width &&
            fish.x < dolphin.x - dolphin.width &&
            fish.y > dolphin.y - dolphin.height && 
            fish.y < dolphin.y + dolphin.height){
            this.scene.start('dolphinEatsFishScene');
        }
    }
}