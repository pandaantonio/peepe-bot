"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = default_1;
async function default_1(app, embeds) {
    const safeEmbeds = embeds ?? [];
    const options = [
        {
            value: "say",
            label: "Voltar",
            emoji: await app.getButoji("back"),
            description: "Retorne para o menu principal."
        },
        {
            value: "add.embed",
            emoji: await app.getButoji("add"),
            label: "Adicionar Incorporação",
            description: "Crie uma nova incorporação para a mensagem."
        }
    ];
    for (let i = 0; i < safeEmbeds.length; i++) {
        options.push({
            value: `embed.${i}`,
            label: `Incorporação ${i + 1}`,
            emoji: await app.getButoji("point"),
            description: `Editar configurações da incorporação ${i + 1}.`,
        });
    }
    return [
        {
            type: 1,
            components: [
                {
                    type: 3,
                    options,
                    customID: "embeds",
                    placeholder: "Selecione uma incorporação para editar",
                }
            ],
        },
        {
            type: 1,
            components: [
                {
                    type: 2,
                    style: 2,
                    emoji: await app.getButoji("send"),
                    customID: "send_message",
                    label: "Enviar mensagem"
                },
                {
                    type: 2,
                    style: 2,
                    emoji: await app.getButoji("delete"),
                    customID: "delete_message",
                    label: "Apagar mensagem",
                },
            ]
        }
    ];
}
