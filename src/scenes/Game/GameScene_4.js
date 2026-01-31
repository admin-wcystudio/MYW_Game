import { CustomButton } from '../../UI/Button.js';
import { CustomPanel, SettingPanel, CustomSinglePanel } from '../../UI/Panel.js';
import UIHelper from '../../UI/UIHelper.js';
import BaseGameScene from './BaseGameScene.js';
import GameManager from '../GameManager.js';

export class GameScene_4 extends BaseGameScene {
    constructor() {
        super('GameScene_4');
        this.roundPerSeconds = 50;
        this.targetRounds = 3;
        this.sceneIndex = 4;
    }

    preload() {
        const path = 'assets/Game_4/';

        this.load.image('game4_bg', `${path}game4_bg.png`);
        this.load.image('game4_title', `${path}game4_title.png`);
        this.load.image('game4_description', `${path}game4_description.png`);
        this.load.image('game4_object_description', `${path}game4_object_description.png`);
        this.load.image('game4_object_description2', `${path}game4_object_description2.png`);

        this.load.image('game4_npc_box_win', `${path}game4_npc_box1.png`);
        this.load.image('game4_npc_box_tryagain', `${path}game4_npc_box2.png`);

        for (let i = 0; i <= 9; i++) {
            this.load.image(`game4_${i}_button`, `${path}game4_${i}_button.png`);
            this.load.image(`game4_${i}_button_select`, `${path}game4_${i}_button_select.png`);
        }

        this.load.image('game4_confirm_button', `${path}game4_q_confirm_button.png`);
        this.load.image('game4_confirm_button_select', `${path}game4_q_confirm_button_select.png`);

        // 問題圖片
        this.load.image('game4_q_bg', `${path}game4_q_bg.png`);
        for (let i = 1; i <= 8; i++) {
            this.load.image(`game4_q${i}`, `${path}game4_q${i}.png`);
        }

    }
    create() {
        this.initGame('game4_bg', 'game4_title', 'game4_description');
    }

}