import { CreateApplicationCommandOptions } from "oceanic.js";

const command: CreateApplicationCommandOptions = {
    type: 1,
    name: "purge",
    nameLocalizations: {
        "pt-BR": "limpar"
    },
    description: "Clear chat messages.",
    descriptionLocalizations: {
        "pt-BR": "Limpe as mensagens do chat."
    },
    dmPermission: false,
    defaultMemberPermissions: "8192",
    options: [{
        type: 4,
        minValue: 2,
        maxValue: 2000,
        name: "amount",
        required: false,
        nameLocalizations: {
            "pt-BR": "quantidade"
        },
        description: "Number of messages to be deleted.",
        descriptionLocalizations: {
            "pt-BR": "Quantidade de mensagens a serem apagadas.",
        },
    }, {
        type: 5,
        required: false,
        name: "apps",
        nameLocalizations: {
            "pt-BR": "aplicativos"
        },
        description: "Filter messages from apps and bots.",
        descriptionLocalizations: {
            "pt-BR": "Filtrar mensagens de aplicativos e bots."
        },
    }, {
        type: 6,
        name: "user1",
        required: false,
        nameLocalizations: {
            "pt-BR": "usuário1"
        },
        description: "Choose a user.",
        descriptionLocalizations: {
            "pt-BR": "Escolha um usuário."
        },
    }, {
        type: 6,
        name: "user2",
        required: false,
        nameLocalizations: {
            "pt-BR": "usuário2"
        },
        description: "Choose a user.",
        descriptionLocalizations: {
            "pt-BR": "Escolha um usuário."
        },
    }, {
        type: 6,
        name: "user3",
        required: false,
        nameLocalizations: {
            "pt-BR": "usuário3"
        },
        description: "Choose a user.",
        descriptionLocalizations: {
            "pt-BR": "Escolha um usuário."
        },
    }],
};

export default command;