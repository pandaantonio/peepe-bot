import { CreateApplicationCommandOptions} from "oceanic.js";

const command: CreateApplicationCommandOptions = {
    type: 1,
    name: "kick",
    nameLocalizations: {
        "pt-BR": "expulsar"
    },
    description: "Kick one or more people.",
    descriptionLocalizations: {
        "pt-BR": "Expulse uma ou mais pessoas."
    },
    dmPermission: false,
    defaultMemberPermissions: "2",
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
        description: "Reason for kick.",
        descriptionLocalizations: {
            "pt-BR": "Motivo da expulsão."
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