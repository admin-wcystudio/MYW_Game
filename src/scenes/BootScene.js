export class BootScene extends Phaser.Scene {
    constructor() {
        super('BootScene');
    }
    preload() {

        this.load.plugin('rexinputtextplugin', 'https://cdn.jsdelivr.net/npm/phaser3-rex-plugins@1.80.17/dist/rexinputtextplugin.min.js', true);

        //game start background
        this.load.audio('bgm', 'assets/Music/bgm.mp3');
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

        //login page
        const loginPath = 'assets/Login/';
        this.load.video('login_bg_video', loginPath + 'choosepage_bg.mp4');

        this.load.image('login_boy_btn', loginPath + 'choosepage_boy_button.png');
        this.load.image('login_boy_btn_click', loginPath + 'choosepage_boy_button_click.png');

        this.load.image('login_girl_btn', loginPath + 'choosepage_girl_button.png');
        this.load.image('login_girl_btn_click', loginPath + 'choosepage_girl_button_click.png');

        this.load.image('login_namebar', loginPath + 'choosepage_namebar.png');
        this.load.image('bubble1', loginPath + 'choosepage_bubble1.png');
        this.load.image('bubble2', loginPath + 'choosepage_bubble2.png');

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

        // MainStreet assets are now lazy-loaded in MainStreetScene

        // load game scenes assets ( general )
        const path = 'assets/Game_1/';

        this.load.image('game_success', `${path}game1_success.png`);
        this.load.image('game_success_label', `${path}game1_success_icon.png`);
        this.load.image('game_fail', `${path}game1_fail.png`);
        this.load.image('game_fail_label', `${path}game1_fail_icon.png`);
        this.load.image('game_gamechance', `${path}game1_gamechance.png`);

        this.load.image('game_tryagain', `${path}again_button.png`);
        this.load.image('game_tryagain_click', `${path}again_button_mouseover.png`);
        this.load.image('game_quit', `${path}leave_button.png`);
        this.load.image('game_quit_click', `${path}leave_button_mouseover.png`);
        this.load.image('popup_bg', `${path}popup_bg.png`);
        this.load.image('game_timer_bg', `${path}game1_timer.png`);

        this.load.image('game_confirm_button', 'assets/Game_3/game3_confirm_button.png');
        this.load.image('game_confirm_button_select', 'assets/Game_3/game3_confirm_button_select.png');


        const path2 = 'assets/Items/';
        this.load.image('itempage_bg', path2 + 'itempage_bg.png');
        this.load.image('itempage_close_button_select', path2 + 'itempage_close_button_select.png');
        this.load.image('itempage_close_button', path2 + 'itempage_close_button.png');
        this.load.image('itempage_confirm_button_select', path2 + 'itempage_confirm_button_select.png');
        this.load.image('itempage_confirm_button', path2 + 'itempage_confirm_button.png');
        this.load.image('itempage_item_box', path2 + 'itempage_item_box.png');
        this.load.image('itempage_item1_description', path2 + 'itempage_item1_description.png');
        this.load.image('itempage_item1_select', path2 + 'itempage_item1_select.png');
        this.load.image('itempage_item1', path2 + 'itempage_item1.png');
        this.load.image('itempage_item2_select', path2 + 'itempage_item2_click.png');
        this.load.image('itempage_item2', path2 + 'itempage_item2.png');
        this.load.image('itempage_item2_description1', path2 + 'itempage_item2_description1.png');
        this.load.image('itempage_item2_description2', path2 + 'itempage_item2_description2.png');
        this.load.image('itempage_item3_description', path2 + 'itempage_item3_description.png');
        this.load.image('itempage_item3_select', path2 + 'itempage_item3_select.png');
        this.load.image('itempage_item3', path2 + 'itempage_item3.png');
        this.load.image('itempage_item4_description', path2 + 'itempage_item4_description.png');
        this.load.image('itempage_item4_description1', path2 + 'itempage_item4_description1.png');
        this.load.image('itempage_item4_description2', path2 + 'itempage_item4_description2.png');
        this.load.image('itempage_item4_select', path2 + 'itempage_item4_select.png');
        this.load.image('itempage_item4', path2 + 'itempage_item4.png');
        this.load.image('itempage_item5_description', path2 + 'itempage_item5_description.png');
        this.load.image('itempage_item5_select', path2 + 'itempage_item5_select.png');
        this.load.image('itempage_item5', path2 + 'itempage_item5.png');
        this.load.image('panel_bg', path2 + 'itempage_panel_bg.png');

        this.load.video('transition', 'assets/Login/transition.webm');

    }

    create() {
        console.log('Global Assets Loaded');

        const savedData = localStorage.getItem('gameSettings');

        if (savedData) {
            const settings = JSON.parse(savedData);

            this.sound.volume = settings.volume * 0.2;

            this.registry.set('globalSettings', settings);
        }

        this.createAnimations();
        this.scene.start('GameStartScene');
    }

    createAnimations() {
        this.anims.create({
            key: 'boy_galaxy_anim',  // Name you will use in other scenes
            frames: this.anims.generateFrameNumbers('boy_galaxy', { start: 0, end: 98 }),
            frameRate: 30,
            repeat: -1
        });
        this.anims.create({
            key: 'boy_chinese_anim',  // Name you will use in other scenes
            frames: this.anims.generateFrameNumbers('boy_galaxy', { start: 0, end: 98 }),
            frameRate: 30,
            repeat: -1
        });

        this.anims.create({
            key: 'boy_transition_anim',  // Name you will use in other scenes
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
            key: 'girl_transition_anim',  // Name you will use in other scenes
            frames: this.anims.generateFrameNumbers('girl_transition', { start: 0, end: 98 }),
            frameRate: 30,
            repeat: 0
        });


        // NPC Animations are now created in MainStreetScene
    }

}