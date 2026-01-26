import { CustomButton } from '../UI/Button.js';
import UIHelper from '../UI/UIHelper.js';
import { CustomPanel, SettingPanel } from '../UI/Panel.js';
import NpcHelper from '../Character/NpcHelper.js';

export default class GameManager {
    static createGameCommonUI(scene, bgKey, titleKey, descriptionPages) {
        const width = scene.cameras.main.width;
        const height = scene.cameras.main.height;
        scene.add.image(width / 2, height / 2, bgKey).setDepth(1);
        scene.add.image(width / 2, 80, titleKey).setDepth(3);

        // ====round status result
        const roundStates = [
            { round: 1, content: 'game_gamechance', isSuccess: false },
            { round: 2, content: 'game_gamechance', isSuccess: false },
            { round: 3, content: 'game_gamechance', isSuccess: false }
        ];
        let space = 145;
        roundStates.forEach(data => {
            const stateImage = scene.add.image(1900 - space, 225, data.content)
                .setScale(0.9)
                .setDepth(60);
            space += 145;
        })

        //timer
        scene.gameTimer = UIHelper.showTimer(scene, 30, false);


        const ui = UIHelper.createCommonUI(scene, descriptionPages, descriptionPages,
            200, 'gameintro_bag', 'gameintro_bag_click');

        return {
            roundStates, ui
        };
    }
}