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

        const gender = localStorage.getItem('player') ? JSON.parse(localStorage.getItem('player')).gender : 'M';
        const genderKey = gender === 'M' ? 'boy' : 'girl';

        const bgKeys = ['stage1', 'stage2', 'stage3', 'stage4', 'stage5'];
        let currentX = 0;
        //background
        bgKeys.forEach((key, index) => {
            const bg = this.add.image(currentX, 540, key).setOrigin(0, 0.5).setDepth(1);
            currentX += bg.width; // 累加寬度，讓下一張接在後面
        });

        // 設定相機邊界為總長度 8414px
        this.cameras.main.setBounds(0, 0, 8414, 1080);



        const descriptionPages = [
            {
                content: 'game_description_p1',
                nextBtn: 'next_button', nextBtnClick: 'next_button_click',
                prevBtn: null, prevBtnClick: null,
                closeBtn: 'close_button', closeBtnClick: 'close_button_click'
            },
            {
                content: 'game_description_p2',
                nextBtn: 'next_button', nextBtnClick: 'next_button_click',
                prevBtn: 'prev_button', prevBtnClick: 'prev_button',
                closeBtn: 'close_button', closeBtnClick: 'close_button_click'
            }
        ];

        const introPage = [
            {
                content: 'gameintro_01',
                nextBtn: null, nextBtnClick: null,
                prevBtn: null, prevBtnClick: null,
                closeBtn: 'gameintro_closebutton', closeBtnClick: 'gameintro_closebutton_click'
            },
        ]

        const introPanel = new CustomPanel(this, 960, 620, introPage);

        //buttons
        this.isLeftDown = false;
        this.isRightDown = false;

        this.btnLeft = new CustomButton(this, 150, height / 2, 'prev_button', 'prev_button_click',
            () => { this.isLeftDown = true; },
            () => { this.isLeftDown = false; }
        ).setScrollFactor(0).setDepth(100);

        this.btnRight = new CustomButton(this, width - 150, height / 2, 'next_button', 'next_button_click',
            () => { this.isRightDown = true; },
            () => { this.isRightDown = false; }
        ).setScrollFactor(0).setDepth(100);


        const ui = UIHelper.createGameCommonUI(this, descriptionPages, 200);

        const npc1_bubbles = ['npc1_bubble_1', 'npc1_bubble_2', 'npc1_bubble_3'];
        const npc2_bubbles = ['npc2_bubble_1', 'npc2_bubble_2'];
        const npc3_bubbles = ['npc3_bubble_1', 'npc3_bubble_2', 'npc3_bubble_3', 'npc3_bubble_4'];
        const npc4_bubbles = ['npc4_bubble_1', 'npc4_bubble_2', 'npc4_bubble_3', 'npc4_bubble_4'];
        const npc5_bubbles = ['npc5_bubble_1', 'npc5_bubble_2', 'npc5_bubble_3'];
        const npc6_bubbles = ['npc6_bubble_1', 'npc6_bubble_2', 'npc6_bubble_3'];

        const fake_npc1_bubbles = ['fake_npc_1_bubble1', 'fake_npc_1_bubble2'];
        const fake_npc3_bubbles = ['fake_npc_3_bubble'];
        const fake_npc4_bubbles = ['fake_npc_4_bubble1', 'fake_npc_4_bubble2'];
        const fake_npc5_bubbles = ['fake_npc_5_bubble'];

        // NPCs (trigger game)
        this.interactiveNpcs = [];
        this.fakeNpcs = [];


        const n1 = NpcHelper.createNpc(this, 1000, 450, 1, 'npc1', npc1_bubbles, 6);
        const n2 = NpcHelper.createNpc(this, 4000, 550, 1, 'npc2', npc2_bubbles, 6);
        const n3 = NpcHelper.createNpc(this, 2000, 550, 1, 'npc3', npc3_bubbles, 6);
        const n4 = NpcHelper.createNpc(this, 330, 750, 1, 'npc4', npc4_bubbles, 6);
        const n5 = NpcHelper.createNpc(this, 5100, 750, 1, 'npc5', npc5_bubbles, 15);
        const n6 = NpcHelper.createNpc(this, 7900, 420, 1, 'npc6', npc6_bubbles, 6);

        this.interactiveNpcs.push(n1);
        this.interactiveNpcs.push(n2);
        this.interactiveNpcs.push(n3);
        this.interactiveNpcs.push(n4);
        this.interactiveNpcs.push(n5);
        this.interactiveNpcs.push(n6);

        // Fake NPCs (random talk)
        const f1 = NpcHelper.createNpc(this, 2800, 500, 1, 'fake_npc_1', fake_npc1_bubbles, 6);
        const f2 = NpcHelper.createNpc(this, 3400, 440, 1, 'fake_npc_2', null, 6);
        const f3 = NpcHelper.createNpc(this, 3250, 300, 1, 'fake_npc_3', fake_npc3_bubbles, 6);
        const f4 = NpcHelper.createNpc(this, 4000, 850, 1, 'fake_npc_4', fake_npc4_bubbles, 15);
        const f5 = NpcHelper.createNpc(this, 4450, 350, 1, 'fake_npc_5', fake_npc5_bubbles, 6);

        this.fakeNpcs.push(f1);
        this.fakeNpcs.push(f2);
        this.fakeNpcs.push(f3);
        this.fakeNpcs.push(f4);
        this.fakeNpcs.push(f5);

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
                    this.popRandomBubble(npc);
                }
            });
        });

        this.player = NpcHelper.createCharacter(this, 800, 600, 400, 650,
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
            isLeft = false;
            isMoving = false;
        }

        // 紀錄最後方向供 handleAnimation 使用
        this.player.lastDirectionLeft = isLeft;

        const playerData = localStorage.getItem('player');
        const gender = playerData ? JSON.parse(playerData).gender : 'M';
        const genderKey = gender === 'M' ? 'boy' : 'girl';

        this.handleAnimation(genderKey, isMoving, isLeft);


        this.player.x = Phaser.Math.Clamp(this.player.x, 100, 8314);

        if (this.player.bubble) {
            const offsetX = isLeft ? -Math.abs(this.player.bubbleOffset.x) : Math.abs(this.player.bubbleOffset.x);
            this.player.bubble.x = this.player.x + offsetX;
            this.player.bubble.y = this.player.y + this.player.bubbleOffset.y;
        }
        // 檢查 NPC 距離以決定是否可互動
        const allNpcs = [...this.interactiveNpcs, ...this.fakeNpcs];

        this.currentNpcActivated = null;

        allNpcs.forEach(npc => {
            const dist = Math.abs(this.player.x - npc.x);

            if (dist < npc.proximityDistance) {
                npc.canInteract = true;
                //npc.setTint(0xffffff); // 靠近變亮
            } else {
                npc.canInteract = false;
                //npc.setTint(0x888888); // 遠離變暗

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

        const centerX = this.cameras.main.width / 2;
        const centerY = 900;

        // 2. 生成新的對話框
        let bubbleImg = this.add.image(centerX, centerY, bubbles[index])
            .setDepth(200)
            .setScrollFactor(0)
            .setInteractive({ useHandCursor: true });

        // 綁定當前 NPC 到對話框，方便 update 檢查距離
        bubbleImg.ownerNpc = targetNpc;
        this.currentActiveBubble = bubbleImg;

        // 處理點擊邏輯
        bubbleImg.on('pointerdown', () => {
            index++;
            if (index < bubbles.length) {
                bubbleImg.setTexture(bubbles[index]);
            } else {
                // 對話結束
                bubbleImg.destroy();
                this.currentActiveBubble = null;
                if (sceneKey) {
                    GameManager.switchToGameScene(this, sceneKey);
                }
            }
        });

        // 彈出動畫
        this.tweens.add({
            targets: bubbleImg,
            scale: { from: 0.5, to: 1 },
            duration: 200,
            ease: 'Back.easeOut'
        });
    }

    popRandomBubble(bubbles, targetNpc) {
        const randomKey = Phaser.Utils.Array.GetRandom(bubbles);

        let bubbleImg = this.add.image(this.cameras.main.width / 2, 900, randomKey)
            .setDepth(200)
            .setScrollFactor(0)
            .setInteractive({ useHandCursor: true });

        bubbleImg.ownerNpc = targetNpc;
        this.currentActiveBubble = bubbleImg;

        this.tweens.add({
            targets: bubbleImg,
            scale: { from: 0.5, to: 1 },
            duration: 200,
            ease: 'Back.easeOut'
        });

        bubble.on('pointerdown', () => {
            bubbleImg.destroy();
            this.currentActiveBubble = null;
        });
    }

}