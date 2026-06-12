import Command from "@/struct/command";

export default new Command().setCommand({
    type: 1,
    name: "emoji",
    description: "Null",
    options: [{
        type: 1,
        name: "view",
        nameLocalizations: {
            "pt-BR": "ver"
        },
        description: "View or download any emoji.",
        descriptionLocalizations: {
            "pt-BR": "Visualize ou baixe qualquer emoji."
        },
        options: [{
            type: 3,
            required: true,
            name: "emoji",
            description: "The Emoji",
            descriptionLocalizations: {
                "pt-BR": "O Emoji."
            },
        }],
    }, {
        type: 1,
        name: "info",
        description: "Get information about any emoji.",
        descriptionLocalizations: {
            "pt-BR": "Obtenha informações sobre qualquer emoji."
        },
        options: [{
            type: 3,
            required: true,
            name: "emoji",
            description: "The Emoji",
            descriptionLocalizations: {
                "pt-BR": "O Emoji."
            },
        }],
    }],
});