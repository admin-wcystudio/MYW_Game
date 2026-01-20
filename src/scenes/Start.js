import { CustomButton } from '../UI/Button.js';


export class Start extends Phaser.Scene {
    constructor() {
        super('Start');
    }

    preload() {
        this.load.video('cover_video', 'assets/GameStart/cover_bg.mp4');
        this.load.image('game_start', 'assets/GameStart/button/cover_game_start.png');
        this.load.image('game_start_click', 'assets/GameStart/button/cover_game_start_click.png');
        this.load.image('description_button', 'assets/GameStart/button/cover_game_description_button.png')
        this.load.image('description_button_click', 'assets/GameStart/button/cover_game_description_button_click.png')
        this.load.image('setting_btn', 'assets/GameStart/button/setting_button.png');
        this.load.image('setting_btn_click', 'assets/GameStart/button/setting_button_click.png');
        this.load.image('info_btn', 'assets/GameStart/button/program_information_button.png');
        this.load.image('info_btn_click', 'assets/GameStart/button/program_information_button_click.png');
        this.load.image('desc_button', 'assets/GameStart/button/game_description_button.png')
        this.load.image('desc_button_click', 'assets/GameStart/button/game_description_button_click.png')
    }

    create() {
        this.bgVideo = this.add.video(960, 540, 'cover_video');
        this.bgVideo.setMute(false);
        this.bgVideo.play(true); // loop

        const introBtn = new CustomButton(this, 960, 800, 'description_button', 'description_button_click', () => {
            console.log("open intro panel");

        });
        const startBtn = new CustomButton(this, 960, 900, 'game_start', 'game_start_click', () => {
            console.log("game start");
            //this.scene.start('GameScene');
        });

        const settingBtn = new CustomButton(this, 100, 100, 'setting_btn', 'setting_btn_click', () => {
            console.log("settings page");
        });

        const descBtn = new CustomButton(this, 250, 100, 'desc_button', 'desc_button_click', () => {
            console.log("description page");
        });

        const infoBtn = new CustomButton(this, 400, 100, 'info_btn', 'info_btn_click', () => {
            console.log("info page");
        });

    }
}