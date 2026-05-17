"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const command_1 = __importDefault(require("../../app/command"));
const GetEmoji_1 = __importDefault(require("../../utils/GetEmoji"));
const EmojiOption_1 = __importDefault(require("../../options/EmojiOption"));
const EphemeralOption_1 = __importDefault(require("../../options/EphemeralOption"));
exports.default = new command_1.default()
    .addName("emoji info")
    .setRun(async function ({ app, interaction }) {
    const emoji = await (0, GetEmoji_1.default)(interaction.data.options.getString("emoji", true));
    if (!emoji) {
        interaction.createFollowup({
            content: `${await app.getMenoji("no")} Emoji inválido!`,
        });
        return;
    }
    interaction.createFollowup({
        embeds: [{
                thumbnail: { url: emoji.url },
                title: `${emoji.mention} ${emoji.name}`,
                fields: [{
                        inline: true,
                        name: "Animado?",
                        value: `\`\`${emoji.animated ? "SIM" : "NÃO"}\`\``
                    }, {
                        inline: true,
                        name: "Id",
                        value: `\`\`${emoji.id}\`\``,
                    }, {
                        inline: true,
                        name: "Menção",
                        value: `\`\`${emoji.mention}\`\``,
                    }, {
                        name: "Criado",
                        value: `<t:${parseInt(`${emoji.createdAt.getTime() / 1000}`)}:F> (<t:${parseInt(`${emoji.createdAt.getTime() / 1000}`)}:R>)`
                    }],
            }],
        components: [{
                type: 1,
                components: [{
                        type: 2,
                        style: 5,
                        url: emoji.url,
                        label: "Baixar",
                        emoji: await app.getButoji("download"),
                    }]
            }],
    });
})
    .setSubCommand({
    type: 1,
    name: 'info',
    description: "Emoji information.",
    descriptionLocalizations: {
        "pt-BR": "Informações sobre o emoji."
    },
    options: [(0, EmojiOption_1.default)(true), (0, EphemeralOption_1.default)(false)],
});
