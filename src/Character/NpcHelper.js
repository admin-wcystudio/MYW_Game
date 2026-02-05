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

        console.log("Creating character:", videoKey);
        const character = scene.add.video(x, y, videoKey).setDepth(depth);
        character.setScale(npcScale);
        character.play(true);

        character.videoKey = videoKey;

        return character;
    }

}