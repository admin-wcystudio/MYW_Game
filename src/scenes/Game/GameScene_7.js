import { CustomButton } from '../../UI/Button.js';
import { CustomPanel, SettingPanel } from '../../UI/Panel.js';
import UIHelper from '../../UI/UIHelper.js';
import BaseGameScene from './BaseGameScene.js';

export class GameScene_7 extends BaseGameScene {
    constructor() {
        super('GameScene_7');
        this.roundPerSeconds = 0; // Disable Timer
        this.targetRounds = 0;
        this.sceneIndex = 7;
    }

    preload() {
        const path = 'assets/Game_7/';
        this.load.image('game7_bg', `${path}game7_bg.png`);
        this.load.image('game7_title', `${path}game7_title.png`);
        this.load.image('game7_description', `${path}game7_description.png`);

        // UI
        this.load.image('game7_gamechance', `${path}game7_gamechance.png`);
        this.load.image('game7_timer', `${path}game7_timer.png`);
        this.load.image('game7_closebutton', `${path}game7_closebutton.png`);
        this.load.image('game7_closebutton_select', `${path}game7_closebutton_select.png`);
        this.load.image('game7_confirm_button', `${path}game7_confirm_button.png`);
        this.load.image('game7_confirm_button_select', `${path}game7_confirm_button_select.png`);

        // NPC Boxes
        for (let i = 1; i <= 4; i++) {
            this.load.image(`game7_npc_box${i}`, `${path}game7_npc_box${i}.png`);
        }

        // Questions
        for (let i = 1; i <= 4; i++) {
            this.load.image(`game7_game7_question${i}`, `${path}game7_game7_question${i}.png`);
        }

        // Question Buttons (Q1 - Q3 use _click, Q4 uses _select)
        const options = ['a', 'b', 'c', 'd'];
        for (let q = 1; q <= 3; q++) {
            options.forEach(opt => {
                this.load.image(`game7_game7_q${q}_${opt}_button`, `${path}game7_game7_q${q}_${opt}_button.png`);
                this.load.image(`game7_game7_q${q}_${opt}_button_click`, `${path}game7_game7_q${q}_${opt}_button_click.png`);
            });
        }

        // Q4 Buttons
        options.forEach(opt => {
            this.load.image(`game7_game7_q4_${opt}_button`, `${path}game7_game7_q4_${opt}_button.png`);
            this.load.image(`game7_game7_q4_${opt}_button_select`, `${path}game7_game7_q4_${opt}_button_select.png`);
        });

        // Videos
        for (let i = 1; i <= 3; i++) {
            this.load.video(`game7_scene${i}`, `${path}game7_scene${i}.mp4`);
        }

        // Endings & Results
        this.load.image('game7_ending1', `${path}game7_ending1.png`);
        this.load.image('game7_ending2', `${path}game7_ending2.png`);
        this.load.image('game7_fail', `${path}game7_fail.png`);
        this.load.image('game7_fail_icon', `${path}game7_fail_icon.png`);
        this.load.image('game7_success', `${path}game7_success.png`);
        this.load.image('game7_success_icon', `${path}game7_success_icon.png`);
    }

    create() {
        this.initGame('game7_bg', 'game7_title', 'game7_description', 10, true);
    }

}