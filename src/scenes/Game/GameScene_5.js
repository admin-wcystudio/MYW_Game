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
        console.log("Game 5 - Can Play:", this.canPlay);
        // if (this.gameResult_1 && this.gameResult_1.isFinished &&
        //     this.gameResult_4 && this.gameResult_4.isFinished) {
        //     this.canPlay = true;
        //     this.initGame('game5_bg', 'game5_title', 'game5_description', 10, true);
        // } else {
        //     this.add.image(960, 540, 'game5_bg');
        //     this.showBubble('lock');
        // }

        this.isHit = false;
        this.isValid = false;
        this.arrowSpeed = 8;
        this.add.image(960, 540, 'game5_bar').setDepth(20);
        this.arrow = this.add.image(800, 340, 'game5_target_arrow').setDepth(20);
        this.targetArea = this.add.image(700, 540, 'game5_target_area').setDepth(21);
        const hitButton = new CustomButton(this, 1720, 880, 'game5_hit_button', 'game5_hit_button_select', () => {
            if (!this.isHit) {
                this.handleHit();
            }
        }).setDepth(20);

        this.initGame('game5_bg', 'game5_title', 'game5_description', 10, true);
    }

    setupGameObjects() {
        let randomX = Phaser.Math.Between(600, 1300);
        console.log("Target Position:", randomX, 540);
        this.targetArea.setPosition(randomX, 540);
    }

    update() {
        if (!this.arrow || this.isHit) return;

        // Bouncing logic
        this.arrow.x += this.arrowSpeed;

        // Bar range approximation (480 to 1440)
        if (this.arrow.x >= 1420) {
            this.arrow.x = 1420;
            this.arrowSpeed = -Math.abs(this.arrowSpeed); // Turn left
        } else if (this.arrow.x <= 500) {
            this.arrow.x = 500;
            this.arrowSpeed = Math.abs(this.arrowSpeed); // Turn right
        }
    }

    resetForNewRound() {
        this.isHit = false;
        this.arrow.x = 800;
        this.setupGameObjects();
    }

    playFeedback() {
        this.video = this.add.video(960, 440,
            this.isSuccess ? 'game5_success_preview' : 'game5_fail_preview').setDepth(200).setScrollFactor(0);

        this.video.play();
    }


    showWin() {
        const descriptionPages = ['game5_object_description'];
        const objectPanel = new CustomDescriptionPanel(this, 960, 600, descriptionPages, () => GameManager.backToMainStreet(this));
        objectPanel.setDepth(1000).setVisible(true);
    }

    handleHit() {
        this.isHit = true;
        console.log("Hit button clicked!");

        const halfWidth = this.targetArea.width * this.targetArea.scaleX / 2;
        const minX = this.targetArea.x - halfWidth;
        const maxX = this.targetArea.x + halfWidth;

        if (this.arrow.x >= minX && this.arrow.x <= maxX) {
            this.handleWinBeforeBubble();
        } else {
            this.handleLose();
        }
    }
}