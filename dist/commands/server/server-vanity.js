"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const oceanic_js_1 = require("oceanic.js");
const command_1 = __importDefault(require("../../app/command"));
exports.default = new command_1.default()
    .addName("server vanity")
    .setRun(async ({ app, guild, interaction }) => {
    if (!guild)
        return;
    const vanity = guild.vanityURLCode ? `https://discord.gg/${guild.vanityURLCode}` : undefined;
    if (!vanity) {
        interaction.createFollowup({
            flags: oceanic_js_1.MessageFlags.IS_COMPONENTS_V2,
            components: [{
                    type: 10,
                    content: `${await app.getMenoji("no")} Este servidor não possue fundo de discovery!`,
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
                        content: `**${guild.name}**\n\n${vanity}`,
                    }],
            }, {
                type: 1,
                components: [{
                        type: 2,
                        style: 5,
                        url: vanity,
                        label: "Servidor",
                        emoji: await app.getButoji("download"),
                    }]
            }]
    });
});
