"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const firebaseAdmin_1 = require("@/database/firebaseAdmin");
const Snake_1 = __importDefault(require("@/games/Snake"));
const command_1 = __importDefault(require("@/struct/command"));
const oceanic_js_1 = require("oceanic.js");
exports.default = new command_1.default()
    .addName("play snake")
    .setRun(async ({ interaction }) => {
    const game = new Snake_1.default();
    interaction.createFollowup({
        flags: oceanic_js_1.MessageFlags.IS_COMPONENTS_V2,
        files: [{
                name: "gameboard.png",
                contents: await game.generate(),
            }],
        components: [{
                type: 17,
                components: [{
                        type: 10,
                        content: `# 🐍 Jogo da cobrinha\n\n- **Pontuação**: \`\`${game.getScore()}\`\``,
                    }, {
                        type: 12,
                        items: [{
                                media: {
                                    url: "attachment://gameboard.png",
                                },
                            }]
                    }]
            }, {
                type: oceanic_js_1.ComponentTypes.ACTION_ROW,
                components: [{
                        customID: "snake_up",
                        emoji: {
                            name: "⬆️",
                        },
                        type: oceanic_js_1.ComponentTypes.BUTTON,
                        style: oceanic_js_1.ButtonStyles.SECONDARY,
                    }, {
                        customID: "snake_down",
                        emoji: {
                            name: "⬇️",
                        },
                        type: oceanic_js_1.ComponentTypes.BUTTON,
                        style: oceanic_js_1.ButtonStyles.SECONDARY,
                    }, {
                        customID: "snake_left",
                        emoji: {
                            name: "⬅️",
                        },
                        type: oceanic_js_1.ComponentTypes.BUTTON,
                        style: oceanic_js_1.ButtonStyles.SECONDARY,
                    }, {
                        customID: "snake_right",
                        emoji: {
                            name: "➡️",
                        },
                        type: oceanic_js_1.ComponentTypes.BUTTON,
                        style: oceanic_js_1.ButtonStyles.SECONDARY,
                    }, {
                        customID: "snake_stop",
                        emoji: { name: "🏳" },
                        type: oceanic_js_1.ComponentTypes.BUTTON,
                        style: oceanic_js_1.ButtonStyles.DANGER,
                    }]
            }],
    });
    const message = await interaction.getOriginal();
    await firebaseAdmin_1.adminDb.ref(`games/snake/${message.id}`).set(game.save());
});
