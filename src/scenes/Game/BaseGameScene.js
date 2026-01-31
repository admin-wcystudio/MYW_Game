import { CustomButton } from '../../UI/Button.js';
import { CustomPanel, SettingPanel, CustomSinglePanel, CustomFailPanel } from '../../UI/Panel.js';
import UIHelper from '../../UI/UIHelper.js';
import GameManager from '../GameManager.js';

export default class BaseGameScene extends Phaser.Scene {
    constructor(key) {
        super(key);
        // 預設參數
        this.depth = 10;
        this.roundPerSeconds = 35;
        this.targetRounds = 3;
        this.roundIndex = 0;
        this.isGameActive = false;
        this.sceneIndex = -1;
    }

    /**
     * 1. 遊戲初始化 (在 Scene create 呼叫)
     */
    /**
     * @param {string} bgKey
     * @param {string} titleKey
     * @param {string} descriptionKey
     * @param {number} depth
     * @param {boolean} skipIntroBubble - if true, skip the first intro bubble and start game immediately
     */
    initGame(bgKey, titleKey, descriptionKey, depth = 10, skipIntroBubble = false) {
        const gender = localStorage.getItem('player') ? JSON.parse(localStorage.getItem('player')).gender : 'M';

        const descriptionPages = [
            {
                content: descriptionKey,
                closeBtn: 'close_button', closeBtnClick: 'close_button_click'
            }
        ];

        // 建立通用 UI
        this.gameUI = UIHelper.createGameCommonUI(this, bgKey, titleKey,
            descriptionPages, this.targetRounds, this.depth);

        // 建立計時器 (初始不啟動)
        this.gameTimer = UIHelper.showTimer(this, this.roundPerSeconds, false, () => {
            this.handleLose();
        });

        // 執行子類別的物件初始化
        this.setupGameObjects();

        if (skipIntroBubble) {
            this.startGame();
        } else {
            // 載入第一階段泡泡 (NPC 對話)
            this.loadBubble('intro', gender);
        }
    }

    /**
     * 2. 泡泡對話系統 (整合 Init, Success, Fail 狀態)
     */
    loadBubble(type, gender = null) {
        console.log('loadBubble in BaseGameScene');
        const centerX = this.cameras.main.width / 2;
        const centerY = 900;

        // 優先使用傳入的 sceneIndex，若無則抓取 Scene Key 前綴
        const prefix = this.sceneIndex !== -1 ? `game${this.sceneIndex}` : 'game1';
        // 定義資源名稱
        const bubbleMapping = {
            'intro': `${prefix}_npc_box_intro`,
            'win': `${prefix}_npc_box_win`,
            'tryagain': `${prefix}_npc_box_tryagain`
        };
        const targetKey = bubbleMapping[type];
        console.log('Loading bubble :', targetKey);

        const player_bubbles = [`${prefix}_npc_box4`, `${prefix}_npc_box5`];

        // 建立初始 NPC 泡泡
        let currentBubbleImg = this.add.image(centerX, centerY, targetKey)
            .setDepth(300)
            .setScrollFactor(0)
            .setInteractive({ useHandCursor: true });

        // 泡泡彈出效果
        this.tweens.add({
            targets: currentBubbleImg,
            scale: { from: 0.5, to: 1 },
            duration: 200,
            ease: 'Back.easeOut'
        });

        if (type === 'intro') {
            // 狀態 0: 初始化對話 (NPC -> [Player] -> Start)
            currentBubbleImg.on('pointerdown', () => {
                // 檢查是否提供了性別，且對應的玩家泡泡圖片資源確實存在於 Cache 中
                const hasGenderAssets = this.textures.exists(player_bubbles[0]);

                if (gender && hasGenderAssets) {
                    const playerKey = (gender === 'M') ? player_bubbles[0] : player_bubbles[1];
                    currentBubbleImg.setTexture(playerKey);

                    // 更換 Texture 後，下一次點擊才啟動遊戲
                    currentBubbleImg.off('pointerdown').once('pointerdown', () => {
                        currentBubbleImg.destroy();
                        this.startGame();
                    });
                } else {
                    // 若無性別需求或資源缺失，直接進入遊戲
                    currentBubbleImg.destroy();
                    this.startGame();
                }
            });
        } else if (type === 'win') {
            // 狀態 1: 回合成功 (Next Round / Win)
            currentBubbleImg.once('pointerdown', () => {
                if (this.successVideo) this.successVideo.destroy();
                currentBubbleImg.destroy();
                this.handleWinAfterBubble();
            });
        } else if (type === 'tryagain') {
            // 狀態 2: 失敗 (Fail Panel)
            currentBubbleImg.once('pointerdown', () => {
                currentBubbleImg.destroy();
                this.showFailPanel();
            });
        }
    }
    /**
     * 3. 流程控制方法
     */
    startGame() {
        console.log('startGame in BaseGameScene');
        this.isGameActive = true;

        if (this.gameTimer) this.gameTimer.start();
        this.enableGameInteraction(true);
        console.log(`第 ${this.roundIndex + 1} 局啟動`);
    }

    handleWinBeforeBubble() {
        if (!this.isGameActive) return;

        if (this.gameTimer) this.gameTimer.stop();
        this.enableGameInteraction(false);

        this.updateRoundUI(true);
        this.gameTimer.reset(this.roundPerSeconds);
        this.playSuccessFeedback();

        this.time.delayedCall(500, () => {
            this.loadBubble('win');
        });
    }

    handleWinAfterBubble() {
        if (!this.isGameActive) return;

        if (this.roundIndex + 1 >= this.targetRounds) {
            this.showWin();
            this.isGameActive = false;
        } else {
            this.nextRound();
        }

    }

    nextRound() {
        this.roundIndex++;
        this.resetForNewRound();
        this.startGame();
    }

    handleLose() {
        this.isGameActive = false;
        if (this.gameTimer) this.gameTimer.stop();
        this.enableGameInteraction(false);
        this.updateRoundUI(false);
        this.loadBubble('tryagain'); // 彈出 Try Again 泡泡
    }

    updateRoundUI(isSuccess) {
        if (this.gameUI?.roundStates[this.roundIndex]) {
            const state = this.gameUI.roundStates[this.roundIndex];
            state.content.setTexture(isSuccess ? 'game_success' : 'game_fail');
            state.isSuccess = isSuccess;
        }
    }

    /**
     * 4. 需由子類別實作的抽象方法
     */
    setupGameObjects() { /* 放置拼圖或按鈕 */ }
    enableGameInteraction(enabled) { /* 開啟或關閉拖拽/點擊 */ }
    resetForNewRound() { /* 重置位置 */ }
    playSuccessFeedback() { /* 播放影片 */ }
    showWin() { /* 最終勝利面板 */ }

    showFailPanel() {
        // 確保這是在所有東西的最上層
        const popupPanel = new CustomFailPanel(this, 960, 540, () => {
            popupPanel.destroy();
            this.resetWholeGame(); // 重新開始整個遊戲
        }, () => {
            GameManager.backToMainStreet(this);
        });
        popupPanel.setDepth(1000);
    }

    // 增加一個重置函數
    resetWholeGame() {
        console.log('重置整個遊戲');
        this.roundIndex = 0;
        this.gameTimer.reset(this.roundPerSeconds);
        // 重置所有 UI 圓圈
        if (this.gameUI && this.gameUI.roundStates) {
            this.gameUI.roundStates.forEach(data => {
                data.content.setTexture('game_gamechance');
                data.isSuccess = false;
            });
        }
        //reset game assets
        this.resetForNewRound();
        this.startGame();

    }

}