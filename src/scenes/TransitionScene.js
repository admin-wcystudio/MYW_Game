export class TransitionScene extends Phaser.Scene {
    constructor() {
        super('TransitionScene');
    }

    create() {
        this.bgVideo = this.add.video(960, 540, 'transition').setDepth(12);
        this.bgVideo.setMute(false);
        this.bgVideo.play(false);

        this.time.delayedCall(1000, () => {
            {
                this.scene.start('MainStreetScene');
            }
        });
    }
}