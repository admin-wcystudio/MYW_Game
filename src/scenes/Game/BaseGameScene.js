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
        this.gameState = 'init'; // 'init', 'playing', 'roundWin', 'gameWin', 'lose'
        this.currentBubbleImg = null;
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
        this.gameState = 'init';
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
            this.showBubble('intro', gender);
        }
    }

    /**
     * 2. 泡泡對話系統 (整合 Init, Success, Fail 狀態)
     */
    /**
     * Show a bubble (intro, win, tryagain) and handle its logic.
     * @param {'intro'|'win'|'tryagain'} type
     * @param {string|null} gender
     * @param {object} options - { autoCloseMs: number, onClose: function }
     */
    showBubble(type, gender = null, options = {}) {
        if (this.currentBubbleImg) {
            this.currentBubbleImg.destroy();
            this.currentBubbleImg = null;
        }
        const centerX = this.cameras.main.width / 2;
        // Adaptive Y: 20% from bottom for win/tryagain, 80% for intro
        const centerY = (type === 'intro') ? this.cameras.main.height * 0.8 : this.cameras.main.height * 0.8;
        const prefix = this.sceneIndex !== -1 ? `game${this.sceneIndex}` : 'game1';
        const bubbleMapping = {
            'intro': `${prefix}_npc_box_intro`,
            'win': `${prefix}_npc_box_win`,
            'gameWin': `${prefix}_npc_box_win`, // fallback to win bubble, can customize if needed
            'tryagain': `${prefix}_npc_box_tryagain`
        };
        const targetKey = bubbleMapping[type];
        const player_bubbles = [`${prefix}_npc_box4`, `${prefix}_npc_box5`];
        this.currentBubbleImg = this.add.image(centerX, centerY, targetKey)
            .setDepth(300)
            .setScrollFactor(0)
            .setInteractive({ useHandCursor: true });
        this.tweens.add({
            targets: this.currentBubbleImg,
            scale: { from: 0.5, to: 1 },
            duration: 200,
            ease: 'Back.easeOut'
        });
        let closed = false;
        const closeBubble = () => {
            if (closed) return;
            closed = true;
            if (this.currentBubbleImg) {
                this.currentBubbleImg.destroy();
                this.currentBubbleImg = null;
            }
            if (options.onClose) options.onClose();
        };
        if (type === 'intro') {
            this.currentBubbleImg.on('pointerdown', () => {
                const hasGenderAssets = this.textures.exists(player_bubbles[0]);
                if (gender && hasGenderAssets) {
                    const playerKey = (gender === 'M') ? player_bubbles[0] : player_bubbles[1];
                    this.currentBubbleImg.setTexture(playerKey);
                    this.currentBubbleImg.off('pointerdown').once('pointerdown', () => {
                        closeBubble();
                        this.startGame();
                    });
                } else {
                    closeBubble();
                    this.startGame();
                }
            });
        } else if (type === 'win') {
            this.currentBubbleImg.once('pointerdown', () => {
                if (this.successVideo) this.successVideo.destroy();
                closeBubble();
                this.handleWinAfterBubble();
            });
            if (options.autoCloseMs) {
                this.time.delayedCall(options.autoCloseMs, () => {
                    if (!closed) {
                        closeBubble();
                        this.handleWinAfterBubble();
                    }
                });
            }
        } else if (type === 'tryagain') {
            this.currentBubbleImg.once('pointerdown', () => {
                closeBubble();
                this.showFailPanel();
            });
            if (options.autoCloseMs) {
                this.time.delayedCall(options.autoCloseMs, () => {
                    if (!closed) {
                        closeBubble();
                        this.showFailPanel();
                    }
                });
            }
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

    //handlebefore -> showbubble -> handleafter
    handleWinBeforeBubble() {
        if (!this.isGameActive || this.gameState === 'gameWin') return;
        // Determine if this is the last round
        const isGameWin = (this.roundIndex + 1 >= this.targetRounds);
        this.gameState = isGameWin ? 'gameWin' : 'roundWin';
        console.log('遊戲狀態改為:', this.gameState);
        if (this.gameTimer) this.gameTimer.stop();
        this.enableGameInteraction(false);
        this.updateRoundUI(true);
        this.gameTimer.reset(this.roundPerSeconds);
        this.playSuccessFeedback();

        this.time.delayedCall(500, () => {
            this.showBubble('win');
        });
    }

    handleWinAfterBubble() {
        if (!this.isGameActive) return;
        if (this.gameState === 'gameWin') {
            this.showWin();
            this.isGameActive = false;
            this.gameState = 'completed';
            if (typeof this.onGameWin === 'function') this.onGameWin();
        } else if (this.gameState === 'roundWin') {
            this.nextRound();
        }
    }

    nextRound() {
        console.log('進入下一局');
        this.roundIndex++;
        this.resetForNewRound();
        this.startGame();
    }

    handleLose() {
        if (this.gameState === 'lose') return;
        this.isGameActive = false;
        this.gameState = 'lose';
        if (this.gameTimer) this.gameTimer.stop();
        this.enableGameInteraction(false);
        this.updateRoundUI(false);
        this.showBubble('tryagain');
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
        this.gameState = 'init';
        this.isGameActive = false;
        this.gameTimer.reset(this.roundPerSeconds);
        this.resetGameUI();
        this.resetForNewRound();
        this.startGame();
    }

    /**
     * Reset all round UI states to initial
     */
    resetGameUI() {
        if (this.gameUI && this.gameUI.roundStates) {
            this.gameUI.roundStates.forEach(data => {
                data.content.setTexture('game_gamechance');
                data.isSuccess = false;
            });
        }
    }

}