import { CustomButton } from './Button.js';

export class QuestionPanel extends Phaser.GameObjects.Container {
    constructor(scene, questions, onComplete) {
        super(scene, 960, 540); // 調整至中心點
        this.scene = scene;
        this.questions = questions;
        this.currentIndex = 0;
        this.onComplete = onComplete;

        this.selectedAnswerIndex = -1; // 追蹤目前選中的索引

        // 1. 背景
        this.bg = scene.add.image(0, 0, 'game2_question_bg');
        this.add(this.bg);

        // 2. 標題與題目
        this.content = scene.add.image(0, 0, '');
        this.add(this.content);

        // 3. 按鈕容器與確認按鈕
        this.optionButtons = [];
        this.confirmBtn = new CustomButton(scene, 0, 300, 'game2_confirm_button', 'game2_confirm_button_select', () => {
            this.checkAnswer();
        });
        this.confirmBtn.setVisible(true); // 初始隱藏，選了選項才出現
        this.add(this.confirmBtn);

        this.showQuestion();
        scene.add.existing(this);
    }

    showQuestion() {
        const q = this.questions[this.currentIndex];
        this.selectedAnswerIndex = -1;

        this.content.setTexture(q.content);

        this.optionButtons.forEach(btn => btn.destroy());
        this.optionButtons = [];

        q.option.forEach((optKey, index) => {
            const x = index % 2 === 0 ? -250 : 250;
            const y = index < 2 ? -80 : 80;

            // 注意：這裡 CustomButton 的第二個參數是 select 狀態的圖片
            const btn = new CustomButton(this.scene, x, y + 100, optKey, `${optKey}_select`, () => {
                this.handleSelect(index);
            }).setScale(0.9);
            this.add(btn);
            this.optionButtons.push(btn);
        });
    }

    handleSelect(index) {
        this.selectedAnswerIndex = index;

        // 切換所有按鈕狀態
        this.optionButtons.forEach((btn, i) => {
            if (i === index) {
                btn.setSelect(true); // 假設 CustomButton 有 setSelect 方法，或手動更換 texture
            } else {
                btn.setSelect(false);
            }
        });

        this.confirmBtn.setVisible(true); // 顯示確認按鈕
    }

    checkAnswer() {
        if (this.selectedAnswerIndex === -1) return;

        const q = this.questions[this.currentIndex];

        if (this.selectedAnswerIndex === q.answer) {
            console.log("答對了");
            if (this.scene.gameTimer) this.scene.gameTimer.stop();

            // 更新 BaseGameScene UI
            if (this.scene.updateRoundUI) {
                this.scene.updateRoundUI(true);
                this.scene.roundIndex++;
            }

            this.confirmBtn.setVisible(false);
            this.showAddOn(q.addOn);
        } else {
            console.log("答錯了");
            this.scene.cameras.main.shake(200, 0.01);
            // 答錯可以選擇重置選取或直接算輸，這裡建議讓玩家重選
        }
    }

    showAddOn(addOnKey) {
        this.optionButtons.forEach(btn => btn.setVisible(false));

        const addOnImg = this.scene.add.image(0, 150, addOnKey)
            .setInteractive({ useHandCursor: true });
        this.add(addOnImg);

        addOnImg.once('pointerdown', () => {
            addOnImg.destroy();
            this.nextQuestion();
        });
    }

    nextQuestion() {
        this.currentIndex++;
        if (this.currentIndex < this.questions.length) {
            // 這裡呼叫 Base 的計時器重置邏輯
            if (this.scene.gameTimer) {
                this.scene.gameTimer.reset(this.scene.roundPerSeconds);
                this.scene.gameTimer.start();
            }
            this.showQuestion();
        } else {
            this.destroy();
            if (this.onComplete) this.onComplete();
        }
    }
}