import { CustomButton } from '../UI/Button.js';
import { CustomPanel, SettingPanel } from '../UI/Panel.js';
import UIHelper from '../UI/UIHelper.js';

export class LoginScene extends Phaser.Scene {
    constructor() {
        super('LoginScene');
    }

    preload() {
        // Create loading bar UI
        const width = this.cameras.main.width;
        const height = this.cameras.main.height;

        const barBg = this.add.rectangle(width / 2, height / 2, 400, 30, 0x222222);
        barBg.setStrokeStyle(2, 0xffffff);

        const barFill = this.add.rectangle(width / 2 - 195, height / 2, 0, 22, 0x00ff00);
        barFill.setOrigin(0, 0.5);

        const loadingText = this.add.text(width / 2, height / 2 - 50, '載入中...', {
            fontSize: '24px',
            fontFamily: 'Arial',
            color: '#ffffff'
        }).setOrigin(0.5);

        const percentText = this.add.text(width / 2, height / 2 + 50, '0%', {
            fontSize: '20px',
            fontFamily: 'Arial',
            color: '#ffffff'
        }).setOrigin(0.5);

        this.load.on('progress', (value) => {
            barFill.width = 390 * value;
            percentText.setText(Math.round(value * 100) + '%');
        });

        this.load.on('complete', () => {
            barBg.destroy();
            barFill.destroy();
            loadingText.destroy();
            percentText.destroy();
        });

        // Login page assets
        const loginPath = 'assets/Login/';
        this.load.video('login_bg_video', loginPath + 'choosepage_bg.mp4');
        this.load.video('transition', loginPath + 'transition.webm');

        this.load.image('login_boy_btn', loginPath + 'choosepage_boy_button.png');
        this.load.image('login_boy_btn_click', loginPath + 'choosepage_boy_button_click.png');
        this.load.image('login_girl_btn', loginPath + 'choosepage_girl_button.png');
        this.load.image('login_girl_btn_click', loginPath + 'choosepage_girl_button_click.png');
        this.load.image('login_namebar', loginPath + 'choosepage_namebar.png');
        this.load.image('bubble1', loginPath + 'choosepage_bubble1.png');
        this.load.image('bubble2', loginPath + 'choosepage_bubble2.png');

        // Character spritesheets (WARNING: These are very large and may cause WebGL errors)
        this.load.spritesheet('boy_galaxy', loginPath + 'choosepage_boy_galaxy.png',
            { frameWidth: 700, frameHeight: 900 });
        this.load.spritesheet('boy_chinese', loginPath + 'choosepage_boy_chinese.png',
            { frameWidth: 700, frameHeight: 900 });
        this.load.spritesheet('boy_transition', loginPath + 'choosepage_boy_galaxytochinese_transition.png',
            { frameWidth: 700, frameHeight: 900 });
        this.load.spritesheet('girl_galaxy', loginPath + 'choosepage_girl_galaxy.png',
            { frameWidth: 700, frameHeight: 900 });
        this.load.spritesheet('girl_chinese', loginPath + 'choosepage_girl_chinese.png',
            { frameWidth: 700, frameHeight: 900 });
        this.load.spritesheet('girl_transition', loginPath + 'choosepage_girl_galaxytochinese_transition.png',
            { frameWidth: 700, frameHeight: 900 });

        // Game scene assets
        const gamePath = 'assets/Game_1/';
        this.load.image('game_success', `${gamePath}game1_success.png`);
        this.load.image('game_success_label', `${gamePath}game1_success_icon.png`);
        this.load.image('game_fail', `${gamePath}game1_fail.png`);
        this.load.image('game_fail_label', `${gamePath}game1_fail_icon.png`);
        this.load.image('game_gamechance', `${gamePath}game1_gamechance.png`);
        this.load.image('game_tryagain', `${gamePath}again_button.png`);
        this.load.image('game_tryagain_click', `${gamePath}again_button_mouseover.png`);
        this.load.image('game_quit', `${gamePath}leave_button.png`);
        this.load.image('game_quit_click', `${gamePath}leave_button_mouseover.png`);
        this.load.image('popup_bg', `${gamePath}popup_bg.png`);
        this.load.image('game_timer_bg', `${gamePath}game1_timer.png`);

        this.load.image('game_confirm_button', 'assets/Game_3/game3_confirm_button.png');
        this.load.image('game_confirm_button_select', 'assets/Game_3/game3_confirm_button_select.png');

        // Items page assets
        const itemsPath = 'assets/Items/';
        this.load.image('itempage_bg', itemsPath + 'itempage_bg.png');
        this.load.image('itempage_close_button_select', itemsPath + 'itempage_close_button_select.png');
        this.load.image('itempage_close_button', itemsPath + 'itempage_close_button.png');
        this.load.image('itempage_confirm_button_select', itemsPath + 'itempage_confirm_button_select.png');
        this.load.image('itempage_confirm_button', itemsPath + 'itempage_confirm_button.png');
        this.load.image('itempage_item_box', itemsPath + 'itempage_item_box.png');
        this.load.image('itempage_item1_description', itemsPath + 'itempage_item1_description.png');
        this.load.image('itempage_item1_select', itemsPath + 'itempage_item1_select.png');
        this.load.image('itempage_item1', itemsPath + 'itempage_item1.png');
        this.load.image('itempage_item2_select', itemsPath + 'itempage_item2_click.png');
        this.load.image('itempage_item2', itemsPath + 'itempage_item2.png');
        this.load.image('itempage_item2_description1', itemsPath + 'itempage_item2_description1.png');
        this.load.image('itempage_item2_description2', itemsPath + 'itempage_item2_description2.png');
        this.load.image('itempage_item3_description', itemsPath + 'itempage_item3_description.png');
        this.load.image('itempage_item3_select', itemsPath + 'itempage_item3_select.png');
        this.load.image('itempage_item3', itemsPath + 'itempage_item3.png');
        this.load.image('itempage_item4_description', itemsPath + 'itempage_item4_description.png');
        this.load.image('itempage_item4_description1', itemsPath + 'itempage_item4_description1.png');
        this.load.image('itempage_item4_description2', itemsPath + 'itempage_item4_description2.png');
        this.load.image('itempage_item4_select', itemsPath + 'itempage_item4_select.png');
        this.load.image('itempage_item4', itemsPath + 'itempage_item4.png');
        this.load.image('itempage_item5_description', itemsPath + 'itempage_item5_description.png');
        this.load.image('itempage_item5_select', itemsPath + 'itempage_item5_select.png');
        this.load.image('itempage_item5', itemsPath + 'itempage_item5.png');
        this.load.image('panel_bg', itemsPath + 'itempage_panel_bg.png');
    }

    create() {
        // Create character animations
        this.createAnimations();
        this.bgVideo = this.add.video(960, 540, 'login_bg_video');
        this.bgVideo.getFirstFrame();
        // // Auto-mute on mobile devices (iOS/Android) to ensure autoplay works
        // // Desktop can stay unmuted if user interaction occurred previously
        // const isMobile = !this.sys.game.device.os.desktop;
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

        // 1. Add the sprite (using the image key from BootScene)
        this.boySprite = this.add.sprite(620, 540, 'boy_galaxy')
            .setDepth(10)
            .setScrollFactor(0);

        this.boySprite.play('boy_galaxy_anim');

        this.girlSprite = this.add.sprite(1300, 560, 'girl_galaxy')
            .setDepth(10)
            .setScrollFactor(0);

        this.girlSprite.play('girl_galaxy_anim');


        this.add.image(340, 350, 'bubble1').setDepth(11);
        this.add.image(1650, 360, 'bubble2').setDepth(11);

        const boyBtn = new CustomButton(
            this, 620, 950,
            'login_boy_btn', 'login_boy_btn_click',
            () => {
                this.savePlayerInfo('M');

            }, () => { });

        const girlBtn = new CustomButton(
            this, 1300, 950,
            'login_girl_btn', 'login_girl_btn_click',
            () => {
                this.savePlayerInfo('F');
            }, () => { });

    }

    savePlayerInfo(gender, currentSprite) {
        const playerName = this.nameInput.text;

        if (!playerName || playerName.trim() === "") {
            UIHelper.showToast(this, "請先輸入名字"); // 使用 Helper 提示
            return;
        }

        this.selectedGender = gender;
        this.switchAnimation();

        // 儲存資料
        const player = { name: playerName, gender: gender };
        localStorage.setItem('player', JSON.stringify(player));

        const allGamesResult = [
            { game: 1, isFinished: false, seconds: 0 },
            { game: 2, isFinished: false, seconds: 0 },
            { game: 3, isFinished: false, seconds: 0 },
            { game: 4, isFinished: false, seconds: 0 },
            { game: 5, isFinished: false, seconds: 0 },
            { game: 6, isFinished: false, seconds: 0 },
            { game: 7, isFinished: false, seconds: 0 },
        ];
        localStorage.setItem('allGamesResult', JSON.stringify(allGamesResult));

        this.switchToTransitionScene();
    }

    switchAnimation() {
        if (this.selectedGender === 'M') {
            this.girlSprite.play('girl_galaxy_anim');
            this.boySprite.play('boy_transition_anim');
            this.boySprite.on('animationcomplete', () => {
                this.time.delayedCall(1000, () => {
                    this.boySprite.play('boy_chinese_anim');
                });
            });

        } else {
            this.boySprite.play('boy_galaxy_anim');
            this.girlSprite.play('girl_transition_anim');
            this.girlSprite.on('animationcomplete', () => {
                this.time.delayedCall(1000, () => {
                    this.girlSprite.play('girl_chinese_anim');
                });
            });
        }
    }

    switchToTransitionScene() {
        this.time.delayedCall(4000, () => {
            this.scene.start('TransitionScene');
        });
    }

    createAnimations() {
        this.anims.create({
            key: 'boy_galaxy_anim',
            frames: this.anims.generateFrameNumbers('boy_galaxy', { start: 0, end: 98 }),
            frameRate: 30,
            repeat: -1
        });
        this.anims.create({
            key: 'boy_chinese_anim',
            frames: this.anims.generateFrameNumbers('boy_chinese', { start: 0, end: 98 }),
            frameRate: 30,
            repeat: -1
        });
        this.anims.create({
            key: 'boy_transition_anim',
            frames: this.anims.generateFrameNumbers('boy_transition', { start: 0, end: 98 }),
            frameRate: 30,
            repeat: 0
        });
        this.anims.create({
            key: 'girl_galaxy_anim',
            frames: this.anims.generateFrameNumbers('girl_galaxy', { start: 0, end: 98 }),
            frameRate: 30,
            repeat: -1
        });
        this.anims.create({
            key: 'girl_chinese_anim',
            frames: this.anims.generateFrameNumbers('girl_chinese', { start: 0, end: 98 }),
            frameRate: 30,
            repeat: -1
        });
        this.anims.create({
            key: 'girl_transition_anim',
            frames: this.anims.generateFrameNumbers('girl_transition', { start: 0, end: 98 }),
            frameRate: 30,
            repeat: 0
        });
    }

}