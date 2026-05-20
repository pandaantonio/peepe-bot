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
        embeds: [{
                title: 'Snake',
                color: 0x0e7aff,
                image: { url: "attachment://gameboard.png" },
                description: `Pontuação: ${game.getScore()}`,
            }],
        files: [{
                name: "gameboard.png",
                contents: await game.generate(),
            }],
        components: [{
                type: oceanic_js_1.ComponentTypes.ACTION_ROW,
                components: [{
                        customID: "snake_up",
                        emoji: {
                            name: "⬆️",
                        },
                        type: oceanic_js_1.ComponentTypes.BUTTON,
                        style: oceanic_js_1.ButtonStyles.PRIMARY,
                    }, {
                        customID: "snake_down",
                        emoji: {
                            name: "⬇️",
                        },
                        type: oceanic_js_1.ComponentTypes.BUTTON,
                        style: oceanic_js_1.ButtonStyles.PRIMARY,
                    }, {
                        customID: "snake_left",
                        emoji: {
                            name: "⬅️",
                        },
                        type: oceanic_js_1.ComponentTypes.BUTTON,
                        style: oceanic_js_1.ButtonStyles.PRIMARY,
                    }, {
                        customID: "snake_right",
                        emoji: {
                            name: "➡️",
                        },
                        type: oceanic_js_1.ComponentTypes.BUTTON,
                        style: oceanic_js_1.ButtonStyles.PRIMARY,
                    }, {
                        customID: "snake_stop",
                        emoji: { name: "🏳" },
                        type: oceanic_js_1.ComponentTypes.BUTTON,
                        style: oceanic_js_1.ButtonStyles.DANGER,
                    }]
            }]
    });
    const message = await interaction.getOriginal();
    await firebaseAdmin_1.adminDb.ref(`games/snake/${message.id}`).set(game.save());
});
