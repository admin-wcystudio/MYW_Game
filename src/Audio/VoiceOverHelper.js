export default class VoiceOverHelper {
    static FADE_MS = 200;

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
                scene.load.audio(key, `assets/VO/${stem}_${lang}.mp3`);
            });
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
        const match = /^npc(\d+)_bubble_(\d+)$/.exec(bubbleKey);
        if (!match) return null;
        return `game${match[1]}_npc_box${match[2]}`;
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

    static stop(scene) {
        if (scene.currentVoTween) {
            scene.currentVoTween.stop();
            scene.currentVoTween = null;
        }
        if (scene.currentVo) {
            scene.currentVo.stop();
            scene.currentVo.destroy();
            scene.currentVo = null;
        }
    }

    static playBubbleVo(scene, bubbleKey, isPlayer) {
        VoiceOverHelper.stop(scene);
        const boxBase = VoiceOverHelper.boxBaseFromBubbleKey(bubbleKey);
        const voKey = VoiceOverHelper.resolveKey(scene, boxBase, isPlayer);
        if (!voKey) return;

        const sound = scene.sound.add(voKey);
        sound.setVolume(0);
        sound.play();
        scene.currentVo = sound;
        scene.currentVoTween = scene.tweens.add({
            targets: sound,
            volume: 1,
            duration: VoiceOverHelper.FADE_MS
        });
    }
}
