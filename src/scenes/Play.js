class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

    preload() {
        // load background image
        this.load.image('ocean_background', './assests/ocean_background.png');

        // load music
        this.load.audio('background_music', './assests/Wave-piano-synth-loop.wav');

        // load animals
        this.load.atlas('fish_anim', './assests/fish_anim.png', './assests/fish_anim.json');
        this.load.atlas('dolphin_anim', './assests/dolphin_anim.png', './assests/dolphin_anim.json');
        this.load.atlas('shark_anim', './assests/shark_anim.png', './assests/shark_anim.json');
        this.load.atlas('penguin_anim', './assests/penguin_anim.png', './assests/penguin_anim.json');
    }

    create() {
        // load background image
        this.ocean_background = this.add.tileSprite(0, 0, 960, 720, 'ocean_background').setOrigin(0, 0);

        // create shark animation
        this.anims.create({
            key: 'shark',
            frames: this.anims.generateFrameNames('shark_anim', {prefix: 'shark ', end: 2, suffix: '.'}),
            frameRate: 5,
            repeat: -1
        });

        // create dolphin animation
        this.anims.create({
            key: 'dolphin',
            frames: this.anims.generateFrameNames('dolphin_anim', {prefix: 'dolphin ', end: 3, suffix: '.png'}),
            frameRate: 5,
            repeat: -1
        });

        // create penguin animation
        this.anims.create({
            key: 'penguin',
            frames: this.anims.generateFrameNames('penguin_anim', {prefix: 'penguin ', end: 3, suffix: ''}),
            frameRate: 5,
            repeat: -1
        });

        // create fish animation
        this.anims.create({
            key: 'fish',
            frames: this.anims.generateFrameNames('fish_anim', {prefix: 'fish', end: 2, suffix: ''}),
            frameRate: 4,
            repeat: -1
        });

        // create fish sprite
        this.fish = this.physics.add.sprite(game.config.width / 2, game.config.height / 2, 'fish_anim');
        this.fish.body.onOverlap = true;
        this.fish.setCollideWorldBounds(true);

        // create shark sprite
        this.shark = this.physics.add.sprite(Phaser.Math.Between(0, 1)? 0 - 42 : game.config.width + 42, Phaser.Math.Between(0 + 64, game.config.height - 64), 'shark_anim');
        this.shark.body.onOverlap = true;
        this.shark.setScale(4);
        this.shark_start_pos = this.shark.x;

        // create dolphin sprite
        this.dolphin = this.physics.add.sprite(Phaser.Math.Between(0, 1)? 0 - 42 : game.config.width + 42, Phaser.Math.Between(0 + 64, game.config.height - 64), 'dolphin_anim');
        this.dolphin.body.onOverlap = true;
        this.dolphin.setScale(3);
        this.dolphin_start_pos = this.dolphin.x;

        // indicate once penguin has spawned 
        this.penguin_active = false;

        this.fish.play('fish');
        this.shark.play('shark');
        this.dolphin.play('dolphin');

        cursor = this.input.keyboard.createCursorKeys();

        this.song = this.sound.add('background_music', {loop: true, volume: 0.3});
        this.song.play();

        // spawn penguin after 15 seconds
        this.clock = this.time.delayedCall(15000, () => {
            this.penguin = this.physics.add.sprite(Phaser.Math.Between(0, game.config.width), 0, 'penguin_anim');
            this.penguin.body.onOverlap = true;
            this.penguin.setScale(2);
            this.penguin_start_pos = this.penguin.x;
            this.penguin.play('penguin');
            this.penguin_active = true;
        }, null, this);
    }

    update() {
        this.ocean_background.tilePositionX += 3;

        this.physics.add.overlap(this.fish, this.dolphin, null, this.dolphinEnd(this.fish, this.dolphin), this);
        this.physics.add.overlap(this.fish, this.shark, null, this.sharkEnd(this.fish, this.shark), this);
        this.physics.overlap(this.fish, this.dolphin);
        this.physics.overlap(this.fish, this.shark);

        if (this.penguin_active) {
          this.physics.add.overlap(this.fish, this.penguin, null, this.penguinEnd(this.fish, this.penguin), this);
          this.physics.overlap(this.fish, this.penguin);
          this.penguin_swim_down(this.penguin, 10);
        }

        // FIXME: (?) can't move physics sprites unless put movement in scene
//        this.fish.update();
//        this.dolphin.update();
        this.move_fish(this.fish);
        this.dolphin_swim(this.dolphin, 8);
        this.shark_swim(this.shark, 6);
    }

    move_fish(fish) {
        this.direction = new Phaser.Math.Vector2(0);
        this.velocity = 200;

        if (cursor.left.isDown) {
            this.direction.x = -1;
        }
        if (cursor.right.isDown) {
            this.direction.x = 1;
        }
        if (cursor.up.isDown) {
            this.direction.y = -1;
        }
        if (cursor.down.isDown) {
            this.direction.y = 1;
        }

        this.direction.normalize();
        fish.setVelocityX(this.direction.x * this.velocity);
        fish.setVelocityY(this.direction.y * this.velocity);
 
    }

    dolphin_swim(predator, speed) {
        if (this.dolphin_start_pos < 0) {
            predator.setFlip(true, false);
            predator.x += speed;
        } else {
            predator.resetFlip()
            predator.x -= speed;
        }

            // reset the position when reached left end of screen
        if (predator.x + predator.width <= 0 || predator.x > game.config.width + predator.width) {
            //predator.x = game.config.width + predator.width * 2;
            predator.x = Phaser.Math.Between(0, 1)? 0 - predator.width : game.config.width + 42;
            predator.y = Phaser.Math.Between(0 + 64, game.config.height - 64);
            this.dolphin_start_pos = predator.x;
        }
     }

    shark_swim(predator, speed) {
        if (this.shark_start_pos < 0) {
            predator.setFlip(true, false);
            predator.x += speed;
        } else {
            predator.resetFlip()
            predator.x -= speed;
        }

        // reset the position when reached left end of screen
        if (predator.x + predator.width <= 0 || predator.x > game.config.width + predator.width) {
            predator.x = Phaser.Math.Between(0, 1)? 0 - predator.width : game.config.width + 42;
            predator.y = Phaser.Math.Between(0 + 64, game.config.height - 64);
            this.shark_start_pos = predator.x;
        }
    }

    penguin_swim_down(predator, speed) {
        if (this.penguin_start_pos < game.config.width / 2) {
            predator.setFlip(true, false);
            predator.x += speed;
            predator.y += speed;
        } else {
            predator.resetFlip()
            predator.x -= speed;
            predator.y += speed;
        }

        // reset the position when reached either ends on the x axis or bottom of screen
        if (predator.x > game.config.width || predator.x + predator.width <= 0 || predator.y >= game.config.height + predator.width) {
            predator.x = Phaser.Math.Between(0, game.config.width);
            predator.y = 0;
            this.penguin_start_pos = predator.x;
        }
 
    }

    penguinEnd(fish, penguin) {
        if (fish.x > penguin.x - (penguin.width / 2) - fish.width &&
            fish.x < penguin.x &&
            fish.y > penguin.y - fish.width && 
            fish.y < penguin.y + fish.width) {
                this.song.stop();
                this.scene.start('penguinEatsFishScene');
        }
    }

    sharkEnd(fish, shark) {
        if (fish.x > shark.x - (2 * shark.width) &&
            fish.x < shark.x - shark.width &&
            fish.y > shark.y - shark.height && 
            fish.y < shark.y + (1.5 * shark.height)) {
                this.song.stop();
                this.scene.start('sharkEatsFishScene');
        }
    }

    dolphinEnd(fish, dolphin) {
        if (fish.x > dolphin.x - dolphin.width - fish.width &&
            fish.x < dolphin.x - dolphin.width &&
            fish.y > dolphin.y - dolphin.height && 
            fish.y < dolphin.y + dolphin.height) {
                this.song.stop();
                this.scene.start('dolphinEatsFishScene');
        }
    }
}