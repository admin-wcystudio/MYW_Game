export class BootScene extends Phaser.Scene {
    constructor () {
        super ('BootScene');
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
        this.load.image('program_btn', 'assets/GameStart/button/program_information_button.png');
        this.load.image('program_btn_click', 'assets/GameStart/button/program_information_button_click.png');
        this.load.image('desc_button', 'assets/GameStart/button/game_description_button.png')
        this.load.image('desc_button_click', 'assets/GameStart/button/game_description_button_click.png')

        // panel button
        this.load.image('next_button', 'assets/GameStart/button/right_arrow_button.png')
        this.load.image('next_button_click', 'assets/GameStart/button/right_arrow_button_click.png')
        this.load.image('prev_button', 'assets/GameStart/button/left_arrow_button.png')
        this.load.image('prev_button_click', 'assets/GameStart/button/left_arrow_button_click.png')
        this.load.image('close_button', 'assets/GameStart/button/close_button.png')
        this.load.image('close_button_click', 'assets/GameStart/button/close_button_click.png')

        //description Image
        this.load.image('game_description_p1', 'assets/GameStart/game_description_p1.png')
        this.load.image('game_description_p2', 'assets/GameStart/game_description_p2.png')

        //program info Image
        this.load.image('program_information_p1', 'assets/GameStart/program_information_p1.png')
        this.load.image('program_information_p2', 'assets/GameStart/program_information_p2.png')
        this.load.image('program_information_p3', 'assets/GameStart/program_information_p3.png')
        this.load.image('program_information_p4', 'assets/GameStart/program_information_p4.png')

        //settings page
        this.load.image('setting_bg', 'assets/Settings/setting_page_bg.png');

        this.load.image('vol_bg', 'assets/Settings/setting_page_volume_bg.png');
        this.load.image('vol_1', 'assets/Settings/setting_page_volume1.png');
        this.load.image('vol_2', 'assets/Settings/setting_page_volume2.png');
        this.load.image('vol_3', 'assets/Settings/setting_page_volume3.png');
        this.load.image('vol_4', 'assets/Settings/setting_page_volume4.png');
        this.load.image('vol_5', 'assets/Settings/setting_page_volume5.png');

        this.load.image('vol_left', 'assets/Settings/setting_page_left_arrow.png');
        this.load.image('vol_left_click', 'assets/Settings/setting_page_left_arrow_click.png');
        this.load.image('vol_right', 'assets/Settings/setting_page_right_arrow.png');
        this.load.image('vol_right_click', 'assets/Settings/setting_page_right_arrow_click.png');

        this.load.image('lang_mandarin', 'assets/Settings/setting_page_mandarin.png');
        this.load.image('lang_mandarin_click', 'assets/Settings/setting_page_mandarin_click.png');
        this.load.image('lang_cantonese', 'assets/Settings/setting_page_cantonese.png');
        this.load.image('lang_cantonese_click', 'assets/Settings/setting_page_cantonese_click.png');

        this.load.image('save_btn', 'assets/Settings/setting_page_save.png');
        this.load.image('save_btn_click', 'assets/Settings/setting_page_save_click.png');


        const loginPath = 'assets/Login/';
        this.load.video('login_bg_video', loginPath + 'choosepage_bg.mp4');

        this.load.image('login_boy_btn', loginPath + 'choosepage_boy_button.png');
        this.load.image('login_boy_btn_click', loginPath + 'choosepage_boy_button_click.png');
        this.load.image('login_girl_btn', loginPath + 'choosepage_girl_button.png');
        this.load.image('login_girl_btn_click', loginPath + 'choosepage_girl_button_click.png');
        
        this.load.image('login_namebar', loginPath + 'choosepage_namebar.png');
        this.load.image('bubble1', loginPath + 'choosepage_bubble1.png');
        this.load.image('bubble2', loginPath + 'choosepage_bubble2.png');
        
        this.load.image('boy_chinese_gif', loginPath + 'choosepage_boy_chinese.gif');
        this.load.image('girl_chinese_gif', loginPath + 'choosepage_girl_chinese.gif');
    }

    create() {
        console.log('Global Assets Loaded');

        const savedData = localStorage.getItem('gameSettings');

        if (savedData) {
            const settings = JSON.parse(savedData);

            this.sound.volume = settings.volume * 0.2;

            this.registry.set('globalSettings', settings);
        }
        this.scene.start('LoginScene');
    }

}