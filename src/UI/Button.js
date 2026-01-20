export class CustomButton extends Phaser.GameObjects.Image {
    constructor(scene, x, y, normalKey, pressedKey, callbackDown, callbackUp) {
        super(scene, x, y, normalKey);
        
        this.normalKey = normalKey;
        this.pressedKey = pressedKey;
        this.isClicked = false;

        this.cbDown = callbackDown || (() => {});
        this.cbUp = callbackUp || (() => {});

        scene.add.existing(this);
        this.setInteractive({ useHandCursor: true });

        this.on('pointerdown', () => {
            this.isClicked = !this.isClicked;

            if (this.isClicked) {
                // 狀態 A: 變為按下樣式並執行 callbackDown
                if (this.pressedKey) {
                    this.setTexture(this.pressedKey);
                    this.setScale(0.95);
                }
                this.cbDown();
            } else {
                // 狀態 B: 變回原樣並執行 callbackUp
                if (this.normalKey) {
                    this.setTexture(this.normalKey);
                    this.setScale(1);
                }
                this.cbUp();
            }
        });
    }

    resetStatus() {
        this.isClicked = false;
        if (this.normalKey) {
            this.setTexture(this.normalKey);
            this.setScale(1);
        }
    }
}