export class CustomButton extends Phaser.GameObjects.Image {
    constructor(scene, x, y, normalKey, pressedKey, callbackDown, callbackUp) {
        super(scene, x, y, normalKey);

        this.normalKey = normalKey;
        this.pressedKey = pressedKey;
        this.isClicked = false;
        this.needClicked = false; // 預設為普通模式

        this.cbDown = callbackDown || (() => { });
        this.cbUp = callbackUp || (() => { });

        scene.add.existing(this);
        this.setInteractive({ useHandCursor: true });

        this.on('pointerdown', () => {
            if (!this.input || !this.input.enabled) return;
            if (this.needClicked) {
                // Toggle 
                this.isClicked = !this.isClicked;
                if (this.isClicked) {
                    this.setPressedState();
                    this.cbDown();
                } else {
                    this.setNormalState();
                    this.cbUp();
                }
            } else {
                // Normal Press
                this.setPressedState();
                this.cbDown();
            }
        });

        this.on('pointerover', () => {
            if (!this.input || !this.input.enabled) return;
            if (!this.isClicked) {
                this.setPressedState();
            }
        });

        this.on('pointerup', () => {
            if (!this.input || !this.input.enabled) return;
            if (!this.needClicked) {
                this.setNormalState();
                this.cbUp();
            }
        });

        this.on('pointerout', () => {
            this.setNormalState();
        });
    }
    setActive(canEnable) {
        if (!canEnable) {
            this.disableInteractive();
            this.setAlpha(0.8);
        } else {
            this.setInteractive();
            this.setAlpha(1);
        }
    }


    setPressedState() {
        if (this.pressedKey) this.setTexture(this.pressedKey);
        this.setScale(0.95);
    }

    setNormalState() {
        if (this.normalKey) this.setTexture(this.normalKey);
        this.setScale(1);
    }

    resetStatus() {
        this.isClicked = false;
        this.setNormalState();
    }
}