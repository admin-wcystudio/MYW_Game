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

        this.spawnSpeed = 5;
        this.maxArrows = 6;
        this.canSpawn = false;
        this.spawnHitPoint = false;
    }
    update() {
        if (this.canSpawn) {
            if (!this.fallingArrows || this.fallingArrows.length === 0) {
                this.spawnArrow();
            }

            for (let i = this.fallingArrows.length - 1; i >= 0; i--) {
                const arrow = this.fallingArrows[i];
                arrow.x -= this.spawnSpeed;
                if (arrow.x < 200) {
                    arrow.destroy();
                    this.fallingArrows.splice(i, 1);
                    this.handleMissedArrow();
                }
            }

        }
    }

    setupGameObjects() {
        this.buttonGroup = this.add.group();
        this.arrowGroup = this.add.group();
        const colors = ['blue', 'green', 'red', 'yellow'];
        for (let i = 0; i < 4; i++) {
            const button = new CustomButton(this, 520 + i * 300, 840, `game6_arrow_${colors[i]}`, `game6_arrow_${colors[i]}`,
                () => {
                    this.handleArrowClick(i);
                }).setDepth(25);
            this.buttonGroup.add(button);
        }

        for (let i = 0; i < colors.length; i++) {
            const arrow = this.add.image(960, -100, `game6_bar_arrow_${colors[i]}`).setDepth(23);
            this.arrowGroup.add(arrow);
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
        this.arrowGroup.setVisible(enable);
        this.canSpawn = enable;
    }

    showHitPoint() {
        this.hitPoint = this.add.image(1000, 540, 'game6_hit_point').setDepth(30);
        this.hitPoint.setScale(0);

        this.tweens.add({
            targets: this.hitPoint,
            scale: 1,
            duration: 500,
            ease: 'Back.out'
        });

        this.time.delayedCall(2000, () => {
            if (this.hitPoint) {
                this.tweens.add({
                    targets: this.hitPoint,
                    scale: 0,
                    duration: 500,
                    ease: 'Back.in',
                });
                this.hitPoint.destroy();
                this.spawnHitPoint = false;
            }
        });
    }

    spawnArrow() {
        this.fallingArrows = [];
        const colors = ['blue', 'green', 'red', 'yellow'];
        for (let i = 0; i < 6; i++) {
            const randomIndex = Phaser.Math.Between(0, colors.length - 1);
            const color = colors[randomIndex];
            const arrow = this.add.image(1680 - (i * 200), 540, `game6_bar_arrow_${color}`).setDepth(24);
            arrow.colorIndex = randomIndex;
            this.fallingArrows.push(arrow);
        }
        if (!this.spawnHitPoint) {
            this.spawnHitPoint = true;
            this.showHitPoint();
        }
    }

    handleArrowClick(index) {
        if (!this.fallingArrows || this.fallingArrows.length === 0) return;

        const arrow = this.fallingArrows[0];
        // Target is at 1000
        if (arrow.x >= 940 && arrow.x <= 1060) {
            console.log('Hit arrow:', index, 'Position:', arrow.x);
            if (arrow.colorIndex === index) {
                arrow.destroy();
                this.fallingArrows.shift();
                this.handleWinBeforeBubble();
            } else {
                this.handleMissedArrow();
                //this.handleLose();
            }
        } else {
            // this.handleLose();
        }

    }

    handleMissedArrow() {
        console.log('Missed arrow');
        // Implement miss logic (e.g., reduce health, shake screen)
    }
}