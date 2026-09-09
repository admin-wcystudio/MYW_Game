import GameManager from '../scenes/GameManager.js';
import { gameConfig } from '../config.js';

export default class VoiceOverHelper {
    static FADE_MS = 200;
    static BGM_VOLUME = 0.18;
    static BGM_DUCKED_VOLUME = 0.05;

    static GAME_DIALOGUE = {
        1: {
            street: ['game1_npc_box1', 'game1_npc_box2', 'game1_npc_box3'],
            intro: ['game1_npc_box4', 'game1_npc_box5'],
            win: 'game1_npc_box6',
            fail: 'game1_npc_box7'
        },
        2: {
            street: ['game2_npc_box1', 'game2_npc_box2'],
            intro: ['game2_npc_box1'],
            win: 'game2_npc_box4',
            fail: 'game2_npc_box3'
        },
        3: {
            street: ['game3_npc_box1', 'game3_npc_box2', 'game3_npc_box3', 'game3_npc_box4'],
            intro: ['game3_npc_box5'],
            win: 'game3_npc_box6',
            fail: 'game3_npc_box7'
        },
        4: {
            street: ['game4_npc_box1', 'game4_npc_box2', 'game4_npc_box3', 'game4_npc_box4'],
            intro: [],
            win: 'game4_npc_box5',
            fail: 'game4_npc_box6'
        },
        5: {
            streetLock: ['game5_npc_box1'],
            street: ['game5_npc_box2', 'game5_npc_box3', 'game5_npc_box4'],
            intro: [],
            win: 'game5_npc_box5',
            fail: 'game5_npc_box6'
        },
        6: {
            streetLock: ['game6_npc_box1'],
            street: ['game6_npc_box2', 'game6_npc_box3', 'game6_npc_box4'],
            intro: [],
            win: 'game6_npc_box5',
            winFinal: ['game6_npc_box6', 'game6_npc_box7'],
            fail: 'game6_npc_box8'
        },
        7: {
            intro: ['game7_npc_box1', 'game7_npc_box2', 'game7_npc_box3'],
            afterQuestions: 'game7_npc_box4'
        }
    };

    static STEMS = [
        'Game_1/game1_npc_box1',
        'Game_1/game1_npc_box2_boy',
        'Game_1/game1_npc_box2_girl',
        'Game_1/game1_npc_box3',
        'Game_1/game1_npc_box4',
        'Game_1/game1_npc_box5_boy',
        'Game_1/game1_npc_box5_girl',
        'Game_1/game1_npc_box6',
        'Game_1/game1_npc_box7',
        'Game_2/game2_npc_box1',
        'Game_2/game2_npc_box2_boy',
        'Game_2/game2_npc_box2_girl',
        'Game_2/game2_npc_box3',
        'Game_2/game2_npc_box4',
        'Game_3/game3_npc_box1',
        'Game_3/game3_npc_box2_boy',
        'Game_3/game3_npc_box2_girl',
        'Game_3/game3_npc_box3',
        'Game_3/game3_npc_box4_boy',
        'Game_3/game3_npc_box4_girl',
        'Game_3/game3_npc_box5',
        'Game_3/game3_npc_box6',
        'Game_3/game3_npc_box7',
        'Game_4/game4_npc_box1',
        'Game_4/game4_npc_box2_boy',
        'Game_4/game4_npc_box2_girl',
        'Game_4/game4_npc_box3',
        'Game_4/game4_npc_box4_boy',
        'Game_4/game4_npc_box4_girl',
        'Game_4/game4_npc_box5',
        'Game_4/game4_npc_box6',
        'Game_5/game5_npc_box1',
        'Game_5/game5_npc_box2',
        'Game_5/game5_npc_box3_boy',
        'Game_5/game5_npc_box3_girl',
        'Game_5/game5_npc_box4',
        'Game_5/game5_npc_box5',
        'Game_5/game5_npc_box6',
        'Game_6/game6_npc_box1',
        'Game_6/game6_npc_box2',
        'Game_6/game6_npc_box2_boy',
        'Game_6/game6_npc_box2_girl',
        'Game_6/game6_npc_box3',
        'Game_6/game6_npc_box3_boy',
        'Game_6/game6_npc_box3_girl',
        'Game_6/game6_npc_box4',
        'Game_6/game6_npc_box5',
        'Game_6/game6_npc_box6',
        'Game_6/game6_npc_box7',
        'Game_6/game6_npc_box8',
        'Game_7/game7_npc_box1',
        'Game_7/game7_npc_box2',
        'Game_7/game7_npc_box3',
        'Game_7/game7_npc_box4',
    ];

    static preload(scene) {
        VoiceOverHelper.STEMS.forEach((stem) => {
            const fileBase = stem.split('/')[1];
            ['Mandarin', 'Cantonese'].forEach((lang) => {
                const key = `${fileBase}_${lang}`;
                if (!scene.cache.audio.exists(key)) {
                    scene.load.audio(key, `assets/VO/${stem}_${lang}.mp3`);
                }
            });
        });
    }

    static preloadImages(scene, keys) {
        keys.forEach((key) => {
            const match = /^game(\d+)_/.exec(key);
            if (!match || scene.textures.exists(key)) return;
            scene.load.image(key, `assets/Game_${match[1]}/${key}.png`);
        });
    }

    static streetImageKeys(gameId) {
        const config = VoiceOverHelper.GAME_DIALOGUE[gameId];
        if (!config) return [];
        const bases = [...(config.streetLock || []), ...(config.street || [])];
        return VoiceOverHelper.imageKeysForBases(gameId, bases);
    }

    static inGameImageKeys(gameId) {
        const config = VoiceOverHelper.GAME_DIALOGUE[gameId];
        if (!config) return [];
        const bases = [
            ...(config.intro || []),
            config.win,
            config.fail,
            ...(config.winFinal || []),
            config.afterQuestions
        ].filter(Boolean);
        return VoiceOverHelper.imageKeysForBases(gameId, bases);
    }

    static imageKeysForBases(gameId, bases) {
        return VoiceOverHelper.STEMS
            .filter((stem) => stem.startsWith(`Game_${gameId}/`))
            .map((stem) => stem.split('/')[1])
            .filter((file) => bases.some((base) => file === base || file.startsWith(`${base}_`)));
    }

    static getStreetLines(gameId, locked = false) {
        const config = VoiceOverHelper.GAME_DIALOGUE[gameId];
        if (!config) return [];
        if (locked && config.streetLock) return config.streetLock;
        return config.street || [];
    }

    static arePrereqsMet(gameId) {
        if (gameConfig.isTesting) return true;
        const results = GameManager.loadGameResult();
        const needed = gameId === 5 ? [1, 2, 3, 4] : gameId === 6 ? [1, 2, 3, 4, 5] : [];
        return needed.every((n) => {
            const res = results.find((r) => r.game === n);
            return res && res.isFinished;
        });
    }

    static getLanguageSuffix() {
        let language = 'HK';
        try {
            const saved = localStorage.getItem('gameSettings');
            if (saved) {
                language = JSON.parse(saved).language || 'HK';
            }
        } catch (e) {
            language = 'HK';
        }
        return language === 'CN' ? 'Mandarin' : 'Cantonese';
    }

    static getGenderTag() {
        try {
            const player = JSON.parse(localStorage.getItem('player') || '{}');
            return player.gender === 'F' ? 'girl' : 'boy';
        } catch (e) {
            return 'boy';
        }
    }

    static boxBaseFromBubbleKey(bubbleKey) {
        const genderedBox = /^(game\d+_npc_box\d+)_(?:boy|girl)$/.exec(bubbleKey);
        if (genderedBox) return genderedBox[1];
        if (/^game\d+_npc_box\d+$/.test(bubbleKey)) return bubbleKey;

        const match = /^npc(\d+)_bubble_(\d+)$/.exec(bubbleKey);
        if (!match) return null;
        return `game${match[1]}_npc_box${match[2]}`;
    }

    static resolveTexture(scene, key) {
        if (!key) return null;
        const genderTag = VoiceOverHelper.getGenderTag();
        const gendered = `${key}_${genderTag}`;
        if (scene.textures.exists(gendered)) return gendered;
        if (scene.textures.exists(key)) return key;
        return null;
    }

    static resolveKey(scene, boxBase, isPlayer) {
        if (!boxBase) return null;
        const lang = VoiceOverHelper.getLanguageSuffix();
        const genderTag = VoiceOverHelper.getGenderTag();
        const gendered = `${boxBase}_${genderTag}_${lang}`;
        const plain = `${boxBase}_${lang}`;

        if (isPlayer) {
            if (scene.cache.audio.exists(gendered)) return gendered;
            if (scene.cache.audio.exists(plain)) return plain;
        } else {
            if (scene.cache.audio.exists(plain)) return plain;
            if (scene.cache.audio.exists(gendered)) return gendered;
        }
        return null;
    }

    static getBgm(scene) {
        return scene.sound.get('bgm');
    }

    static ensureBgm(scene) {
        if (!scene.cache.audio.exists('bgm')) return;

        const start = () => {
            let bgm = scene.sound.get('bgm');
            if (!bgm) {
                bgm = scene.sound.add('bgm', {
                    loop: true,
                    volume: VoiceOverHelper.BGM_VOLUME
                });
            }
            bgm.setLoop(true);
            bgm.setVolume(VoiceOverHelper.BGM_VOLUME);
            if (!bgm.isPlaying) bgm.play();
        };

        start();
        if (scene.sound.locked) {
            scene.sound.once('unlocked', start);
        }
    }

    static stopBgm(scene) {
        if (scene.currentBgmTween) {
            scene.currentBgmTween.stop();
            scene.currentBgmTween = null;
        }
        const bgm = VoiceOverHelper.getBgm(scene);
        if (bgm && bgm.isPlaying) bgm.stop();
    }

    static fadeBgm(scene, volume) {
        const bgm = VoiceOverHelper.getBgm(scene);
        if (!bgm) return;
        if (scene.currentBgmTween) {
            scene.currentBgmTween.stop();
            scene.currentBgmTween = null;
        }
        scene.currentBgmTween = scene.tweens.add({
            targets: bgm,
            volume,
            duration: VoiceOverHelper.FADE_MS
        });
    }

    static duckBgm(scene) {
        VoiceOverHelper.fadeBgm(scene, VoiceOverHelper.BGM_DUCKED_VOLUME);
    }

    static restoreBgm(scene) {
        VoiceOverHelper.fadeBgm(scene, VoiceOverHelper.BGM_VOLUME);
    }

    static stop(scene, options = {}) {
        const restoreBgm = options.restoreBgm !== false;
        if (scene.currentVoTween) {
            scene.currentVoTween.stop();
            scene.currentVoTween = null;
        }
        if (scene.currentVo) {
            scene.currentVo.stop();
            scene.currentVo.destroy();
            scene.currentVo = null;
        }
        if (restoreBgm) VoiceOverHelper.restoreBgm(scene);
    }

    static playBubbleVo(scene, bubbleKey, isPlayer = null) {
        VoiceOverHelper.stop(scene, { restoreBgm: false });
        const boxBase = VoiceOverHelper.boxBaseFromBubbleKey(bubbleKey);
        if (!boxBase) {
            VoiceOverHelper.restoreBgm(scene);
            return;
        }

        const lang = VoiceOverHelper.getLanguageSuffix();
        const genderTag = VoiceOverHelper.getGenderTag();
        const gendered = `${boxBase}_${genderTag}_${lang}`;
        if (isPlayer === null) {
            isPlayer = scene.cache.audio.exists(gendered);
        }

        const voKey = VoiceOverHelper.resolveKey(scene, boxBase, isPlayer);
        if (!voKey) {
            VoiceOverHelper.restoreBgm(scene);
            return;
        }

        const sound = scene.sound.add(voKey);
        sound.setVolume(0);
        sound.play();
        scene.currentVo = sound;
        VoiceOverHelper.duckBgm(scene);
        scene.currentVoTween = scene.tweens.add({
            targets: sound,
            volume: 1,
            duration: VoiceOverHelper.FADE_MS
        });
        sound.once('complete', () => {
            if (scene.currentVo === sound) {
                scene.currentVo = null;
                VoiceOverHelper.restoreBgm(scene);
            }
        });
    }
}
