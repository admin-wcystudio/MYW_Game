import { CustomButton } from '../../UI/Button.js';
import { CustomPanel, SettingPanel } from '../../UI/Panel.js';
import { QuestionPanel } from '../../UI/QuestionPanel.js';
import UIHelper from '../../UI/UIHelper.js';
import GameManager from '../GameManager.js';

export class GameScene_2 extends Phaser.Scene {
    constructor() {
        super('GameScene_2');
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
        this.load.image('game2_npc_box1', `${path}game2_npc_box1.png`);
        this.load.image('game2_npc_box2', `${path}game2_npc_box2.png`);
        this.load.image('game2_npc_box3', `${path}game2_npc_box3.png`);

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
        // this.load.image('game2_q4_question', `${path}game2_q4_question.png`);
        // this.load.image('game2_q4_question_title', `${path}game2_q4_question_title.png`);
        // this.load.image('game2_q4_additions', `${path}game2_q4_additions.png`);
        // this.load.image('game2_q4_a_button', `${path}game2_q4_a_button.png`);
        // this.load.image('game2_q4_a_button_select', `${path}game2_q4_a_button_select.png`);
        // this.load.image('game2_q4_b_button', `${path}game2_q4_b_button.png`);
        // this.load.image('game2_q4_b_button_select', `${path}game2_q4_b_button_select.png`);
        // this.load.image('game2_q4_c_button', `${path}game2_q4_c_button.png`);
        // this.load.image('game2_q4_c_button_select', `${path}game2_q4_c_button_select.png`);
        // this.load.image('game2_q4_d_button', `${path}game2_q4_d_button.png`);
        // this.load.image('game2_q4_d_button_select', `${path}game2_q4_d_button_select.png`);

        // // --- 第五題 (Q5) ---
        // this.load.image('game2_q5_question', `${path}game2_q5_question.png`);
        // this.load.image('game2_q5_additions', `${path}game2_q5_additions.png`);
        // this.load.image('game2_q5_a_button', `${path}game2_q5_a_button.png`);
        // this.load.image('game2_q5_a_button_select', `${path}game2_q5_a_button_select.png`);
        // this.load.image('game2_q5_b_button', `${path}game2_q5_b_button.png`);
        // this.load.image('game2_q5_b_button_select', `${path}game2_q5_b_button_select.png`);
        // this.load.image('game2_q5_c_button', `${path}game2_q5_c_button.png`);
        // this.load.image('game2_q5_c_button_select', `${path}game2_q5_c_button_select.png`);
        // this.load.image('game2_q5_d_button', `${path}game2_q5_d_button.png`);
        // this.load.image('game2_q5_d_button_select', `${path}game2_q5_d_button_select.png`);
    }
    create() {
        const width = this.cameras.main.width;
        const height = this.cameras.main.height;
        const centerX = this.cameras.main.width / 2;
        const centerY = this.cameras.main.height / 2;

        this.maxChances = 3;
        this.currentRound = 0;

        const gender = localStorage.getItem('player') ? JSON.parse(localStorage.getItem('player')).gender : 'M';
        this.loadBubble(0);

        //====panel=====================================================
        const descriptionPages = [
            {
                content: 'game2_description',
                nextBtn: null, nextBtnClick: null,
                prevBtn: null, prevBtnClick: null,
                closeBtn: 'close_button', closeBtnClick: 'close_button_click'
            }
        ];

        const descriptionPanel = new CustomPanel(this, 960, 540, descriptionPages);
        descriptionPanel.setVisible(false);
        descriptionPanel.setDepth(100);

        const gameUI = GameManager.createGameCommonUI(this, 'game2_bg', 'game2_title', descriptionPages);

        //== timer=====================================================
        this.gameTimer = UIHelper.showTimer(this, 5, false, () => {
            this.handleTimeUp(gameUI);
        });

        const questions = [
            {
                content: 'game2_q1_question',
                title: 'game2_q1_question_title',
                option: ['game2_q1_a_button', 'game2_q1_b_button', 'game2_q1_c_button', 'game2_q1_d_button'],
                answer: 2,
                addOn: 'game2_q1_additions',
            },
            {
                content: 'game2_q2_question',
                title: 'game2_q2_question_title',
                option: ['game2_q2_a_button', 'game2_q2_b_button', 'game2_q2_c_button', 'game2_q2_d_button'],
                answer: 0,
                addOn: 'game2_q2_additions',
            },
            {
                content: 'game2_q3_question',
                title: 'game2_q3_question_title',
                option: ['game2_q3_a_button', 'game2_q3_b_button', 'game2_q3_c_button', 'game2_q3_d_button'],
                answer: 3,
                addOn: 'game2_q3_additions',
            }
        ];

        const questionPanel = new QuestionPanel(this, questions, () => {
            console.log("所有題目完成！");
        });
        questionPanel.setDepth(500);
    }

    loadBubble(index = 0) {
        const centerX = this.cameras.main.width / 2;
        const centerY = 900; // 對話框固定的 Y 座標

        const npc_bubbles = [
            'game2_npc_box1',
            'game2_npc_box2',
            'game2_npc_box3'
        ];

        let currentBubbleImg = this.add.image(centerX, centerY, npc_bubbles[index])
            .setDepth(200) // 確保在拼圖之上
            .setScrollFactor(0) // 固定在螢幕
            .setInteractive({ useHandCursor: true });

        currentBubbleImg.on('pointerdown', () => {
            currentBubbleImg.off('pointerdown');
            currentBubbleImg.once('pointerdown', () => {
                currentBubbleImg.destroy();
                this.startGameLogic();
            });
        });

        this.tweens.add({
            targets: currentBubbleImg,
            scale: { from: 0.5, to: 1 },
            duration: 200,
            ease: 'Back.easeOut'
        });
        console.log("Load bubble: " + npc_bubbles[index]);
    }

    startGameLogic() {
        console.log("Start game logic for GameScene_2");
        // 在這裡加入遊戲邏輯的實作
    }
}