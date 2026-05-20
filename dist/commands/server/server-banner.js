"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const oceanic_js_1 = require("oceanic.js");
const command_1 = __importDefault(require("../../app/command"));
exports.default = new command_1.default()
    .addName("server banner")
    .setRun(async ({ app, guild, interaction }) => {
    if (!guild)
        return;
    const banner = guild.bannerURL();
    if (!banner) {
        interaction.createFollowup({
            flags: oceanic_js_1.MessageFlags.IS_COMPONENTS_V2,
            components: [{
                    type: 10,
                    content: `${await app.getMenoji("no")} Este servidor não possue estandarte!`,
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
                                    url: banner,
                                },
                            }],
                    }],
            }, {
                type: 1,
                components: [{
                        type: 2,
                        style: 5,
                        url: banner,
                        label: "Baixar",
                        emoji: await app.getButoji("download"),
                    }]
            }]
    });
});
