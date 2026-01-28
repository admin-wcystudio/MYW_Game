import { BootScene } from './scenes/BootScene.js';
import { GameStartScene } from './scenes/GameStartScene.js';
import { LoginScene } from './scenes/LoginScene.js';
import { MainStreetScene } from './scenes/MainStreetScene.js';
import { TransitionScene } from './scenes/TransitionScene.js';
import { GameScene_1 } from './scenes/Game/GameScene_1.js';
import { GameScene_2 } from './scenes/Game/GameScene_2.js';
import { GameScene_3 } from './scenes/Game/GameScene_3.js';
import { GameScene_4 } from './scenes/Game/GameScene_4.js';
import { GameScene_5 } from './scenes/Game/GameScene_5.js';
import { GameScene_6 } from './scenes/Game/GameScene_6.js';
import { GameScene_7 } from './scenes/Game/GameScene_7.js';


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
        LoginScene,
        MainStreetScene,
        TransitionScene,
        GameScene_1,
        GameScene_2,
        GameScene_3,
        GameScene_4,
        GameScene_5,
        GameScene_6,
        GameScene_7
    ],
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    dom: {
        createContainer: true
    }
}

var game = new Phaser.Game(config);