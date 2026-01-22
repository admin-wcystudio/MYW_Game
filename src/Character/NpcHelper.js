export default class NpcHelper {

    static createNpc(scene, x, y, dialogueX, dialogueY, npcScale = 1, dialogScale = 1, videoKey, 
                    hasDialogue = false, dialogueKey = '',depth = 10) {

        const npc = scene.add.video(x, y, videoKey).setDepth(depth+10);
        npc.setScale(npcScale);
        npc.play(true);

        if (hasDialogue && dialogueKey) {
            npc.setInteractive({ useHandCursor: true });

            // 2. 建立對話框，初始縮放設為 0，中心點設在下方
            const bubble = scene.add.image(dialogueX, dialogueY, dialogueKey)
                .setDepth(depth+20)
                .setScale(0)
                .setOrigin(0.5, 1); // Origin 設在底部，彈出時會從 NPC 頭上長出來

            // 3. 點擊事件
            npc.on('pointerdown', () => {
                const isVisible = bubble.scale > 0;

                scene.tweens.add({
                    targets: bubble,
                    scale: isVisible ? 0 :  dialogScale,
                    duration: 300,
                    ease: isVisible ? 'Power2' : 'Back.easeOut', 
                });
            });
        }

        return npc;
    }

}