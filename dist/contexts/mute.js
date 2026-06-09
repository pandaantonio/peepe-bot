"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const command = {
    type: 1,
    name: "mute",
    description: "null",
    dmPermission: false,
    defaultMemberPermissions: "1099511627776",
    options: [{
            type: 1,
            name: "add",
            description: "Mute one or more people.",
            descriptionLocalizations: {
                "pt-BR": "Mutar uma ou mais pessoas."
            },
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
                    name: "time",
                    nameLocalizations: {
                        "pt-BR": "tempo"
                    },
                    description: "Mute time.",
                    descriptionLocalizations: {
                        "pt-BR": "Tempo do mute."
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
                }]
        }, {
            type: 1,
            name: "remove",
            description: "Unmute one or more people.",
            descriptionLocalizations: {
                "pt-BR": "Desmutar uma ou mais pessoas."
            },
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
        }],
};
exports.default = command;
