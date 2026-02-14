export class TransitionScene extends Phaser.Scene {
    constructor() {
        super('TransitionScene');
    }

    create() {
        // Debug Text
        this.add.text(960, 100, 'Transition Playing...', { fontSize: '102px', color: '#ffffff' }).setOrigin(0.5);

        // Create a sprite and assign it to this.sprite
        this.sprite = this.add.sprite(960, 540, 'transition')
            .setDepth(1).setScrollFactor(0);

        this.sprite.play('transition_anim');

        this.sprite.on('animationcomplete', () => {
            console.log('Playing transition end');
            this.time.delayedCall(1000, () => {
                this.scene.start('MainStreetScene');
            });
        });
    }
}