import { CustomButton } from '../../UI/Button.js';
import { CustomPanel, SettingPanel } from '../../UI/Panel.js';
import UIHelper from '../../UI/UIHelper.js';
import GameManager from '../GameManager.js';
import BaseGameScene from './BaseGameScene.js';

export class GameScene_6 extends BaseGameScene {
    constructor() {
        super('GameScene_6');
        this.roundPerSeconds = 45;
        this.targetRounds = 3;
        this.sceneIndex = 6;
    }
    preload() {
        const path = 'assets/Game_6/';
        this.load.image('game6_bg', `${path}game6_bg.png`);
        this.load.image('game6_title', `${path}game6_title.png`);
        this.load.image('game6_description', `${path}game6_description.png`);

        this.load.image('game6_npc_box_intro', `${path}game6_npc_box1.png`);
        this.load.image('game6_npc_box_win_round3', `${path}game6_npc_box2.png`);
        this.load.image('game6_npc_box_win_round1', `${path}game6_npc_box3.png`);
        this.load.image('game6_npc_box_win_round2', `${path}game6_npc_box4.png`);
        this.load.image('game6_npc_box_addon', `${path}game6_npc_box5.png`);
        this.load.image('game6_npc_box_tryagain', `${path}game6_npc_box6.png`);

        // Arrows
        this.load.image('game6_arrow_blue', `${path}game6_arrow_blue.png`);
        this.load.image('game6_arrow_green', `${path}game6_arrow_green.png`);
        this.load.image('game6_arrow_red', `${path}game6_arrow_red.png`);
        this.load.image('game6_arrow_yellow', `${path}game6_arrow_yellow.png`);

        // Bar Arrows
        this.load.image('game6_bar_arrow_blue', `${path}game6_bar_arrow_blue.png`);
        this.load.image('game6_bar_arrow_green', `${path}game6_bar_arrow_green.png`);
        this.load.image('game6_bar_arrow_red', `${path}game6_bar_arrow_red.png`);
        this.load.image('game6_bar_arrow_yellow', `${path}game6_bar_arrow_yellow.png`);

        this.load.image('game6_target_0', `${path}game6_target_0.png`);
        this.load.image('game6_target_1', `${path}game6_target_1.png`);
        this.load.image('game6_target_2', `${path}game6_target_2.png`);
        this.load.image('game6_target_3', `${path}game6_target_3.png`);

        // Other UI
        this.load.image('game6_bar_bg', `${path}game6_bar_bg.png`);
        this.load.image('game6_hit_point', `${path}game_hit_point.png`);
        this.load.image('game6_hit_button', `${path}game6_hit_button.png`);
        this.load.image('game6_hit_button_select', `${path}game6_hit_button_select.png`);

    }
    create() {
        this.initGame('game6_bg', 'game6_title', 'game6_description', 10, true);

        // Stop the timer immediately because we want to wait for the description panel to close
        if (this.gameTimer) {
            this.gameTimer.stop();
            this.gameTimer.reset(this.roundPerSeconds);
        }
        this.isGameActive = false;

        this.add.image(960, 540, 'game5_bar_bg').setDepth(20);
        this.targetImage = this.add.image(960, 560, 'game6_target_0').setDepth(21);
        this.barBG = this.add.image(960, 540, 'game6_bar_bg').setDepth(22);
        this.barBG.setVisible(true);

        this.spawnSpeed = 4;
        this.maxArrows = 6;
        this.currentRound = 0;
        this.canSpawn = false;
        this.spawnHitPoint = false;
        this.isHitPointValid = false;
        this.isWin = false;

        // const debugGraphics = this.add.graphics().setDepth(50);
        // debugGraphics.lineStyle(4, 0xff0000, 1);
        // debugGraphics.strokeRect(920, 440, 160, 160); // Visualizing x: 940-1060
    }
    update() {
        if (this.canSpawn) {
            if (!this.fallingArrows || this.fallingArrows.length < 2) {
                this.spawnArrow();
            }

            if (!this.fallingArrows) return;


            if (!this.spawnHitPoint) {
                this.time.delayedCall(1500, () => {
                    if (this.canSpawn && !this.spawnHitPoint) {
                        this.spawnHitPoint = true;
                        this.showHitPoint();
                    }
                });
            }
            // console.log('Hit point valid:', this.isHitPointValid);

            for (let i = this.fallingArrows.length - 1; i >= 0; i--) {
                const arrow = this.fallingArrows[i];
                arrow.x -= this.spawnSpeed;
                if (arrow.x < 200) {
                    arrow.destroy();
                    this.fallingArrows.splice(i, 1);
                }
            }

        }
    }

    setupGameObjects() {
        this.buttonGroup = this.add.group();
        this.arrowGroup = this.add.group();
        const colors = ['blue', 'green', 'red', 'yellow'];
        for (let i = 0; i < 4; i++) {
            const button = new CustomButton(this, 520 + i * 300, 840, `game6_arrow_${colors[i]}`, `game6_arrow_${colors[i]}`,
                () => {
                    this.handleArrowClick(i);
                }).setDepth(25);
            this.buttonGroup.add(button);
        }

        for (let i = 0; i < colors.length; i++) {
            const arrow = this.add.image(960, -100, `game6_bar_arrow_${colors[i]}`).setDepth(23);
            this.arrowGroup.add(arrow);
        }

        if (this.gameUI && this.gameUI.descriptionPanel) {
            this.gameUI.descriptionPanel.onClose = () => {
                this.startGame();
            }
        }
    }

    enableGameInteraction(enable) {
        this.canSpawn = enable;
        if (this.buttonGroup) {
            this.buttonGroup.setVisible(enable);
            this.buttonGroup.getChildren().forEach(button => {
                if (enable) {
                    button.setInteractive();
                } else {
                    button.disableInteractive();
                }
            });
        }
        if (this.barBG)
            this.barBG.setVisible(enable);

        if (this.hitPoint)
            this.hitPoint.setVisible(enable);

    }


    showHitPoint() {
        if (this.isWin) return;

        this.hitPoint = this.add.image(1000, 520, 'game6_hit_point').setDepth(30);
        this.hitPoint.setScale(0);
        this.isHitPointValid = true;
        this.tweens.add({
            targets: this.hitPoint,
            scale: 1,
            duration: 500,
            ease: 'Back.out'
        });


        this.time.delayedCall(1500, () => {
            if (this.hitPoint) {
                this.tweens.add({
                    targets: this.hitPoint,
                    scale: 0,
                    duration: 500,
                    ease: 'Back.in',
                });;
            }
            this.isHitPointValid = false
        });

        this.time.delayedCall(2000, () => {
            this.spawnHitPoint = false;
        });
    }

    spawnArrow() {
        if (!this.fallingArrows) this.fallingArrows = [];
        const colors = ['blue', 'green', 'red', 'yellow'];
        const gap = 200;
        let startX = 1620;

        if (this.fallingArrows.length > 0) {
            const rightMostArrow = this.fallingArrows.reduce((
                max, arrow) => arrow.x > max.x ? arrow : max, this.fallingArrows[0]);
            startX = Math.max(rightMostArrow.x, 1920);
        }

        console.log('Spawning ');

        for (let i = 1; i <= 12; i++) {
            const randomIndex = Phaser.Math.Between(0, colors.length - 1);
            const color = colors[randomIndex];
            const arrow = this.add.image(startX + (i * gap), 540, `game6_bar_arrow_${color}`).setDepth(24);
            arrow.colorIndex = randomIndex;
            this.fallingArrows.push(arrow);
        }

    }

    handleArrowClick(index) {
        if (!this.fallingArrows || this.fallingArrows.length === 0) return;

        // Find the first arrow that is within the hit zone
        const hitIndex = this.fallingArrows.findIndex(arrow => arrow.x >= 920 && arrow.x <= 1080);
        let winRound = false;

        if (hitIndex !== -1 && this.isHitPointValid) {
            const arrow = this.fallingArrows[hitIndex];
            console.log('Hit arrow index:', hitIndex, 'Position:', arrow.x);

            if (arrow.colorIndex === index) {
                winRound = true;
            } else {
                console.log("Wrong color clicked");
            }
        } else {
            console.log("No arrow in hit zone / or hit point not valid");
        }

        // Common cleanup: destroy arrows, hitPoint, and hide barBG
        for (let i = 0; i < this.fallingArrows.length; i++) {
            this.fallingArrows[i].destroy();
        }
        this.fallingArrows = [];

        this.barBG.setVisible(false);
        this.hitPoint.setVisible(false);

        // Handle result
        if (winRound) {
            this.handleWinBeforeBubble();
            this.currentRound++;
            this.updateTargetImage(this.currentRound);
            if (this.currentRound >= this.targetRounds) {
                this.isWin = true;
            }
        } else {
            this.handleLose();
        }
    }

    updateTargetImage(index) {
        this.targetImage.setTexture(`game6_target_${index}`);
    }

    handleWinBeforeBubble() {
        if (!this.isGameActive || this.gameState === 'gameWin') return;
        // Determine if this is the last round
        const isGameWin = (this.roundIndex + 1 >= this.targetRounds);
        this.gameState = isGameWin ? 'gameWin' : 'roundWin';
        console.log('遊戲狀態改為:', this.gameState);
        if (this.gameTimer) this.gameTimer.stop(); // Stop/Pause the timer
        this.enableGameInteraction(false);
        this.updateRoundUI(true);
        // We do NOT reset the timer here, so it continues from where it left off in the next round.

        this.time.delayedCall(500, () => {
            this.showBubble('win');
        });
    }

    showWin() {
        const lastGameResult = GameManager.loadOneGameResult(7);
        this.isLastGamePlayed = lastGameResult.isFinished ? true : false;
        console.log("Is Last Game Played:", this.isLastGamePlayed);

        if (this.isLastGamePlayed) {
            //item page
            console.log("Show item page");
        } else {
            this.time.delayedCall(1000, () => {
                GameManager.switchToGameScene(this, 'GameScene_7');
            });
        }
    }



}