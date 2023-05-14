/**
 * Name: Marlene Inoue
 * Title: Just Keep Swimming
 * Approximate Hours To Complete: 40
 */

/**
 * Sources:
 *      mouse click: https://flaviocopes.com/phaser-mouse-input/
 * 
 * Organization (15 points)
 *  In main.js (or equivalent), include a comment header with your name, game title, approximate hours spent
 *  on project, and your creative tilt justification (see below) (5) 
 * 
 * Structure and Design (75 points)
 *  Use multiple Scene classes (dictated by your game's style) (5)
 *      Menu, Play, Dolphin_Eats_Fish, Shark_Eats_Fish, Penguin_Eats_Fish
 *  Properly transition between Scenes and allow the player to restart w/out having to reload the page (5)
 *      mouse click to play screen
 *
 *  Have some form of player input/control appropriate to your game design (5)
 *      arrows to move
 *  Include one or more animated characters that use a texture atlas (5)
 *      fish, dolphin, shark, penguin
 *  Simulate scrolling with a tileSprite (or equivalent means) (5)
 *      background
 *  Implement proper collision detection (via Arcade Physics or a custom routine) (5)
 *      when fish touches dolphin, shark, or penguin (the front of those sprites)
 * 
 * 
 *  Use randomness to generate escalating challenge, e.g. terrain, pickups, etc. (5)
 *      dolphin, shark, and penguin spawns in different x or y axis
 * 
 *  Be theoretically endless (5)
 * 
 *  Run without significant crashes or errors (5)
 *
 *  
 * Creative Tilt (10 points)
 * 
 *  ...have a great visual style? Does it use music or art that you're particularly proud of? Are you trying something new or clever with the endless runner form? (5)
 *      I have never drawn for games, especially an animated sprite. This was a bit of a challenge because I had to look up how 
 *      these animals looked in certain movements and since the sprites were originally drawn on a small axis, figuring out where
 *      to put the pixels for the body was hard. I think I did a really good job in the end; it's kind of easy to tell the order
 *      of the animals I drew since the animation looks cleaner at the end of some of them.
 *      I got the inspiration for my endless runner from the game Subway Surfer, where the player is being chased by the police.
 *      It's nearly the same idea because you need to avoid these bigger predators as a fish to survive
 *
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
    scene: [Menu, Play, Dolphin_Eats_Fish, Shark_Eats_Fish, Penguin_Eats_Fish]
}

let game = new Phaser.Game(config);

let cursor;