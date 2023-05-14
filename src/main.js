/**
 * Sources:
 *      mouse click: https://flaviocopes.com/phaser-mouse-input/
 **/

let config = {
    type: Phaser.AUTO,
    width: 960,
    height: 720,
    physics: {
        default: 'arcade',
        arcade: {
            debug: true,
        }
    },
    scene: [Menu, Play, Dolphin_Eats_Fish]
}

let game = new Phaser.Game(config);

let cursor;