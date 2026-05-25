"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const component_1 = __importDefault(require("@/struct/component"));
const oceanic_js_1 = require("oceanic.js");
exports.default = new component_1.default()
    .addName("guess-number")
    .setRun(async function ({ app, author, interaction }) {
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
        title: "Chutar o número",
        customID: "guess-number",
        components: [{
                type: 1,
                components: [{
                        type: 4,
                        style: 1,
                        required: true,
                        minLength: 1,
                        maxLength: 3,
                        label: "Número escolhido",
                        customID: "chosen-number",
                    }],
            }],
    });
});
