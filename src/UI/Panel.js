import { CustomButton } from './Button.js';

export class CustomPanel extends Phaser.GameObjects.Container {
    constructor(scene, x, y, pages) {
        super(scene, x, y);
        this.scene = scene;
        this.pages = pages;
        this.currentPage = 0;
        this.toggleBtn = null;

        this.contentImage = scene.add.image(0, 0, this.pages[0].content);
        this.add(this.contentImage);

        this.prevBtn = new CustomButton(scene, -570, 260, null, null, () => this.changePage(-1));
        this.nextBtn = new CustomButton(scene, 570, 260, null, null, () => this.changePage(1));

        this.closeBtn = new CustomButton(scene, 625, -295, null, null, () => {
            this.setVisible(false);

            if (this.toggleBtn) {
                this.toggleBtn.resetStatus();
            }

            if (this.onClose) {
                this.onClose();
            }
        });
        this.prevBtn.needClicked = false;
        this.nextBtn.needClicked = false;
        this.closeBtn.needClicked = false;

        this.add([this.prevBtn, this.nextBtn, this.closeBtn]);

        // 重要：將呢個 Container 加落 Scene
        scene.add.existing(this);

        this.refresh();
    }

    setCloseCallBack(callback) {
        this.onClose = callback;
    }

    changePage(dir) {
        this.currentPage += dir;

        if (this.currentPage < 0) {
            this.currentPage = 0;
        }

        if (this.currentPage >= this.pages.length) {
            this.currentPage = this.pages.length - 1;
        }
        this.refresh();
    }

    refresh() {
        const data = this.pages[this.currentPage];
        if (!data) return;

        this.contentImage.setTexture(data.content);

        if (this.currentPage === 0) {
            this.prevBtn.setVisible(false);
        } else {
            this.prevBtn.setVisible(true);
            if (data.prevBtn) {
                this.prevBtn.setTexture(data.prevBtn);
                this.prevBtn.normalKey = data.prevBtn;
                this.prevBtn.pressedKey = data.prevBtnClick;
            }
        }

        if (this.currentPage === this.pages.length - 1) {
            this.nextBtn.setVisible(false);
        } else {
            this.nextBtn.setVisible(true);
            if (data.nextBtn) {
                this.nextBtn.setTexture(data.nextBtn);
                this.nextBtn.normalKey = data.nextBtn;
                this.nextBtn.pressedKey = data.nextBtnClick;
            }
        }
        if (data.closeBtn) {
            this.closeBtn.setVisible(true);
            this.closeBtn.setTexture(data.closeBtn);
            this.closeBtn.normalKey = data.closeBtn;
            this.closeBtn.pressedKey = data.closeBtnClick;
        } else {
            this.closeBtn.setVisible(false);
        }
    }
}

export class CustomSinglePanel extends Phaser.GameObjects.Container {
    constructor(scene, x, y, pageKey, onClose) {
        super(scene, x, y);
        this.scene = scene;
        this.pageKey = pageKey;
        this.onClose = onClose;
        this.currentPage = 0;
        this.toggleBtn = null;

        this.contentImage = scene.add.image(0, 0, this.pageKey);
        this.add(this.contentImage);

        this.closeBtn = new CustomButton(scene, 625, -295, 'close_button', 'close_button_click', () => {
            this.setVisible(false);

            if (this.toggleBtn) {
                this.toggleBtn.resetStatus();
            }

            if (this.onClose) {
                this.onClose();
            }
        });

        this.closeBtn.needClicked = false;

        this.add([this.closeBtn]);

        // 重要：將呢個 Container 加落 Scene
        scene.add.existing(this);

        this.refresh();
    }

    setCloseCallBack(callback) {
        this.onClose = callback;
    }

    close() {
        if (typeof this.closeCallback === 'function') {
            this.closeCallback();
        }
    }

    refresh() {
        if (this.closeBtn) {
            this.closeBtn.setVisible(true);
        } else {
            this.closeBtn.setVisible(false);
        }
    }
}

export class SettingPanel extends Phaser.GameObjects.Container {
    constructor(scene, x, y) {
        super(scene, x, y);
        this.scene = scene;
        this.currentPage = 0;
        this.toggleBtn = null;

        // default volume
        this.currentVolume = 3
        this.volumeCells = [];

        // background
        this.contentImage = scene.add.image(0, 0, 'setting_bg');
        this.add(this.contentImage);

        //sound
        // 建議改法：全部都加進 Container
        this.volumeBg = scene.add.image(130, -100, 'vol_bg'); // 座標要相對於 Container 中心
        this.add(this.volumeBg);

        const startX = -260;
        let cellGap = 130;

        for (let i = 1; i <= 5; i++) {
            let xOffset = startX + (i * cellGap);
            let cell = scene.add.image(startX + (cellGap * i), -103, `vol_${i}`);
            console.log("Cell xoffset", this.xOffset);

            cell.setDepth(104);
            this.add(cell);
            this.volumeCells.push(cell);

            cell.setVisible(i <= this.currentVolume);
        }

        //language
        this.currentLanguage = 'HK';

        this.mandarinBtn = new CustomButton(scene, -50, 50, 'lang_mandarin', 'lang_mandarin_click', () => this.setLanguage('CN'));
        this.mandarinBtn.setDepth(105);
        this.mandarinBtn.needClicked = true;

        this.cantoneseBtn = new CustomButton(scene, 300, 50, 'lang_cantonese', 'lang_cantonese_click', () => this.setLanguage('HK'));
        this.cantoneseBtn.setDepth(105);
        this.cantoneseBtn.needClicked = true;
        this.add([this.mandarinBtn, this.cantoneseBtn]);

        this.prevBtn = new CustomButton(scene, -250, -100, 'vol_left', 'vol_left_click', () => this.setVolume(-1));
        this.nextBtn = new CustomButton(scene, 525, -100, 'vol_right', 'vol_right_click', () => this.setVolume(1));
        this.closeBtn = new CustomButton(scene, 625, -295, 'close_button', 'close_button_click', () => {
            this.setVisible(false);

            if (this.toggleBtn) {
                this.toggleBtn.resetStatus();
            }
        });

        this.saveBtn = new CustomButton(scene, -50, 200, 'save_btn', 'save_btn_click', () => saveToLocal());
        this.saveBtn.setDepth(104);
        this.add(this.saveBtn);
        this.saveBtn.needClicked = false;

        this.prevBtn.needClicked = false;
        this.nextBtn.needClicked = false;
        this.closeBtn.needClicked = false;

        this.add([this.prevBtn, this.nextBtn, this.closeBtn]);
        scene.add.existing(this);
        this.refresh();
    }

    setVolume(dir) {
        this.currentVolume += dir;

        if (this.currentVolume < 1) this.currentVolume = 1;
        if (this.currentVolume > 5) this.currentVolume = 5;

        this.volumeCells.forEach((cell, index) => {
            // index 是 0-4，currentVolume 是 1-5
            cell.setVisible(index < this.currentVolume);
        });

        this.scene.sound.volume = this.currentVolume * 0.2;
        console.log("Current Volume Level:", this.currentVolume);
    }

    setLanguage(lang) {
        if (lang === 'CN') {
            this.cantoneseBtn.resetStatus();
            console.log("Switch to Mandarin");
        } else {
            this.mandarinBtn.resetStatus();
            console.log("Switch to Cantonese");
        }
        this.currentLanguage = lang;
    }

    saveToLocal() {
        const settings = {
            volume: this.currentVolume,
            language: this.currentLanguage
        };

        localStorage.setItem('gameSettings', JSON.stringify(settings));

        console.log('Settings Saved:', settings);

        this.setVisible(false);
        if (this.toggleBtn) this.toggleBtn.resetStatus();
    }


    refresh() {
        if (this.volumeDisplay) {
            this.volumeDisplay.setTexture(`vol_${this.currentVolume}`);
        }
    }
}

export class CustomDescriptionPanel extends Phaser.GameObjects.Container {
    constructor(scene, x, y, pageKeys, onClose) {
        super(scene, x, y);
        this.scene = scene;
        this.pageKeys = pageKeys;
        this.currentPage = 0;
        this.onClose = onClose;

        // 1. 主背景圖片
        this.contentImage = scene.add.image(0, 0, this.pageKeys[this.currentPage]);
        this.add(this.contentImage);

        // 2. 關閉按鈕
        this.closeBtn = new CustomButton(scene, 625, -295, 'close_button', 'close_button_click', () => {
            this.closePanel();
        });
        this.add(this.closeBtn);

        // 3. 上一頁按鈕 (初始隱藏)
        this.prevBtn = new CustomButton(scene, -800, 250, 'prev_button', null, () => this.prevPage());
        this.add(this.prevBtn);

        // 4. 下一頁按鈕
        this.nextBtn = new CustomButton(scene, 800, 250, 'next_button', null, () => this.nextPage());
        this.add(this.nextBtn);

        // 初始化按鈕可見性
        this.updateButtons();

        scene.add.existing(this);
    }

    nextPage() {
        if (this.currentPage < this.pageKeys.length - 1) {
            this.currentPage++;
            this.contentImage.setTexture(this.pageKeys[this.currentPage]);
            this.updateButtons();
        }
    }

    prevPage() {
        if (this.currentPage > 0) {
            this.currentPage--;
            this.contentImage.setTexture(this.pageKeys[this.currentPage]);
            this.updateButtons();
        }
    }

    updateButtons() {
        // 第一頁不顯示「上一頁」
        this.prevBtn.setVisible(this.currentPage > 0);

        // 如果只有一頁，隱藏下一頁按鈕；或者你可以設定最後一頁時將 nextBtn 變成「完成」圖標
        if (this.pageKeys.length <= 1) {
            this.nextBtn.setVisible(false);
        } else {
            this.nextBtn.setVisible(this.currentPage < this.pageKeys.length - 1);
        }
    }

    closePanel() {
        if (this.onClose) this.onClose();
        this.destroy();
    }
}


export class ItemsPanel extends Phaser.GameObjects.Container {
    constructor(scene, x, y) {
        super(scene, x, y);
        this.scene = scene;
        const width = 1920; // 假設開發解析度
        const height = 1080;

        const itemsContent = [
            {
                itemKey: 'itempage_item1',
                itemSelectKey: 'itempage_item1_select',
                itemDescriptionKey: 'itempage_item1_description'
            },
            {
                itemKey: 'itempage_item2',
                itemSelectKey: 'itempage_item2_select',
                itemDescriptionKey: 'itempage_item2_description1',
                itemDescriptionKey1: 'itempage_item2_description2'
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

        // 1. 背景層
        this.bg = scene.add.image(0, 0, 'itempage_bg').setDepth(1);
        this.panelBg = scene.add.image(0, 0, 'panel_bg').setDepth(2);
        this.add([this.bg, this.panelBg]);

        // 2. 產生物品按鈕
        itemsContent.forEach((item, index) => {
            const posX = -500 + index * 250; // 調整為 Container 相對座標
            const posY = -100;

            const itemBtn = new CustomButton(scene, posX, posY, item.itemKey, item.itemSelectKey, () => {
                const pages = [
                    item.itemDescriptionKey,
                    item.itemDescriptionKey1,
                    item.itemDescriptionKey2
                ].filter(key => key != null);

                if (pages.length > 0) {

                    const blocker = scene.add.rectangle(0, 0, 1920, 1080, 0x000000, 0.5).setInteractive();

                    const descPanel = new CustomDescriptionPanel(scene, 0, 0, pages, () => {
                        blocker.destroy();
                    });

                    descPanel.setDepth(501);
                    blocker.setDepth(500);

                    this.add([blocker, descPanel]);
                }
            }).setDepth(3);

            const itemBox = scene.add.image(posX, 200, 'itempage_item_box').setDepth(3);
            this.add([itemBtn, itemBox]);
        });

        // 3. 關閉按鈕
        this.closeBtn = new CustomButton(scene, 620, -290, 'itempage_close_button', 'itempage_close_button_select', () => {
            this.setVisible(false);
            if (this.toggleBtn) this.toggleBtn.resetStatus(); // 讓外部按鈕彈回
        });
        this.add(this.closeBtn);

        scene.add.existing(this);
    }
}

export class CustomFailPanel extends Phaser.GameObjects.Container {
    constructor(scene, x, y, onRestart, onQuit) {
        super(scene, x, y);
        this.scene = scene;
        this.currentPage = 0;
        this.toggleBtn = null;

        this.contentImage = scene.add.image(0, 0, 'popup_bg').setDepth(200);
        this.add(this.contentImage);

        this.tryAgainBtn = new CustomButton(scene, 0, -100, 'game_tryagain', 'game_tryagain_click', () => {
            if (onRestart) onRestart();
        }).setDepth(201);
        this.quitBtn = new CustomButton(scene, 0, 100, 'game_quit', 'game_quit_click', () => {
            if (onQuit) onQuit();
        }).setDepth(201);

        this.add([this.tryAgainBtn, this.quitBtn]);

        // 重要：將呢個 Container 加落 Scene
        scene.add.existing(this);

        this.refresh();
    }

    refresh() {

    }
}
