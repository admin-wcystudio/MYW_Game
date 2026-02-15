export default class NpcHelper {

    static createNpc(scene, id, x, y, npcScale = 1, key, bubbles, depth = 10, animKey = null) {

        let npc;

        npc = scene.add.sprite(x, y, key).setDepth(depth);
        npc.play(animKey);


        npc.setScale(npcScale);
        npc.bubbles = bubbles;
        npc.setInteractive({ useHandCursor: true });
        npc.id = id;
        npc.proximityDistance = 300;

        return npc;
    }

    static createCharacter(scene, x, y, dialogueX, dialogueY, npcScale = 1, dialogScale = 1,
        videoKey, hasDialogue = false, dialogueKey = '', isVisible = false, depth = 10) {

        const character = scene.add.video(x, y, videoKey).setDepth(depth);
        character.setScale(npcScale);
        character.play(true);

        character.videoKey = videoKey;

        return character;
    }

}