import { CustomButton } from '../UI/Button.js';
import UIHelper from '../UI/UIHelper.js';
import { CustomPanel, SettingPanel } from '../UI/Panel.js';
import NpcHelper from '../Character/NpcHelper.js';
import GameManager from './GameManager.js';

export class MainStreetScene extends Phaser.Scene {
    constructor() {
        super('MainStreetScene');
    }
    create() {

        const width = this.cameras.main.width;
        const height = this.cameras.main.height;

        const gender = localStorage.getItem('player') ? JSON.parse(localStorage.getItem('player')).gender : 'F';

        this.genderKey = gender === 'M' ? 'boy' : 'girl';
        const genderKey = this.genderKey;

        const playerPos = localStorage.getItem('playerPosition') ? JSON.parse(localStorage.getItem('playerPosition')) : { x: 800, y: 550 };
        this.playerPos = playerPos;


        console.log(`Player gender: ${gender}, genderKey: ${genderKey}`);

        const bgKeys = ['stage1', 'stage2', 'stage3', 'stage4', 'stage5'];
        let currentX = 0;
        //background
        bgKeys.forEach((key, index) => {
            const bg = this.add.image(currentX, 540, key).setOrigin(0, 0.5).setDepth(1);
            currentX += bg.width; // 累加寬度，讓下一張接在後面
        });
        this.add.image(5800, 295, 'stage_building').setOrigin(0.5, 0.5).setDepth(15).setScale(1.13);

        // 設定相機邊界為總長度 8414px
        this.cameras.main.setBounds(0, 0, 8414, 1080);

        const introPage = [
            {
                content: 'gameintro_01',
                nextBtn: null, nextBtnClick: null,
                prevBtn: null, prevBtnClick: null,
                closeBtn: 'gameintro_closebutton', closeBtnClick: 'gameintro_closebutton_click'
            },
        ]

        const ui = UIHelper.createGameCommonUI(this, null, null, introPage, 0);

        // Check if intro has been seen in this session
        const hasSeenIntro = sessionStorage.getItem('hasSeenMainStreetIntro');
        if (hasSeenIntro) {
            if (ui && ui.descriptionPanel) {
                ui.descriptionPanel.setVisible(false);
            }
        } else {
            sessionStorage.setItem('hasSeenMainStreetIntro', 'true');
        }
        //
        //buttons
        this.isLeftDown = false;
        this.isRightDown = false;

        this.btnLeft = new CustomButton(this, 150, height / 2, 'prev_button', 'prev_button_click',
            () => { this.isLeftDown = true; },
            () => {
                this.isLeftDown = false;
                this.handleAnimation(genderKey, false, true);
            }
        ).setScrollFactor(0).setDepth(100);

        this.btnRight = new CustomButton(this, width - 150, height / 2, 'next_button', 'next_button_click',
            () => { this.isRightDown = true; },
            () => {
                this.isRightDown = false;
                this.handleAnimation(genderKey, false, true);
            }
        ).setScrollFactor(0).setDepth(100);



        const npc1_bubbles = ['npc1_bubble_1', 'npc1_bubble_2', 'npc1_bubble_3'];
        const npc2_bubbles = ['npc2_bubble_1', 'npc2_bubble_2'];
        const npc3_bubbles = ['npc3_bubble_1', 'npc3_bubble_2', 'npc3_bubble_3', 'npc3_bubble_4'];
        const npc4_bubbles = ['npc4_bubble_1', 'npc4_bubble_2', 'npc4_bubble_3', 'npc4_bubble_4'];
        const npc5_bubbles = ['npc5_bubble_1', 'npc5_bubble_2', 'npc5_bubble_3'];
        const npc5_reject_bubbles = ['npc5_bubble_reject'];
        const npc6_bubbles = ['npc6_bubble_1', 'npc6_bubble_2', 'npc6_bubble_3'];
        const npc6_reject_bubbles = ['npc6_bubble_reject'];

        const fake_npc1_bubbles = ['fake_npc_1_bubble1', 'fake_npc_1_bubble2'];
        const fake_npc3_bubbles = ['fake_npc_3_bubble'];
        const fake_npc4_bubbles = ['fake_npc_4_bubble1', 'fake_npc_4_bubble2'];
        const fake_npc5_bubbles = ['fake_npc_5_bubble'];

        // NPCs (trigger game)
        this.interactiveNpcs = [];
        this.fakeNpcs = [];


        const n1 = NpcHelper.createNpc(this, 1, 1000, 450, 1, 'npc1', npc1_bubbles, 6);
        const n2 = NpcHelper.createNpc(this, 2, 4000, 480, 1, 'npc2', npc2_bubbles, 6);
        const n3 = NpcHelper.createNpc(this, 3, 2000, 550, 1, 'npc3', npc3_bubbles, 6);
        const n4 = NpcHelper.createNpc(this, 4, 330, 750, 1, 'npc4', npc4_bubbles, 15);
        const n5 = NpcHelper.createNpc(this, 5, 5100, 750, 1, 'npc5', npc5_bubbles, 15);
        const n6 = NpcHelper.createNpc(this, 6, 7900, 420, 1, 'npc6', npc6_bubbles, 6);

        this.interactiveNpcs.push(n1);
        this.interactiveNpcs.push(n2);
        this.interactiveNpcs.push(n3);
        this.interactiveNpcs.push(n4);
        this.interactiveNpcs.push(n5);
        this.interactiveNpcs.push(n6);

        // Fake NPCs (random talk)
        const f1 = NpcHelper.createNpc(this, 7, 2800, 500, 1, 'fake_npc_1', fake_npc1_bubbles, 6);
        const f2 = NpcHelper.createNpc(this, 8, 3400, 440, 1, 'fake_npc_2', null, 6);
        const f3 = NpcHelper.createNpc(this, 9, 3250, 300, 1, 'fake_npc_3', fake_npc3_bubbles, 6);
        const f4 = NpcHelper.createNpc(this, 10, 4000, 850, 1, 'fake_npc_4', fake_npc4_bubbles, 15);
        const f5 = NpcHelper.createNpc(this, 11, 4450, 350, 1, 'fake_npc_5', fake_npc5_bubbles, 6);

        this.fakeNpcs.push(f1);
        this.fakeNpcs.push(f2);
        this.fakeNpcs.push(f3);
        this.fakeNpcs.push(f4);
        this.fakeNpcs.push(f5);

        this.currentInteractiveNpc = null;

        // Add global input listener to stop movement when pointer is released anywhere
        this.input.on('pointerup', () => {
            this.isLeftDown = false;
            this.isRightDown = false;
        });

        this.interactiveNpcs.forEach((npc, index) => {
            npc.on('pointerdown', () => {
                if (npc.canInteract) {
                    const gameNumber = index + 1;
                    const sceneKey = `GameScene_${gameNumber}`;
                    this.loadBubble(0, npc.bubbles, sceneKey, npc);
                }
            });
        });

        this.fakeNpcs.forEach(npc => {
            npc.on('pointerdown', () => {
                if (npc.canInteract) {
                    this.popRandomBubble(npc.bubbles, npc);
                }
            });
        });

        this.player = NpcHelper.createCharacter(this, this.playerPos.x, this.playerPos.y, 400, 650,
            1, 1, `${genderKey}_idle`, true, 'player_bubble_1', true, 10);
        this.handleAnimation(genderKey, false, false);

        // 將相機鎖定在玩家身上
        this.cameras.main.startFollow(this.player, true, 0.1, 0.1);
    }

    update() {
        const speed = 5;
        let isMoving = false;
        let isLeft = this.player.lastDirectionLeft; // 保持最後的方向狀態

        // 純按鈕判定
        if (this.isLeftDown) {
            this.player.x -= speed;
            isLeft = true;
            isMoving = true;
        } else if (this.isRightDown) {
            this.player.x += speed;
            isLeft = false;
            isMoving = true;
        } else {
            this.player.x += 0;
            isMoving = false;
        }
        //console.log(`isLeftDown: ${this.isLeftDown}, isRightDown: ${this.isRightDown}, isMoving: ${isMoving}, isLeft: ${isLeft}`);
        // 紀錄最後方向供 handleAnimation 使用
        this.player.lastDirectionLeft = isLeft;

        this.handleAnimation(this.genderKey, isMoving, isLeft);


        this.player.x = Phaser.Math.Clamp(this.player.x, 100, 8314);
        const camView = this.cameras.main.worldView;
        const buffer = 300; // Load slightly before they appear

        const allNpcs = [...this.interactiveNpcs, ...this.fakeNpcs];
        this.currentNpcActivated = null;

        allNpcs.forEach(npc => {
            // Culling check
            const inView = (npc.x > camView.x - buffer) && (npc.x < camView.x + camView.width + buffer);

            if (inView) {
                if (!npc.isPlaying()) npc.play(true);
            } else {
                if (npc.isPlaying()) npc.stop();
            }

            const dist = Math.abs(this.player.x - npc.x);

            if (dist < npc.proximityDistance) {
                npc.canInteract = true;
                npc.setTint(0x888888); // 遠離變暗

            } else {
                npc.canInteract = false;
                npc.setTint(0xffffff); // 靠近變亮

                if (this.currentActiveBubble && this.currentActiveBubble.ownerNpc === npc) {
                    this.currentActiveBubble.destroy();
                    this.currentActiveBubble = null;
                    console.log("玩家遠離，自動關閉對話框");
                }
            }

        });
    }

    handleAnimation(gender, isMoving, isLeft) {
        const walkKey = isLeft ? `${gender}_left_walk` : `${gender}_right_walk`;
        const idleKey = `${gender}_idle`;

        if (isMoving) {
            this.changePlayerVideo(walkKey);
        } else if (!isMoving) {
            this.changePlayerVideo(idleKey);
        }
    }

    changePlayerVideo(key) {
        this.player.stop();
        this.player.changeSource(key); // 更換影片源
        this.player.play(true);
        this.player.videoKey = key;
    }

    loadBubble(index = 0, bubbles, sceneKey, targetNpc) {

        if (this.currentActiveBubble) {
            this.currentActiveBubble.destroy();
        }

        // Special handling for NPC 5 and 6: Check if Games 1-4 are completed
        // if (targetNpc.id === 5 || targetNpc.id === 6) {
        //     const allResults = GameManager.loadGameResult();
        //     // Check if games 1, 2, 3, and 4 are finished
        //     const canStartGame = [1, 2, 3, 4].every(num => {
        //         const res = allResults.find(r => r.game === num);
        //         return res && res.isFinished;
        //     });

        //     if (!canStartGame) {
        //         console.log("Game is locked. Prerequisites (Games 1-4) not met.");
        //         // Use string arrays directly as the variables are not in scope here
        //         bubbles = targetNpc.id === 5 ? ['npc5_bubble_reject'] : ['npc6_bubble_reject'];
        //         sceneKey = null; // Prevent starting the game
        //     }
        // }

        const centerX = this.cameras.main.width / 2;
        const centerY = this.cameras.main.height / 2;

        let npcX = targetNpc.x + 200;
        let npcY = targetNpc.y - 220;

        let playerX = this.player.x - 200;
        let playerY = this.player.y + 200;

        if (targetNpc.id === 4) {
            npcY = targetNpc.y + 200;
            playerX = this.player.x + 200;
        } else if (targetNpc.id === 5) {
            npcY = targetNpc.y + 200;
        } else if (targetNpc.id === 6)
            npcX = targetNpc.x - 200; {
        }


        // 2. 生成新的對話框
        const startX = index % 2 === 1 ? playerX : npcX;
        const startY = index % 2 === 1 ? playerY : npcY;

        console.log("Loading bubble at:", startX, startY, "for NPC:", targetNpc.id);

        this.bubbleImg = this.add.image(startX, startY, bubbles[index])
            .setDepth(200)
            .setInteractive({ useHandCursor: true });

        // 綁定當前 NPC 到對話框，方便 update 檢查距離
        this.bubbleImg.ownerNpc = targetNpc;
        this.currentActiveBubble = this.bubbleImg;

        // 處理點擊邏輯
        this.bubbleImg.on('pointerdown', () => {
            index++;
            if (index < bubbles.length) {
                this.bubbleImg.setTexture(bubbles[index]);
                const nextX = index % 2 === 1 ? playerX : npcX;
                const nextY = index % 2 === 1 ? playerY : npcY;
                this.bubbleImg.setPosition(nextX, nextY);
                this.currentActiveBubble = this.bubbleImg;
            } else {
                // 對話結束
                this.bubbleImg.destroy();
                this.currentActiveBubble = null;
                if (sceneKey) {
                    console.log("Starting game scene:", sceneKey);
                    const playerPos = localStorage.setItem('playerPosition', JSON.stringify({ x: this.player.x, y: this.player.y }));
                    GameManager.switchToGameScene(this, sceneKey);
                }
            }
        });

        // 彈出動畫
        this.tweens.add({
            targets: this.bubbleImg,
            scale: { from: 0.5, to: 1 },
            duration: 200,
            ease: 'Back.easeOut'
        });
    }

    popRandomBubble(bubbles, targetNpc) {
        if (bubbles === null) return;

        if (this.currentActiveBubble) {
            this.currentActiveBubble.destroy();
        }

        let randomKey = Phaser.Utils.Array.GetRandom(bubbles);

        const centerX = this.cameras.main.width / 2;
        const centerY = this.cameras.main.height / 2;

        const npcX = targetNpc.x + 200;
        const npcY = targetNpc.y - 200;

        // Position at NPC (Index 0 behavior)
        this.bubbleImg = this.add.image(npcX, npcY, randomKey)
            .setDepth(200)
            .setInteractive({ useHandCursor: true });

        this.bubbleImg.ownerNpc = targetNpc;
        this.currentActiveBubble = this.bubbleImg;

        this.tweens.add({
            targets: this.bubbleImg,
            scale: { from: 0.5, to: 1 },
            duration: 200,
            ease: 'Back.easeOut'
        });

        this.time.delayedCall(3000, () => {
            if (this.bubbleImg) {
                this.bubbleImg.destroy();
                this.currentActiveBubble = null;
            }
        });
    }

}