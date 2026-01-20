export class Start extends Phaser.Scene {
    constructor() {
        super('Start');
    }

    preload() {
        this.load.video('cover_video', 'assets/Start/cover_bg.mp4');
    }

    create() {
        this.bgVideo = this.add.video(960, 540, 'cover_video');
        this.bgVideo.setMute(false);
        this.bgVideo.play(true); // loop

    }
}