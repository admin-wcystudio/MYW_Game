import { CustomButton } from '../../UI/Button.js';
import { CustomPanel, SettingPanel } from '../../UI/Panel.js';
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

        const npc_bubbles = [
            'game1_npc_box1',
            'game1_npc_box2',
            'game1_npc_box3'
        ];

        this.loadCurrentBubble(0, npc_bubbles, width,height);

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

        //====puzzles=====================================================
        const defaultpuzzles = [
            { content: 'game1_puzzle1', offsetX: 0, offsetY: 0, rotate: 0, targetX: centerX -100, targetY: 260 },
            { content: 'game1_puzzle2', offsetX: 0, offsetY: 0, rotate: 0, targetX: centerX + 100, targetY: 260 },
            { content: 'game1_puzzle3', offsetX: 0, offsetY: 0, rotate: 0, targetX: centerX -100, targetY: 460 },
            { content: 'game1_puzzle4', offsetX: 0, offsetY: 0, rotate: 0, targetX: centerX +100, targetY: 460 },
            { content: 'game1_puzzle5', offsetX: 0, offsetY: 0, rotate: 0, targetX: centerX -100, targetY: 660 },
            { content: 'game1_puzzle6', offsetX: 0, offsetY: 0, rotate: 0, targetX: centerX +100, targetY: 660 }
        ];

        this.randomPuzzlePosition(defaultpuzzles);

        this.puzzleGroup = this.add.group();

        defaultpuzzles.forEach(data => {
            const piece = this.add.image(data.offsetX, data.offsetY, data.content)
                .setAngle(data.rotate)
                .setInteractive({ useHandCursor: true})
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

        const rotateButton = new CustomButton(this, width -200, height -200, 
                            'game1_rotate',null,
                            ()=>{
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
        const debugGraphics = this.add.graphics().setDepth(2); // 擺喺背景上面，物件下面
        debugGraphics.lineStyle(2, 0xff0000, 1); // 紅色線，粗度 2

        defaultpuzzles.forEach(data => {
            const rectSize = 200; 
            const startX = data.targetX - rectSize / 2;
            const startY = data.targetY - rectSize / 2;

            // 畫出目標區域矩形
            debugGraphics.strokeRect(startX, startY, rectSize, rectSize);

            // 喺方框旁邊寫低係邊塊 Puzzle，方便對號入座
            this.add.text(startX, startY - 20, data.content, { 
                fontSize: '16px', 
                fill: '#ff0000' 
            }).setDepth(1);
        });

        const tolerance = 40; // 同你 checkSnap 裡面個數值一樣
        defaultpuzzles.forEach(data => {
            debugGraphics.lineStyle(1, 0x00ff00, 0.5); // 綠色虛線感
            debugGraphics.strokeCircle(data.targetX, data.targetY, tolerance);
        });

    }
    selectPuzzle(piece) {
        if (this.selectedPuzzle) {
            this.selectedPuzzle.clearTint(); // 移除變色
            this.selectedPuzzle.setScale(1); // 恢復大小
        }

        // 2. 更新當前選中的拼圖
        this.selectedPuzzle = piece;

        // 3. 加入視覺反饋 (例如變深色少少或者放大)
        piece.setTint(0xaaaaaa); 
        piece.setScale(1.1);
        
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

        if (allCorrect) {
            console.log("恭喜！全部拼圖完成！");
            // 喺度彈出 game1_success 介面
        }
    }

    loadCurrentBubble(index = 0 , npc_bubbles, width, height) {
        const bubble = npc_bubbles[index];
        console.log ("Load bubble" + bubble);
        this.add.image( width/2, 900, bubble).setDepth(10);

    }

    randomPuzzlePosition(puzzles) {
        const centerX = this.cameras.main.width / 2;
        const centerY = this.cameras.main.height / 2;
        const allowedRotations = [90, 180, 270, 360];

        // 2. 修正迴圈條件：i < puzzles.length (避免 index out of bounds)
        for (let i = 0; i < puzzles.length; i++) {
            // 隨機產生 -50 到 50 的偏移量
            let randomX = Phaser.Math.Between(-400, 400);
            let randomY = Phaser.Math.Between(-300, 100);

            let randomRotate = Phaser.Utils.Array.GetRandom(allowedRotations);
            // 賦值
            puzzles[i].offsetX = centerX + randomX;
            puzzles[i].offsetY = centerY + randomY;
            puzzles[i].rotate = randomRotate;
        }
        let puzzleIndex = Phaser.Math.Between(0,3);
    }
}