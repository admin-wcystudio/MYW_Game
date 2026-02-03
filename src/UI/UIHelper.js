import { CustomButton } from './Button.js';
import { CustomPanel, ItemsPanel, SettingPanel } from './Panel.js';

export default class UIHelper {

    //create common ui button
    static createCommonUI(scene, programPages, descriptionPages, depth = 100, newProgramBtn = 'program_btn', newProgramClickBtn = 'program_btn_click') {
        // Panels
        const settingPanel = new SettingPanel(scene, 960, 540).setScrollFactor(0);
        settingPanel.setVisible(false);
        settingPanel.setDepth(depth + 30); // Setting panel above others by default
        scene.add.existing(settingPanel);

        const descriptionPanel = new CustomPanel(scene, 960, 540, descriptionPages).setScrollFactor(0);
        descriptionPanel.setVisible(false);
        descriptionPanel.setDepth(depth + 30);
        scene.add.existing(descriptionPanel);

        const programPanel = new CustomPanel(scene, 960, 540, programPages).setScrollFactor(0);
        programPanel.setVisible(false);
        programPanel.setDepth(depth + 30);
        scene.add.existing(programPanel);

        const allButtons = [];

        // Buttons
        const settingBtn = new CustomButton(scene, 100, 100, 'setting_btn', 'setting_btn_click',
            () => {
                openPanel(settingPanel, settingBtn);
            }, () => {
                settingPanel.setVisible(false);
            }).setScrollFactor(0);

        settingBtn.setDepth(depth + 20); // Buttons above panels
        allButtons.push(settingBtn);

        const descBtn = new CustomButton(scene, 250, 100, 'desc_button', 'desc_button_click',
            () => {
                openPanel(descriptionPanel, descBtn);
            }, () => {
                descriptionPanel.setVisible(false);
            }).setScrollFactor(0);

        descBtn.setDepth(depth + 20);
        allButtons.push(descBtn);

        const programBtn = new CustomButton(scene, 400, 100, newProgramBtn, newProgramClickBtn,
            () => {
                openPanel(programPanel, programBtn);
            }, () => {
                programPanel.setVisible(false);
            }).setScrollFactor(0);
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
                btn.setScrollFactor(0);
            });
            if (targetPanel) {
                targetPanel.setVisible(true);
                targetPanel.currentPage = 0;
                if (targetPanel.refresh) targetPanel.refresh();
            }
        }

        return { settingBtn, descBtn, programBtn, settingPanel, descriptionPanel, programPanel };
    }


    static createGameCommonUI(scene, bgKey, titleKey, descriptionPages, targetRounds = 3, depth = 10) {

        const width = scene.cameras.main.width;
        const height = scene.cameras.main.height;

        scene.add.image(width / 2, height / 2, bgKey).setDepth(1);
        scene.add.image(width / 2, 80, titleKey).setDepth(3);

        const roundStates = [];
        const startX = 1755; // 起始位置 (最右邊圓圈的 X 座標)
        const spacing = 145; // 圓圈之間的間距

        for (let i = 0; i < targetRounds; i++) {
            // 由右向左生成物件
            const icon = scene.add.image(startX - (i * spacing), 200, 'game_gamechance')
                .setScale(0.8)
                .setDepth(555);

            roundStates.push({
                round: i + 1,
                content: icon, // 存入 Image 物件以便後續 setTexture
                isSuccess: false
            });
        }

        // Panels
        const settingPanel = new SettingPanel(scene, 960, 540).setScrollFactor(0);
        settingPanel.setVisible(false);
        settingPanel.setDepth(999); // Setting panel above others by default
        scene.add.existing(settingPanel);

        const descriptionPanel = new CustomPanel(scene, 960, 540, descriptionPages).setScrollFactor(0);
        descriptionPanel.setVisible(true);
        descriptionPanel.setDepth(999);
        scene.add.existing(descriptionPanel);

        const itemPanel = new ItemsPanel(scene, 960, 540).setScrollFactor(0);
        itemPanel.setVisible(false);
        itemPanel.setDepth(999);
        scene.add.existing(itemPanel);

        const allButtons = [];

        // Buttons
        const settingBtn = new CustomButton(scene, 100, 100, 'setting_btn', 'setting_btn_click',
            () => {
                openPanel(settingPanel, settingBtn);
            }, () => {
                settingPanel.setVisible(false);
            }).setScrollFactor(0);

        settingBtn.setDepth(999); // Buttons above panels
        allButtons.push(settingBtn);

        const descBtn = new CustomButton(scene, 250, 100, 'desc_button', 'desc_button_click',
            () => {
                openPanel(descriptionPanel, descBtn);
            }, () => {
                descriptionPanel.setVisible(false);
            }).setScrollFactor(0);

        descBtn.setDepth(999);
        allButtons.push(descBtn);

        const itemBtn = new CustomButton(scene, 400, 100, 'gameintro_bag', 'gameintro_bag_click',
            () => {
                openPanel(itemPanel, itemBtn);
            }, () => {
                itemPanel.setVisible(false);
            }).setScrollFactor(0);
        itemBtn.setDepth(999);
        allButtons.push(itemBtn);

        settingBtn.needClicked = true;
        descBtn.needClicked = true;
        itemBtn.needClicked = true;


        descriptionPanel.toggleBtn = descBtn;
        itemBtn.toggleBtn = itemBtn;
        settingPanel.toggleBtn = settingBtn;


        function openPanel(targetPanel, activeBtn) {
            [settingPanel, descriptionPanel, itemPanel]
                .forEach(p => {
                    if (p) p.setVisible(false);
                });
            // --- 重設所有按鈕狀態 ---
            allButtons.forEach(btn => {
                if (btn !== activeBtn) {
                    btn.resetStatus?.();
                }
                btn.setScrollFactor(0);
            });
            if (targetPanel) {
                targetPanel.setVisible(true);
                targetPanel.currentPage = 0;
                if (targetPanel.refresh) targetPanel.refresh();
            }
        }

        return { settingBtn, descBtn, itemBtn, settingPanel, descriptionPanel, itemPanel, roundStates };
    }

    //================================ Video switcher with transition ===========================
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

    static showTimer(scene, seconds, isStartNow = false, onComplete, depth = 11) {
        const timerBg = scene.add.image(1640, 80, 'game_timer_bg').setDepth(999).setScrollFactor(0);

        // 使用 state 物件管理，確保外部 reset 可以改動數值
        const state = {
            timeLeft: seconds,
            isRunning: isStartNow
        };

        const formatTime = (s) => {
            const minutes = Math.floor(s / 60);
            const partInSeconds = s % 60;
            return `${minutes}:${partInSeconds.toString().padStart(2, '0')}`;
        };

        const timerText = scene.add.text(1640, 80, formatTime(state.timeLeft), {
            fontSize: '60px', color: '#ffffff', fontStyle: 'bold'
        }).setOrigin(0.5).setDepth(999).setScrollFactor(0);

        const timerController = {
            start: () => { state.isRunning = true; },
            stop: () => { state.isRunning = false; },
            reset: (newSeconds) => {
                state.timeLeft = newSeconds || seconds;
                state.isRunning = false; // 重置時先停止，等待 startGameLogic 啟動
                timerText.setText(formatTime(state.timeLeft));
            }
        };

        const timerEvent = scene.time.addEvent({
            delay: 1000,
            callback: () => {
                if (state.isRunning) {
                    state.timeLeft--;
                    timerText.setText(formatTime(state.timeLeft));
                    if (state.timeLeft <= 0) {
                        state.isRunning = false;
                        if (onComplete) onComplete();
                        scene.events.emit('game-timeout');
                    }
                }
            },
            loop: true,
        });

        return timerController;
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