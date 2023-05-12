class Fish extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {

        super(scene, x, y, texture, frame);
  
        scene.add.existing(this);
        
        this.moveSpeed = 4;
    }

    update() {
        // TODO: diagonal movement, change move speed to velocity
        if (keyLEFT.isDown) {
            this.x -= this.moveSpeed;
        } else if (keyRIGHT.isDown) {
            this.x += this.moveSpeed;
        } else if (keyUP.isDown) {
            this.y -= this.moveSpeed;
        } else if (keyDOWN.isDown) {
            this.y += this.moveSpeed;
        }
    }

}