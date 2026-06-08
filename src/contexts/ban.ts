import { CreateApplicationCommandOptions} from "oceanic.js";

const command: CreateApplicationCommandOptions = {
    type: 1,
    name: "ban",
    nameLocalizations: {
        "pt-BR": "banir"
    },
    description: "Ban one or more people.",
    descriptionLocalizations: {
        "pt-BR": "Bana uma ou mais pessoas."
    },
    dmPermission: false,
    defaultMemberPermissions: "4",
    options: [{
        type: 6,
        name: "user1",
        required: true,
        nameLocalizations: {
            "pt-BR": "usuário1"
        },
        description: "Choose a user.",
        descriptionLocalizations: {
            "pt-BR": "Escolha um usuário."
        },
    }, {
        type: 3,
        required: true,
        name: "reason",
        nameLocalizations: {
            "pt-BR": "motivo"
        },
        description: "Reason for ban.",
        descriptionLocalizations: {
            "pt-BR": "Motivo do banimento."
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