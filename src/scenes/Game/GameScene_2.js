import { CustomButton } from '../../UI/Button.js';
import { CustomSinglePanel } from '../../UI/Panel.js';
import { QuestionPanel } from '../../UI/QuestionPanel.js';
import UIHelper from '../../UI/UIHelper.js';
import GameManager from '../GameManager.js';
import BaseGameScene from './BaseGameScene.js';

export class GameScene_2 extends BaseGameScene {
    constructor() {
        super('GameScene_2');
        this.depth = 10;
        this.roundPerSeconds = 30;
        this.targetRounds = 3; // 設定這款遊戲需要跑 3 回合
        this.sceneIndex = 2;
    }
    preload() {
        // 設定基礎路徑
        const path = 'assets/Game_2/';

        // --- 背景與介面 ---
        this.load.image('game2_bg', `${path}game2_bg.png`);

        this.load.image('game2_title', `${path}game2_title.png`);
        this.load.image('game2_description', `${path}game2_description.png`);
        this.load.image('game2_object_description', `${path}game2_object_description.png`);

        this.load.image('game2_confirm_button', `${path}game2_confirm_button.png`);
        this.load.image('game2_confirm_button_select', `${path}game2_confirm_button_select.png`);

        // --- NPC 對話框 ---
        this.load.image('game2_npc_box_intro', `${path}game2_npc_box1.png`);
        this.load.image('game2_npc_box_tryagain', `${path}game2_npc_box2.png`);
        this.load.image('game2_npc_box_win', `${path}game2_npc_box3.png`);

        // --- 第一題 (Q1) ---
        this.load.image('game2_q1_question', `${path}game2_q1_question.png`);
        this.load.image('game2_q1_question_title', `${path}game2_q1_question_title.png`);
        this.load.image('game2_q1_additions', `${path}game2_q1_additions.png`);
        this.load.image('game2_q1_a_button', `${path}game2_q1_a_button.png`);
        this.load.image('game2_q1_a_button_select', `${path}game2_q1_a_button_select.png`);
        this.load.image('game2_q1_b_button', `${path}game2_q1_b_button.png`);
        this.load.image('game2_q1_b_button_select', `${path}game2_q1_b_button_select.png`);
        this.load.image('game2_q1_c_button', `${path}game2_q1_c_button.png`);
        this.load.image('game2_q1_c_button_select', `${path}game2_q1_c_button_select.png`);
        this.load.image('game2_q1_d_button', `${path}game2_q1_d_button.png`);
        this.load.image('game2_q1_d_button_select', `${path}game2_q1_d_button_select.png`);

        // --- 第二題 (Q2) ---
        this.load.image('game2_q2_question', `${path}game2_q2_question.png`);
        this.load.image('game2_q2_question_title', `${path}game2_q2_question_title.png`);
        this.load.image('game2_q2_additions', `${path}game2_q2_additions.png`);
        this.load.image('game2_q2_a_button', `${path}game2_q2_a_button.png`);
        this.load.image('game2_q2_a_button_select', `${path}game2_q2_a_button_select.png`);
        this.load.image('game2_q2_b_button', `${path}game2_q2_b_button.png`);
        this.load.image('game2_q2_b_button_select', `${path}game2_q2_b_button_select.png`);
        this.load.image('game2_q2_c_button', `${path}game2_q2_c_button.png`);
        this.load.image('game2_q2_c_button_select', `${path}game2_q2_c_button_select.png`);
        this.load.image('game2_q2_d_button', `${path}game2_q2_d_button.png`);
        this.load.image('game2_q2_d_button_select', `${path}game2_q2_d_button_select.png`);

        // --- 第三題 (Q3) ---
        this.load.image('game2_q3_question', `${path}game2_q3_question.png`);
        this.load.image('game2_q3_question_title', `${path}game2_q3_question_title.png`);
        this.load.image('game2_q3_additions', `${path}game2_q3_additions.png`);
        this.load.image('game2_q3_a_button', `${path}game2_q3_a_button.png`);
        this.load.image('game2_q3_a_button_select', `${path}game2_q3_a_button_select.png`);
        this.load.image('game2_q3_b_button', `${path}game2_q3_b_button.png`);
        this.load.image('game2_q3_b_button_select', `${path}game2_q3_b_button_select.png`);
        this.load.image('game2_q3_c_button', `${path}game2_q3_c_button.png`);
        this.load.image('game2_q3_c_button_select', `${path}game2_q3_c_button_select.png`);
        this.load.image('game2_q3_d_button', `${path}game2_q3_d_button.png`);
        this.load.image('game2_q3_d_button_select', `${path}game2_q3_d_button_select.png`);

        // // --- 第四題 (Q4) ---
        this.load.image('game2_q4_question', `${path}game2_q4_question.png`);
        this.load.image('game2_q4_additions', `${path}game2_q4_additions.png`);
        this.load.image('game2_q4_a_button', `${path}game2_q4_a_button.png`);
        this.load.image('game2_q4_a_button_select', `${path}game2_q4_a_button_select.png`);
        this.load.image('game2_q4_b_button', `${path}game2_q4_b_button.png`);
        this.load.image('game2_q4_b_button_select', `${path}game2_q4_b_button_select.png`);
        this.load.image('game2_q4_c_button', `${path}game2_q4_c_button.png`);
        this.load.image('game2_q4_c_button_select', `${path}game2_q4_c_button_select.png`);
        this.load.image('game2_q4_d_button', `${path}game2_q4_d_button.png`);
        this.load.image('game2_q4_d_button_select', `${path}game2_q4_d_button_select.png`);

        // // --- 第五題 (Q5) ---
        this.load.image('game2_q5_question', `${path}game2_q5_question.png`);
        this.load.image('game2_q5_additions', `${path}game2_q5_additions.png`);
        this.load.image('game2_q5_a_button', `${path}game2_q5_a_button.png`);
        this.load.image('game2_q5_a_button_select', `${path}game2_q5_a_button_select.png`);
        this.load.image('game2_q5_b_button', `${path}game2_q5_b_button.png`);
        this.load.image('game2_q5_b_button_select', `${path}game2_q5_b_button_select.png`);
        this.load.image('game2_q5_c_button', `${path}game2_q5_c_button.png`);
        this.load.image('game2_q5_c_button_select', `${path}game2_q5_c_button_select.png`);
        this.load.image('game2_q5_d_button', `${path}game2_q5_d_button.png`);
        this.load.image('game2_q5_d_button_select', `${path}game2_q5_d_button_select.png`);
    }
    create() {
        this.initGame('game2_bg', 'game2_title', 'game2_description');
    }
    setupGameObjects() {
        if (this.questionPanel) {
            this.questionPanel.destroy();
            this.questionPanel = null;
        }

        const allQuestions = [
            {
                content: 'game2_q1_question',
                option: ['game2_q1_a_button', 'game2_q1_b_button', 'game2_q1_c_button', 'game2_q1_d_button'],
                answer: 0, addOn: 'game2_q1_additions'
            },
            {
                content: 'game2_q2_question',
                option: ['game2_q2_a_button', 'game2_q2_b_button', 'game2_q2_c_button', 'game2_q2_d_button'],
                answer: 0, addOn: 'game2_q2_additions'
            },
            {
                content: 'game2_q3_question',
                option: ['game2_q3_a_button', 'game2_q3_b_button', 'game2_q3_c_button', 'game2_q3_d_button'],
                answer: 3, addOn: 'game2_q3_additions'
            },
            {
                content: 'game2_q4_question',
                option: ['game2_q4_a_button', 'game2_q4_b_button', 'game2_q4_c_button', 'game2_q4_d_button'],
                answer: 1, addOn: 'game2_q4_additions'
            },
            {
                content: 'game2_q5_question',
                option: ['game2_q5_a_button', 'game2_q5_b_button', 'game2_q5_c_button', 'game2_q5_d_button'],
                answer: 2, addOn: 'game2_q5_additions'
            }
        ];

        this.titles = [
            'game2_q1_question_title',
            'game2_q2_question_title',
            'game2_q3_question_title'
        ];

        // 1. 隨機選 3 題
        const selectedQuestions = Phaser.Utils.Array.Shuffle(allQuestions).slice(0, 3);

        // 2. 建立 QuestionPanel，將邏輯全部交給它
        // 注意：我們把 titles 也傳進去，讓它自己換圖
        this.questionPanel = new QuestionPanel(this, selectedQuestions, this.titles, () => {
            // 當 3 題都答完時，Panel 會呼叫這個 callback
            this.handleWinBeforeBubble();
        });

        this.questionPanel.setDepth(559).setVisible(false);
    }

    enableGameInteraction(enable) {
        if (this.questionPanel) {
            this.questionPanel.setVisible(enable);
        }
    }

    resetForNewRound() {
        if (this.questionPanel) {
            this.questionPanel.destroy();
        }
        this.setupGameObjects(); // 重新抽題並建立 Panel
        this.questionPanel.setVisible(true);
    }

    showWin() {
        this.questionPanel.setVisible(false);
        this.time.delayedCall(1500, () => {
            const objectPanel = new CustomSinglePanel(this, 960, 600, 'game2_object_description');
            objectPanel.setDepth(1000).setVisible(true);
            objectPanel.setCloseCallBack(() => GameManager.backToMainStreet(this));
        });
    }

    checkAnswer() {
        if (this.selectedAnswerIndex === -1) return;

        const q = this.questions[this.currentIndex];

        if (this.selectedAnswerIndex === q.answer) {
            console.log("答對了");
            if (this.scene.gameTimer) this.scene.gameTimer.stop();

            // 更新 BaseGameScene UI
            if (this.scene.updateRoundUI) {
                this.scene.updateRoundUI(true);
                this.scene.roundIndex++;
            }

            this.showAddOn(q.addOn);
        } else {
            console.log("答錯了");
        }

    }

    showAddOn(addOnKey) {
        this.optionButtons.forEach(btn => btn.setVisible(false));

        const addOnImg = this.scene.add.image(0, -50, addOnKey)
            .setInteractive({ useHandCursor: true });
        this.add(addOnImg);

        addOnImg.once('pointerdown', () => {
            addOnImg.destroy();
            this.nextQuestion();
        });
    }

    nextQuestion() {
        this.currentIndex++;
        if (this.currentIndex < this.questions.length) {
            // 這裡呼叫 Base 的計時器重置邏輯
            if (this.scene.gameTimer) {
                this.scene.gameTimer.reset(this.scene.roundPerSeconds);
                this.scene.gameTimer.start();
            }
            this.showQuestion();
        } else {
            this.destroy();
            if (this.onComplete) this.onComplete();
        }
    }
}