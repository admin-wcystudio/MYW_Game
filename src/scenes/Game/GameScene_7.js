import { CustomButton } from '../../UI/Button.js';
import { CustomDescriptionPanel, CustomPanel, CustomSinglePanel, SettingPanel } from '../../UI/Panel.js';
import { QuestionPanel_7 } from '../../UI/QuestionPanel.js';
import UIHelper from '../../UI/UIHelper.js';
import BaseGameScene from './BaseGameScene.js';

export class GameScene_7 extends BaseGameScene {
    constructor() {
        super('GameScene_7');
        this.roundPerSeconds = 0; // Disable Timer
        this.targetRounds = 0;
        this.roundIndex = 0;
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
            this.load.image(`game7_question${i}`, `${path}game7_game7_question${i}.png`);
        }

        // Question Buttons (Q1 - Q3 use _click, Q4 uses _select)
        const options = ['a', 'b', 'c', 'd'];
        for (let q = 1; q <= 4; q++) {
            options.forEach(opt => {
                this.load.image(`game7_q${q}_${opt}_button`, `${path}game7_game7_q${q}_${opt}_button.png`);
                this.load.image(`game7_q${q}_${opt}_button_click`, `${path}game7_game7_q${q}_${opt}_button_click.png`);
            });
        }

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
        this.initGame('game7_bg', 'game7_title', 'game7_description', 10, true, false);
    }


    startGame() {
        console.log('Start Game');
        this.isGameActive = true;
        this.enableGameInteraction(true);
    }

    setupGameObjects() {

        this.introBubbles = ['game7_npc_box1', 'game7_npc_box2', 'game7_npc_box4'];
        const allQuestions = [
            {
                content: 'game7_question1',
                option: ['game7_q1_a_button', 'game7_q1_b_button', 'game7_q1_c_button', 'game7_q1_d_button'],
                answer: 0
            },
            {
                content: 'game7_question2',
                option: ['game7_q2_a_button', 'game7_q2_b_button', 'game7_q2_c_button', 'game7_q2_d_button'],
                answer: 0
            },
            {
                content: 'game7_question3',
                option: ['game7_q3_a_button', 'game7_q3_b_button', 'game7_q3_c_button', 'game7_q3_d_button'],
                answer: 3
            },
            {
                content: 'game7_question4',
                option: ['game7_q4_a_button', 'game7_q4_b_button', 'game7_q4_c_button', 'game7_q4_d_button'],
                answer: 2
            }
        ];

        this.questionPanel = new QuestionPanel_7(this, allQuestions,
            () => this.handleWin(), () => this.handleLose())
            .setDepth(20).setVisible(false);
        this.sceneGroup = this.add.group();
        this.currentBubbleImg = this.add.image(960, 900, this.introBubbles[this.roundIndex])
            .setDepth(20)
            .setVisible(false)
            .setInteractive({ useHandCursor: true });
        this.currentBubbleImg.on('pointerdown', () => {
            this.handleIntroBubbleClick();
        });

        this.sceneGroup.add(this.currentBubbleImg);
        this.currentVideo = this.add.video(960, 540, 'game7_scene1').setDepth(19).setVisible(false);
        this.sceneGroup.add(this.currentVideo);

        if (this.gameUI && this.gameUI.descriptionPanel) {
            this.gameUI.descriptionPanel.onClose = () => {
                this.startGame();
            }

        }
    }

    enableGameInteraction(enabled) {
        this.currentBubbleImg.setVisible(enabled);

        this.currentVideo.setVisible(enabled);
        this.currentVideo.play(enabled);
    }

    handleIntroBubbleClick() {
        if (!this.isGameActive) return;

        console.log(`Intro Bubble Clicked: Round ${this.roundIndex}`);
        if (this.introBubbles.length > 0 && this.roundIndex < 3) {
            this.roundIndex++;
            this.currentBubbleImg.setTexture(this.introBubbles[this.roundIndex]);
        }
        if (this.roundIndex + 1 >= 3) {
            this.startQuestion();
            console.log('All intro bubbles done, starting questions');
        }
    }
    handleMiddlePreview() {
        this.questionPanel.setVisible(false);
        this.currentBubbleImg.setTexture('game7_npc_box3').setVisible(true);
        this.currentVideo = this.add.video(960, 540, 'game7_scene2').setDepth(19).setVisible(true);
        this.currentVideo.play(true);
    }
    startQuestion() {
        this.currentBubbleImg.setVisible(false);
        this.currentVideo.setVisible(false);
        this.questionPanel.setVisible(true);
    }

    handleWin() {
        this.questionPanel.setVisible(false);

        if (this.currentVideo) {
            this.currentVideo.destroy();
        }
        this.currentVideo = this.add.video(960, 540, 'game7_scene3').setDepth(19).setVisible(true);
        this.currentVideo.play(false);

        const ending1 = new CustomSinglePanel(this, 960, 540, 'game7_ending1', () => {
            ending2.setVisible(true);
        }).setDepth(30).setVisible(false);
        const ending2 = new CustomSinglePanel(this, 960, 540, 'game7_ending2', () => {
        }).setDepth(30).setVisible(false);

        this.add.existing(ending1);
        this.add.existing(ending2);

        this.currentVideo.once('complete', () => {
            this.currentVideo.setVisible(false);
            ending1.setVisible(true);
        });
    }

    handleLose() {
        this.questionPanel.setVisible(false);
        this.currentVideo.setVisible(false);
        if (this.gameState === 'lose') return;
        this.isGameActive = false;
        this.gameState = 'lose';
        this.enableGameInteraction(false);
        this.showFailPanel();
    }

    resetWholeGame() {
        console.log('重置整個遊戲');
        this.roundIndex = 0;
        this.scene.restart();
    }


}