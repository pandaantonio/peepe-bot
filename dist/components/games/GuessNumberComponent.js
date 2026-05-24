"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const component_1 = __importDefault(require("@/struct/component"));
const oceanic_js_1 = require("oceanic.js");
exports.default = new component_1.default()
    .addName('guess-number')
    .setRun(async ({ app, author, interaction }) => {
    if (interaction.data.componentType !== 2)
        return;
    if (author.id !== interaction.message.interactionMetadata?.user.id) {
        await interaction.defer(64).catch(console.log);
        interaction.createFollowup({
            flags: oceanic_js_1.MessageFlags.IS_COMPONENTS_V2,
            components: [{
                    type: 10,
                    content: `${await app.getMenoji("no")} Este componente pertence á ${interaction.message.interactionMetadata?.user.mention}!`,
                }],
        });
        return;
    }
    await interaction.createModal({
        title: "Advinhe o número",
        customID: "guess-number",
        components: [{
                type: 1,
                components: [{
                        type: 4,
                        style: 1,
                        required: true,
                        customID: "number",
                        label: "Número escolhido",
                    }],
            }],
    });
    /*const snapshot = await adminDb.ref(`games/2048/${interaction.message.id}`).once('value');
    const data: Game2048Save = snapshot.val();
    const game = new Game2048(data.gridSize, data.score, data.grid, data.gameOver);
    const customID = interaction.data.customID.replace("2048_", "");

    if (game.isGameOver() || customID === "stop") {
        interaction.editOriginal({
            files: [{
                name: "gameboard.png",
                contents: await game.generate(),
            }],
            components: [{
                type: 17,
                components: [{
                    type: 10,
                    content: `# 🎮 2048\n\n- **Pontuação**: \`\`${game.getScore()}\`\``,
                }, {
                    type: 12,
                    items: [{
                        media: {
                            url: "attachment://gameboard.png",
                        },
                    }]
                }],
            }]
        });

        await adminDb.ref(`games/2048/${interaction.message.id}`).remove();
    } else {
        game.move(customID as "up" | "down" | "left" | "right");
        await adminDb.ref(`games/2048/${interaction.message.id}`).update(game);

        interaction.editOriginal({
             files: [{
                name: "gameboard.png",
                contents: await game.generate(),
            }],
            components: [{
                type: 17,
                components: [{
                    type: 10,
                    content: `# 🎮 2048\n\n- **Pontuação**: \`\`${game.getScore()}\`\``,
                }, {
                    type: 12,
                    items: [{
                        media: {
                            url: "attachment://gameboard.png",
                        },
                    }]
                }],
            }, {
                type: ComponentTypes.ACTION_ROW,
                components: [{
                    customID: "2048_up",
                    emoji: {
                        name: "⬆️",
                    },
                    type: ComponentTypes.BUTTON,
                    style: ButtonStyles.SECONDARY,
                }, {
                    customID: "2048_down",
                    emoji: {
                        name: "⬇️",
                    },
                    type: ComponentTypes.BUTTON,
                    style: ButtonStyles.SECONDARY,
                }, {
                    customID: "2048_left",
                    emoji: {
                        name: "⬅️",
                    },
                    type: ComponentTypes.BUTTON,
                    style: ButtonStyles.SECONDARY,
                }, {
                    customID: "2048_right",
                    emoji: {
                        name: "➡️",
                    },
                    type: ComponentTypes.BUTTON,
                    style: ButtonStyles.SECONDARY,
                }, {
                    customID: "2048_stop",
                    emoji: { name: "🏳" },
                    type: ComponentTypes.BUTTON,
                    style: ButtonStyles.DANGER,
                }],
            }],
        });
    }*/
});
