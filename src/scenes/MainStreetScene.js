import { CustomButton } from '../UI/Button.js';
import UIHelper from '../UI/UIHelper.js';
import { CustomPanel, SettingPanel } from '../UI/Panel.js';
import NpcHelper from '../Character/NpcHelper.js';

export class MainStreetScene extends Phaser.Scene {
    constructor() {
        super('MainStreetScene');
    }
    create() {

        const width = this.cameras.main.width;
        const height = this.cameras.main.height;

        const gender = localStorage.getItem('player') ? JSON.parse(localStorage.getItem('player')).gender : 'M';
        const genderKey = gender === 'M' ? 'boy' : 'girl';

        const bgKeys = ['stage1', 'stage2', 'stage3', 'stage4'];
        let currentX = 0;
        //background
        bgKeys.forEach((key, index) => {
            const bg = this.add.image(currentX, 540, key).setOrigin(0, 0.5).setDepth(1);
            currentX += bg.width; // 累加寬度，讓下一張接在後面
        });

        // 設定相機邊界為總長度 8414px
        this.cameras.main.setBounds(0, 0, 8414, 1080);



        const descriptionPages = [
            {
                content: 'game_description_p1',
                nextBtn: 'next_button', nextBtnClick: 'next_button_click',
                prevBtn: null, prevBtnClick: null,
                closeBtn: 'close_button', closeBtnClick: 'close_button_click'
            },
            {
                content: 'game_description_p2',
                nextBtn: 'next_button', nextBtnClick: 'next_button_click',
                prevBtn: 'prev_button', prevBtnClick: 'prev_button',
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

        const introPanel = new CustomPanel(this, 960, 620, introPage);

        //buttons
        this.isLeftDown = false;
        this.isRightDown = false;

        this.btnLeft = new CustomButton(this, 150, height/2, 'prev_button', 'prev_button_click', 
            () => { this.isLeftDown = true; },  
            () => { this.isLeftDown = false; } 
        ).setScrollFactor(0).setDepth(100);

        this.btnRight = new CustomButton(this, width - 150, height /2, 'next_button', 'next_button_click', 
            () => { this.isRightDown = true; }, 
            () => { this.isRightDown = false; }
        ).setScrollFactor(0).setDepth(100);


        //introPanel.setDepth(100);
        //this.gameTimer = UIHelper.showTimer(this, 180, false);

        const ui = UIHelper.createCommonUI(this, programPages, descriptionPages, 200, 'gameintro_bag', 'gameintro_bag_click');

        // NPCs
        NpcHelper.createNpc(this, 900, 300, 1200, 180, 0.8, 1, 'npc1', true, 'npc1_bubble_1', false, 6);
        NpcHelper.createNpc(this, 330, 650, 1200, 180, 1, 1, 'npc4', false, 6);


        this.player = NpcHelper.createCharacter(this, 600, 400, 400, 650, 1, 1, `${genderKey}_idle`, true, 'player_bubble_1', true, 50);
        this.handleAnimation(genderKey, false, false);

        // 將相機鎖定在玩家身上
        this.cameras.main.startFollow(this.player, true, 0.1, 0.1);
    }

    update() {
        const speed = 5;
        let isMoving = false;
        let isLeft = this.player.lastDirectionLeft; // 保持最後的方向狀態

        // 純按鈕判定
        if (this.isLeftDown) {
            this.player.x -= speed;
            isLeft = true;
            isMoving = true;
        } else if (this.isRightDown) {
            this.player.x += speed;
            isLeft = false;
            isMoving = true;
        }else {
            isLeft = false;
            isMoving =false;
        }

        // 紀錄最後方向供 handleAnimation 使用
        this.player.lastDirectionLeft = isLeft;

        const playerData = localStorage.getItem('player');
        const gender = playerData ? JSON.parse(playerData).gender : 'M';
        const genderKey = gender === 'M' ? 'boy' : 'girl';

        this.handleAnimation(genderKey, isMoving, isLeft);


        this.player.x = Phaser.Math.Clamp(this.player.x, 100, 8314);

        if (this.player.bubble) {
            const offsetX = isLeft ? -Math.abs(this.player.bubbleOffset.x) : Math.abs(this.player.bubbleOffset.x);
            this.player.bubble.x = this.player.x + offsetX;
            this.player.bubble.y = this.player.y + this.player.bubbleOffset.y;
        }
    }

    handleAnimation(gender, isMoving, isLeft) {
        const walkKey = isLeft ? `${gender}_left_walk` : `${gender}_right_walk`;
        const idleKey = `${gender}_idle`;

        // 檢查 videoKey (這是我們手動存在物件裡的屬性)
        if (isMoving && this.player.videoKey !== walkKey) {
            this.changePlayerVideo(walkKey);
        } else if (!isMoving && this.player.videoKey !== idleKey) {
            this.changePlayerVideo(idleKey);
        }
    }

    changePlayerVideo(key) {
        this.player.stop();
        this.player.changeSource(key); // 更換影片源
        this.player.play(true);
        this.player.videoKey = key;
    }

}