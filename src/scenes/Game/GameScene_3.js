import { CustomButton } from '../../UI/Button.js';
import { CustomPanel, SettingPanel } from '../../UI/Panel.js';
import UIHelper from '../../UI/UIHelper.js';

export class GameScene_3 extends Phaser.Scene {
    constructor() {
        super('GameScene_3');
    }

    preload() {
        const path = 'assets/Game_3/';

        // 背景與 UI 基礎
        this.load.image('game3_bg', path + 'game3_bg.png');
        this.load.image('game3_card_bg', path + 'game3_card_bg.png');
        this.load.image('game3_title', path + 'game3_title.png');

        // 卡片資源 (Cards)
        for (let i = 1; i <= 6; i++) {
            this.load.image(`game3_card${i}`, `${path}game3_card${i}.png`);
        }

        this.load.image('game3_description', path + 'game3_description.png');
        this.load.image('game3_object_description', path + 'game3_object_description.png');
        this.load.image('game3_additions', path + 'game3_additions.png');
        this.load.image('game3_npc_box1', path + 'game3_npc_box1.png');
        this.load.image('game3_npc_box2', path + 'game3_npc_box2.png');
        this.load.image('game3_npc_box3', path + 'game3_npc_box3.png');

    }

    create() {
        const width = this.cameras.main.width;
        const height = this.cameras.main.height;
    }
}