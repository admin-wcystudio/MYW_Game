import { CustomButton } from '../../UI/Button.js';
import { CustomPanel, SettingPanel, CustomSinglePanel } from '../../UI/Panel.js';
import UIHelper from '../../UI/UIHelper.js';
import GameManager from '../GameManager.js';

export class GameScene_1 extends Phaser.Scene {
    constructor() {
        super('GameScene_1');
    }

    preload() {
        // 設定基礎路徑
        const path = 'assets/Game_1/';

        // --- 背景與介面 ---
        this.load.image('game1_bg', `${path}game1_bg.png`);
        this.load.image('game1_timer', `${path}game1_timer.png`);
        this.load.image('game1_title', `${path}game1_title.png`);
        this.load.image('game1_rotate', `${path}game1_rotate.png`);
        this.load.image('game1_description', `${path}game1_description.png`);
        this.load.image('game1_object_description', `${path}game1_object_description.png`);

        // --- NPC 對話框 ---
        this.load.image('game1_npc_box1', `${path}game1_npc_box1.png`);
        this.load.image('game1_npc_box2', `${path}game1_npc_box2.png`);
        this.load.image('game1_npc_box3', `${path}game1_npc_box3.png`);
        this.load.image('game1_npc_box4', `${path}game1_npc_box4.png`);
        this.load.image('game1_npc_box5', `${path}game1_npc_box5.png`);

        // --- 拼圖物件 ---
        this.load.image('game1_puzzle1', `${path}game1_puzzle1.png`);
        this.load.image('game1_puzzle2', `${path}game1_puzzle2.png`);
        this.load.image('game1_puzzle3', `${path}game1_puzzle3.png`);
        this.load.image('game1_puzzle4', `${path}game1_puzzle4.png`);
        this.load.image('game1_puzzle5', `${path}game1_puzzle5.png`);
        this.load.image('game1_puzzle6', `${path}game1_puzzle6.png`);

        this.load.video('game1_success_preview', `${path}game1_success_preview.webm`);
    }

    create() {
        const width = this.cameras.main.width;
        const height = this.cameras.main.height;
        const centerX = this.cameras.main.width / 2;
        const centerY = this.cameras.main.height / 2;
        this.maxChances = 3;
        this.currentRound = 0;

        const gender = localStorage.getItem('player') ? JSON.parse(localStorage.getItem('player')).gender : 'M';
        this.loadBubble(0, gender);


        //====panel=====================================================
        const descriptionPages = [
            {
                content: 'game1_description',
                nextBtn: null, nextBtnClick: null,
                prevBtn: null, prevBtnClick: null,
                closeBtn: 'close_button', closeBtnClick: 'close_button_click'
            }
        ];

        const descriptionPanel = new CustomPanel(this, 960, 540, descriptionPages);
        descriptionPanel.setVisible(false);
        descriptionPanel.setDepth(100);

        const gameUI = GameManager.createGameCommonUI(this, 'game1_bg', 'game1_title', descriptionPages);

        //== timer
        this.gameTimer = UIHelper.showTimer(this, 5, false, () => {
            this.handleTimeUp(gameUI);
        });

        //====puzzles=====================================================
        const defaultpuzzles = [
            { content: 'game1_puzzle1', offsetX: 0, offsetY: 0, rotate: 0, targetX: centerX - 100, targetY: 260 },
            { content: 'game1_puzzle2', offsetX: 0, offsetY: 0, rotate: 0, targetX: centerX + 100, targetY: 260 },
            { content: 'game1_puzzle3', offsetX: 0, offsetY: 0, rotate: 0, targetX: centerX - 100, targetY: 460 },
            { content: 'game1_puzzle4', offsetX: 0, offsetY: 0, rotate: 0, targetX: centerX + 100, targetY: 460 },
            { content: 'game1_puzzle5', offsetX: 0, offsetY: 0, rotate: 0, targetX: centerX - 100, targetY: 660 },
            { content: 'game1_puzzle6', offsetX: 0, offsetY: 0, rotate: 0, targetX: centerX + 100, targetY: 660 }
        ];

        this.randomPuzzlePosition(defaultpuzzles);

        this.puzzleGroup = this.add.group();

        defaultpuzzles.forEach(data => {
            const piece = this.add.image(data.offsetX, data.offsetY, data.content)
                .setAngle(data.rotate)
                .setInteractive({ useHandCursor: true })
                .setDepth(50);

            piece.setData('targetX', data.targetX);
            piece.setData('targetY', data.targetY);
            piece.setData('isCorrect', false);

            this.input.setDraggable(piece);
            this.puzzleGroup.add(piece);
            piece.on('pointerdown', () => {
                this.selectPuzzle(piece);
            });
        });

        //====Drag&Drop====================================================
        this.input.on('drag', (pointer, gameObject, dragX, dragY) => {

            if (this.selectedPuzzle !== gameObject) {
                this.selectPuzzle(gameObject);
            }
            gameObject.x = dragX;
            gameObject.y = dragY;
            gameObject.setDepth(100);
        });

        this.input.on('dragend', (pointer, gameObject) => {
            gameObject.setDepth(50);

            this.checkSnap(gameObject);
        });

        const rotateButton = new CustomButton(this, width - 200, height - 200,
            'game1_rotate', null,
            () => {
                if (this.selectedPuzzle) {
                    this.selectedPuzzle.angle += 90;
                } else {
                    console.log("請先點擊選擇一塊拼圖！");
                }
            },);
        rotateButton.setDepth(100);

        this.input.on('pointerdown', (pointer, gameObject) => {
            // 如果點擊嘅位置冇任何 Game Object (即係點中背景)
            if (gameObject.length === 0) {
                if (this.selectedPuzzle) {
                    this.selectedPuzzle.clearTint();
                    this.selectedPuzzle.setScale(1);
                    this.selectedPuzzle = null;
                }
            }
        });

        //==== Debug Graphics ===========================================================
        // const debugGraphics = this.add.graphics().setDepth(2); // 擺喺背景上面，物件下面
        // debugGraphics.lineStyle(2, 0xff0000, 1); // 紅色線，粗度 2

        // defaultpuzzles.forEach(data => {
        //     const rectSize = 200; 
        //     const startX = data.targetX - rectSize / 2;
        //     const startY = data.targetY - rectSize / 2;

        //     // 畫出目標區域矩形
        //     debugGraphics.strokeRect(startX, startY, rectSize, rectSize);

        //     // 喺方框旁邊寫低係邊塊 Puzzle，方便對號入座
        //     this.add.text(startX, startY - 20, data.content, { 
        //         fontSize: '16px', 
        //         fill: '#ff0000' 
        //     }).setDepth(1);
        // });

        // const tolerance = 40; // 同你 checkSnap 裡面個數值一樣
        // defaultpuzzles.forEach(data => {
        //     debugGraphics.lineStyle(1, 0x00ff00, 0.5); // 綠色虛線感
        //     debugGraphics.strokeCircle(data.targetX, data.targetY, tolerance);
        // });

    }

    selectPuzzle(piece) {
        if (this.selectedPuzzle) {
            this.selectedPuzzle.clearTint(); // 移除變色
            this.selectedPuzzle.setScale(1); // 恢復大小
        }

        this.selectedPuzzle = piece;

        piece.setTint(0xaaaaaa);

        console.log("選中了拼圖:", piece.texture.key);
    }

    checkSnap(piece) {
        const tx = piece.getData('targetX');
        const ty = piece.getData('targetY');
        const tolerance = 40; // 容錯範圍

        // 計算距離
        const dist = Phaser.Math.Distance.Between(piece.x, piece.y, tx, ty);

        // 檢查座標同角度 (角度必須係 0 或 360)
        const isAngleCorrect = (piece.angle % 360 === 0);

        if (dist < tolerance && isAngleCorrect) {
            piece.setPosition(tx, ty); // 自動對齊
            piece.setData('isCorrect', true);
            piece.disableInteractive(); // 成功後鎖定，唔俾再郁
            piece.setTint(0xffffff); // 恢復正常顏色

            this.checkAllDone();
        }
    }

    checkAllDone() {
        // 檢查 Group 入面係咪所有拼圖都 isCorrect
        const allCorrect = this.puzzleGroup.getChildren().every(p => p.getData('isCorrect'));

        if (!allCorrect) {
            if (this.gameTimer && this.gameTimer.stop) {
                this.gameTimer.stop(); // 停止倒數
            }
            this.showSuccess(this.puzzleGroup);
        } else {

        }
    }

    loadBubble(index = 0, gender) {
        const centerX = this.cameras.main.width / 2;
        const centerY = 900; // 對話框固定的 Y 座標

        const npc_bubbles = [
            'game1_npc_box1',
            'game1_npc_box2',
            'game1_npc_box3'
        ];

        const player_bubbles = [
            'game1_npc_box4', // M
            'game1_npc_box5'  // F
        ];

        let currentBubbleImg = this.add.image(centerX, centerY, npc_bubbles[index])
            .setDepth(200) // 確保在拼圖之上
            .setScrollFactor(0) // 固定在螢幕
            .setInteractive({ useHandCursor: true });

        if (index === 0) {
            currentBubbleImg.on('pointerdown', () => {

                const playerKey = (gender === 'M') ? player_bubbles[0] : player_bubbles[1];
                currentBubbleImg.setTexture(playerKey);

                currentBubbleImg.off('pointerdown');
                currentBubbleImg.once('pointerdown', () => {
                    currentBubbleImg.destroy();
                    this.startGameLogic();
                });
            });
            // try again
        } else if (index === 2) {
            if (this.roundIndex < 2) { // 仲有機會 (0, 1)
                this.roundIndex++;
                this.resetPuzzlePositions(); // 需要呢個 function 嚟打亂拼圖
                this.startGameLogic();
            } else {

                this.showFinalFail();
            }
        }
        else {
            currentBubbleImg.once('pointerdown', () => {
                currentBubbleImg.destroy();
            });
        }
        this.tweens.add({
            targets: currentBubbleImg,
            scale: { from: 0.5, to: 1 },
            duration: 200,
            ease: 'Back.easeOut'
        });
        console.log("Load bubble: " + npc_bubbles[index]);
    }

    startGameLogic() {
        // 1. 正式開始倒數
        if (this.gameTimer) {
            this.gameTimer.start();
        }

        // 2. 開放拼圖操作
        this.puzzleGroup.getChildren().forEach(p => {
            p.setInteractive({ draggable: true });
        });

        console.log("計時器正式啟動！");
    }


    showSuccess(puzzleGroup) {
        this.loadBubble(1);
        puzzleGroup.setVisible(false);
        const successVideo = this.add.video(960, 440, 'game1_success_preview')
            .setDepth(200)
            .setScrollFactor(0);

        successVideo.play();

        this.time.delayedCall(1000, () => {
            const objectPanel = new CustomSinglePanel(this, 960, 600, 'game1_object_description');

            objectPanel.setDepth(201)
                .setScrollFactor(0)
                .setVisible(true);

            // 呼叫我們剛才在類別中加入的自定義 callback 方法
            // 傳入 this (當前場景) 給 GameManager
            objectPanel.setCloseCallBack(() => {
                console.log("面板已關閉，準備回大地圖");
                GameManager.backToMainStreet(this);
            });
        });


    }

    handleTimeUp(gameUI) {
        console.log(`第 ${this.roundIndex + 1} 局時間到`);

        // 1. 停止計時器 (避免重複觸發)
        if (this.gameTimer) this.gameTimer.stop();

        // 2. 鎖定拼圖
        if (this.puzzleGroup) {
            this.puzzleGroup.getChildren().forEach(p => p.disableInteractive());
        }

        // 3. 更新 UI (例如將粒星/心變灰)
        if (gameUI && gameUI.roundStates[this.roundIndex]) {
            gameUI.roundStates[this.roundIndex].setTexture('game_fail');
        }

        // 4. 彈出失敗對話框
        this.loadBubble(2);
    }

    randomPuzzlePosition(puzzles) {
        const centerX = this.cameras.main.width / 2;
        const centerY = this.cameras.main.height / 2;
        const allowedRotations = [90, 180, 270, 360];

        for (let i = 0; i < puzzles.length; i++) {
            let randomX = Phaser.Math.Between(-400, 400);
            let randomY = Phaser.Math.Between(-300, 100);

            let randomRotate = Phaser.Utils.Array.GetRandom(allowedRotations);

            puzzles[i].offsetX = centerX + randomX;
            puzzles[i].offsetY = centerY + randomY;
            puzzles[i].rotate = randomRotate;
        }
    }
}