import { BootScene } from './scenes/BootScene.js';
import { GameStartScene } from './scenes/GameStartScene.js';
import { LoginScene } from './scenes/LoginScene.js';

var config = {
    type: Phaser.AUTO,
    title: 'Overlord Rising',
    description: '',
    parent: 'game-container',
    width: 1920,
    height: 1080,
    backgroundColor: '#000000',
    pixelArt: false,
    scene: [
        BootScene,
        GameStartScene,
        LoginScene
    ],
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    dom : {
        createContainer : true
    }
}

var game = new Phaser.Game(config);