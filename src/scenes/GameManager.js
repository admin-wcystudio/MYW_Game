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

        const ui = UIHelper.createCommonUI(scene, descriptionPages, descriptionPages,
            200, 'gameintro_bag', 'gameintro_bag_click');

        return {
            roundStates, ui
        };
    }

    static saveGameResult(sceneIndex, isCompleted, seconds = 0) {
        const savedGameResultData = localStorage.getItem('allGamesResult');
        let allGamesResult = savedGameResultData ? JSON.parse(savedGameResultData) : [
            { game: 1, isFinished: false, seconds: 0 },
            { game: 2, isFinished: false, seconds: 0 },
            { game: 3, isFinished: false, seconds: 0 },
            { game: 4, isFinished: false, seconds: 0 },
            { game: 5, isFinished: false, seconds: 0 },
            { game: 6, isFinished: false, seconds: 0 },
            { game: 7, isFinished: false, seconds: 0 },
        ];

        const gameResult = allGamesResult.find(g => g.game === sceneIndex);
        if (gameResult) {
            gameResult.isFinished = isCompleted;
            gameResult.seconds = seconds;
        }
        console.log("儲存遊戲結果:", allGamesResult);
        localStorage.setItem('allGamesResult', JSON.stringify(allGamesResult));

    }

    static backToMainStreet(scene) {
        scene.cameras.main.fadeOut(500, 0, 0, 0);

        scene.cameras.main.once('camerafadeoutcomplete', () => {
            scene.scene.start('MainStreetScene');
        });
    }

    static switchToGameScene(scene, gameSceneKey) {
        scene.cameras.main.fadeOut(500, 0, 0, 0);
        scene.cameras.main.once('camerafadeoutcomplete', () => {
            scene.scene.start(gameSceneKey);
        });
    }

}