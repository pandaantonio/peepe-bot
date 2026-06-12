"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const command_1 = __importDefault(require("@/struct/command"));
const GetEmoji_1 = __importDefault(require("@/utils/GetEmoji"));
const oceanic_js_1 = require("oceanic.js");
exports.default = new command_1.default()
    .addName("emoji view")
    .setRun(async function ({ app, interaction }) {
    const emojiText = interaction.data.options.getString("emoji", true);
    const emoji = await (0, GetEmoji_1.default)(emojiText);
    if (!emoji) {
        interaction.createFollowup({
            content: `${await app.getMenoji("no")} Emoji inexistente.`,
        });
        return;
    }
    interaction.createFollowup({
        flags: oceanic_js_1.MessageFlags.IS_COMPONENTS_V2,
        components: [{
                type: 17,
                components: [{
                        type: 10,
                        content: `# ${emoji.name}`,
                    }, {
                        type: 12,
                        items: [{
                                media: {
                                    url: emoji.url,
                                },
                                description: "Emoji",
                            }]
                    }],
            }, {
                type: 1,
                components: [{
                        type: 2,
                        style: 5,
                        url: emoji.url,
                        label: "Baixar",
                        emoji: await app.getButoji("download"),
                    }],
            }],
    });
});
