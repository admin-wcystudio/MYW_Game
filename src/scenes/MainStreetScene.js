export class MainStreetScene extends Phaser.Scene {
    constructor() {
        super('MainStreetScene');
    }
    create() {
        this.add.image(960, 540, 'stage').setDepth(10).setScale(0.5);
    }

}