import { CustomButton } from './Button.js';
import { CustomPanel, SettingPanel } from './Panel.js';

export default class UIHelper {

    //create common ui button
    static createCommonUI(scene, programPages, descriptionPages, depth = 100) {
        // Panels
        const settingPanel = new SettingPanel(scene, 960, 540);
        settingPanel.setVisible(false);
        settingPanel.setDepth(depth + 10); // Setting panel above others by default
        scene.add.existing(settingPanel);

        const descriptionPanel = new CustomPanel(scene, 960, 540, descriptionPages);
        descriptionPanel.setVisible(false);
        descriptionPanel.setDepth(depth);
        scene.add.existing(descriptionPanel);

        const programPanel = new CustomPanel(scene, 960, 540, programPages);
        programPanel.setVisible(false);
        programPanel.setDepth(depth);
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

        const programBtn = new CustomButton(scene, 400, 100, 'program_btn', 'program_btn_click', () => {
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
            // 開啟目標 Panel
            if (targetPanel) {
                targetPanel.setVisible(true);
                targetPanel.currentPage = 0;
                if (targetPanel.refresh) targetPanel.refresh();
            }
        }
        return { settingBtn, descBtn, programBtn, settingPanel, descriptionPanel, programPanel };
    }

    /**
     * 新增：通用影片切換函數
     * @param {Phaser.Scene} scene 
     * @param {Phaser.GameObjects.Video} currentVideoVar - 目前 Scene 正在追蹤的影片變數
     * @param {string} transitionKey - 過場影片 Key
     * @param {string} finalKey - 循環影片 Key
     * @param {number} x, y - 坐標
     * @param {number} duration - 過場長度 (ms)
     * @param {function} onComplete - 切換完成後的回調 (用來更新 Scene 的變數)
     */
    static switchVideo(scene, currentVideoVar, transitionKey, finalKey, x, y, duration = 2000, onComplete) {
        // 1. 銷毀舊有的 Video 物件
        if (currentVideoVar) {
            currentVideoVar.stop();
            currentVideoVar.destroy();
        }

        // 2. 建立並播放過場動畫 (不循環)
        const transitionVideo = scene.add.video(x, y, transitionKey)
            .setDepth(10)
            .setScrollFactor(0)
            .play(false);

        console.log(`UIHelper: 播放過場 ${transitionKey}`);

        // 3. 設定定時器切換到最終影片
        scene.time.delayedCall(duration, () => {
            if (transitionVideo) {
                transitionVideo.stop();
                transitionVideo.destroy();
            }

            // 建立最終循環影片
            const finalVideo = scene.add.video(x, y, finalKey)
                .setDepth(10)
                .setScrollFactor(0)
                .play(true);

            console.log(`UIHelper: 切換至循環影片 ${finalKey}`);

            // 透過 callback 將新的物件傳回 Scene
            if (onComplete) onComplete(finalVideo);
        });

        // 先回傳過場影片物件，讓 Scene 可以立即追蹤
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
}