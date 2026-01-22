import { CustomButton } from '../UI/Button.js';
import { createCommonUI } from '../UI/UIHelper.js';
import { CustomPanel, SettingPanel } from '../UI/Panel.js';

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

        createCommonUI(this, programPages, descriptionPages);

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

        this.video = this.add.video(1300, 560, 'girl_galaxy')
                            .play(true)
                            .setDepth(10)
                            .setScrollFactor(0);

        this.add.image(340, 350,'bubble1').setDepth(11);
        this.add.image(1650, 360,'bubble2').setDepth(11);

        const boyBtn = new CustomButton(
            this, 620, 950,
            'login_boy_btn', 'login_boy_btn_click',
            () => {
                this.selectedGender = 'M';
                this.savePlayerInfo();
            }, () => { });

        const girlBtn = new CustomButton(
            this, 1300, 950,
            'login_girl_btn', 'login_girl_btn_click',
            () => {
                this.selectedGender = 'F';
                this.savePlayerInfo();
            }, () => { });

    }

    savePlayerInfo() {
        const playerName = this.nameInput.text; // 讀取玩家輸入的文字

        if (!playerName || playerName.trim() === "") {
            alert("請先輸入名字");
            return;
        }
        const player = {
            name: playerName,
            gender: this.selectedGender
        };

        localStorage.setItem('player', JSON.stringify(player));
        console.log('PlayerInfo Saved:', player);

        // 進入下一關
        this.scene.start('MainStreetScene');
    }

}