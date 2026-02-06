import { CustomButton } from './Button.js';

import Phaser from 'phaser';

export class QuestionPanel extends Phaser.GameObjects.Container {
    constructor(scene, questions, titles, onComplete, depth) {
        super(scene, 960, 540); // 放在畫面中央
        this.scene = scene;
        this.questions = questions; // Scene 傳進來的 3 題隨機題
        this.titles = titles;       // Scene 傳進來的標題貼圖陣列
        this.onComplete = onComplete;
        this.currentIndex = 0;
        this.selectedAnswerIndex = -1;

        // 1. 背景與標題/內容
        this.bg = scene.add.image(0, 0, 'game2_bg');
        this.content = scene.add.image(0, 0, '');
        this.title = scene.add.image(0, -390, '');
        // 題目圖
        this.add([this.bg, this.content, this.title]); // title is last, so always on top

        // 2. 確認按鈕 (初始隱藏)
        this.confirmBtn = new CustomButton(scene, 0, 330,
            'game2_confirm_button', 'game2_confirm_button_select', () => {
                this.checkAnswer();
            });
        this.add(this.confirmBtn);

        this.optionButtons = [];
        this.showQuestion();
        scene.add.existing(this);
    }

    showQuestion() {

        const q = this.questions[this.currentIndex];

        // Debug: check if texture exists in this.scene
        const titleKey = this.titles[this.currentIndex];

        console.log('[DEBUG] Texture exists in QuestionPanel:', titleKey);

        // 1. 更新標題與內容圖片
        this.content.setTexture(q.content).setVisible(true).setDepth(556);
        this.title.setTexture(this.titles[this.currentIndex]).setVisible(true).setDepth(557);
        // Ensure title is always above content in display list
        this.bringToTop(this.title);

        // 2. [重要] 清除「上一題」的所有按鈕
        if (this.optionButtons) {
            this.optionButtons.forEach(btn => btn.destroy()); // 真正從記憶體刪除
        }
        this.optionButtons = []; // 清空陣列，準備放「這一題」的新按鈕

        // 3. 根據這一題的資料，生成全新的按鈕
        q.option.forEach((optKey, index) => {
            const x = index % 2 === 0 ? -250 : 250;
            const y = index < 2 ? 50 : 210;

            const btn = new CustomButton(this.scene, x, y, optKey, `${optKey}_select`, () => {
                this.selectedAnswer(btn, index);
            }).setScale(0.9);

            this.add(btn); // 加入 Container
            this.optionButtons.push(btn); // 加入陣列追蹤
        });
    }

    handleSelect(index) {
        // Deprecated: use selectedAnswer instead
        this.selectedAnswer(this.optionButtons[index], index);
    }
    selectedAnswer(gameObject, index) {
        // Clear tint for all buttons
        this.optionButtons.forEach(btn => btn.clearTint());
        // Set tint for selected button
        gameObject.setTint(0xaaaaaa);
        this.selectedAnswerIndex = index;
    }

    checkAnswer() {
        const q = this.questions[this.currentIndex];

        if (this.selectedAnswerIndex === q.answer) {
            console.log("答對了");
            if (this.scene.gameTimer) this.scene.gameTimer.stop();

            // 更新 Scene 的圓圈 UI
            if (this.scene.updateRoundUI) {
                this.scene.updateRoundUI(true);
                this.scene.roundIndex++;
            }
            this.showAddOn(q.addOn);
        } else {
            console.log("答錯了 , correct : " + q.answer);
            // 呼叫 BaseGameScene 的失敗流程 (彈出 Try Again 泡泡)
            this.scene.handleLose();
        }
    }

    showAddOn(addOnKey) {
        this.optionButtons.forEach(btn => btn.setVisible(true));
        this.content.setVisible(true);

        const addOnImg = this.scene.add.image(0, 50, addOnKey).setInteractive({ useHandCursor: true });
        this.add(addOnImg);

        addOnImg.once('pointerdown', () => {
            addOnImg.destroy();
            this.nextQuestion();
        });
    }

    nextQuestion() {
        this.currentIndex++;
        if (this.currentIndex < this.questions.length) {
            if (this.scene.gameTimer) {
                this.scene.gameTimer.reset(this.scene.roundPerSeconds);
                this.scene.gameTimer.start();
            }
            this.showQuestion();
        } else {
            this.destroy(); // 3 題都答完了
            if (this.onComplete) this.onComplete();
        }
    }
}

export class QuestionPanel_7 extends Phaser.GameObjects.Container {
    constructor(scene, questions, onComplete, onLose, depth) {
        super(scene, 960, 540); // 放在畫面中央
        this.scene = scene;
        this.questions = questions; // Scene 傳進來的 3 題隨機題
        this.onComplete = onComplete;
        this.onLose = onLose;
        this.currentIndex = 0;
        this.selectedAnswerIndex = -1;

        this.content = scene.add.image(0, 50, '');
        this.add(this.content);

        this.confirmBtn = new CustomButton(scene, 0, 380,
            'game7_confirm_button', 'game7_confirm_button_select', () => {
                this.checkAnswer();
            });
        this.confirmBtn.setDepth(556).setVisible(true);
        this.add(this.confirmBtn);
        this.showQuestion();
        scene.add.existing(this);

    }

    showQuestion() {
        console.log(`[DEBUG] show question ${this.currentIndex}`);
        const q = this.questions[this.currentIndex];
        this.content.setTexture(q.content).setVisible(true).setDepth(556);

        if (this.optionButtons) {
            this.optionButtons.forEach(btn => btn.destroy());
        }

        this.optionButtons = []; // 清空陣列，準備放「這一題」的新按鈕

        // 3. 根據這一題的資料，生成全新的按鈕
        q.option.forEach((optKey, index) => {
            const x = 50;
            const y = -100 + index * 120;

            const btn = new CustomButton(this.scene, x, y, optKey, `${optKey}_click`, () => {
                this.selectedAnswer(btn, index);
            }).setScale(1).setVisible(true).setDepth(556);

            this.add(btn);
            this.optionButtons.push(btn);
        });
    }
    checkAnswer() {
        if (this.currentIndex >= this.questions.length) return;
        const q = this.questions[this.currentIndex];

        if (this.selectedAnswerIndex === q.answer) {
            console.log("答對了");
            if (this.currentIndex === 1) {
                console.log("觸發中間預覽");
                if (this.scene.handleMiddlePreview) {
                    this.scene.handleMiddlePreview();
                }
            }

            this.currentIndex++;

            if (this.currentIndex < this.questions.length) {
                this.showQuestion();
            } else {
                console.log("全部答對了 , 遊戲結束");
                this.destroy();
                if (this.onComplete) this.onComplete();
            }

        } else {
            console.log("答錯了 , correct : " + q.answer);
            if (this.onLose) this.onLose();
        }
    }

    selectedAnswer(gameObject, index) {
        // Clear tint for all buttons
        this.optionButtons.forEach(btn => btn.clearTint());
        // Set tint for selected button
        gameObject.setTint(0xaaaaaa);
        this.selectedAnswerIndex = index;
    }
}