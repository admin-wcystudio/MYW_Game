import { CustomButton } from '../UI/Button.js';
import { CustomPanel, SettingPanel } from '../UI/Panel.js';
import UIHelper from '../UI/UIHelper.js';

export class LoginScene extends Phaser.Scene {
    constructor() {
        super('LoginScene');
    }

    create() {
        this.bgVideo = this.add.video(960, 540, 'login_bg_video');
        this.bgVideo.setMute(false);
        this.bgVideo.play(true); // loop

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

        const ui = UIHelper.createCommonUI(this, programPages, descriptionPages,);

        this.add.image(960, 150, 'login_namebar').setDepth(10);

        const width = 350;
        const height = 50;


        this.nameInput = this.add.rexInputText(1080, 190, width, height, {
            type: 'text',
            placeholder: '_',
            fontSize: '48px',
            color: '#fbb03b',
            fontFamily: 'Arial',
            fontWeight: 'bold',
            backgroundColor: 'transparent'
        }).setDepth(20);

        this.nameInput.on('textchange', (inputText) => {
            console.log("現在的名字是:", inputText.text);
        });

        this.selectedGender = 'M';

        this.video = this.add.video(620, 540, 'boy_galaxy')
            .play(true)
            .setDepth(10)
            .setScrollFactor(0);


        var boyVideo = this.video;

        this.video = this.add.video(1300, 560, 'girl_galaxy')
            .play(true)
            .setDepth(10)
            .setScrollFactor(0);

        var girlVideo = this.video;

        this.add.image(340, 350, 'bubble1').setDepth(11);
        this.add.image(1650, 360, 'bubble2').setDepth(11);

        const boyBtn = new CustomButton(
            this, 620, 950,
            'login_boy_btn', 'login_boy_btn_click',
            () => {
                this.savePlayerInfo('M', boyVideo);
                girlVideo.setVisible(true).resume();

            }, () => { });

        const girlBtn = new CustomButton(
            this, 1300, 950,
            'login_girl_btn', 'login_girl_btn_click',
            () => {
                this.savePlayerInfo('F', girlVideo);
                boyVideo.setVisible(true).resume();
            }, () => { });

    }

    savePlayerInfo(gender, defaultVideo) {
        const playerName = this.nameInput.text;

        if (!playerName || playerName.trim() === "") {
            UIHelper.showToast(this, "請先輸入名字"); // 使用 Helper 提示
            return;
        }

        // 儲存資料
        const player = { name: playerName, gender: gender };
        localStorage.setItem('player', JSON.stringify(player));

        // 定義影片 Key (根據你 BootScene 載入嘅名)
        const transitionKey = (gender === 'M') ? 'boy_transition' : 'girl_transition';
        const loopKey = (gender === 'M') ? 'boy_chinese' : 'girl_chinese';
        const posX = (gender === 'M') ? 620 : 1300; // 根據角色位置播放
        const posY = (gender === 'M') ? 540 : 560;

        defaultVideo.setVisible(false).pause();
        // 呼叫 UIHelper 執行切換邏輯
        this.activeVideo = UIHelper.switchVideo(
            this,
            this.activeVideo,
            transitionKey,
            loopKey,
            posX,
            posY,
            4000, // 過場時間
            (newVideo) => { this.activeVideo = newVideo; }
        );

        // 延遲後轉 Scene (可選)
        /*
        this.time.delayedCall(3000, () => {
            this.scene.start('MainStreetScene');
        });
        */
    }

}