export default class NpcHelper {

    static createNpc(scene, x, y, npcScale = 1, videoKey, bubbles, depth = 10) {

        const npc = scene.add.video(x, y, videoKey).setDepth(depth);
        npc.setScale(npcScale);
        npc.play(true);
        npc.bubbles = bubbles;
        npc.setInteractive({ useHandCursor: true });

        npc.proximityDistance = 100;

        return npc;
    }

    static createCharacter(scene, x, y, dialogueX, dialogueY, npcScale = 1, dialogScale = 1,
        videoKey, hasDialogue = false, dialogueKey = '', isVisible = false, depth = 10) {


        const character = scene.add.video(x, y, videoKey).setDepth(depth);
        character.setScale(npcScale);
        character.play(true);

        character.videoKey = videoKey;

        // // 如果需要對話框
        // if (hasDialogue && dialogueKey) {
        //     const bubble = scene.add.image(dialogueX, dialogueY, dialogueKey)
        //         .setDepth(depth + 20)
        //         .setScale(isVisible ? dialogScale : 0)
        //         .setOrigin(0.5, 1);

        //     character.bubble = bubble; // 將對話框綁定在角色身上
        //     character.bubbleOffset = { x: dialogueX - x, y: dialogueY - y }; // 記錄相對坐標
        // }

        return character;
    }

}