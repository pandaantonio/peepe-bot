import { MessageComponent } from "oceanic.js";
import App from "../../app";

export default async function (app: App): Promise<MessageComponent[]> {
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
                {
                    type: 2,
                    style: 2,
                    emoji: await app.getButoji("delete"),
                    customID: "delete_message",
                    label: "Apagar mensagem",
                },
                {
                    type: 2,
                    style: 2,
                    emoji: await app.getButoji("gpt"),
                    customID: "ai_message",
                    label: "Gerar mensagem"
                }
            ]
        }
    ];
}