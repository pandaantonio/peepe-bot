"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const command_1 = __importDefault(require("@/struct/command"));
const oceanic_js_1 = require("oceanic.js");
exports.default = new command_1.default()
    .addName("server icon")
    .setRun(async function ({ app, guild, interaction }) {
    if (!guild)
        return;
    const url = guild.iconURL();
    if (!url) {
        interaction.createFollowup({
            flags: oceanic_js_1.MessageFlags.IS_COMPONENTS_V2,
            components: [{
                    type: 10,
                    content: `🚫 Este servidor não possue ícone!`,
                }],
        });
        return;
    }
    interaction.createFollowup({
        flags: oceanic_js_1.MessageFlags.IS_COMPONENTS_V2,
        components: [{
                type: 17,
                components: [{
                        type: 10,
                        content: `**${guild.name}**`,
                    }, {
                        type: 12,
                        items: [{
                                media: {
                                    url,
                                },
                            }],
                    }],
            }, {
                type: 1,
                components: [{
                        url,
                        type: 2,
                        style: 5,
                        label: "Baixar",
                        emoji: await app.getButoji("download"),
                    }],
            }],
    });
});
