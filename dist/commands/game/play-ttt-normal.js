"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const firebaseAdmin_1 = require("@/database/firebaseAdmin");
const command_1 = __importDefault(require("@/struct/command"));
const oceanic_js_1 = require("oceanic.js");
exports.default = new command_1.default()
    .addName("play ttt normal")
    .setRun(async ({ author, interaction }) => {
    const user = interaction.data.options.getUser("user", true);
    interaction.createFollowup({
        flags: oceanic_js_1.MessageFlags.IS_COMPONENTS_V2,
        components: [{
                type: 10,
                content: `${user.mention} Deseja jogar o jogo da velha com ${author.mention}?`,
            }, {
                type: 1,
                components: [{
                        type: 2,
                        style: 3,
                        label: "Sim",
                        customID: "accept_ttt",
                    }, {
                        type: 2,
                        style: 4,
                        label: "Não",
                        customID: "reject_ttt",
                    }],
            }]
    });
    const message = await interaction.getOriginal();
    await firebaseAdmin_1.adminDb.ref(`games/tttinvite/${message.id}`).set(`${user.id}`);
});
