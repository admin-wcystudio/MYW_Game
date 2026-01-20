export class CustomButton extends Phaser.GameObjects.Image {
    constructor(scene, x, y, normalKey, pressedKey, callbackDown, callbackUp) {
        super(scene, x, y, normalKey);
        
        // 核心：如果 callback 係 null，就畀一個 empty function 佢
        this.cbDown = callbackDown || (() => {});
        this.cbUp = callbackUp || (() => {});

        scene.add.existing(this);
        this.setInteractive({ useHandCursor: true });

        this.on('pointerdown', () => {
            if (pressedKey) this.setTexture(pressedKey);
            this.setScale(0.95);
            this.cbDown(); // 行空函數唔會出錯
        });

        this.on('pointerup', () => {
            if (normalKey) this.setTexture(normalKey);
            this.setScale(1);
            this.cbUp(); // 行空函數唔會出錯
        });
    }
}