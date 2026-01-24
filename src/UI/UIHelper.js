import { CustomButton } from './Button.js';
import { CustomPanel, SettingPanel } from './Panel.js';

export default class UIHelper {

    //create common ui button
    static createCommonUI(scene, programPages, descriptionPages, depth = 100, newProgramBtn = 'program_btn', newProgramClickBtn = 'program_btn_click') {
        // Panels
        const settingPanel = new SettingPanel(scene, 960, 540);
        settingPanel.setVisible(false);
        settingPanel.setDepth(depth + 30); // Setting panel above others by default
        scene.add.existing(settingPanel);

        const descriptionPanel = new CustomPanel(scene, 960, 540, descriptionPages);
        descriptionPanel.setVisible(false);
        descriptionPanel.setDepth(depth + 30);
        scene.add.existing(descriptionPanel);

        const programPanel = new CustomPanel(scene, 960, 540, programPages);
        programPanel.setVisible(false);
        programPanel.setDepth(depth + 30);
        scene.add.existing(programPanel);

        const allButtons = [];

        // Buttons
        const settingBtn = new CustomButton(scene, 100, 100, 'setting_btn', 'setting_btn_click', () => {
            openPanel(settingPanel, settingBtn);
        }, () => {
            settingPanel.setVisible(false);
        });
        settingBtn.setDepth(depth + 20); // Buttons above panels
        allButtons.push(settingBtn);

        const descBtn = new CustomButton(scene, 250, 100, 'desc_button', 'desc_button_click', () => {
            openPanel(descriptionPanel, descBtn);
        }, () => {
            descriptionPanel.setVisible(false);
        });
        descBtn.setDepth(depth + 20);
        allButtons.push(descBtn);

        const programBtn = new CustomButton(scene, 400, 100, newProgramBtn, newProgramClickBtn, () => {
            openPanel(programPanel, programBtn);
        }, () => {
            programPanel.setVisible(false);
        });
        programBtn.setDepth(depth + 20);
        allButtons.push(programBtn);

        settingBtn.needClicked = true;
        descBtn.needClicked = true;
        programBtn.needClicked = true;

        descriptionPanel.toggleBtn = descBtn;
        programPanel.toggleBtn = programBtn;
        settingPanel.toggleBtn = settingBtn;


        function openPanel(targetPanel, activeBtn) {
            [settingPanel, descriptionPanel, programPanel]
                .forEach(p => {
                    if (p) p.setVisible(false);
                });
            // --- 重設所有按鈕狀態 ---
            allButtons.forEach(btn => {
                if (btn !== activeBtn) {
                    btn.resetStatus?.();
                }
            });
            if (targetPanel) {
                targetPanel.setVisible(true);
                targetPanel.currentPage = 0;
                if (targetPanel.refresh) targetPanel.refresh();
            }
        }
        
        return { settingBtn, descBtn, programBtn, settingPanel, descriptionPanel, programPanel };
    }

    static switchVideo(scene, currentVideoVar, transitionKey, finalKey, x, y, duration = 2000, onComplete) {
        // 1. 先將舊片淡出，然後銷毀
        if (currentVideoVar) {
            scene.tweens.add({
                targets: currentVideoVar,
                alpha: 0,
                duration: 300, // 0.3秒淡出
                onComplete: () => {
                    currentVideoVar.stop();
                    currentVideoVar.destroy();
                }
            });
        }

        // 2. 建立過場動畫，初始透明度設為 0 做淡入
        const transitionVideo = scene.add.video(x, y, transitionKey)
            .setDepth(10)
            .setScrollFactor(0)
            .setAlpha(0) // 初始隱藏
            .play(false);

        // 淡入過場動畫
        scene.tweens.add({
            targets: transitionVideo,
            alpha: 1,
            duration: 300
        });

        console.log(`UIHelper: 播放過場 ${transitionKey}`);

        // 3. 設定定時器切換到最終影片
        scene.time.delayedCall(duration, () => {
            if (transitionVideo) {
                // 過場片淡出
                scene.tweens.add({
                    targets: transitionVideo,
                    alpha: 0,
                    duration: 500,
                    onComplete: () => {
                        transitionVideo.stop();
                        transitionVideo.destroy();
                    }
                });
            }

            // 建立最終循環影片，同樣做淡入
            const finalVideo = scene.add.video(x, y, finalKey)
                .setDepth(10)
                .setScrollFactor(0)
                .setAlpha(0)
                .play(true);

            scene.tweens.add({
                targets: finalVideo,
                alpha: 1,
                duration: 0 // 最終循環影片淡入耐少少，視覺更順
            });

            console.log(`UIHelper: 切換至循環影片 ${finalKey}`);

            if (onComplete) onComplete(finalVideo);
        });

        return transitionVideo;
    }
    /**
     * 新增：取代 alert 的 UI 提示
     */
    static showToast(scene, message) {
        const toast = scene.add.text(960, 800, message, {
            fontSize: '32px',
            color: '#ff0000',
            backgroundColor: '#000000',
            padding: { x: 20, y: 10 }
        }).setOrigin(0.5).setDepth(200);

        scene.time.delayedCall(2000, () => toast.destroy());
    }

    static showTimer(scene, seconds, isStartNow = false) {

        const timerBg = scene.add.image(1640, 80, 'gametimer').setDepth(100).setScrollFactor(0);

        // 2. 建立文字
        let timeLeft = seconds;

        // 定義格式化函數
        const formatTime = (s) => {
            const minutes = Math.floor(s / 60);
            const partInSeconds = s % 60;
            const formattedSeconds = partInSeconds.toString().padStart(2, '0');
            return `${minutes}:${formattedSeconds}`;
        };

        const timerText = scene.add.text(1640, 80, formatTime(timeLeft), {
            fontSize: '60px',
            color: '#ffffff',
            fontStyle: 'bold',

        }).setOrigin(0.5).setDepth(101).setScrollFactor(0);


        // 3. 倒數計時
        const timerEvent = scene.time.addEvent({
            delay: 1000,
            callback: () => {
                if (isStartNow) {
                    timeLeft--;
                    timerText.setText(formatTime(timeLeft));

                    if (timeLeft <= 0) {
                        timerEvent.destroy();
                        // 觸發時間結束事件
                        scene.events.emit('game-timeout');
                    }
                }
            },
            loop: true,
        });

        return { timerBg, timerText, timerEvent };
    }

    static changeVideo(videoObject, newKey) {
        if (!videoObject || videoObject.videoKey === newKey) return;

        console.log(`切換影片至: ${newKey}`);

        // 1. 停止舊片並更換來源
        videoObject.stop();
        videoObject.changeSource(newKey); // Phaser 3 內建方法更換影片源
        videoObject.play(true); // 循環播放

        // 2. 記錄當前 Key 方便下次對比
        videoObject.videoKey = newKey;
    }
}