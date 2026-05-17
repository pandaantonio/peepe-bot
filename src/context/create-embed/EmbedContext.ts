import { Embed, MessageComponent } from "oceanic.js";
import App from "../../app";

export default async function (app: App): Promise<MessageComponent[]> {
    return [
        {
            type: 1,
            components: [
                {
                    type: 3,
                    customID: "embed",
                    placeholder: "Selecione o elemento da incorporação que deseja editar",
                    options: [
                        {
                            value: "embeds",
                            label: "Voltar",
                            emoji: await app.getButoji("back"),
                            description: "Retorne para a lista de incorporações."
                        },
                        {
                            value: "url",
                            label: "Url",
                            emoji: await app.getButoji("link"),
                            description: "Defina o link ao clicar no título."
                        },
                        {
                            value: "color",
                            label: "Cor",
                            emoji: await app.getButoji("palette"),
                            description: "Altere a cor lateral da incorporação."
                        },
                        {
                            value: "title",
                            label: "Título",
                            emoji: await app.getButoji("docs"),
                            description: "Edite o título principal da incorporação."
                        },
                        {
                            value: "description",
                            label: "Descrição",
                            emoji: { name: "📑" },
                            description: "Modifique o conteúdo da descrição."
                        },
                        {
                            value: "image",
                            label: "Imagem",
                            emoji: await app.getButoji("image"),
                            description: "Adicione ou altere a imagem principal."
                        },
                        {
                            value: "thumbnail",
                            label: "Miniatura",
                            emoji: await app.getButoji("google_photos"),
                            description: "Defina a miniatura exibida ao lado."
                        },
                        {
                            value: "author",
                            label: "Autor",
                            emoji: await app.getButoji("user"),
                            description: "Configure nome, ícone e link do autor."
                        },
                        {
                            value: "footer",
                            label: "Rodapé",
                            emoji: await app.getButoji("footer"),
                            description: "Personalize o texto e ícone do rodapé."
                        }
                    ]
                }
            ]
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