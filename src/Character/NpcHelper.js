export default class NpcHelper {

    static createNpc(scene, x, y, dialogueX, dialogueY, npcScale = 1, dialogScale = 1, videoKey,
        hasDialogue = false, dialogueKey = '', isVisible = false, depth = 10) {

        const npc = scene.add.video(x, y, videoKey).setDepth(depth + 10);
        npc.setScale(npcScale);
        npc.play(true);

        if (hasDialogue && dialogueKey) {
            npc.setInteractive({ useHandCursor: true });

            // 2. 建立對話框，初始縮放設為 0
            const bubble = scene.add.image(dialogueX, dialogueY, dialogueKey)
                .setDepth(depth + 20)
                .setScale(0) // 預設先隱藏，透過動畫彈出
                .setOrigin(0.5, 1);

            // 定義一個內部的彈出/隱藏函數，方便重複使用
            const toggleDialogue = (show) => {
                scene.tweens.add({
                    targets: bubble,
                    scale: show ? dialogScale : 0,
                    duration: 300,
                    ease: show ? 'Back.easeOut' : 'Power2',
                });
            };

            // 3. 如果 isVisible 為 true，則直接執行彈出動畫
            if (isVisible) {
                toggleDialogue(true);
            }

            // 4. 點擊 NPC 依然可以切換對話框狀態
            npc.on('pointerdown', () => {
                const currentlyVisible = bubble.scale > 0;
                toggleDialogue(!currentlyVisible);
            });

            // 將 bubble 綁定到 npc 物件上，方便外部控制
            npc.dialogueBubble = bubble;
        }

        return npc;
    }

    static createCharacter(scene, x, y, dialogueX, dialogueY, npcScale = 1, dialogScale = 1,
        videoKey, hasDialogue = false, dialogueKey = '', isVisible = false, depth = 10) {


        const character = scene.add.video(x, y, videoKey).setDepth(depth + 30);
        character.setScale(npcScale);
        character.play(true);

        character.videoKey = videoKey;

        // 如果需要對話框
        if (hasDialogue && dialogueKey) {
            const bubble = scene.add.image(dialogueX, dialogueY, dialogueKey)
                .setDepth(depth + 20)
                .setScale(isVisible ? dialogScale : 0)
                .setOrigin(0.5, 1);

            character.bubble = bubble; // 將對話框綁定在角色身上
            character.bubbleOffset = { x: dialogueX - x, y: dialogueY - y }; // 記錄相對坐標
        }

        return character;
    }

}