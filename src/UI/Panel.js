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
        
        // 初始更新一次
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

// export class SettingPanel extends Phraser.GameObjects.Container {
//     constructor(scene, x ,y) {
//         super(scene, x, y);
//         this.scene = scene;
//     }
// }