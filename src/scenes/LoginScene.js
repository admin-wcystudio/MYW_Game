import { createCommonUI } from '../UI/UIHelper.js';
import { CustomPanel , SettingPanel } from '../UI/Panel.js';

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

        createCommonUI(this, programPages, descriptionPages);

    }


}