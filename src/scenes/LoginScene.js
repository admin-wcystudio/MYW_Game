import { CustomButton } from '../UI/Button.js';
import { CustomPanel, SettingPanel } from '../UI/Panel.js';
import UIHelper from '../UI/UIHelper.js';

export class LoginScene extends Phaser.Scene {
    constructor() {
        super('LoginScene');
    }

    preload() {
        // // Create loading bar UI
        // const width = this.cameras.main.width;
        // const height = this.cameras.main.height;

        // const barBg = this.add.rectangle(width / 2, height / 2, 400, 30, 0x222222);
        // barBg.setStrokeStyle(2, 0xffffff);

        // const barFill = this.add.rectangle(width / 2 - 195, height / 2, 0, 22, 0x00ff00);
        // barFill.setOrigin(0, 0.5);

        // const loadingText = this.add.text(width / 2, height / 2 - 50, '載入中...', {
        //     fontSize: '24px',
        //     fontFamily: 'Arial',
        //     color: '#ffffff'
        // }).setOrigin(0.5);

        // const percentText = this.add.text(width / 2, height / 2 + 50, '0%', {
        //     fontSize: '20px',
        //     fontFamily: 'Arial',
        //     color: '#ffffff'
        // }).setOrigin(0.5);

        // this.load.on('progress', (value) => {
        //     barFill.width = 390 * value;
        //     percentText.setText(Math.round(value * 100) + '%');
        // });

        // this.load.on('complete', () => {
        //     barBg.destroy();
        //     barFill.destroy();
        //     loadingText.destroy();
        //     percentText.destroy();
        // });

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

        for (let i = 0; i < 5; i++) {
            this.load.spritesheet(`boy_galaxy_${i}`, loginPath + `choosepage_boy_galaxy/choosepage_boy_galaxy-${i}.png`, {
                frameWidth: 700,
                frameHeight: 900
            });
        }


        for (let i = 0; i < 5; i++) {
            this.load.spritesheet(`boy_chinese_${i}`, loginPath + `choosepage_boy_chinese/choosepage_boy_chinese-${i}.png`, {
                frameWidth: 700,
                frameHeight: 900
            });
        }

        for (let i = 0; i < 3; i++) {
            this.load.spritesheet(`boy_transition_${i}`, loginPath + `choosepage_boy_transition/choosepage_boy_galaxytochinese_transition-${i}.png`, {
                frameWidth: 700,
                frameHeight: 900
            });
        }

        for (let i = 0; i < 3; i++) {
            this.load.spritesheet(`girl_galaxy_${i}`, loginPath + `choosepage_girl_galaxy/choosepage_girl_galaxy-${i}.png`, {
                frameWidth: 700,
                frameHeight: 900
            });
        }

        for (let i = 0; i < 5; i++) {
            this.load.spritesheet(`girl_chinese_${i}`, loginPath + `choosepage_girl_chinese/choosepage_girl_chinese-${i}.png`, {
                frameWidth: 700,
                frameHeight: 900
            });
        }

        for (let i = 0; i < 5; i++) {
            this.load.spritesheet(`girl_transition_${i}`, loginPath + `choosepage_girl_transition/choosepage_girl_galaxytochinese_transition-${i}.png`, {
                frameWidth: 700,
                frameHeight: 900
            });
        }

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

        // 1. Add the sprite (using the first spritesheet as initial texture)
        this.boySprite = this.add.sprite(620, 540, 'boy_galaxy_0')
            .setDepth(10)
            .setScrollFactor(0);

        this.boySprite.play('boy_galaxy_anim');

        this.girlSprite = this.add.sprite(1300, 560, 'girl_galaxy_0')
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

        //this.switchToTransitionScene();
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

        // Boy galaxy animation
        const boyGalaxyFrames = [];
        for (let i = 0; i < 5; i++) {
            const textureKey = `boy_galaxy_${i}`;
            const texture = this.textures.get(textureKey);
            const frameCount = texture.frameTotal - 1;
            for (let f = 0; f < frameCount; f++) {
                boyGalaxyFrames.push({ key: textureKey, frame: f });
            }
        }
        this.anims.create({
            key: 'boy_galaxy_anim',
            frames: boyGalaxyFrames,
            frameRate: 24,
            repeat: -1
        });

        // Boy chinese animation
        const boyChineseFrames = [];
        for (let i = 0; i < 5; i++) {
            const textureKey = `boy_chinese_${i}`;
            const texture = this.textures.get(textureKey);
            const frameCount = texture.frameTotal - 1;
            for (let f = 0; f < frameCount; f++) {
                boyChineseFrames.push({ key: textureKey, frame: f });
            }
        }
        this.anims.create({
            key: 'boy_chinese_anim',
            frames: boyChineseFrames,
            frameRate: 24,
            repeat: -1
        });

        // Boy transition animation
        const boyTransitionFrames = [];
        for (let i = 0; i < 3; i++) {
            const textureKey = `boy_transition_${i}`;
            const texture = this.textures.get(textureKey);
            const frameCount = texture.frameTotal - 1;
            for (let f = 0; f < frameCount; f++) {
                boyTransitionFrames.push({ key: textureKey, frame: f });
            }
        }
        this.anims.create({
            key: 'boy_transition_anim',
            frames: boyTransitionFrames,
            frameRate: 24,
            repeat: 0
        });

        // Girl galaxy animation
        const girlGalaxyFrames = [];
        for (let i = 0; i < 3; i++) {
            const textureKey = `girl_galaxy_${i}`;
            const texture = this.textures.get(textureKey);
            const frameCount = texture.frameTotal - 1;
            for (let f = 0; f < frameCount; f++) {
                girlGalaxyFrames.push({ key: textureKey, frame: f });
            }
        }
        this.anims.create({
            key: 'girl_galaxy_anim',
            frames: girlGalaxyFrames,
            frameRate: 24,
            repeat: -1
        });

        // Girl chinese animation
        const girlChineseFrames = [];
        for (let i = 0; i < 5; i++) {
            const textureKey = `girl_chinese_${i}`;
            const texture = this.textures.get(textureKey);
            const frameCount = texture.frameTotal - 1;
            for (let f = 0; f < frameCount; f++) {
                girlChineseFrames.push({ key: textureKey, frame: f });
            }
        }
        this.anims.create({
            key: 'girl_chinese_anim',
            frames: girlChineseFrames,
            frameRate: 24,
            repeat: -1
        });

        // Girl transition animation
        const girlTransitionFrames = [];
        for (let i = 0; i < 5; i++) {
            const textureKey = `girl_transition_${i}`;
            const texture = this.textures.get(textureKey);
            const frameCount = texture.frameTotal - 1;
            for (let f = 0; f < frameCount; f++) {
                girlTransitionFrames.push({ key: textureKey, frame: f });
            }
        }
        this.anims.create({
            key: 'girl_transition_anim',
            frames: girlTransitionFrames,
            frameRate: 24,
            repeat: 0
        });
    }

}