import { CustomButton } from './Button.js';

export class QuestionPanel extends Phaser.GameObjects.Container {
    constructor(scene, questions, onComplete) {
        super(scene, 960, 540);
        this.scene = scene;
        this.questions = questions;
        this.currentIndex = 0;
        this.onComplete = onComplete; // 全部答完後的 callback

        // 1. 背景底圖 (假設你有一個通用背景)
        this.bg = scene.add.image(0, 0, 'game2_question_bg');
        this.add(this.bg);

        // 2. 標題與題目內容
        this.title = scene.add.image(0, -300, '');
        this.content = scene.add.image(0, -100, '');
        this.add([this.title, this.content]);

        // 3. 用來存放按鈕的 Group
        this.optionButtons = [];

        this.showQuestion();
        scene.add.existing(this);
    }

    showQuestion() {
        const q = this.questions[this.currentIndex];

        // 更新圖片
        this.title.setTexture(q.title);
        this.content.setTexture(q.content);

        // 清除舊按鈕
        this.optionButtons.forEach(btn => btn.destroy());
        this.optionButtons = [];

        // 生成新按鈕
        q.option.forEach((optKey, index) => {
            const x = index % 2 === 0 ? -300 : 300;
            const y = index < 2 ? 0 : 150;

            const btn = new CustomButton(this.scene, x, y, optKey, null, () => {
                this.checkAnswer(index);
            });
            this.add(btn);
            this.optionButtons.push(btn);
        });
    }

    checkAnswer(selectedIndex) {
        const q = this.questions[this.currentIndex];

        if (selectedIndex === q.answer) {
            console.log("答對了！");
            // 1. 停止計時器 (假設計時器在 Scene 層級)
            if (this.scene.gameTimer) this.scene.gameTimer.stop();

            // 2. 顯示補充說明 (addOn)
            this.showAddOn(q.addOn);
        } else {
            console.log("答錯了，請再試一次");
            //this.scene.cameras.main.shake(200, 0.01); // 錯誤回饋
        }
    }

    showAddOn(addOnKey) {
        // 隱藏選項，顯示補充說明圖片
        this.optionButtons.forEach(btn => btn.setVisible(false));

        const addOnImg = this.scene.add.image(0, 220, addOnKey)
            .setInteractive({ useHandCursor: true });
        this.add(addOnImg);

        // 點擊補充說明 -> 進入下一題
        addOnImg.once('pointerdown', () => {
            addOnImg.destroy();
            this.nextQuestion();
        });
    }

    nextQuestion() {
        this.currentIndex++;
        if (this.currentIndex < this.questions.length) {
            // 重新啟動計時器並顯示下一題
            if (this.scene.gameTimer) this.scene.startTimer();
            this.showQuestion();
        } else {
            // 全部完成
            this.destroy();
            if (this.onComplete) this.onComplete();
        }
    }
}