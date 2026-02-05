import { CustomButton } from '../../UI/Button.js';
import { CustomPanel, SettingPanel, CustomSinglePanel, CustomDescriptionPanel } from '../../UI/Panel.js';
import UIHelper from '../../UI/UIHelper.js';
import BaseGameScene from './BaseGameScene.js';
import GameManager from '../GameManager.js';

export class GameScene_4 extends BaseGameScene {
    constructor() {
        super('GameScene_4');
        this.roundPerSeconds = 30; // Usually 60-90s is better for math
        this.targetRounds = 2;
        this.sceneIndex = 4;
    }

    preload() {
        const path = 'assets/Game_4/';
        this.load.image('game4_bg', `${path}game4_bg.png`);
        this.load.image('game4_title', `${path}game4_title.png`);
        this.load.image('game4_description', `${path}game4_description.png`);
        this.load.image('game4_object_description', `${path}game4_object_description.png`);
        this.load.image('game4_object_description2', `${path}game4_object_description2.png`);
        this.load.image('game4_input', `${path}game4_box.png`);
        this.load.image('game4_npc_box_intro', `${path}game4_npc_box1.png`); // Corrected key for BaseGameScene
        this.load.image('game4_npc_box_win', `${path}game4_npc_box1.png`);
        this.load.image('game4_npc_box_tryagain', `${path}game4_npc_box2.png`);

        for (let i = 0; i <= 9; i++) {
            this.load.image(`game4_${i}_button`, `${path}game4_${i}_button.png`);
            this.load.image(`game4_${i}_button_select`, `${path}game4_${i}_button_select.png`);
        }
        this.load.image('game4_confirm_button', `${path}game4_q_confirm_button.png`);
        this.load.image('game4_confirm_button_select', `${path}game4_q_confirm_button_select.png`);
        this.load.image('game4_q_bg', `${path}game4_q_bg.png`);
        for (let i = 1; i <= 8; i++) {
            this.load.image(`game4_q${i}`, `${path}game4_q${i}.png`);
        }
    }

    create() {
        // Change skipIntroBubble to false if you want the tutorial bubble first
        this.initGame('game4_bg', 'game4_title', 'game4_description', 10, true);
    }

    setupGameObjects() {
        const allQuestions = [
            { content: 'game4_q1', answer: 16 },
            { content: 'game4_q2', answer: 6 },
            { content: 'game4_q3', answer: 9 },
            { content: 'game4_q4', answer: 700 },
            { content: 'game4_q5', answer: 3 },
            { content: 'game4_q6', answer: 500 },
            { content: 'game4_q7', answer: 14 },
            { content: 'game4_q8', answer: 75 },
        ];

        // Shuffle and select questions once per game session
        if (!this.selectedQuestions) {
            this.selectedQuestions = Phaser.Utils.Array.Shuffle(allQuestions).slice(0, this.targetRounds);
        }

        // Pass current question based on BaseGameScene's roundIndex
        let currentQ = this.selectedQuestions[this.roundIndex];

        this.calculationPanel = new CalculationPanel(
            this,
            currentQ,
            () => this.handleLose(), // Link to BaseGameScene
            () => this.handleWinBeforeBubble() // Link to BaseGameScene
        );
        this.calculationPanel.setDepth(500);
    }

    enableGameInteraction(enable) {
        if (this.calculationPanel) this.calculationPanel.setVisible(enable);
    }

    resetForNewRound() {
        if (this.calculationPanel) {
            this.calculationPanel.destroy();
        }
        this.setupGameObjects();
    }

    showWin() {
        const descriptionPages = ['game4_object_description', 'game4_object_description2'];
        const objectPanel = new CustomDescriptionPanel(this, 960, 600, descriptionPages, () => GameManager.backToMainStreet(this));
        objectPanel.setDepth(1000).setVisible(true);
    }
}

export class CalculationPanel extends Phaser.GameObjects.Container {
    constructor(scene, questionData, onFail, onComplete) {
        super(scene, 960, 600);
        this.scene = scene;
        this.questionData = questionData;
        this.onFail = onFail;
        this.onComplete = onComplete;

        // Background and Content
        this.bg = scene.add.image(0, 0, 'game4_q_bg');
        this.content = scene.add.image(0, -100, questionData.content);
        this.add([this.bg, this.content]);

        // Number Buttons (0-9)
        for (let i = 0; i <= 9; i++) {
            const x = (i * 110) - 500;
            const y = 100;
            const btn = new CustomButton(scene, x, y, `game4_${i}_button`, `game4_${i}_button_select`, () => {
                this.answerInput.text += i.toString();
            });
            this.add(btn);
        }

        // Input Box
        this.inputBox = scene.add.image(0, 220, 'game4_input');
        this.add(this.inputBox);

        this.answerInput = scene.add.rexInputText(960, 820, 300, 50, {
            type: 'text',
            placeholder: '',
            fontSize: '48px',
            color: '#000000',
            align: 'center',
            fontFamily: 'Arial',
            backgroundColor: 'transparent'
        }).setDepth(600);

        this.answerInput.on('textchange', (inputText) => {
            const filtered = inputText.text.replace(/\D/g, '');
            if (filtered !== inputText.text) {
                inputText.setText(filtered);
            }
        });

        this.confirmBtn = new CustomButton(scene, 0, 330, 'game4_confirm_button', 'game4_confirm_button_select', () => {
            this.checkAnswer();
        });
        this.add(this.confirmBtn);

        scene.add.existing(this);
    }

    setVisible(value) {
        super.setVisible(value);
        if (this.answerInput) {
            this.answerInput.setVisible(value);
            // Also disable interactivity to be safe when hidden
            if (value) {
                this.answerInput.setInteractive();
            } else {
                this.answerInput.disableInteractive();
            }
        }
        return this;
    }

    checkAnswer() {
        const playerInput = this.answerInput.text.trim();


        if (playerInput === this.questionData.answer.toString()) {
            console.log('Correct answer!');
            // Correct answer logic
            this.confirmBtn.disableInteractive();
            const successIcon = this.scene.add.image(250, 220, 'game_success').setScale(0.8);
            this.add(successIcon);

            this.scene.time.delayedCall(1000, () => {
                this.onComplete();
                this.inputBox.setVisible(false);
                // Triggers BaseGameScene's bubble/next round
            });
        } else {
            console.log('Wrong answer!' + `(Input: ${playerInput}, Answer: ${this.questionData.answer})`);
            // Wrong answer logic
            this.onFail();
        }
    }

    // Clean up DOM element when container is destroyed
    destroy(fromScene) {
        if (this.answerInput) this.answerInput.destroy();
        super.destroy(fromScene);
    }
}