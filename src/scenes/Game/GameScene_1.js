import { CustomButton } from '../../UI/Button.js';
import { CustomPanel, SettingPanel } from '../../UI/Panel.js';
import UIHelper from '../../UI/UIHelper.js';

export class GameScene_1 extends Phaser.Scene {
    constructor() {
        super('GameScene_1');
    }

    preload() {
        // 設定基礎路徑
        const path = 'assets/Game_1/';

        // --- 背景與介面 ---
        this.load.image('game1_bg', `${path}game1_bg.png`);
        this.load.image('game1_timer', `${path}game1_timer.png`);
        this.load.image('game1_title', `${path}game1_title.png`);
        this.load.image('game1_rotate', `${path}game1_rotate.png`);
        this.load.image('game1_description', `${path}game1_description.png`);
        this.load.image('game1_object_description', `${path}game1_object_description.png`);

        // --- NPC 對話框 ---
        this.load.image('game1_npc_box1', `${path}game1_npc_box1.png`);
        this.load.image('game1_npc_box2', `${path}game1_npc_box2.png`);
        this.load.image('game1_npc_box3', `${path}game1_npc_box3.png`);
        this.load.image('game1_npc_box4', `${path}game1_npc_box4.png`);
        this.load.image('game1_npc_box5', `${path}game1_npc_box5.png`);

        // --- 拼圖物件 ---
        this.load.image('game1_puzzle1', `${path}game1_puzzle1.png`);
        this.load.image('game1_puzzle2', `${path}game1_puzzle2.png`);
        this.load.image('game1_puzzle3', `${path}game1_puzzle3.png`);
        this.load.image('game1_puzzle4', `${path}game1_puzzle4.png`);
        this.load.image('game1_puzzle5', `${path}game1_puzzle5.png`);
        this.load.image('game1_puzzle6', `${path}game1_puzzle6.png`);

        this.load.video('game1_success_preview', `${path}game1_success_preview.webm`);
    }

    create() {
        const width = this.cameras.main.width;
        const height = this.cameras.main.height;
        
        // ====background
        this.add.image(width / 2, height / 2, 'game1_bg').setDepth(1);

        //====puzzles
        const defaultpuzzles = [
            { content: 'game1_puzzle1', offsetX: 0, offsetY: 0, rotate: 0 },
            { content: 'game1_puzzle2', offsetX: 0, offsetY: 0, rotate: 0 },
            { content: 'game1_puzzle3', offsetX: 0, offsetY: 0, rotate: 0 },
            { content: 'game1_puzzle4', offsetX: 0, offsetY: 0, rotate: 0 },
            { content: 'game1_puzzle5', offsetX: 0, offsetY: 0, rotate: 0 },
            { content: 'game1_puzzle6', offsetX: 0, offsetY: 0, rotate: 0 }
        ];

        this.randomPuzzlePosition(defaultpuzzles);

        defaultpuzzles.forEach(data => {
            const piece = this.add.image(data.offsetX, data.offsetY, data.content)
                .setAngle(data.rotate) 
                .setInteractive({ draggable: true })
                .setDepth(50);
            
            piece.on('pointerdown', () => {
                piece.angle += 90; 
            }); 
        });

        // ====round status result
        const currentRound = 1; 
        const roundStates = [
            { round: 1 , content : 'game_gamechance' , isSuccess : false},
            { round: 2 , content : 'game_gamechance' , isSuccess : false},
            { round: 3 , content : 'game_gamechance' , isSuccess : false}
        ];
        let space = 145;
        roundStates.forEach(data => {
            const stateImage = this.add.image(1900 -space, 225  , data.content)
            .setScale(0.9)
            .setDepth(60);
            space += 145;
        })


        //==== timer
        this.gameTimer = UIHelper.showTimer(this, 30, false);


        //====panel

        const descriptionPages = [
            {
                content: 'game1_description',
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
    update () {
        
    }

    randomPuzzlePosition(puzzles) {
        const centerX = this.cameras.main.width / 2;
        const centerY = this.cameras.main.height / 2;
        const allowedRotations = [90, 180, 270, 360];

        // 2. 修正迴圈條件：i < puzzles.length (避免 index out of bounds)
        for (let i = 0; i < puzzles.length; i++) {
            // 隨機產生 -50 到 50 的偏移量
            let randomX = Phaser.Math.Between(-300, 300);
            let randomY = Phaser.Math.Between(-400, 400);
            
            let randomRotate = Phaser.Utils.Array.GetRandom(allowedRotations);

            // 賦值
            puzzles[i].offsetX = centerX + randomX;
            puzzles[i].offsetY = centerY + randomY;
            puzzles[i].rotate = randomRotate;
        }
    }
}