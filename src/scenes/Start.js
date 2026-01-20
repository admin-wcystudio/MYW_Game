import { CustomButton } from '../UI/Button.js';
import { CustomPanel } from '../UI/Panel.js';


export class Start extends Phaser.Scene {
    constructor() {
        super('Start');
    }

    preload() {
        //game start background
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

        // panel button
        this.load.image('next_button', 'assets/GameStart/button/right_arrow_button.png')
        this.load.image('next_button_click', 'assets/GameStart/button/right_arrow_button_click.png')
        this.load.image('prev_button', 'assets/GameStart/button/left_arrow_button.png')
        this.load.image('prev_button_click', 'assets/GameStart/button/left_arrow_button_click.png')
        this.load.image('close_button', 'assets/GameStart/button/close_button.png')
        this.load.image('close_button_click', 'assets/GameStart/button/close_button_click.png')

        //panel Image
        this.load.image('game_description_p1', 'assets/GameStart/game_description_p1.png')
        this.load.image('game_description_p2', 'assets/GameStart/game_description_p2.png')

        this.load.image('program_information_p1', 'assets/GameStart/program_information_p1.png')
        this.load.image('program_information_p2', 'assets/GameStart/program_information_p2.png')
        this.load.image('program_information_p3', 'assets/GameStart/program_information_p3.png')
        this.load.image('program_information_p4', 'assets/GameStart/program_information_p4.png')
    }

    create() {
        this.bgVideo = this.add.video(960, 540, 'cover_video');
        this.bgVideo.setMute(false);
        this.bgVideo.play(true); // loop


        const descriptionPages = [
            {   
                content: 'game_description_p1', 
                nextBtn: 'next_button', nextBtnClick: 'next_button_click', 
                prevBtn: null , prevBtnClick : null,    
                closeBtn: 'close_button', closeBtnClick : 'close_button_click'
            },
            { 
                content: 'game_description_p2', 
                nextBtn: 'next_button', nextBtnClick: 'next_button_click', 
                prevBtn: 'prev_button' , prevBtnClick: 'prev_button' , 
                closeBtn: 'close_button', closeBtnClick : 'close_button_click'
            }
        ];

        const programPages = [
            {   
                content: 'program_information_p1', 
                nextBtn: 'next_button', nextBtnClick: 'next_button_click', 
                prevBtn: 'prev_button' , prevBtnClick : 'prev_button_click',    
                closeBtn: 'close_button', closeBtnClick : 'close_button_click'
            },
            { 
                content: 'program_information_p2', 
                nextBtn: 'next_button', nextBtnClick: 'next_button_click', 
                prevBtn: 'prev_button' , prevBtnClick: 'prev_button' , 
                closeBtn: 'close_button', closeBtnClick : 'close_button_click'
            },
            { 
                content: 'program_information_p3', 
                nextBtn: 'next_button', nextBtnClick: 'next_button_click', 
                prevBtn: 'prev_button' , prevBtnClick: 'prev_button' , 
                closeBtn: 'close_button', closeBtnClick : 'close_button_click'
            },
            { 
                content: 'program_information_p4', 
                nextBtn: 'next_button', nextBtnClick: 'next_button_click', 
                prevBtn: 'prev_button' , prevBtnClick: 'prev_button' , 
                closeBtn: 'close_button', closeBtnClick : 'close_button_click'
            }

        ]

        const descriptionPanel = new CustomPanel(this, 960, 540, descriptionPages);
        descriptionPanel.setVisible(false);
        descriptionPanel.setDepth(100);

        const programPanel = new CustomPanel(this, 960, 540, programPages);
        programPanel.setVisible(false);
        programPanel.setDepth(100);


        const gameDescrBtn = new CustomButton(this, 960, 800, 'description_button', 'description_button_click', () => {
            descriptionPanel.setVisible(true);
            descriptionPanel.currentPage = 0;
            descriptionPanel.refresh();   
        });

        const startBtn = new CustomButton(this, 960, 900, 'game_start', 'game_start_click', () => {
            console.log("game start");
            //this.scene.start('GameScene');
        });

        const settingBtn = new CustomButton(this, 100, 100, 'setting_btn', 'setting_btn_click', () => {
            console.log("settings page");
        });

        const descBtn = new CustomButton(this, 250, 100, 'desc_button', 'desc_button_click', 
        () => {   
            descriptionPanel.setVisible(true);
            descriptionPanel.currentPage = 0;
            descriptionPanel.refresh();    
        }, () => {
            descriptionPanel.setVisible(false);
        });

        const infoBtn = new CustomButton(this, 400, 100, 'info_btn', 'info_btn_click', () => {
            programPanel.setVisible(true);
            programPanel.currentPage = 0;
            descriptionPanel.refresh();   
        }, () => {
            programPanel.setVisible(false);
        });
   


    }
}