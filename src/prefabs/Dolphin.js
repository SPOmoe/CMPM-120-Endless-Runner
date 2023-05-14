//class Dolphin extends Phaser.GameObjects.Sprite {
class Dolphin extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame) {

        super(scene, x, y, texture, frame);
  
        scene.add.existing(this);
        
        this.moveSpeed = 8;
    }

    update() {
        console.log('in dolphin upate');
        this.x -= this.moveSpeed;

        // reset the position when reached left end of screen
        if (this.x + this.width <= 0) {
            this.x = game.config.width + 64;
            this.y = Phaser.Math.Between(0 + 64, game.config.height - 64);
        }
    }

    get_dolphin_speed() {
        return this.moveSpeed;
    }

}