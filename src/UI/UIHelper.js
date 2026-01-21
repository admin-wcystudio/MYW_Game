import { CustomButton } from './Button.js';
import { CustomPanel , SettingPanel } from './Panel.js';

export function createCommonUI(scene, programPages, descriptionPages) {
    const settingPanel = new SettingPanel (scene, 960, 540);
    settingPanel.setVisible(false);
    settingPanel.setDepth(110);
    scene.add.existing(settingPanel);

    const descriptionPanel = new CustomPanel(scene, 960, 540, descriptionPages);
    descriptionPanel.setVisible(false);
    descriptionPanel.setDepth(100);
    scene.add.existing(descriptionPanel);

    const programPanel = new CustomPanel(scene, 960, 540, programPages);
    programPanel.setVisible(false);
    programPanel.setDepth(100);
    scene.add.existing(programPanel);

    const allButtons = [];

    const settingBtn = new CustomButton(scene, 100, 100, 'setting_btn', 'setting_btn_click', () => {
        openPanel(settingPanel, settingBtn);
    }, () => {
        settingPanel.setVisible(false);
    });
    allButtons.push(settingBtn);

    const descBtn = new CustomButton(scene, 250, 100, 'desc_button', 'desc_button_click', () => {
        openPanel(descriptionPanel ,descBtn);
    }, () => {
        descriptionPanel.setVisible(false);
    });
    allButtons.push(descBtn);

    const programBtn = new CustomButton(scene, 400, 100, 'program_btn', 'program_btn_click', () => {
        openPanel(programPanel, programBtn);
    }, () => {
        programPanel.setVisible(false);
    });
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
    return { settingBtn, descBtn, programBtn, settingPanel , descriptionPanel , programPanel};
}