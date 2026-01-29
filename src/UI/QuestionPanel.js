import { CustomButton } from './Button.js';

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
        this.title = scene.add.image(0, -300, '');// 1/3, 2/3
        this.content = scene.add.image(0, 0, '');           // 題目圖
        this.add([this.bg, this.title, this.content]);

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

        // 1. 更新標題與內容圖片
        this.title.setTexture(this.titles[this.currentIndex]);
        this.content.setTexture(q.content).setVisible(true).setDepth(556);

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
                this.handleSelect(index);
            }).setScale(0.9);

            this.add(btn); // 加入 Container
            this.optionButtons.push(btn); // 加入陣列追蹤
        });
    }

    handleSelect(index) {
        this.selectedAnswerIndex = index;
        this.optionButtons.forEach((btn, i) => {
            if (i === index) {
                btn.setTexture(`${this.questions[this.currentIndex].option[i]}_select`);
            } else {
                btn.setTexture(this.questions[this.currentIndex].option[i]);
            }
        });
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
            console.log("答錯了");
            // 呼叫 BaseGameScene 的失敗流程 (彈出 Try Again 泡泡)
            this.scene.handleTimeUp();
        }
    }

    showAddOn(addOnKey) {
        this.optionButtons.forEach(btn => btn.setVisible(false));
        this.content.setVisible(false);

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