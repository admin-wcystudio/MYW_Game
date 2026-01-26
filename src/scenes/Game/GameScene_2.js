import { CustomButton } from '../../UI/Button.js';
import { CustomPanel, SettingPanel } from '../../UI/Panel.js';
import UIHelper from '../../UI/UIHelper.js';

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
        this.load.image('game2_npc_box1', `${path2}game2_npc_box1.png`);
        this.load.image('game2_npc_box2', `${path2}game2_npc_box2.png`);
        this.load.image('game2_npc_box3', `${path2}game2_npc_box3.png`);

        // --- 第一題 (Q1) ---
        this.load.image('game2_q1_question', `${path2}game2_q1_question.png`);
        this.load.image('game2_q1_question_title', `${path2}game2_q1_question_title.png`);
        this.load.image('game2_q1_additions', `${path2}game2_q1_additions.png`);
        this.load.image('game2_q1_a_button', `${path2}game2_q1_a_button.png`);
        this.load.image('game2_q1_a_button_select', `${path2}game2_q1_a_button_select.png`);
        this.load.image('game2_q1_b_button', `${path2}game2_q1_b_button.png`);
        this.load.image('game2_q1_b_button_select', `${path2}game2_q1_b_button_select.png`);
        this.load.image('game2_q1_c_button', `${path2}game2_q1_c_button.png`);
        this.load.image('game2_q1_c_button_select', `${path2}game2_q1_c_button_select.png`);
        this.load.image('game2_q1_d_button', `${path2}game2_q1_d_button.png`);
        this.load.image('game2_q1_d_button_select', `${path2}game2_q1_d_button_select.png`);

        // --- 第二題 (Q2) ---
        this.load.image('game2_q2_question', `${path2}game2_q2_question.png`);
        this.load.image('game2_q2_question_title', `${path2}game2_q2_question_title.png`);
        this.load.image('game2_q2_additions', `${path2}game2_q2_additions.png`);
        this.load.image('game2_q2_a_button', `${path2}game2_q2_a_button.png`);
        this.load.image('game2_q2_a_button_select', `${path2}game2_q2_a_button_select.png`);
        this.load.image('game2_q2_b_button', `${path2}game2_q2_b_button.png`);
        this.load.image('game2_q2_b_button_select', `${path2}game2_q2_b_button_select.png`);
        this.load.image('game2_q2_c_button', `${path2}game2_q2_c_button.png`);
        this.load.image('game2_q2_c_button_select', `${path2}game2_q2_c_button_select.png`);
        this.load.image('game2_q2_d_button', `${path2}game2_q2_d_button.png`);
        this.load.image('game2_q2_d_button_select', `${path2}game2_q2_d_button_select.png`);

        // --- 第三題 (Q3) ---
        this.load.image('game2_q3_question', `${path2}game2_q3_question.png`);
        this.load.image('game2_q3_question_title', `${path2}game2_q3_question_title.png`);
        this.load.image('game2_q3_additions', `${path2}game2_q3_additions.png`);
        this.load.image('game2_q3_a_button', `${path2}game2_q3_a_button.png`);
        this.load.image('game2_q3_a_button_select', `${path2}game2_q3_a_button_select.png`);
        this.load.image('game2_q3_b_button', `${path2}game2_q3_b_button.png`);
        this.load.image('game2_q3_b_button_select', `${path2}game2_q3_b_button_select.png`);
        this.load.image('game2_q3_c_button', `${path2}game2_q3_c_button.png`);
        this.load.image('game2_q3_c_button_select', `${path2}game2_q3_c_button_select.png`);
        this.load.image('game2_q3_d_button', `${path2}game2_q3_d_button.png`);
        this.load.image('game2_q3_d_button_select', `${path2}game2_q3_d_button_select.png`);

        // --- 第四題 (Q4) ---
        this.load.image('game2_q4_question', `${path2}game2_q4_question.png`);
        this.load.image('game2_q4_question_title', `${path2}game2_q4_question_title.png`);
        this.load.image('game2_q4_additions', `${path2}game2_q4_additions.png`);
        this.load.image('game2_q4_a_button', `${path2}game2_q4_a_button.png`);
        this.load.image('game2_q4_a_button_select', `${path2}game2_q4_a_button_select.png`);
        this.load.image('game2_q4_b_button', `${path2}game2_q4_b_button.png`);
        this.load.image('game2_q4_b_button_select', `${path2}game2_q4_b_button_select.png`);
        this.load.image('game2_q4_c_button', `${path2}game2_q4_c_button.png`);
        this.load.image('game2_q4_c_button_select', `${path2}game2_q4_c_button_select.png`);
        this.load.image('game2_q4_d_button', `${path2}game2_q4_d_button.png`);
        this.load.image('game2_q4_d_button_select', `${path2}game2_q4_d_button_select.png`);

        // --- 第五題 (Q5) ---
        this.load.image('game2_q5_question', `${path2}game2_q5_question.png`);
        this.load.image('game2_q5_additions', `${path2}game2_q5_additions.png`);
        this.load.image('game2_q5_a_button', `${path2}game2_q5_a_button.png`);
        this.load.image('game2_q5_a_button_select', `${path2}game2_q5_a_button_select.png`);
        this.load.image('game2_q5_b_button', `${path2}game2_q5_b_button.png`);
        this.load.image('game2_q5_b_button_select', `${path2}game2_q5_b_button_select.png`);
        this.load.image('game2_q5_c_button', `${path2}game2_q5_c_button.png`);
        this.load.image('game2_q5_c_button_select', `${path2}game2_q5_c_button_select.png`);
        this.load.image('game2_q5_d_button', `${path2}game2_q5_d_button.png`);
        this.load.image('game2_q5_d_button_select', `${path2}game2_q5_d_button_select.png`);
    }
    create() {
        const width = this.cameras.main.width;
        const height = this.cameras.main.height;

        this.add.image(width / 2, height / 2, 'game2_bg').setDepth(1);

        //==== timer
        this.gameTimer = UIHelper.showTimer(this, 30, false);

        // ====round status result
        const currentRound = 1;
        const roundStates = [
            { round: 1, content: 'game_gamechance', isSuccess: false },
            { round: 2, content: 'game_gamechance', isSuccess: false },
            { round: 3, content: 'game_gamechance', isSuccess: false }
        ];
        let space = 145;
        roundStates.forEach(data => {
            const stateImage = this.add.image(1900 - space, 225, data.content)
                .setScale(0.9)
                .setDepth(60);
            space += 145;
        })

        const descriptionPages = [
            {
                content: 'game2_description',
                nextBtn: 'next_button', nextBtnClick: 'next_button_click',
                prevBtn: null, prevBtnClick: null,
                closeBtn: 'close_button', closeBtnClick: 'close_button_click'
            }
        ];

        const programPages = [
            {
                content: 'program_information_p1',
                nextBtn: 'next_button', nextBtnClick: 'next_button_click',
                prevBtn: 'prev_button', prevBtnClick: 'prev_button_click',
                closeBtn: 'close_button', closeBtnClick: 'close_button_click'
            },
            {
                content: 'program_information_p2',
                nextBtn: 'next_button', nextBtnClick: 'next_button_click',
                prevBtn: 'prev_button', prevBtnClick: 'prev_button',
                closeBtn: 'close_button', closeBtnClick: 'close_button_click'
            },
            {
                content: 'program_information_p3',
                nextBtn: 'next_button', nextBtnClick: 'next_button_click',
                prevBtn: 'prev_button', prevBtnClick: 'prev_button',
                closeBtn: 'close_button', closeBtnClick: 'close_button_click'
            },
            {
                content: 'program_information_p4',
                nextBtn: 'next_button', nextBtnClick: 'next_button_click',
                prevBtn: 'prev_button', prevBtnClick: 'prev_button',
                closeBtn: 'close_button', closeBtnClick: 'close_button_click'
            }

        ]
        const introPage = [
            {
                content: 'gameintro_01',
                nextBtn: null, nextBtnClick: null,
                prevBtn: null, prevBtnClick: null,
                closeBtn: 'gameintro_closebutton', closeBtnClick: 'gameintro_closebutton_click'
            },
        ]

        const ui = UIHelper.createCommonUI(this, programPages, descriptionPages,
            200, 'gameintro_bag', 'gameintro_bag_click');

    }
}