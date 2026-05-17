import { EmbedOptions, MessageComponent, SelectOption } from "oceanic.js";
import App from "../../app";

export default async function (
    app: App,
    embeds?: EmbedOptions[]
): Promise<MessageComponent[]> {

    const safeEmbeds = embeds ?? [];

    const options: SelectOption[] = [
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
                }
            ]
        }
    ];
}