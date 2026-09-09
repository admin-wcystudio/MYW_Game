import { CustomButton } from '../UI/Button.js';
import UIHelper from '../UI/UIHelper.js';
import { CustomPanel, SettingPanel } from '../UI/Panel.js';
import NpcHelper from '../Character/NpcHelper.js';
import GameManager from './GameManager.js';
import VoiceOverHelper from '../Audio/VoiceOverHelper.js';

export class MainStreetScene extends Phaser.Scene {
    constructor() {
        super('MainStreetScene');
    }

    preload() {

        // Create loading bar UI
        const width = this.cameras.main.width;
        const height = this.cameras.main.height;

        // Loading bar background
        const barBg = this.add.rectangle(width / 2, height / 2, 400, 30, 0x222222);
        barBg.setStrokeStyle(2, 0xffffff);

        // Loading bar fill
        const barFill = this.add.rectangle(width / 2 - 195, height / 2, 0, 22, 0x00ff00);
        barFill.setOrigin(0, 0.5);

        // Loading text
        const loadingText = this.add.text(width / 2, height / 2 - 50, '載入中...', {
            fontSize: '24px',
            fontFamily: 'Arial',
            color: '#ffffff'
        }).setOrigin(0.5);

        // Percentage text
        const percentText = this.add.text(width / 2, height / 2 + 50, '0%', {
            fontSize: '20px',
            fontFamily: 'Arial',
            color: '#ffffff'
        }).setOrigin(0.5);

        // Update progress bar on load progress
        this.load.on('progress', (value) => {
            barFill.width = 390 * value;
            percentText.setText(Math.round(value * 100) + '%');
        });

        // Minimum wait time in ms (30 seconds)
        const minWaitTime = 30000;
        const startTime = Date.now();
        let isAssetsLoaded = false;

        const checkLoadingComplete = () => {
            const elapsedTime = Date.now() - startTime;
            if (isAssetsLoaded && elapsedTime >= minWaitTime) {
                barBg.destroy();
                barFill.destroy();
                loadingText.destroy();
                percentText.destroy();
            } else if (isAssetsLoaded) {
                // If assets loaded but time hasn't passed, check again later
                const remainingTime = minWaitTime - elapsedTime;
                this.time.delayedCall(remainingTime, checkLoadingComplete, [], this);
            }
        };

        // Clean up when loading complete
        this.load.on('complete', () => {
            isAssetsLoaded = true;
            checkLoadingComplete();
        });
        //main street backgrounds
        this.load.image('stage', 'assets/MainStreet/stage.png');
        this.load.image('stage1', 'assets/MainStreet/stage1.png');
        this.load.image('stage2', 'assets/MainStreet/stage2.png');
        this.load.image('stage3', 'assets/MainStreet/stage3.png');
        this.load.image('stage4', 'assets/MainStreet/stage4.png');
        this.load.image('stage5', 'assets/MainStreet/stage5.png');
        this.load.image('gameintro_01', 'assets/MainStreet/gameintro-01.png');
        this.load.image('gametimer', 'assets/MainStreet/gameintro-02.png');
        this.load.image('gameintro_bag', 'assets/MainStreet/gameintro_bag.png');
        this.load.image('gameintro_bag_click', 'assets/MainStreet/gameintro_bag_click.png');
        this.load.image('gameintro_closebutton', 'assets/MainStreet/gameintro_closebutton.png');
        this.load.image('gameintro_closebutton_click', 'assets/MainStreet/gameintro_closebutton_click.png');
        this.load.image('stage_building', 'assets/MainStreet/stage_building.png');

        VoiceOverHelper.preload(this);

        this.load.spritesheet('boy_idle', 'assets/MainStreet/Boy/maincharacter_boy_middlestand.png',
            { frameWidth: 300, frameHeight: 350 }); // 5700x2800 / 19x8
        this.load.spritesheet('boy_left_talk', 'assets/MainStreet/Boy/maincharacter_boy_lefttalking.png',
            { frameWidth: 300, frameHeight: 350 }); // 5700x1750 / 19x5
        this.load.spritesheet('boy_right_talk', 'assets/MainStreet/Boy/maincharacter_boy_righttalking.png',
            { frameWidth: 300, frameHeight: 350 }); // 4200x4200 / 14x12
        this.load.spritesheet('boy_left_walk', 'assets/MainStreet/Boy/maincharacter_boy_leftwalk.png',
            { frameWidth: 300, frameHeight: 350 }); // 2400x2100 / 8x6
        this.load.spritesheet('boy_right_walk', 'assets/MainStreet/Boy/maincharacter_boy_rightwalk.png',
            { frameWidth: 300, frameHeight: 350 }); // 3300x1750 / 11x5

        this.load.spritesheet('girl_idle', 'assets/MainStreet/Girl/maincharacter_girl_middlestand.png',
            { frameWidth: 300, frameHeight: 350 }); // 4500x3500 / 15x10
        this.load.spritesheet('girl_left_talk', 'assets/MainStreet/Girl/maincharacter_girl_lefttalking.png',
            { frameWidth: 300, frameHeight: 350 }); // 3600x2800 / 12x8
        this.load.spritesheet('girl_right_talk', 'assets/MainStreet/Girl/maincharacter_girl_righttalking.png',
            { frameWidth: 300, frameHeight: 350 }); // 3000x1750 / 10x5
        this.load.spritesheet('girl_left_walk', 'assets/MainStreet/Girl/maincharacter_girl_leftwalk.png',
            { frameWidth: 300, frameHeight: 350 }); // 1800x1400 / 6x4
        this.load.spritesheet('girl_right_walk', 'assets/MainStreet/Girl/maincharacter_girl_rightwalk.png',
            { frameWidth: 300, frameHeight: 350 }); // 1800x1400 / 6x4

        // NPC spritesheets (frame = png size / cols x rows)
        this.load.spritesheet('npc1', 'assets/MainStreet/NPCs/NPC_1/game1_npc.png',
            { frameWidth: 225, frameHeight: 290 }); // 1125x1160 / 5x4
        this.load.spritesheet('npc1_select', 'assets/MainStreet/NPCs/NPC_1/game1_npc_select.png',
            { frameWidth: 225, frameHeight: 290 }); // 1125x1160 / 5x4
        this.load.spritesheet('npc2', 'assets/MainStreet/NPCs/NPC_2/game2_npc.png',
            { frameWidth: 250, frameHeight: 250 }); // 1250x500 / 5x2
        this.load.spritesheet('npc2_select', 'assets/MainStreet/NPCs/NPC_2/game2_npc_select.png',
            { frameWidth: 250, frameHeight: 250 }); // 1250x500 / 5x2
        this.load.spritesheet('npc3', 'assets/MainStreet/NPCs/NPC_3/game3_npc.png',
            { frameWidth: 152, frameHeight: 231 }); // 760x693 / 5x3
        this.load.spritesheet('npc3_select', 'assets/MainStreet/NPCs/NPC_3/game3_npc_select.png',
            { frameWidth: 152, frameHeight: 231 }); // 625x570 / 5x3
        this.load.spritesheet('npc4', 'assets/MainStreet/NPCs/NPC_4/game4_npc.png',
            { frameWidth: 200, frameHeight: 250 }); // 1000x1000 / 5x4
        this.load.spritesheet('npc4_select', 'assets/MainStreet/NPCs/NPC_4/game4_npc_select.png',
            { frameWidth: 200, frameHeight: 250 }); // 1000x1000 / 5x4
        this.load.spritesheet('npc5', 'assets/MainStreet/NPCs/NPC_5/game5_npc.png',
            { frameWidth: 250, frameHeight: 250 }); // 1500x750 / 6x3
        this.load.spritesheet('npc5_select', 'assets/MainStreet/NPCs/NPC_5/game5_npc_select.png',
            { frameWidth: 250, frameHeight: 250 }); // 1500x750 / 6x3
        this.load.spritesheet('npc6', 'assets/MainStreet/NPCs/NPC_6/game6_npc.png',
            { frameWidth: 250, frameHeight: 300 }); // 1750x600 / 7x2
        this.load.spritesheet('npc6_select', 'assets/MainStreet/NPCs/NPC_6/game6_npc_select.png',
            { frameWidth: 250, frameHeight: 300 }); // 1750x600 / 7x2

        // Street npc_box dialogue (games 1-6)
        [1, 2, 3, 4, 5, 6].forEach((gameId) => {
            VoiceOverHelper.preloadImages(this, VoiceOverHelper.streetImageKeys(gameId));
        });

        // Fake NPCs
        this.load.spritesheet('fake_npc_1', 'assets/MainStreet/NPCs/NPC_only/fakenpc1.png',
            { frameWidth: 250, frameHeight: 250 }); // 1250x1000 / 5x4
        this.load.spritesheet('fake_npc_1_select', 'assets/MainStreet/NPCs/NPC_only/fakenpc1_select.png',
            { frameWidth: 250, frameHeight: 250 }); // 1250x1000 / 5x4
        this.load.spritesheet('fake_npc_2', 'assets/MainStreet/NPCs/NPC_only/fakenpc2.png',
            { frameWidth: 250, frameHeight: 250 }); // 2250x750 / 9x3
        this.load.spritesheet('fake_npc_2_select', 'assets/MainStreet/NPCs/NPC_only/fakenpc2_select.png',
            { frameWidth: 250, frameHeight: 250 }); // 2250x750 / 9x3
        this.load.spritesheet('fake_npc_3', 'assets/MainStreet/NPCs/NPC_only/fakenpc3.png',
            { frameWidth: 150, frameHeight: 150 }); // 750x750 / 5x5
        this.load.spritesheet('fake_npc_3_select', 'assets/MainStreet/NPCs/NPC_only/fakenpc3_select.png',
            { frameWidth: 150, frameHeight: 150 }); // 750x750 / 5x5
        this.load.spritesheet('fake_npc_4', 'assets/MainStreet/NPCs/NPC_only/fakenpc4.png',
            { frameWidth: 378, frameHeight: 213 }); // 1512x852 / 4x4
        this.load.spritesheet('fake_npc_4_select', 'assets/MainStreet/NPCs/NPC_only/fakenpc4_select.png',
            { frameWidth: 378, frameHeight: 213 }); // 1512x852 / 4x4
        this.load.spritesheet('fake_npc_5', 'assets/MainStreet/NPCs/NPC_only/fakenpc5.png',
            { frameWidth: 250, frameHeight: 250 }); // 2000x1250 / 8x5
        this.load.spritesheet('fake_npc_5_select', 'assets/MainStreet/NPCs/NPC_only/fakenpc5_select.png',
            { frameWidth: 250, frameHeight: 250 }); // 2000x1250 / 8x5

        this.load.image('fake_npc_1_bubble', 'assets/MainStreet/NPCs/NPC_only/fakenpc1_bubble.png');
        this.load.image('fake_npc_1_bubble1', 'assets/MainStreet/NPCs/NPC_only/fakenpc1_bubble1.png');
        this.load.image('fake_npc_1_bubble2', 'assets/MainStreet/NPCs/NPC_only/fakenpc1_bubble2.png');
        this.load.image('fake_npc_3_bubble', 'assets/MainStreet/NPCs/NPC_only/fakenpc3_bubble.png');
        this.load.image('fake_npc_4_bubble1', 'assets/MainStreet/NPCs/NPC_only/fakenpc4_bubble1.png');
        this.load.image('fake_npc_4_bubble2', 'assets/MainStreet/NPCs/NPC_only/fakenpc4_bubble2.png');
        this.load.image('fake_npc_5_bubble', 'assets/MainStreet/NPCs/NPC_only/fakenpc5_bubble.png');
    }

    create() {
        // Create NPC animations
        this.createAnimations();
        this.events.once('shutdown', () => VoiceOverHelper.stop(this));
        VoiceOverHelper.ensureBgm(this);
        this.input.once('pointerdown', () => VoiceOverHelper.ensureBgm(this));

        const width = this.cameras.main.width;
        const height = this.cameras.main.height;

        const gender = this.getSavedGender();

        this.genderKey = gender === 'M' ? 'boy' : 'girl';
        const genderKey = this.genderKey;

        const playerPos = localStorage.getItem('playerPosition')
            ? JSON.parse(localStorage.getItem('playerPosition')) : { x: 800, y: 550 };
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
        this.isTalking = false;

        this.btnLeft = new CustomButton(this, 150, height / 2, 'prev_button', 'prev_button_click',
            () => {
                this.isLeftDown = true;
            },
            () => {
                this.isLeftDown = false;
            }
        ).setScrollFactor(0).setDepth(100);

        this.btnRight = new CustomButton(this, width - 150, height / 2, 'next_button', 'next_button_click',
            () => {
                this.isRightDown = true;
            },
            () => {
                this.isRightDown = false;
            }
        ).setScrollFactor(0).setDepth(100);



        const npc1_bubbles = VoiceOverHelper.getStreetLines(1);
        const npc2_bubbles = VoiceOverHelper.getStreetLines(2);
        const npc3_bubbles = VoiceOverHelper.getStreetLines(3);
        const npc4_bubbles = VoiceOverHelper.getStreetLines(4);
        const npc5_bubbles = VoiceOverHelper.getStreetLines(5);
        const npc6_bubbles = VoiceOverHelper.getStreetLines(6);

        const fake_npc1_bubbles = ['fake_npc_1_bubble1', 'fake_npc_1_bubble2'];
        const fake_npc3_bubbles = ['fake_npc_3_bubble'];
        const fake_npc4_bubbles = ['fake_npc_4_bubble1', 'fake_npc_4_bubble2'];
        const fake_npc5_bubbles = ['fake_npc_5_bubble'];

        // NPCs (trigger game)
        this.interactiveNpcs = [];
        this.fakeNpcs = [];


        const n1 = NpcHelper.createNpc(this, 1, 1000, 450, 1, 'npc1', npc1_bubbles, 6, 'npc1_anim', 'npc1_select_anim');
        const n2 = NpcHelper.createNpc(this, 2, 4000, 480, 1, 'npc2', npc2_bubbles, 6, 'npc2_anim', 'npc2_select_anim');
        const n3 = NpcHelper.createNpc(this, 3, 2000, 550, 1, 'npc3', npc3_bubbles, 6, 'npc3_anim', 'npc3_select_anim');
        const n4 = NpcHelper.createNpc(this, 4, 330, 750, 1, 'npc4', npc4_bubbles, 15, 'npc4_anim', 'npc4_select_anim');
        const n5 = NpcHelper.createNpc(this, 5, 5100, 750, 1, 'npc5', npc5_bubbles, 15, 'npc5_anim', 'npc5_select_anim');
        const n6 = NpcHelper.createNpc(this, 6, 7900, 420, 1, 'npc6', npc6_bubbles, 6, 'npc6_anim', 'npc6_select_anim');

        this.interactiveNpcs.push(n1);
        this.interactiveNpcs.push(n2);
        this.interactiveNpcs.push(n3);
        this.interactiveNpcs.push(n4);
        this.interactiveNpcs.push(n5);
        this.interactiveNpcs.push(n6);

        // Fake NPCs (random talk)
        const f1 = NpcHelper.createNpc(this, 7, 2800, 500, 1, 'fake_npc_1', fake_npc1_bubbles, 6, 'fake_npc_1_anim', 'fake_npc_1_select_anim');
        const f2 = NpcHelper.createNpc(this, 8, 3400, 440, 1, 'fake_npc_2', null, 6, 'fake_npc_2_anim', 'fake_npc_2_select_anim');
        const f3 = NpcHelper.createNpc(this, 9, 3250, 300, 1, 'fake_npc_3', fake_npc3_bubbles, 6, 'fake_npc_3_anim', 'fake_npc_3_select_anim');
        const f4 = NpcHelper.createNpc(this, 10, 4000, 850, 1, 'fake_npc_4', fake_npc4_bubbles, 15, 'fake_npc_4_anim', 'fake_npc_4_select_anim');
        const f5 = NpcHelper.createNpc(this, 11, 4450, 350, 1, 'fake_npc_5', fake_npc5_bubbles, 6, 'fake_npc_5_anim', 'fake_npc_5_select_anim');

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
                    const locked = (gameNumber === 5 || gameNumber === 6)
                        && !VoiceOverHelper.arePrereqsMet(gameNumber);
                    const lines = VoiceOverHelper.getStreetLines(gameNumber, locked);
                    const sceneKey = locked ? null : `GameScene_${gameNumber}`;
                    this.loadBubble(0, lines, sceneKey, npc);
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

        this.playerSprite = this.add.sprite(playerPos.x, playerPos.y,
            `${genderKey}_idle`).setDepth(6).setScale(2);

        this.playerSprite.anims.play(`${genderKey}_idle_anim`);

        // 將相機鎖定在玩家身上
        this.cameras.main.startFollow(this.playerSprite, true, 0.1, 0.1);
    }

    update() {
        const speed = 5;
        let isMoving = false;
        let isLeft = this.playerSprite.lastDirectionLeft; // 保持最後的方向狀態

        // 純按鈕判定
        if (this.isLeftDown) {
            this.playerSprite.x -= speed;
            isLeft = true;
            isMoving = true;
        } else if (this.isRightDown) {
            this.playerSprite.x += speed;
            isLeft = false;
            isMoving = true;
        } else {
            this.playerSprite.x += 0;
            isMoving = false;
        }
        this.playerSprite.lastDirectionLeft = isLeft;

        this.playerSprite.x = Phaser.Math.Clamp(this.playerSprite.x, 600, 8200);
        this.handleAnimation(this.genderKey, isMoving, isLeft);

        const allNpcs = [...this.interactiveNpcs, ...this.fakeNpcs];
        this.currentNpcActivated = null;

        allNpcs.forEach(npc => {
            // Culling check
            // const inView = (npc.x > camView.x - buffer) && (npc.x < camView.x + camView.width + buffer);
            // // Only log occasionally to avoid lag
            // // if (Math.random() < 0.01) console.log(`NPC ${npc.id} ${npc.animKey} in view: ${inView}`);
            // if (inView) {
            //     // Only play if not already playing the correct animation
            //     if (!npc.anims.isPlaying || npc.anims.currentAnim?.key !== npc.animKey) {
            //         npc.anims.play(npc.animKey);
            //     }
            // } else {
            //     if (npc.anims.isPlaying) npc.anims.stop(); // Stop the lag from off-screen NPCs
            // }

            const dist = Math.abs(this.playerSprite.x - npc.x);

            if (dist < npc.proximityDistance) {
                npc.canInteract = true;
                if (npc.selectAnimKey) {
                    npc.play(npc.selectAnimKey, true);
                }
            } else {
                npc.canInteract = false;
                npc.play(npc.animKey, true);

                if (this.currentActiveBubble && this.currentActiveBubble.ownerNpc === npc) {
                    this.closeActiveBubble();
                }
            }
        });
    }

    handleAnimation(gender, isMoving, isLeft) {
        const idleKey = `${gender}_idle_anim`;
        const walkKey = isLeft ? `${gender}_left_walk_anim` : `${gender}_right_walk_anim`;

        if (isMoving) {
            this.playerSprite.setFlipX(false);
            this.playerSprite.play(walkKey, true);
        } else {
            this.playerSprite.setFlipX(false);
            this.playerSprite.play(idleKey, true);
        }
    }


    closeActiveBubble() {
        VoiceOverHelper.stop(this);
        if (this.currentActiveBubble) {
            this.currentActiveBubble.destroy();
            this.currentActiveBubble = null;
        }
        this.bubbleImg = null;
    }

    resolveDialogueTexture(key) {
        const gendered = `${key}_${this.genderKey}`;
        if (this.textures.exists(gendered)) return gendered;
        return key;
    }

    isNpcBoxKey(key) {
        return /^game\d+_npc_box/.test(key);
    }

    loadBubble(index = 0, bubbles, sceneKey, targetNpc) {

        this.closeActiveBubble();

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

        let playerX = this.playerSprite.x - 200;
        let playerY = this.playerSprite.y + 200;

        if (targetNpc.id === 4) {
            npcY = targetNpc.y + 200;
            playerX = this.playerSprite.x + 200;
        } else if (targetNpc.id === 5) {
            npcY = targetNpc.y + 200;
        } else if (targetNpc.id === 6)
            npcX = targetNpc.x - 200; {
        }


        // 2. 生成新的對話框
        const startX = index % 2 === 1 ? playerX : npcX;
        const startY = index % 2 === 1 ? playerY : npcY;

        const textureKey = this.resolveDialogueTexture(bubbles[index]);
        const useNpcBox = this.isNpcBoxKey(bubbles[index]);
        const boxX = useNpcBox ? this.cameras.main.width / 2 : startX;
        const boxY = useNpcBox ? this.cameras.main.height * 0.8 : startY;

        console.log("Loading bubble at:", boxX, boxY, "for NPC:", targetNpc.id, textureKey);

        this.bubbleImg = this.add.image(boxX, boxY, textureKey)
            .setDepth(200)
            .setInteractive({ useHandCursor: true });
        if (useNpcBox) {
            this.bubbleImg.setScrollFactor(0).setAlpha(0);
        }

        // 綁定當前 NPC 到對話框，方便 update 檢查距離
        this.bubbleImg.ownerNpc = targetNpc;
        this.currentActiveBubble = this.bubbleImg;
        VoiceOverHelper.playBubbleVo(this, bubbles[index], index % 2 === 1);

        // 處理點擊邏輯
        this.bubbleImg.on('pointerdown', () => {
            index++;
            if (index < bubbles.length) {
                const nextTexture = this.resolveDialogueTexture(bubbles[index]);
                const nextIsBox = this.isNpcBoxKey(bubbles[index]);
                this.bubbleImg.setTexture(nextTexture);
                if (nextIsBox) {
                    this.bubbleImg.setScrollFactor(0);
                    this.bubbleImg.setPosition(this.cameras.main.width / 2, this.cameras.main.height * 0.8);
                } else {
                    this.bubbleImg.setScrollFactor(1);
                    const nextX = index % 2 === 1 ? playerX : npcX;
                    const nextY = index % 2 === 1 ? playerY : npcY;
                    this.bubbleImg.setPosition(nextX, nextY);
                }
                this.currentActiveBubble = this.bubbleImg;
                VoiceOverHelper.playBubbleVo(this, bubbles[index], index % 2 === 1);
            } else {
                this.closeActiveBubble();
                if (sceneKey) {
                    console.log("Starting game scene:", sceneKey);
                    localStorage.setItem('playerPosition', JSON.stringify({ x: this.playerSprite.x, y: this.playerSprite.y }));
                    GameManager.switchToGameScene(this, sceneKey);
                }
            }
        });

        // 彈出動畫
        this.tweens.add({
            targets: this.bubbleImg,
            scale: { from: 0.5, to: 1 },
            alpha: { from: useNpcBox ? 0 : 1, to: 1 },
            duration: 200,
            ease: 'Back.easeOut'
        });
    }

    popRandomBubble(bubbles, targetNpc) {
        if (bubbles === null) return;

        this.closeActiveBubble();

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
            if (this.currentActiveBubble && this.currentActiveBubble.ownerNpc === targetNpc) {
                this.closeActiveBubble();
            }
        });
    }


    createAnimations() {

        // NPC Animations
        this.anims.create({
            key: 'npc1_anim',
            frames: this.anims.generateFrameNumbers('npc1', { start: 0, end: 19 }),
            frameRate: 18,
            repeat: -1
        });
        this.anims.create({
            key: 'npc1_select_anim',
            frames: this.anims.generateFrameNumbers('npc1_select', { start: 0, end: 19 }),
            frameRate: 18,
            repeat: -1
        });

        this.anims.create({
            key: 'npc2_anim',
            frames: this.anims.generateFrameNumbers('npc2', { start: 0, end: 9 }),
            frameRate: 18,
            repeat: -1
        });
        this.anims.create({
            key: 'npc2_select_anim',
            frames: this.anims.generateFrameNumbers('npc2_select', { start: 0, end: 9 }),
            frameRate: 18,
            repeat: -1
        });

        this.anims.create({
            key: 'npc3_anim',
            frames: this.anims.generateFrameNumbers('npc3', { start: 0, end: 14 }),
            frameRate: 18,
            repeat: -1
        });
        this.anims.create({
            key: 'npc3_select_anim',
            frames: this.anims.generateFrameNumbers('npc3_select', { start: 0, end: 14 }),
            frameRate: 18,
            repeat: -1
        });

        this.anims.create({
            key: 'npc4_anim',
            frames: this.anims.generateFrameNumbers('npc4', { start: 0, end: 19 }),
            frameRate: 18,
            repeat: -1
        });
        this.anims.create({
            key: 'npc4_select_anim',
            frames: this.anims.generateFrameNumbers('npc4_select', { start: 0, end: 19 }),
            frameRate: 18,
            repeat: -1
        });

        this.anims.create({
            key: 'npc5_anim',
            frames: this.anims.generateFrameNumbers('npc5', { start: 0, end: 17 }),
            frameRate: 18,
            repeat: -1
        });
        this.anims.create({
            key: 'npc5_select_anim',
            frames: this.anims.generateFrameNumbers('npc5_select', { start: 0, end: 17 }),
            frameRate: 18,
            repeat: -1
        });

        this.anims.create({
            key: 'npc6_anim',
            frames: this.anims.generateFrameNumbers('npc6', { start: 0, end: 13 }),
            frameRate: 18,
            repeat: -1
        });
        this.anims.create({
            key: 'npc6_select_anim',
            frames: this.anims.generateFrameNumbers('npc6_select', { start: 0, end: 13 }),
            frameRate: 18,
            repeat: -1
        });

        // Fake NPC Animations
        this.anims.create({
            key: 'fake_npc_1_anim',
            frames: this.anims.generateFrameNumbers('fake_npc_1', { start: 0, end: 19 }),
            frameRate: 18,
            repeat: -1
        });
        this.anims.create({
            key: 'fake_npc_1_select_anim',
            frames: this.anims.generateFrameNumbers('fake_npc_1_select', { start: 0, end: 19 }),
            frameRate: 18,
            repeat: -1
        });

        this.anims.create({
            key: 'fake_npc_2_anim',
            frames: this.anims.generateFrameNumbers('fake_npc_2', { start: 0, end: 26 }),
            frameRate: 18,
            repeat: -1
        });
        this.anims.create({
            key: 'fake_npc_2_select_anim',
            frames: this.anims.generateFrameNumbers('fake_npc_2_select', { start: 0, end: 26 }),
            frameRate: 18,
            repeat: -1
        });

        this.anims.create({
            key: 'fake_npc_3_anim',
            frames: this.anims.generateFrameNumbers('fake_npc_3', { start: 0, end: 24 }),
            frameRate: 18,
            repeat: -1
        });
        this.anims.create({
            key: 'fake_npc_3_select_anim',
            frames: this.anims.generateFrameNumbers('fake_npc_3_select', { start: 0, end: 24 }),
            frameRate: 18,
            repeat: -1
        });

        this.anims.create({
            key: 'fake_npc_4_anim',
            frames: this.anims.generateFrameNumbers('fake_npc_4', { start: 0, end: 15 }),
            frameRate: 18,
            repeat: -1
        });
        this.anims.create({
            key: 'fake_npc_4_select_anim',
            frames: this.anims.generateFrameNumbers('fake_npc_4_select', { start: 0, end: 15 }),
            frameRate: 18,
            repeat: -1
        });

        this.anims.create({
            key: 'fake_npc_5_anim',
            frames: this.anims.generateFrameNumbers('fake_npc_5', { start: 0, end: 39 }),
            frameRate: 18,
            repeat: -1
        });
        this.anims.create({
            key: 'fake_npc_5_select_anim',
            frames: this.anims.generateFrameNumbers('fake_npc_5_select', { start: 0, end: 39 }),
            frameRate: 18,
            repeat: -1
        });

        this.anims.create({
            key: 'boy_idle_anim',
            frames: this.anims.generateFrameNumbers('boy_idle', { start: 0, end: 151 }),
            frameRate: 18,
            repeat: -1
        });

        this.anims.create({
            key: 'boy_left_talk_anim',
            frames: this.anims.generateFrameNumbers('boy_left_talk', { start: 0, end: 94 }),
            frameRate: 18,
            repeat: -1
        });

        this.anims.create({
            key: 'boy_right_talk_anim',
            frames: this.anims.generateFrameNumbers('boy_right_talk', { start: 0, end: 167 }),
            frameRate: 18,
            repeat: -1
        });

        this.anims.create({
            key: 'boy_left_walk_anim',
            frames: this.anims.generateFrameNumbers('boy_left_walk', { start: 0, end: 47 }),
            frameRate: 18,
            repeat: -1
        });

        this.anims.create({
            key: 'boy_right_walk_anim',
            frames: this.anims.generateFrameNumbers('boy_right_walk', { start: 0, end: 54 }),
            frameRate: 18,
            repeat: -1
        });

        this.anims.create({
            key: 'girl_idle_anim',
            frames: this.anims.generateFrameNumbers('girl_idle', { start: 0, end: 149 }),
            frameRate: 18,
            repeat: -1
        });

        this.anims.create({
            key: 'girl_left_talk_anim',
            frames: this.anims.generateFrameNumbers('girl_left_talk', { start: 0, end: 95 }),
            frameRate: 18,
            repeat: -1
        });

        this.anims.create({
            key: 'girl_right_talk_anim',
            frames: this.anims.generateFrameNumbers('girl_right_talk', { start: 0, end: 49 }),
            frameRate: 18,
            repeat: -1
        });

        this.anims.create({
            key: 'girl_left_walk_anim',
            frames: this.anims.generateFrameNumbers('girl_left_walk', { start: 0, end: 23 }),
            frameRate: 18,
            repeat: -1
        });

        this.anims.create({
            key: 'girl_right_walk_anim',
            frames: this.anims.generateFrameNumbers('girl_right_walk', { start: 0, end: 23 }),
            frameRate: 18,
            repeat: -1
        });
    }

    getSavedGender() {
        try {
            const raw = localStorage.getItem('player');
            if (raw) {
                const gender = JSON.parse(raw).gender;
                if (gender === 'M' || gender === 'F') return gender;
            }
        } catch (e) { }
        return 'M';
    }

}