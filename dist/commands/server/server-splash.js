"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const oceanic_js_1 = require("oceanic.js");
const command_1 = __importDefault(require("@/struct/command"));
exports.default = new command_1.default()
    .addName("server splash")
    .setRun(async ({ app, guild, interaction }) => {
    if (!guild)
        return;
    const splash = guild.splashURL();
    if (!splash) {
        interaction.createFollowup({
            flags: oceanic_js_1.MessageFlags.IS_COMPONENTS_V2,
            components: [{
                    type: 10,
                    content: `${await app.getMenoji("no")} Este servidor não possue fundo de convite!`,
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
                                    url: splash,
                                },
                            }],
                    }],
            }, {
                type: 1,
                components: [{
                        type: 2,
                        style: 5,
                        url: splash,
                        label: "Baixar",
                        emoji: await app.getButoji("download"),
                    }]
            }]
    });
});
