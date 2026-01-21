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

        this.prevBtn = new CustomButton(scene, -570, 260, null, null,  () => this.changePage(-1));
        this.nextBtn = new CustomButton(scene, 570, 260, null, null,  () => this.changePage(1));
        
        this.closeBtn = new CustomButton(scene, 625, -295, null, null, () => {
            this.setVisible(false);

            if (this.toggleBtn) {
                this.toggleBtn.resetStatus();
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
        if(data.closeBtn) {
            this.closeBtn.setVisible(true);
            this.closeBtn.setTexture(data.closeBtn);
            this.closeBtn.normalKey = data.closeBtn;
            this.closeBtn.pressedKey = data.closeBtnClick;
        }else {
            this.closeBtn.setVisible(false);
        }
    }
}

export class SettingPanel extends Phaser.GameObjects.Container {
    constructor(scene, x ,y) {
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
            let xOffset = startX + ( i * cellGap);
            let cell = scene.add.image(startX + (cellGap * i), -103, `vol_${i}`);
            console.log("Cell xoffset" , this.xOffset);
            
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
            volume : this.currentVolume,
            language : this.currentLanguage
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