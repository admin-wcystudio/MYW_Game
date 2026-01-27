import { CustomButton } from '../UI/Button.js';
import { CustomDescriptionPanel } from '../UI/Panel.js';
import UIHelper from '../UI/UIHelper.js';

export class ItemsScene extends Phaser.Scene {
    constructor() {
        super('ItemsScene');
    }
    preload() {
        const path = 'assets/Items/';
        this.load.image('itempage_bg', path + 'itempage_bg.png');
        this.load.image('itempage_close_button_select', path + 'itempage_close_button_select.png');
        this.load.image('itempage_close_button', path + 'itempage_close_button.png');
        this.load.image('itempage_confirm_button_select', path + 'itempage_confirm_button_select.png');
        this.load.image('itempage_confirm_button', path + 'itempage_confirm_button.png');
        this.load.image('itempage_item_box', path + 'itempage_item_box.png');
        this.load.image('itempage_item1_description', path + 'itempage_item1_description.png');
        this.load.image('itempage_item1_select', path + 'itempage_item1_select.png');
        this.load.image('itempage_item1', path + 'itempage_item1.png');
        this.load.image('itempage_item2_select', path + 'itempage_item2_select.png');
        this.load.image('itempage_item2', path + 'itempage_item2.png');
        this.load.image('itempage_item3_description', path + 'itempage_item3_description.png');
        this.load.image('itempage_item3_select', path + 'itempage_item3_select.png');
        this.load.image('itempage_item3', path + 'itempage_item3.png');
        this.load.image('itempage_item4_description', path + 'itempage_item4_description.png');
        this.load.image('itempage_item4_description1', path + 'itempage_item4_description1.png');
        this.load.image('itempage_item4_description2', path + 'itempage_item4_description2.png');
        this.load.image('itempage_item4_select', path + 'itempage_item4_select.png');
        this.load.image('itempage_item4', path + 'itempage_item4.png');
        this.load.image('itempage_item5_description', path + 'itempage_item5_description.png');
        this.load.image('itempage_item5_select', path + 'itempage_item5_select.png');
        this.load.image('itempage_item5', path + 'itempage_item5.png');
    }

    create() {
        const width = this.cameras.main.width;
        const height = this.cameras.main.height;
        const itemsContent = [
            {
                itemKey: 'itempage_item1',
                itemSelectKey: 'itempage_item1_select',
                itemDescriptionKey: 'itempage_item1_description'
            },
            {
                itemKey: 'itempage_item2',
                itemSelectKey: 'itempage_item2_select',
                itemDescriptionKey: null
            },
            {
                itemKey: 'itempage_item3',
                itemSelectKey: 'itempage_item3_select',
                itemDescriptionKey: 'itempage_item3_description'
            },
            {
                itemKey: 'itempage_item4',
                itemSelectKey: 'itempage_item4_select',
                itemDescriptionKey: 'itempage_item4_description',
                itemDescriptionKey1: 'itempage_item4_description1',
                itemDescriptionKey2: 'itempage_item4_description2'
            },
            {
                itemKey: 'itempage_item5',
                itemSelectKey: 'itempage_item5_select',
                itemDescriptionKey: 'itempage_item5_description'
            }
        ];

        this.add.image(width / 2, height / 2, 'itempage_bg').setDepth(1);
        this.add.image(width / 2, height / 2, 'game_description_p1').setDepth(2);

        itemsContent.forEach((item, index) => {
            const itemBtn = new CustomButton(this, 460 + index * 250, height / 2 - 100, item.itemKey, item.itemSelectKey, () => {

                const pages = [
                    item.itemDescriptionKey,
                    item.itemDescriptionKey1,
                    item.itemDescriptionKey2
                ].filter(key => key !== undefined && key !== null);

                if (pages.length === 0) {
                    console.log("此道具沒有詳細描述");
                    return;
                }

                const descPanel = new CustomDescriptionPanel(this, 960, 540, pages);
                descPanel.setDepth(500).setScrollFactor(0);
            }).setDepth(3);

            const itemBoxOnly = this.add.image(460 + index * 250, height / 2 + 200, 'itempage_item_box').setDepth(3);

        });

        const closeButton = new CustomButton(this, width / 2 + 620, 250, 'itempage_close_button',
            'itempage_close_button_select', () => {
                // this.scene.start('MainStreetScene');
            }, null).setDepth(2);
        const confirmButton = new CustomButton(this, width - 200, height - 200, 'itempage_confirm_button',
            'itempage_confirm_button_select', () => {

            }, null).setDepth(2);
    }
}