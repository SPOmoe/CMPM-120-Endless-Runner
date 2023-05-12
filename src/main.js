/**
 * Sources:
 *      mouse click: https://flaviocopes.com/phaser-mouse-input/
 **/

let config = {
    type: Phaser.AUTO,
    width: 960,
    height: 720,
    scene: [Menu, Play]
}

let game = new Phaser.Game(config);