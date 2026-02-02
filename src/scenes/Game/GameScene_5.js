import { CustomButton } from '../../UI/Button.js';
import { CustomPanel, SettingPanel } from '../../UI/Panel.js';
import UIHelper from '../../UI/UIHelper.js';
import BaseGameScene from './BaseGameScene.js';
import GameManager from '../GameManager.js';


export class GameScene_5 extends BaseGameScene {
    constructor() {
        super('GameScene_5');
        this.roundPerSeconds = 400;
        this.targetRounds = 2;
        this.sceneIndex = 5;
    }

    preload() {
        const path = 'assets/Game_5/';
        this.load.image('game5_bg', `${path}game5_bg.png`);
        this.load.image('game5_title', `${path}game5_title.png`);
        this.load.image('game5_description', `${path}game5_description.png`);
        this.load.image('game5_object_description', `${path}game5_object_description.png`);
        // Load other necessary assets here
        this.load.image('game5_npc_box_lock', `${path}game5_npc_box1.png`);
        this.load.image('game5_npc_box_win', `${path}game5_npc_box2.png`);
        this.load.image('game5_npc_box_tryagain', `${path}game5_npc_box3.png`);
        this.load.image('game5_target_arrow', `${path}game5_arrow.png`);
        this.load.image('game5_target_area', `${path}game5_clickarea.png`);
        this.load.image('game5_bar', `${path}game5_bar.png`);

        this.load.video('game5_success_preview', `${path}game5_success_ending.webm`);
        this.load.video('game5_fail_preview', `${path}game5_fail_ending.webm`);

        this.load.image('game5_hit_button', `${path}game5_hit_button.png`);
        this.load.image('game5_hit_button_select', `${path}game5_hit_button_select.png`);
    }

    create() {
        this.gameResult_1 = GameManager.loadOneGameResult(1);
        this.gameResult_4 = GameManager.loadOneGameResult(4);
        this.canPlay = false;

        if (this.gameResult_1 && this.gameResult_1.isFinished &&
            this.gameResult_4 && this.gameResult_4.isFinished) {
            this.canPlay = true;
            this.initGame('game5_bg', 'game5_title', 'game5_description', 10, true);
        } else {
            this.add.image(960, 540, 'game5_bg');
            this.showBubble('lock');
        }
        console.log("Game 5 - Can Play:", this.canPlay);
    }
}