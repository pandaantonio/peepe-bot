"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const command_1 = __importDefault(require("@/struct/command"));
const firebaseAdmin_1 = require("@/database/firebaseAdmin");
exports.default = new command_1.default()
    .addName('config embed')
    .setRun(async function ({ app, author, interaction }) {
    const options = [{
            emoji: await app.getButoji("add"),
            label: `Adicionar mensagem`,
            value: "add.message",
        }];
    const messagesRef = firebaseAdmin_1.adminDb.ref(`messages/${author.id}`);
    const snapshot = await messagesRef.once("value");
    const data = snapshot.val();
    if (data) {
        for (const [key, value] of Object.entries(data)) {
            options.push({
                //@ts-ignore
                label: `${value?.name ?? value?.id}`,
                value: `${key}`,
                emoji: await app.getButoji("point"),
            });
        }
    }
    interaction.createFollowup({
        components: [{
                type: 1,
                components: [{
                        type: 3,
                        options,
                        customID: "config-embed",
                    }],
            }]
    });
});
