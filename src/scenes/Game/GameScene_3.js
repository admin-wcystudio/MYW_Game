import { CustomButton } from '../../UI/Button.js';
import { CustomPanel, SettingPanel } from '../../UI/Panel.js';
import UIHelper from '../../UI/UIHelper.js';
import BaseGameScene from './BaseGameScene.js';

export class GameScene_3 extends BaseGameScene {
    constructor() {
        super('GameScene_3');
        this.roundPerSeconds = 30;
        this.targetRounds = 1;
        this.sceneIndex = 3;
    }

    preload() {
        const path = 'assets/Game_3/';

        // 背景與 UI 基礎
        this.load.image('game3_bg', path + 'game3_bg.png');
        this.load.image('game3_card_bg', path + 'game3_card_bg.png');
        this.load.image('game3_title', path + 'game3_title.png');

        // 卡片資源 (Cards)
        for (let i = 1; i <= 6; i++) {
            this.load.image(`game3_card${i}`, `${path}game3_card${i}.png`);
        }

        this.load.image('game3_description', path + 'game3_description.png');
        this.load.image('game3_object_description', path + 'game3_object_description.png');
        this.load.image('game3_additions', path + 'game3_additions.png');
        this.load.image('game3_npc_box_intro', path + 'game3_npc_box1.png');
        this.load.image('game3_npc_box_tryagain', path + 'game3_npc_box2.png');
        this.load.image('game3_npc_box_win', path + 'game3_npc_box3.png');

    }

    create() {
        this.initGame('game3_bg', 'game3_title', 'game3_description');

        this.add.image(960, 540, 'game3_card_bg').setDepth(this.depth - 1);
    }

    /**
     * 初始化卡片物件
     * init game 時會被呼叫
     */
    setupGameObjects() {
        const centerX = this.cameras.main.width / 2;
        const centerY = this.cameras.main.height / 2;

        // Set 6 fixed card spawn positions
        const cardPositions = [
            { x: centerX - 330, y: centerY - 300 },
            { x: centerX, y: centerY - 220 },
            { x: centerX + 300, y: centerY - 250 },
            { x: centerX - 350, y: centerY + 250 },
            { x: centerX - 20, y: centerY + 220 },
            { x: centerX + 350, y: centerY + 300 }
        ];
        const defaultCards = [
            { content: 'game3_card1', targetX: centerX - 530, targetY: centerY },
            { content: 'game3_card2', targetX: centerX - 325, targetY: centerY },
            { content: 'game3_card3', targetX: centerX - 120, targetY: centerY },
            { content: 'game3_card4', targetX: centerX + 85, targetY: centerY },
            { content: 'game3_card5', targetX: centerX + 290, targetY: centerY },
            { content: 'game3_card6', targetX: centerX + 495, targetY: centerY }
        ];

        this.cardGroup = this.add.group();

        defaultCards.forEach((cardInfo, i) => {
            // Spawn each card at its fixed spawn position
            const spawnPos = cardPositions[i];
            const card = this.add.image(spawnPos.x, spawnPos.y, cardInfo.content);
            card.setData({ targetX: cardInfo.targetX, targetY: cardInfo.targetY, isCorrect: false });
            card.on('pointerdown', () => {
                this.selectCard(card);
            });
            this.cardGroup.add(card);
            card.setDepth(10);
        });

        this.input.on('drag', (pointer, gameObject, dragX, dragY) => {
            if (this.selectedCard !== gameObject) this.selectCard(gameObject);
            gameObject.setPosition(dragX, dragY).setDepth(100);
        });

        this.input.on('dragend', (pointer, gameObject) => {
            gameObject.setDepth(50);
            this.checkSnap(gameObject);
        });

        const confirm_button = new CustomButton(this, centerX + 800, centerY + 400,
            'game_confirm_button', 'game_confirm_button_select',
            () => { });

        confirm_button.setDepth(100);

        //==== Debug Graphics ===========================================================
        const debugGraphics = this.add.graphics().setDepth(this.depth + 2); // 擺喺背景上面，物件下面
        debugGraphics.lineStyle(4, 0xff0000, 1); // 紅色線，粗度 2

        const tolerance = 40; // 同你 checkSnap 裡面個數值一樣
        defaultCards.forEach(data => {
            debugGraphics.lineStyle(3, 0x00ff00, 0.5); // 綠色虛線感
            debugGraphics.strokeCircle(data.targetX, data.targetY, tolerance);
        });
    }


    selectCard(card) {
        if (this.selectedCard) {
            this.selectedCard.clearTint();
        }
        this.selectedCard = card;
        this.selectedCard.setTint(0xaaaaaa);
    }

    enableGameInteraction(enabled) {
        this.cardGroup.getChildren().forEach(card => {
            if (enabled) {
                card.setInteractive({ draggable: true });
            } else {
                card.disableInteractive();
            }
        });
    }

    checkSnap(card) {
        const { targetX, targetY } = card.data.values;
        const dist = Phaser.Math.Distance.Between(card.x, card.y, targetX, targetY);
        const isAngleCorrect = (card.angle % 360 === 0);

        if (dist < 40 && isAngleCorrect) {
            card.setPosition(targetX, targetY).setData('isCorrect', true).disableInteractive().clearTint();
            this.checkAllDone();
        }
    }

    randomCardPosition(cards) {
        const centerX = this.cameras.main.width / 2;
        const centerY = this.cameras.main.height / 2;

        cards.forEach(card => {
            card.setPosition(centerX + Phaser.Math.Between(-600, 600), centerY + Phaser.Math.Between(-300, 500));
        });
    }

    checkAllDone() {
        const allCorrect = this.CardGroup.getChildren().every(p => p.getData('isCorrect'));
        if (allCorrect) {
            this.handleWinBeforeBubble();
        }
    }

    showWin() {
        this.cardGroup.setVisible(false);
        this.time.delayedCall(1000, () => {
            const objectPanel = new CustomSinglePanel(this, 960, 600, 'game3_object_description');
            objectPanel.setDepth(201).setVisible(true);
            objectPanel.setCloseCallBack(() => GameManager.backToMainStreet(this));
        });
    }
    resetStageForNextRound() {
        this.cardGroup.setVisible(true);
        this.cardGroup.getChildren().forEach(p => p.setData('isCorrect', false));
        this.randomPuzzlePosition(this.cardGroup.getChildren());
    }

}