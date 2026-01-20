export class CustomButton extends Phaser.GameObjects.Image {
    constructor(scene, x, y, normalKey, pressedKey, callback) {

        super(scene, x, y, normalKey);
        
        scene.add.existing(this); 
        this.setInteractive({ useHandCursor: true });


        this.on('pointerdown', () => {
            this.setTexture(pressedKey);
            this.setScale(0.95);
            // 如果你有加載音效，可以喺度播：scene.sound.play('click_sound');
        });

        this.on('pointerup', () => {
            this.setTexture(normalKey);
            this.setScale(1);
            callback(); // 執行你傳入嚟個 function
        });

        this.on('pointerout', () => {
            this.setTexture(normalKey);
            this.setScale(1);
        });
    }
}