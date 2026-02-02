import { CustomButton } from '../../UI/Button.js';
import { CustomPanel, SettingPanel } from '../../UI/Panel.js';
import UIHelper from '../../UI/UIHelper.js';
import GameManager from '../GameManager.js';
import BaseGameScene from './BaseGameScene.js';

export class GameScene_6 extends BaseGameScene {
    constructor() {
        super('GameScene_6');
        this.roundPerSeconds = 50000;
        this.targetRounds = 2;
        this.sceneIndex = 6;
    }
    preload() {
        const path = 'assets/Game_6/';
        this.load.image('game6_bg', `${path}game6_bg.png`);
        this.load.image('game6_title', `${path}game6_title.png`);
        this.load.image('game6_description', `${path}game6_description.png`);
        this.load.image('game6_object_description', `${path}game6_object_description.png`);

        this.load.image('game6_npc_box_intro', `${path}game6_npc_box1.png`);
        this.load.image('game6_npc_box_win', `${path}game6_npc_box2.png`);
        this.load.image('game6_npc_box_win_round1', `${path}game6_npc_box3.png`);
        this.load.image('game6_npc_box_win_round2', `${path}game6_npc_box4.png`);
        this.load.image('game6_npc_box_win_d1', `${path}game6_npc_box5.png`);
        this.load.image('game6_npc_box_tryagain', `${path}game6_npc_box6.png`);

        // Arrows
        this.load.image('game6_arrow_blue', `${path}game6_arrow_blue.png`);
        this.load.image('game6_arrow_green', `${path}game6_arrow_green.png`);
        this.load.image('game6_arrow_red', `${path}game6_arrow_red.png`);
        this.load.image('game6_arrow_yellow', `${path}game6_arrow_yellow.png`);

        // Bar Arrows
        this.load.image('game6_bar_arrow_blue', `${path}game6_bar_arrow_blue.png`);
        this.load.image('game6_bar_arrow_green', `${path}game6_bar_arrow_green.png`);
        this.load.image('game6_bar_arrow_red', `${path}game6_bar_arrow_red.png`);
        this.load.image('game6_bar_arrow_yellow', `${path}game6_bar_arrow_yellow.png`);

        this.load.image('game6_target_0', `${path}game6_target_0.png`);
        this.load.image('game6_target_1', `${path}game6_target_1.png`);
        this.load.image('game6_target_2', `${path}game6_target_2.png`);
        this.load.image('game6_target_3', `${path}game6_target_3.png`);

        // Other UI
        this.load.image('game6_bar_bg', `${path}game6_bar_bg.png`);
        this.load.image('game6_hit_point', `${path}game_hit_point.png`);
        this.load.image('game6_hit_button', `${path}game6_hit_button.png`);
        this.load.image('game6_hit_button_select', `${path}game6_hit_button_select.png`);

    }
    create() {
        this.initGame('game6_bg', 'game6_title', 'game6_description', 10, false);
        this.add.image(960, 540, 'game5_bar_bg').setDepth(20);
        this.targetImage = this.add.image(960, 560, 'game6_target_0').setDepth(21);
        this.barBG = this.add.image(960, 540, 'game6_bar_bg').setDepth(22);
        this.barBG.setVisible(false);
    }

    setupGameObjects() {
        this.buttonGroup = this.add.group();
        const colors = ['blue', 'green', 'red', 'yellow'];
        for (let i = 0; i < 4; i++) {
            const button = new CustomButton(this, 520 + i * 300, 840, `game6_arrow_${colors[i]}`, `game6_arrow_${colors[i]}`,
                () => {
                    this.handleArrowClick(i);
                }).setDepth(25);
            this.buttonGroup.add(button);
        }
        this.buttonGroup.setVisible(false);
    }

    enableGameInteraction(enable) {
        if (this.buttonGroup) {
            this.buttonGroup.setVisible(enable);
            this.buttonGroup.getChildren().forEach(button => {
                if (enable) {
                    button.setInteractive();
                } else {
                    button.disableInteractive();
                }
            });
        }
        this.barBG.setVisible(enable);
    }
}