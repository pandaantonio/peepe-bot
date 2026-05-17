"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = default_1;
async function default_1(app) {
    return [
        {
            type: 1,
            components: [
                {
                    type: 3,
                    customID: "say",
                    placeholder: "Selecione o que deseja editar na mensagem",
                    options: [
                        {
                            value: "content",
                            label: "Conteúdo",
                            emoji: await app.getButoji("message"),
                            description: "Modifique o texto principal da mensagem."
                        },
                        {
                            value: "embeds",
                            emoji: await app.getButoji("tasks"),
                            label: "Incorporações",
                            description: "Gerencie as incorporações da mensagem."
                        }
                    ],
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
            ]
        }
    ];
}
